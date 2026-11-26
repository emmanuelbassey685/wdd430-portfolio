
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createProject } from "@/app/lib/actions";

const initialState = {
  errors: {},
  message: "",
};

export default function CreateProjectPage() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Create a New Project
      </h1>

      <p className="mt-2 text-slate-600">
        Add a project to your portfolio.
      </p>

      {state.message && (
        <p
          role="alert"
          className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <form action={formAction} className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            maxLength={255}
            aria-invalid={!!state.errors?.title}
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="e.g. Portfolio Website"
          />
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            rows={5}
            aria-invalid={!!state.errors?.description}
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="Describe your project..."
          />
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block font-medium">
            Project Category
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue="school"
            aria-invalid={!!state.errors?.type}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="school">School Project</option>
            <option value="opensource">Open Source Project</option>
          </select>
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="technologies" className="mb-2 block font-medium">
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            aria-invalid={!!state.errors?.technologies}
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="React, Next.js, TypeScript, Tailwind CSS"
          />
          <p className="mt-1 text-sm text-slate-500">
            Separate technologies with commas.
          </p>
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="link" className="mb-2 block font-medium">
            Project URL (Optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            aria-invalid={!!state.errors?.link}
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="https://github.com/username/project"
          />
          {state.errors?.link?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Project"}
          </button>

          <Link
            href="/projects"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
