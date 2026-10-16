import Link from "next/link";

const variants = {
  primary: "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700",
  outline: "border border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50",
  white: "bg-white text-brand-700 hover:bg-brand-50",
  ghost: "border border-white/30 text-white hover:bg-white/10",
};

export default function ButtonLink({ href, children, variant = "primary", className = "", ...props }) {
  const isExternal = href?.startsWith("http");
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href || "/"} className={classes} {...props}>
      {children}
    </Link>
  );
}
