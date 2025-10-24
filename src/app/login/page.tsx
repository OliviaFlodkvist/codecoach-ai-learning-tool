"use client";

import Link from "next/link";
import PrimaryButton from "../components/PrimaryButton";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to codecoach page
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/codecoach");
    }
  }, [status, router]);

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
    else window.location.href = "/codecoach";
  }

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-amber-200 text-2xl font-semibold mb-4">
            Loading...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-200 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Don't render the login form if user is authenticated (they'll be redirected)
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[960px] rounded-2xl bg-black/0 p-6 md:p-10">
          <h1 className="font-michroma text-center text-5xl md:text-5xl tracking-[0.02em] text-[#FFC35B]">
            Log in
          </h1>

          <form
            className="mx-auto mt-8 w-full max-w-[960px]"
            onSubmit={handleSubmit}
          >
            <div className="w-full max-w-[960px] mx-auto">
              <div className="mb-8 h-px w-full bg-amber-300/40" />

              <label className="block text-amber-200/90 mb-1 font-orbitron">
                Email
              </label>
              <input
                type="email"
                className="mb-4 w-full rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="block text-amber-200/90 mb-1 font-orbitron">
                Password
              </label>
              <input
                type="password"
                className="mb-4 w-full rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="my-6 h-px w-full bg-amber-300/30" />
              {error ? <p className="text-red-200 mb-4">{error}</p> : null}

              <div className="flex flex-wrap items-center gap-6">
                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </PrimaryButton>
                <p className="font-michroma text-sm text-amber-200/90">
                  Need an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4 hover:text-amber-200"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
