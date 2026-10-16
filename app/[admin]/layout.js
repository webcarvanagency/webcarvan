import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { isFirebaseConfigured } from "@/lib/firebase";

export const metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

// The admin panel lives at the secret path set in ADMIN_PATH.
// Any other address (including /admin) shows the normal 404 page.
export default async function AdminLayout({ children, params }) {
  const { admin } = await params;
  const adminPath = process.env.ADMIN_PATH;
  if (!adminPath || admin !== adminPath || !isFirebaseConfigured) notFound();

  return <AdminShell basePath={`/${adminPath}`}>{children}</AdminShell>;
}
