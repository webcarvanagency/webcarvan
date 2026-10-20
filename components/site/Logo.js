import Image from "next/image";
import Link from "next/link";

export default function Logo({ general, dark = false }) {
  const siteName = general.siteName || "Web Caravan";
  const brandName = siteName.replace(/\s+/g, "");
  const mark = dark
    ? general.logoDark || general.logo || "/brand/webcarvan-mark.webp"
    : general.logo || "/brand/webcarvan-mark.webp";

  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${siteName} home`}>
      <Image
        src={mark}
        alt=""
        width={512}
        height={512}
        sizes="40px"
        className="size-10 shrink-0 rounded-md bg-white object-contain"
        preload={!dark}
      />
      <span className={`text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>
        {brandName.slice(0, 3)}
        <span className={dark ? "text-brand-300" : "text-brand-600"}>{brandName.slice(3).toLowerCase()}</span>
      </span>
    </Link>
  );
}
