
"use client";

import { useActionState } from "react";
import { authenticate, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {state.error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-medium text-slate-700"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="Enter your administrator email"
          className="w-full rounded-lg border border-slate-300 p-3"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          className="w-full rounded-lg border border-slate-300 p-3"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
