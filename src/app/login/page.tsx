"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) setError("Invalid email or password");
    else window.location.href = "/";
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-600 to-black">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mx-auto w-full md:w-[680px] rounded-2xl bg-black/0 p-6 md:p-10">
          <h1 className="text-center text-4xl md:text-5xl font-semibold tracking-wide text-amber-200">
            Log in
          </h1>

          <form
            className="mx-auto mt-8 w-full md:w-[680px]"
            onSubmit={handleSubmit}
          >
            <div className="mx-[8%] mb-8 h-px w-[84%] bg-amber-300/40" />
            <label className="block text-amber-200/90 mb-2 ml-[8%]">
              Email
            </label>
            <input
              type="email"
              className="mx-[8%] mb-6 w-[84%] rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-amber-200/90 mb-2 ml-[8%]">
              Password
            </label>
            <input
              type="password"
              className="mx-[8%] w-[84%] rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mx-[8%] my-8 h-px w-[84%] bg-amber-300/30" />
            {error ? (
              <p className="px-[8%] text-red-200 mb-4">{error}</p>
            ) : null}

            <div className="flex items-center gap-6 px-[8%]">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-green-800 px-8 py-3 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <Link
                href="/register"
                className="text-amber-200/90 hover:text-amber-200 underline underline-offset-4"
              >
                Press here to register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
