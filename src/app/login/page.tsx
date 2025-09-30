import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-600 to-black">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mx-auto w-full md:w-[680px] rounded-2xl bg-black/0 p-6 md:p-10">
          <h1 className="text-center text-4xl md:text-5xl font-semibold tracking-wide text-amber-200">Log in</h1>

          <div className="mx-auto mt-8 h-px w-[75%] bg-amber-300/40" />

          <form className="mx-auto mt-8 w-full md:w-[680px]">
            <label className="block text-amber-200/90 mb-2 ml-[8%]">Email</label>
            <input
              type="email"
              className="mx-[8%] mb-6 w-[84%] rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder=""
            />

            <label className="block text-amber-200/90 mb-2 ml-[8%]">Password</label>
            <input
              type="password"
              className="mx-[8%] w-[84%] rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder=""
            />

            <div className="mx-auto my-8 h-px w-[75%] bg-amber-300/30" />

            <div className="flex items-center gap-6 px-[8%]">
              <button
                type="button"
                className="rounded-full bg-green-800 px-8 py-3 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign in
              </button>
              <Link
                href="#"
                className="text-amber-200/90 hover:text-amber-200 underline/0"
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