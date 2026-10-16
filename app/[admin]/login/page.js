"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAdmin } from "@/components/admin/AdminShell";
import { inputClass, labelClass } from "@/components/admin/fields/styles";

export default function LoginPage() {
  const router = useRouter();
  const { user, basePath } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) router.replace(basePath);
  }, [user, router, basePath]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setMessage({ text: "Invalid email or password.", type: "error" });
    }
    setLoading(false);
  }

  async function handleReset() {
    if (!email) {
      setMessage({ text: "Enter your email first, then click reset.", type: "error" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ text: "Password reset email sent. Check your inbox.", type: "success" });
    } catch {
      setMessage({ text: "Could not send the reset email.", type: "error" });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-navy-950 via-navy-900 to-brand-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white">
          <LockKeyhole className="size-6" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to manage your website.</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoComplete="current-password"
            />
          </div>
          {message.text && (
            <p className={`text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`} role="alert">
              {message.text}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading && <LoaderCircle className="size-4 animate-spin" />}
            Sign In
          </button>
          <button type="button" onClick={handleReset} className="w-full text-center text-sm font-medium text-brand-600 hover:text-brand-800">
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
}
