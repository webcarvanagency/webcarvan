export default function StatsBar({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <section aria-label="Company highlights" className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-xl shadow-slate-200/60 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 bg-white px-6 py-7 text-center">
            <dt className="text-sm text-slate-500">{stat.label}</dt>
            <dd className="order-first text-3xl font-extrabold tracking-tight text-navy-900">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
