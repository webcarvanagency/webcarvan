import { ChartColumn, ShoppingBag, TrendingUp } from "lucide-react";

// Device illustration shown when no hero image is uploaded in the admin panel.
export default function HeroMockup({ siteName }) {
  return (
    <div className="relative mx-auto w-full max-w-xl" aria-hidden="true">
      <div className="rounded-t-2xl border-[10px] border-b-0 border-navy-900 bg-navy-900 shadow-2xl shadow-brand-900/30">
        <div className="overflow-hidden rounded-lg bg-linear-to-br from-navy-800 via-brand-900 to-brand-700">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="size-2 rounded-full bg-white/30" />
            <span className="size-2 rounded-full bg-white/30" />
            <span className="size-2 rounded-full bg-white/30" />
            <span className="ml-auto h-2 w-24 rounded-full bg-white/15" />
          </div>
          <div className="grid grid-cols-5 gap-4 p-5 sm:p-7">
            <div className="col-span-3 space-y-3">
              <p className="text-lg leading-tight font-bold text-white sm:text-2xl">
                Build, Launch
                <br />
                and Grow
              </p>
              <span className="block h-1.5 w-4/5 rounded-full bg-white/25" />
              <span className="block h-1.5 w-3/5 rounded-full bg-white/15" />
              <span className="mt-4 inline-block rounded-full bg-brand-600 px-3 py-1 text-[0.6rem] font-semibold text-white">
                {siteName}
              </span>
            </div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className="rounded-lg bg-white/10 p-3">
                <ChartColumn className="size-5 text-brand-200" />
                <span className="mt-2 block h-1.5 w-full rounded-full bg-white/20" />
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <ShoppingBag className="size-5 text-brand-200" />
                <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 px-5 pb-6 sm:px-7">
            <span className="h-14 rounded-lg bg-white/10" />
            <span className="h-14 rounded-lg bg-white/10" />
            <span className="h-14 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
      <div className="relative -mx-3 h-4 rounded-b-2xl bg-linear-to-b from-slate-300 to-slate-400 sm:-mx-10">
        <span className="absolute top-0 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-slate-400" />
      </div>

      <div className="absolute -right-2 -bottom-8 w-28 rounded-[1.4rem] border-[6px] border-navy-900 bg-navy-900 shadow-2xl sm:-right-6 sm:w-36">
        <div className="overflow-hidden rounded-2xl bg-linear-to-b from-brand-600 to-navy-800 p-3">
          <span className="mx-auto mb-3 block h-1 w-8 rounded-full bg-white/30" />
          <p className="text-[0.65rem] leading-tight font-bold text-white sm:text-xs">Great Websites for Growing Business</p>
          <span className="mt-2 block h-1 w-4/5 rounded-full bg-white/25" />
          <span className="mt-1 block h-1 w-3/5 rounded-full bg-white/15" />
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-white/15 p-2">
            <TrendingUp className="size-3.5 text-white" />
            <span className="h-1 flex-1 rounded-full bg-white/30" />
          </div>
          <span className="mt-3 block h-14 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
}
