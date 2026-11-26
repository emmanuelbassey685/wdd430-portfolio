import { logout } from "@/app/lib/auth-actions";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Sign Out
      </button>
    </form>
  );
}
