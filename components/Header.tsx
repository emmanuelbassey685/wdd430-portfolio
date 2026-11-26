import Link from "next/link";
import { auth } from "@/auth";
import NavLinks from "./NavLinks";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          My Portfolio
        </Link>

        <NavLinks />

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="font-medium text-amber-300 hover:text-amber-200"
              >
                Dashboard
              </Link>

              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="font-medium text-amber-300 hover:text-amber-200"
            >
              Admin Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}