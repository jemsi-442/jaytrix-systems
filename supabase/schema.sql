-- Run this file once in Supabase Dashboard > SQL Editor.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Client',
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null unique references public.profiles(id) on delete cascade,
  subject text not null default 'General enquiry',
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at);
create index if not exists conversations_updated_idx
  on public.conversations (updated_at desc);

create or replace function public.is_jaytrix_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role' = 'admin', false);
$$;

create or replace function public.handle_new_chat_user()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), split_part(new.email, '@', 1), 'Client')
  ) on conflict (id) do nothing;

  insert into public.conversations (customer_id, subject)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'requested_service'), ''), 'General enquiry')
  ) on conflict (customer_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_chat on auth.users;
create trigger on_auth_user_created_chat
  after insert on auth.users
  for each row execute procedure public.handle_new_chat_user();

create or replace function public.touch_conversation_on_message()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  update public.conversations set updated_at = now() where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists on_chat_message_created on public.messages;
create trigger on_chat_message_created
  after insert on public.messages
  for each row execute procedure public.touch_conversation_on_message();

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Users read own profile; admins read all" on public.profiles;
create policy "Users read own profile; admins read all" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or public.is_jaytrix_admin());

drop policy if exists "Users update own display name" on public.profiles;
create policy "Users update own display name" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "Customers and admins read conversations" on public.conversations;
create policy "Customers and admins read conversations" on public.conversations
  for select to authenticated using (customer_id = (select auth.uid()) or public.is_jaytrix_admin());

drop policy if exists "Customers and admins read messages" on public.messages;
create policy "Customers and admins read messages" on public.messages
  for select to authenticated using (
    public.is_jaytrix_admin() or exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.customer_id = (select auth.uid())
    )
  );

drop policy if exists "Customers and admins send messages" on public.messages;
create policy "Customers and admins send messages" on public.messages
  for insert to authenticated with check (
    sender_id = (select auth.uid()) and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.customer_id = (select auth.uid()) or public.is_jaytrix_admin())
        and c.status = 'open'
    )
  );

grant select, update on public.profiles to authenticated;
grant select on public.conversations to authenticated;
grant select, insert on public.messages to authenticated;

do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null;
end $$;

-- Promote the owner's account after creating it through /chat:
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = 'YOUR_OWNER_EMAIL';
