"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminInbox() {
  const configured = isSupabaseConfigured();
  const supabase = useMemo(() => configured ? createClient() : null, [configured]);
  const [session, setSession] = useState(null);
  const [threads, setThreads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
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
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
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

  return <main className="min-h-screen bg-slate-100 p-4 text-slate-900 sm:p-8"><div className="mx-auto max-w-7xl"><div className="mb-5 flex items-center justify-between"><div><Link href="/" className="text-sm font-semibold text-blue-900">JAYTRIX SYSTEMS</Link><h1 className="mt-1 text-2xl font-bold">Client chat inbox</h1></div><Link href="/chat" className="text-sm text-slate-600">Open customer chat ↗</Link></div>
    {!configured ? <p className="rounded-xl bg-white p-6">Supabase environment variables are not available in this deployment. Check the Production variables in Vercel and redeploy.</p> : !session ? <div className="rounded-xl bg-white p-6">Sign in at <Link className="font-semibold text-blue-800" href="/chat">/chat</Link> with your admin account, then return here.</div> : !isAdmin ? <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-950">{notice || "This account is not an admin."}<button onClick={() => supabase.auth.signOut()} className="ml-3 underline">Sign out</button></div> : <div className="grid min-h-[75vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:grid-cols-[340px_1fr]"><aside className="border-b border-slate-200 md:border-b-0 md:border-r"><div className="border-b p-4"><p className="font-semibold">Conversations</p><p className="text-xs text-slate-500">Customer names and messages</p></div><div className="max-h-[70vh] overflow-y-auto">{threads.map((thread) => <button key={thread.id} onClick={() => setSelected(thread)} className={`block w-full border-b px-4 py-4 text-left hover:bg-slate-50 ${selected?.id === thread.id ? "bg-blue-50" : ""}`}><span className="block truncate font-semibold">{thread.profiles?.display_name || "Customer"}</span><span className="mt-1 block text-xs text-slate-500">{thread.subject} · {thread.status}</span></button>)}{!threads.length && <p className="p-5 text-sm text-slate-500">No conversations yet.</p>}</div></aside><section className="flex min-h-[65vh] flex-col">{selected ? <><header className="border-b px-5 py-4"><p className="font-semibold">{selected.profiles?.display_name || "Customer"}</p><p className="text-xs text-slate-500">{selected.subject}</p></header><div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-5">{messages.map((message) => <div key={message.id} className={`flex ${message.sender_id === session.user.id ? "justify-end" : "justify-start"}`}><p className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm ${message.sender_id === session.user.id ? "bg-blue-950 text-white" : "border bg-white"}`}>{message.body}</p></div>)}</div><form onSubmit={reply} className="flex gap-3 border-t p-4"><input value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={4000} placeholder="Write a reply…" className="min-w-0 flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-700"/><button className="rounded-xl bg-blue-950 px-5 font-semibold text-white">Send</button></form></> : <div className="m-auto p-8 text-center text-slate-500">Select a conversation to view messages.</div>}</section></div>}{notice && isAdmin && <p className="mt-3 text-sm text-amber-800">{notice}</p>}</div></main>;
}
