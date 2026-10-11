"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ChatWorkspace() {
  const configured = isSupabaseConfigured();
  const supabase = useMemo(() => configured ? createClient() : null, [configured]);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "", service: "General enquiry" });
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session);
        setAuthLoading(false);
      }
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return undefined;
    if (!session?.user) {
      setMessages([]);
      setConversation(null);
      setChatLoading(false);
      return undefined;
    }

    let active = true;
    const loadChat = async (showLoading = false) => {
      if (showLoading) setChatLoading(true);
      const { data: thread, error: threadError } = await supabase
        .from("conversations").select("id, subject, status")
        .eq("customer_id", session.user.id).maybeSingle();
      if (!active) return;
      if (threadError || !thread) {
        setNotice(threadError?.message || "Your chat could not be found. Please contact our team.");
        setChatLoading(false);
        return;
      }
      setNotice("");
      setConversation(thread);
      const { data: rows, error } = await supabase.from("messages")
        .select("id, sender_id, body, created_at")
        .eq("conversation_id", thread.id).order("created_at", { ascending: true });
      if (active) {
        if (error) setNotice(error.message);
        else setMessages(rows || []);
        setChatLoading(false);
      }
    };
    loadChat(true);
    const channel = supabase.channel(`chat-${session.user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => loadChat())
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
          options: {
            data: { display_name: form.name.trim(), requested_service: form.service },
            emailRedirectTo: new URL("/chat", window.location.origin).toString(),
          },
        })
      : await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
    setBusy(false);
    if (result.error) {
      const message = result.error.message || "";
      if (/rate limit|too many emails|over_email_send_rate_limit/i.test(message)) {
        setNotice("Email sending is temporarily limited. Please wait before requesting another confirmation email. If you already confirmed your account, sign in instead.");
      } else if (/invalid login credentials/i.test(message)) {
        setNotice("Email or password is incorrect. If this is a new account, confirm your email before signing in.");
      } else {
        setNotice(message);
      }
    }
    else if (mode === "signup" && !result.data.session) {
      setConfirmationEmail(form.email.trim());
      setMode("signin");
    }
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
        <Link href="/" className="text-sm text-slate-600 hover:text-blue-800">Back to website</Link>
      </div>
      <section className="mx-auto grid min-h-[min(760px,82vh)] max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-[300px_1fr]">
        <aside className="hidden bg-slate-950 p-7 text-white md:block">
          <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">J</span>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-blue-300">JAYTRIX CLIENT SUPPORT</p>
          <h1 className="mt-4 text-2xl font-semibold">Let’s talk about your business.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">Tell us what you need or what challenge you are facing. Our team will reply in this chat.</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-blue-300">Your enquiry</p>
            <p className="mt-2 text-sm font-medium text-white">{conversation?.subject || "Start a new conversation"}</p>
            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <p><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-400/15 text-blue-200">1</span>Tell us what you need</p>
              <p><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-400/15 text-blue-200">2</span>We review your message</p>
              <p><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-400/15 text-blue-200">3</span>We discuss next steps</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-slate-300">Your account details and messages are visible only to the relevant team.</div>
        </aside>
        <div className="flex min-h-[min(760px,82vh)] flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">J</span>
              <div><p className="font-semibold">JAYTRIX SYSTEMS</p><p className="mt-0.5 text-xs text-slate-500">{session ? "Client support · Private conversation" : "Sign in to start chatting"}</p></div>
            </div>
            {session && <div className="flex items-center gap-2 sm:gap-3"><span className="hidden max-w-36 truncate text-sm text-slate-600 sm:block">{session.user.user_metadata?.display_name || session.user.email}</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-950 sm:hidden">{(session.user.user_metadata?.display_name || session.user.email || "U").charAt(0).toUpperCase()}</span>{admin && <Link href="/admin/chat" className="rounded-lg px-2 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-50 sm:px-3 sm:text-sm">Inbox</Link>}<button onClick={signOut} className="rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:text-sm">Sign out</button></div>}
          </header>

          {!configured ? (
            <div className="m-auto max-w-lg px-7 py-12 text-center"><h2 className="text-2xl font-semibold">Chat is not configured</h2><p className="mt-3 text-sm leading-6 text-slate-600">This deployment cannot find the Supabase connection settings. In Vercel, confirm that <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> are set for Production, then redeploy.</p></div>
          ) : authLoading ? (
            <div className="m-auto px-7 py-12 text-center text-sm text-slate-500" role="status">Checking your sign-in…</div>
          ) : !session && confirmationEmail ? (
            <div className="m-auto w-full max-w-md px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-900" aria-hidden="true">✉</div>
              <h2 className="mt-5 text-2xl font-semibold">Check your email</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">We sent a confirmation link to <strong className="break-all text-slate-800">{confirmationEmail}</strong>. Open the latest email to confirm your account. Check your spam folder if you cannot find it.</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">After confirming, return here. If the link does not sign you in automatically, use the button below to sign in.</p>
              <button onClick={() => { setConfirmationEmail(""); setNotice(""); }} className="mt-6 w-full rounded-xl bg-blue-950 px-4 py-3 font-semibold text-white transition hover:bg-blue-800">Back to sign in</button>
            </div>
          ) : !session ? (
            <div className="m-auto w-full max-w-md px-6 py-10">
              <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Account access">
                {[{ id: "signin", label: "Sign in" }, { id: "signup", label: "Create account" }].map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={mode === tab.id} onClick={() => { setMode(tab.id); setNotice(""); }} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${mode === tab.id ? "bg-white text-blue-950 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>{tab.label}</button>)}
              </div>
              <h2 className="text-2xl font-semibold">{mode === "signup" ? "Create an account" : "Welcome back"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Use your account to contact us and keep track of your conversation.</p>
              <form onSubmit={submitAuth} className="mt-7 space-y-4">
                {mode === "signup" && <label className="block text-sm font-medium">Display name<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label>}
                {mode === "signup" && <label className="block text-sm font-medium">Service you are interested in<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"><option>General enquiry</option><option>Business website</option><option>E-commerce</option><option>Business management system</option><option>School management system</option><option>Restaurant / POS system</option><option>Inventory and sales system</option><option>Mobile or desktop application</option><option>Cybersecurity / IT services</option><option>Other custom solution</option></select></label>}
                <label className="block text-sm font-medium">Email address<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label>
                <label className="block text-sm font-medium">Password<input required type="password" minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label>
                {notice && <p role="status" className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">{notice}</p>}
                <button disabled={busy} className="w-full rounded-xl bg-blue-950 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">{busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in and start chat"}</button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto bg-[#f5f7fa] px-4 py-6 sm:px-7">
                <div className="mx-auto max-w-md rounded-2xl border border-blue-100 bg-white px-4 py-3 text-center text-xs leading-5 text-slate-600 shadow-sm">Welcome to JAYTRIX SYSTEMS chat. Tell us what service you need or what challenge you would like to solve.</div>
                {chatLoading && <p role="status" className="text-center text-sm text-slate-500">Loading your conversation…</p>}
                {!chatLoading && conversation?.status === "closed" && <p role="status" className="mx-auto max-w-md rounded-xl bg-amber-50 p-3 text-center text-sm text-amber-900">This conversation is closed. Please contact our team to start a new enquiry.</p>}
                {!chatLoading && conversation?.status === "open" && messages.length === 0 && (
                  <div className="mx-auto max-w-lg pt-2">
                    <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-slate-500">Start with a common request</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["I need a business website", "I need a sales or inventory system", "I want to discuss IT or cybersecurity"].map((prompt) => (
                        <button key={prompt} type="button" onClick={() => setDraft(prompt)} className="rounded-full border border-blue-200 bg-white px-3.5 py-2 text-xs font-medium text-blue-950 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 sm:text-sm">{prompt}</button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((message) => {
                  const own = message.sender_id === session.user.id;
                  return <div key={message.id} className={`flex ${own ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[72%] ${own ? "rounded-br-md bg-blue-950 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}><p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p><time className={`mt-1 block text-right text-[10px] ${own ? "text-blue-200" : "text-slate-400"}`}>{new Date(message.created_at).toLocaleString("en-TZ", { dateStyle: "medium", timeStyle: "short" })}</time></div></div>;
                })}
                {notice && <p role="status" className="mx-auto max-w-lg rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{notice}</p>}
                <div ref={bottomRef} />
              </div>
              <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex items-end gap-3">
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} rows={1} maxLength={4000} placeholder="Type your message…" aria-label="Your message" className="max-h-32 min-h-12 flex-1 resize-y rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                <button type="submit" aria-label="Send message" disabled={busy || !draft.trim() || !conversation || conversation.status === "closed"} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-950 text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5"><path d="m21 3-7.2 18-3.9-7.8L2 9.3 21 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M21 3 9.9 13.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></button>
                </div>
                <p className="mt-2 pl-1 text-[11px] text-slate-400">Press Enter to send · Shift + Enter for a new line</p>
              </form>
            </>
          )}
        </div>
      </section>
      <p className="mx-auto mt-4 max-w-5xl px-2 text-xs leading-5 text-slate-500">Do not send passwords, card details, or other sensitive information through this chat.</p>
    </main>
  );
}
