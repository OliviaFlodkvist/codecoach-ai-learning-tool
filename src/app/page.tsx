import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-500">CodeCoach 🚀</h1>
        <Link
          href="/login"
          className="inline-block rounded-full bg-green-800 px-6 py-3 text-white hover:bg-green-700 transition"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
