
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          My Portfolio
        </Link>

        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-300">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
