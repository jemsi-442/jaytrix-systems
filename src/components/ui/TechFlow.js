const offerings = [
  { number: "01", title: "Business software", detail: "POS, payroll, inventory and management systems" },
  { number: "02", title: "Web & mobile", detail: "Websites, portals and mobile applications" },
  { number: "03", title: "IT & infrastructure", detail: "Linux servers, deployment and technical support" },
  { number: "04", title: "Cybersecurity", detail: "Security reviews, testing and practical guidance" },
];

export default function TechFlow() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#071b3b] p-6 text-white shadow-2xl shadow-accent/20 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">What we do</div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Technology, made useful.</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="block text-xs font-bold tracking-[0.16em] text-white">JTX</span>
            <span className="mt-1 block h-1 w-7 rounded-full bg-cyan-300" />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {offerings.map((offering) => (
            <div key={offering.number} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition hover:border-cyan-200/40 hover:bg-white/[0.09]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-200">{offering.number}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{offering.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-blue-100/70">{offering.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="text-sm text-blue-100/75">One team for your digital operations</span>
          <span className="rounded-full bg-cyan-200/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">JAYTRIX</span>
        </div>
      </div>
    </div>
  );
}
