"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ChatWorkspace() {
  const configured = isSupabaseConfigured();
  const supabase = useMemo(() => configured ? createClient() : null, [configured]);
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "", service: "General enquiry" });
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return undefined;
    if (!session?.user) {
      setMessages([]);
      setConversation(null);
      return undefined;
    }

    let active = true;
    const loadChat = async () => {
      const { data: thread, error: threadError } = await supabase
        .from("conversations").select("id, subject, status")
        .eq("customer_id", session.user.id).maybeSingle();
      if (!active) return;
      if (threadError || !thread) {
        setNotice(threadError?.message || "Chat thread haijapatikana. Wasiliana na timu yetu.");
        return;
      }
      setConversation(thread);
      const { data: rows, error } = await supabase.from("messages")
        .select("id, sender_id, body, created_at")
        .eq("conversation_id", thread.id).order("created_at", { ascending: true });
      if (active) {
        if (error) setNotice(error.message);
        else setMessages(rows || []);
      }
    };
    loadChat();
    const channel = supabase.channel(`chat-${session.user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, loadChat)
      .subscribe();
    return () => { active = false; supabase.removeChannel(channel); };
  }, [session, supabase]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  async function submitAuth(event) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    const result = mode === "signup"
      ? await supabase.auth.signUp({
          email: form.email.trim(), password: form.password,
          options: { data: { display_name: form.name.trim(), requested_service: form.service } },
        })
      : await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
    setBusy(false);
    if (result.error) setNotice(result.error.message);
    else if (mode === "signup" && !result.data.session) setNotice("Akaunti imeundwa. Fungua barua pepe kuthibitisha akaunti, kisha ingia.");
    else setNotice("");
  }

  async function sendMessage(event) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || !conversation || busy) return;
    setBusy(true);
    setNotice("");
    const { data, error } = await supabase.from("messages").insert({
      conversation_id: conversation.id, sender_id: session.user.id, body,
    }).select("id, sender_id, body, created_at").single();
    setBusy(false);
    if (error) setNotice(error.message);
    else {
      setMessages((current) => current.some((item) => item.id === data.id) ? current : [...current, data]);
      setDraft("");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMessages([]);
  }

  const admin = session?.user?.app_metadata?.role === "admin";

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-6 text-slate-900 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between pb-5">
        <Link href="/" className="font-bold tracking-[.16em] text-blue-950">JAYTRIX <span className="font-medium tracking-normal text-slate-500">SYSTEMS</span></Link>
        <Link href="/" className="text-sm text-slate-600 hover:text-blue-800">Rudi kwenye tovuti</Link>
      </div>
      <section className="mx-auto grid min-h-[min(760px,82vh)] max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-[300px_1fr]">
        <aside className="hidden bg-slate-950 p-7 text-white md:block">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-blue-300">Msaada wa JAYTRIX</p>
          <h1 className="mt-4 text-2xl font-semibold">Tuzungumze kuhusu biashara yako.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">Eleza changamoto au huduma unayotafuta. Timu yetu itakujibu kupitia mazungumzo haya.</p>
          <div className="mt-9 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">Taarifa za akaunti na ujumbe wako zinaonekana kwa timu husika pekee.</div>
        </aside>
        <div className="flex min-h-[min(760px,82vh)] flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
            <div><p className="font-semibold">JAYTRIX SYSTEMS</p><p className="mt-0.5 text-xs text-slate-500">{session ? "Mazungumzo ya huduma" : "Ingia ili kuanza chat"}</p></div>
            {session && <div className="flex items-center gap-3"><span className="max-w-36 truncate text-sm text-slate-600">{session.user.user_metadata?.display_name || session.user.email}</span>{admin && <Link href="/admin/chat" className="text-sm font-semibold text-blue-800">Inbox</Link>}<button onClick={signOut} className="text-sm text-slate-500 hover:text-slate-900">Toka</button></div>}
          </header>

          {!configured ? (
            <div className="m-auto max-w-lg px-7 py-12 text-center"><h2 className="text-2xl font-semibold">Chat inajiandaliwa</h2><p className="mt-3 text-sm leading-6 text-slate-600">Timu ya tovuti inahitaji kuweka Supabase URL na publishable key kwenye environment variables kabla akaunti na chat hazijaanza kufanya kazi.</p></div>
          ) : !session ? (
            <div className="m-auto w-full max-w-md px-6 py-10">
              <h2 className="text-2xl font-semibold">{mode === "signup" ? "Tengeneza akaunti" : "Karibu tena"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Tumia akaunti yako kuwasiliana nasi na kufuatilia mazungumzo yako.</p>
              <form onSubmit={submitAuth} className="mt-7 space-y-4">
                {mode === "signup" && <label className="block text-sm font-medium">Jina litakaloonekana<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label>}
                {mode === "signup" && <label className="block text-sm font-medium">Huduma unayoulizia<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"><option>General enquiry</option><option>Business website</option><option>E-commerce</option><option>Business management system</option><option>School management system</option><option>Restaurant / POS system</option><option>Inventory and sales system</option><option>Mobile or desktop application</option><option>Cybersecurity / IT services</option><option>Other custom solution</option></select></label>}
                <label className="block text-sm font-medium">Barua pepe<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label>
                <label className="block text-sm font-medium">Nenosiri<input required type="password" minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label>
                {notice && <p role="status" className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">{notice}</p>}
                <button disabled={busy} className="w-full rounded-xl bg-blue-950 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">{busy ? "Subiri…" : mode === "signup" ? "Tengeneza akaunti" : "Ingia na uanze chat"}</button>
              </form>
              <button onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setNotice(""); }} className="mt-5 text-sm font-medium text-blue-800">{mode === "signup" ? "Tayari una akaunti? Ingia" : "Huna akaunti? Jisajili"}</button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto bg-[#f5f7fa] px-4 py-6 sm:px-7">
                <div className="mx-auto max-w-md rounded-2xl border border-blue-100 bg-white px-4 py-3 text-center text-xs leading-5 text-slate-600 shadow-sm">Karibu kwenye chat ya JAYTRIX SYSTEMS. Tueleze huduma unayohitaji au changamoto unayotaka kutatua.</div>
                {messages.map((message) => {
                  const own = message.sender_id === session.user.id;
                  return <div key={message.id} className={`flex ${own ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[72%] ${own ? "rounded-br-md bg-blue-950 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}><p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p><time className={`mt-1 block text-right text-[10px] ${own ? "text-blue-200" : "text-slate-400"}`}>{new Date(message.created_at).toLocaleString("en-TZ", { dateStyle: "medium", timeStyle: "short" })}</time></div></div>;
                })}
                {notice && <p role="status" className="mx-auto max-w-lg rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{notice}</p>}
                <div ref={bottomRef} />
              </div>
              <form onSubmit={sendMessage} className="flex items-end gap-3 border-t border-slate-200 bg-white p-4 sm:p-5">
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} rows={1} maxLength={4000} placeholder="Andika ujumbe wako…" aria-label="Ujumbe wako" className="max-h-32 min-h-12 flex-1 resize-y rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                <button disabled={busy || !draft.trim() || conversation?.status === "closed"} className="rounded-xl bg-blue-950 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">Tuma</button>
              </form>
            </>
          )}
        </div>
      </section>
      <p className="mx-auto mt-4 max-w-5xl px-2 text-xs leading-5 text-slate-500">Usitume nywila, taarifa za kadi au taarifa nyeti kupitia chat hii.</p>
    </main>
  );
}
