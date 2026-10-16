"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Briefcase,
  CircleAlert,
  CircleCheck,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  Layers,
  LoaderCircle,
  LogOut,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Settings,
  X,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/admin-api";

const AdminContext = createContext(null);

export function useAdmin() {
  return useContext(AdminContext);
}

const menu = [
  { href: "", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/settings", label: "Site Settings", Icon: Settings },
  { href: "/services", label: "Services", Icon: Layers },
  { href: "/projects", label: "Projects", Icon: Briefcase },
  { href: "/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { href: "/insights", label: "Insights", Icon: Newspaper },
  { href: "/messages", label: "Messages", Icon: Inbox },
];

function FullScreen({ children }) {
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">{children}</div>;
}

export default function AdminShell({ children, basePath }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const isLoginPage = pathname === `${basePath}/login`;

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  useEffect(() => {
    if (user === null && !isLoginPage) router.replace(`${basePath}/login`);
  }, [user, isLoginPage, router, basePath]);

  function notify(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  return (
    <AdminContext.Provider value={{ user, notify, basePath }}>
      {isLoginPage ? (
        children
      ) : user === undefined || user === null ? (
        <FullScreen>
          <LoaderCircle className="size-8 animate-spin text-brand-600" aria-label="Loading" />
        </FullScreen>
      ) : !isAdminEmail(user.email) ? (
        <FullScreen>
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <CircleAlert className="mx-auto size-10 text-red-500" />
            <h1 className="mt-4 text-xl font-bold text-slate-900">Access denied</h1>
            <p className="mt-2 text-sm text-slate-600">{user.email} is not an admin account.</p>
            <button onClick={() => signOut(auth)} className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Sign out
            </button>
          </div>
        </FullScreen>
      ) : (
        <div className="min-h-screen bg-slate-50 lg:pl-64">
          <aside
            className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-950 text-slate-300 transition-transform lg:translate-x-0 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <Link href={basePath} className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-extrabold text-white">W</span>
                <span className="font-bold text-white">Admin Panel</span>
              </Link>
              <button onClick={() => setMenuOpen(false)} className="lg:hidden" aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-5">
              <ul className="space-y-1">
                {menu.map(({ href, label, Icon }) => {
                  const active = href === "" ? pathname === basePath : pathname.startsWith(basePath + href);
                  return (
                    <li key={href}>
                      <Link
                        href={basePath + href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          active ? "bg-brand-600 text-white" : "hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="size-4.5" />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-white/10 p-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-white"
              >
                <ExternalLink className="size-4.5" />
                View Website
              </a>
              <button
                onClick={() => signOut(auth)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-white"
              >
                <LogOut className="size-4.5" />
                Sign Out
              </button>
            </div>
          </aside>

          {menuOpen && <div className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
            <button onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-700 lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </button>
            <p className="ml-auto flex items-center gap-3 text-sm text-slate-600">
              <span className="hidden sm:inline">{user.email}</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </p>
          </header>

          <main className="px-4 py-8 sm:px-8">{children}</main>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className={`fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-xl ${
            toast.type === "error" ? "bg-red-600" : "bg-slate-900"
          }`}
        >
          {toast.type === "error" ? <CircleAlert className="size-4.5" /> : <CircleCheck className="size-4.5 text-emerald-400" />}
          {toast.message}
        </div>
      )}
    </AdminContext.Provider>
  );
}
