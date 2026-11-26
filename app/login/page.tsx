
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";

async function LoginContent() {
  await connection();

  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Administrator Login
        </h1>

        <LoginForm />
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
          <p className="text-slate-600" role="status">
            Loading login page...
          </p>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
