"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-orbitron text-xl sm:text-2xl font-extrabold tracking-[0.02em] text-[#FFC35B] text-stroke-yellow">
            &lt;CODE/&gt;
          </span>
          <span className="font-orbitron text-xl sm:text-2xl font-extrabold tracking-[0.02em] text-[#FFC35B] text-stroke-yellow">
            COACH
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {status === "authenticated" && (
            <Link
              href="/profile"
              className="font-michroma text-sm sm:text-base text-[#FFF08B] hover:text-[#FFC35B] transition-colors"
            >
              Profile
            </Link>
          )}
          {status === "authenticated" && (
            <Link
              href="/codecoach"
              className="font-michroma text-sm sm:text-base text-[#FFF08B] hover:text-[#FFC35B] transition-colors"
            >
              CodeCoach
            </Link>
          )}
          <Link
            href="/about"
            className="font-michroma text-sm sm:text-base text-[#FFF08B] hover:text-[#FFC35B] transition-colors"
          >
            About
          </Link>

          {status === "loading" ? (
            <div className="font-michroma text-sm sm:text-base text-[#FFF08B]">
              Loading...
            </div>
          ) : session ? (
            <button
              onClick={handleLogout}
              className="font-michroma text-sm sm:text-base text-[#FFF08B] hover:text-[#FFC35B] transition-colors cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="font-michroma text-sm sm:text-base text-[#FFF08B] hover:text-[#FFC35B] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
