import { ArrowLeft } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24 text-center">
      <div>
        <p className="text-6xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900">Page not found</h1>
        <p className="mt-3 text-slate-600">Sorry, the page you are looking for does not exist or has been moved.</p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Home
        </ButtonLink>
      </div>
    </section>
  );
}
