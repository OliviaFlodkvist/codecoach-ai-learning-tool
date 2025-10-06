"use client";

import Link from "next/link";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    profession: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(null);
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.name,
          last_name: form.surname,
          email: form.email,
          password: form.password,
          profession: form.profession,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to register");
      setOk("Account created. You can now log in.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[960px] rounded-2xl bg-black/0 p-6 md:p-10">
          <h1 className="font-michroma text-center text-5xl md:text-5xl tracking-[0.02em] text-[#FFC35B]">
            Register
          </h1>

          <form
            className="mx-auto mt-8 w-full max-w-[960px]"
            onSubmit={handleSubmit}
          >
            <div className="w-full max-w-[960px] mx-auto">
              <div className="mb-8 h-px w-full bg-amber-300/40" />

              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-200/90 mb-1 font-orbitron">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-full bg-neutral-200 text-neutral-900 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-amber-200/90 mb-1 font-orbitron">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-full bg-neutral-200 text-neutral-900 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                    value={form.surname}
                    onChange={(e) =>
                      setForm({ ...form, surname: e.target.value })
                    }
                  />
                </div>
              </div>

              <label className="block text-amber-200/90 mb-1 font-orbitron">
                Email
              </label>
              <input
                type="email"
                className="mb-4 w-full rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label className="block text-amber-200/90 mb-1 font-orbitron">
                Password
              </label>
              <input
                type="password"
                className="mb-4 w-full rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <label className="block text-amber-200/90 mb-1 font-orbitron">
                Profession
              </label>
              <select
                className="w-full rounded-full bg-neutral-200 text-neutral-900 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={form.profession}
                onChange={(e) =>
                  setForm({ ...form, profession: e.target.value })
                }
              >
                <option value="">Select profession</option>
                <option value="student">Student</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="other">Other</option>
              </select>

              <div className="my-6 h-px w-full bg-amber-300/30" />
              {error ? <p className="text-red-200 mb-4">{error}</p> : null}
              {ok ? <p className="text-green-200 mb-4">{ok}</p> : null}

              <div className="flex flex-wrap items-center gap-6">
                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </PrimaryButton>
                <p className="font-michroma text-sm text-amber-200/90">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-amber-200"
                  >
                    Log in here
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
