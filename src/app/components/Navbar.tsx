"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 font-michroma text-sm sm:text-base text-[#FFF08B] hover:text-[#FFC35B] transition-colors cursor-pointer"
              >
                {/* Profile Icon */}
                <div className="w-8 h-8 rounded-full bg-[#174914] flex items-center justify-center text-[#FFF08B] font-orbitron text-sm font-bold">
                  {session.user?.name
                    ? session.user.name
                        .split(" ")
                        .map((n) => n.charAt(0))
                        .join("")
                        .toUpperCase()
                    : session.user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-amber-300/40 rounded-lg shadow-lg backdrop-blur-sm z-50">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm font-michroma text-[#FFF08B] hover:text-[#FFC35B] hover:bg-amber-300/10 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-michroma text-[#FFF08B] hover:text-[#FFC35B] hover:bg-amber-300/10 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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
