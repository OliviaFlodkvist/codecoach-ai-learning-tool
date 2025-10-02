import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(150deg, #EEA553 0%, #E37503 20%, #D85C02 45%, #901801 70%, #000000 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center space-y-10 px-6">
        <h2 className="font-orbitron text-4xl md:text-5xl font-semibold text-[#FFC35B] tracking-wider">
          Welcome to
        </h2>

        <div className="space-y-6">
          <div className="mx-auto w-72 md:w-[520px] border-t border-[#FFF08B]"></div>
          <div className="font-orbitron text-6xl md:text-9xl font-extrabold tracking-[0.005em] text-[#FFC35B] text-stroke-yellow">
            <span>&lt;CODE/&gt;</span>
          </div>
          <div className="font-orbitron text-6xl md:text-9xl font-extrabold tracking-[0.005em] text-[#FFC35B] text-stroke-yellow">
            COACH
          </div>
          <div className="mx-auto w-72 md:w-[520px] border-t border-[#FFF08B]"></div>
        </div>

        <p className="font-michroma max-w-2xl mx-auto text-[#FFF08B] text-base md:text-lg leading-relaxed">
          A learning platform that transforms everyday coding
          <br />
          with AI assistants into a personalized learning journey
        </p>

        <div>
          <Link
            href="/login"
            className="inline-block rounded-full bg-[#174914] px-10 py-3 text-[#FFC44D] hover:opacity-90 transition font-michroma tracking-wide"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
}
