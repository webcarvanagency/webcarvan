import Image from "next/image";
import Link from "next/link";

export default function Logo({ general, dark = false }) {
  const image = dark ? general.logoDark || general.logo : general.logo;
  const [first, ...rest] = (general.siteName || "Web Caravan").split(" ");

  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${general.siteName} home`}>
      {image ? (
        <Image src={image} alt={general.siteName} width={180} height={48} className="h-10 w-auto object-contain" priority />
      ) : (
        <>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-brand-800 text-lg font-extrabold text-white shadow-lg shadow-brand-600/30">
            {first.charAt(0).toUpperCase()}
          </span>
          <span className="flex flex-col leading-none">
            <span className={`text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>
              {first.toLowerCase()}
              <span className={dark ? "text-brand-300" : "text-brand-600"}>{rest.join("").toLowerCase()}</span>
            </span>
            {general.tagline && (
              <span className={`mt-1 hidden text-[0.55rem] font-semibold min-[400px]:block tracking-[0.14em] uppercase ${dark ? "text-slate-400" : "text-slate-500"}`}>
                {general.tagline}
              </span>
            )}
          </span>
        </>
      )}
    </Link>
  );
}
