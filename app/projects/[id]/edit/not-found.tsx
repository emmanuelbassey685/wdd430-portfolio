import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">
        Project Not Found
      </h1>

      <p className="mt-4 text-slate-600">
        The project you are looking for does not exist or may have been
        removed.
      </p>

      <Link
        href="/projects"
        className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Return to Projects
      </Link>
    </main>
  );
}