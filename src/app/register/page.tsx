import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-600 to-black flex items-center justify-center">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mx-auto w-full md:w-[680px] rounded-2xl bg-black/0 p-6 md:p-10">
          <h1 className="text-center text-3xl md:text-5xl font-semibold tracking-wide text-amber-200">
            Register to Unlock
            <br className="hidden md:block" />
            Knowledge with
            <br className="hidden md:block" />
            <span className="inline-block">&lt;Code/&gt; Coach</span>
          </h1>

          <form className="mx-auto mt-8 w-full md:w-[680px]">
            <div className="mx-[8%] mb-8 h-px w-[84%] bg-amber-300/40" />

            <div className="px-[8%] mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-200/90 mb-2 ml-0">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-full bg-neutral-200 text-neutral-900 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div>
                <label className="block text-amber-200/90 mb-2 ml-0">
                  Surname
                </label>
                <input
                  type="text"
                  className="w-full rounded-full bg-neutral-200 text-neutral-900 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
            </div>

            <label className="block text-amber-200/90 mb-2 ml-[8%]">
              Email
            </label>
            <input
              type="email"
              className="mx-[8%] mb-6 w-[84%] rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="block text-amber-200/90 mb-2 ml-[8%]">
              Password
            </label>
            <input
              type="password"
              className="mx-[8%] mb-6 w-[84%] rounded-full bg-neutral-200 text-neutral-900 placeholder-neutral-500 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="block text-amber-200/90 mb-2 ml-[8%]">
              Profession
            </label>
            <select className="mx-[8%] w-[84%] rounded-full bg-neutral-200 text-neutral-900 px-6 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300">
              <option value="">Select profession</option>
              <option value="student">Student</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="other">Other</option>
            </select>

            <div className="mx-[8%] my-8 h-px w-[84%] bg-amber-300/30" />

            <div className="flex flex-wrap items-center gap-6 px-[8%]">
              <button
                type="button"
                className="rounded-full bg-green-800 px-8 py-3 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Register
              </button>
              <p className="text-amber-200/90">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4 hover:text-amber-200"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
