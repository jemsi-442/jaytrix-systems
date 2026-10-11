"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminInbox() {
  const configured = isSupabaseConfigured();
  const supabase = useMemo(() => configured ? createClient() : null, [configured]);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const loadThreads = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from("conversations")
      .select("id, subject, status, updated_at, customer_id, profiles(display_name)")
      .order("updated_at", { ascending: false });
    if (error) setNotice(error.message);
    else setThreads(data || []);
  }, [supabase]);

  const loadMessages = useCallback(async (threadId) => {
    if (!supabase || !threadId) return;
    const { data, error } = await supabase.from("messages")
      .select("id, sender_id, body, created_at")
      .eq("conversation_id", threadId).order("created_at", { ascending: true });
    if (error) setNotice(error.message);
    else setMessages(data || []);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session);
        setAuthLoading(false);
      }
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setAuthLoading(false);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!session) return;
    if (session.user.app_metadata?.role !== "admin") {
      setNotice("This account does not have admin access. Set its admin role in Supabase, then sign in again.");
      return;
    }
    loadThreads();
    const channel = supabase.channel("admin-inbox")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => {
        loadThreads();
        if (selected) loadMessages(selected.id);
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [session, supabase, loadThreads, loadMessages, selected]);

  useEffect(() => { if (selected) loadMessages(selected.id); }, [selected, loadMessages]);

  async function reply(event) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || !selected) return;
    const { error } = await supabase.from("messages").insert({
      conversation_id: selected.id, sender_id: session.user.id, body,
    });
    if (error) setNotice(error.message);
    else { setDraft(""); loadMessages(selected.id); }
  }

  const isAdmin = session?.user?.app_metadata?.role === "admin";
  const visibleThreads = threads.filter((thread) =>
    `${thread.profiles?.display_name || ""} ${thread.subject || ""}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between">
          <div><Link href="/" className="text-sm font-semibold text-blue-900">JAYTRIX SYSTEMS</Link><h1 className="mt-1 text-2xl font-bold">Client chat inbox</h1></div>
          <Link href="/chat" className="text-sm text-slate-600">Open customer chat ↗</Link>
        </div>
        {!configured ? <p className="rounded-xl bg-white p-6">Supabase environment variables are not available in this deployment. Check the Production variables in Vercel and redeploy.</p>
          : authLoading ? <div role="status" className="rounded-xl bg-white p-6 text-sm text-slate-500">Checking your sign-in…</div>
            : !session ? <div className="rounded-xl bg-white p-6">Sign in at <Link className="font-semibold text-blue-800" href="/chat">/chat</Link> with your admin account, then return here.</div>
            : !isAdmin ? <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950">{notice || "This account is not an admin."}<button onClick={() => supabase.auth.signOut()} className="ml-3 underline">Sign out</button></div>
              : (
                <div className="grid min-h-[75vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:grid-cols-[340px_1fr]">
                  <aside className={`${selected ? "hidden md:block" : "block"} border-b border-slate-200 md:border-b-0 md:border-r`}>
                    <div className="border-b p-4"><p className="font-semibold">Conversations</p><p className="text-xs text-slate-500">Customer names and messages</p><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search conversations" aria-label="Search conversations" className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-700" /></div>
                    <div className="max-h-[70vh] overflow-y-auto">{visibleThreads.map((thread) => <button key={thread.id} onClick={() => setSelected(thread)} className={`flex w-full items-center gap-3 border-b px-4 py-4 text-left transition hover:bg-slate-50 ${selected?.id === thread.id ? "bg-blue-50" : ""}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-950">{(thread.profiles?.display_name || "C").charAt(0).toUpperCase()}</span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate font-semibold">{thread.profiles?.display_name || "Customer"}</span><time className="shrink-0 text-[10px] text-slate-400">{new Date(thread.updated_at).toLocaleDateString("en-TZ", { day: "numeric", month: "short" })}</time></span><span className="mt-1 block truncate text-xs text-slate-500">{thread.subject}</span><span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${thread.status === "open" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{thread.status}</span></span></button>)}{!visibleThreads.length && <p className="p-5 text-sm text-slate-500">{search ? "No matching conversations." : "No conversations yet."}</p>}</div>
                  </aside>
                  <section className={`${selected ? "flex" : "hidden md:flex"} min-h-[65vh] flex-col`}>
                    {selected ? <>
                      <header className="flex items-center gap-3 border-b px-4 py-4 sm:px-5">
                        <button type="button" onClick={() => setSelected(null)} className="rounded-lg px-2 py-1 text-sm font-medium text-blue-900 hover:bg-blue-50 md:hidden">← Chats</button>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 font-semibold text-white">{(selected.profiles?.display_name || "C").charAt(0).toUpperCase()}</span>
                        <div><p className="font-semibold">{selected.profiles?.display_name || "Customer"}</p><p className="text-xs text-slate-500">{selected.subject} · {selected.status}</p></div>
                      </header>
                      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f5f7fa] p-4 sm:p-5">
                        {messages.map((message) => <div key={message.id} className={`flex ${message.sender_id === session.user.id ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${message.sender_id === session.user.id ? "rounded-br-md bg-blue-950 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}><p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p><time className={`mt-1 block text-right text-[10px] ${message.sender_id === session.user.id ? "text-blue-200" : "text-slate-400"}`}>{new Date(message.created_at).toLocaleString("en-TZ", { dateStyle: "medium", timeStyle: "short" })}</time></div></div>)}
                        {!messages.length && <p className="pt-10 text-center text-sm text-slate-500">No messages in this conversation yet.</p>}
                      </div>
                      <form onSubmit={reply} className="flex gap-3 border-t p-4"><input value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={4000} placeholder="Write a reply…" aria-label="Write a reply" className="min-w-0 flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-700"/><button disabled={!draft.trim()} className="rounded-xl bg-blue-950 px-5 font-semibold text-white disabled:opacity-50">Send</button></form>
                    </> : <div className="m-auto p-8 text-center text-slate-500">Select a conversation to view messages.</div>}
                  </section>
                </div>
              )}
        {notice && isAdmin && <p role="status" className="mt-3 text-sm text-amber-800">{notice}</p>}
      </div>
    </main>
  );
}
