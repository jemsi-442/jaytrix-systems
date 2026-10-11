# Supabase chat setup

1. Open the Supabase project SQL Editor and run `schema.sql` from top to bottom.
2. Copy the project URL and **publishable key** from Project Settings → API Keys. Put them in the project-root `.env.local` using the names in `.env.example`.
3. Add the same two public environment variables to Vercel for Production, Preview, and Development, then redeploy.
4. Create your owner account at `/chat`. In Supabase SQL Editor, promote only that account by running the statement below with its email:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'YOUR_OWNER_EMAIL';
```

Sign out and back in so the refreshed login token includes the admin role. The inbox is at `/admin/chat`.

Never put a Supabase secret/service-role key in a `NEXT_PUBLIC_` variable or browser code. The SQL policies restrict customer reads to their own chat; an admin role is stored in trusted `app_metadata`.

The chat keeps one conversation per customer account. The service selected at registration becomes the conversation subject. Customers and the admin can exchange messages live through Supabase Realtime.
