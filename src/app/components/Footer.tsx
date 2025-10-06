import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full">
      <div className="pointer-events-none relative w-full -mt-14 sm:-mt-20 z-40">
        <div className="absolute inset-0 h-50 sm:h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)30%,rgba(0,0,0,0.3)_52%,rgba(0,0,0,1)_100%)]" />
        <div className="h-20 sm:h-20" />
      </div>

      <footer className="relative z-50 w-full bg-black">
        <div className="mx-auto px-6 sm:px-10 py-3 sm:py-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-orbitron text-lg sm:text-xl font-extrabold tracking-[0.02em] text-[#DA7C1A]">
              &lt;CODE/&gt;
            </span>
            <span className="font-orbitron text-lg sm:text-xl font-extrabold tracking-[0.02em] text-[#DA7C1A]">
              COACH
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
