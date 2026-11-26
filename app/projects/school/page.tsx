import { Suspense } from "react";
import SchoolProjectList from "@/components/SchoolProjectList";

function SchoolProjectListSkeleton() {
  return (
    <ul
      aria-label="Loading school projects"
      aria-busy="true"
      className="mt-8 animate-pulse space-y-4"
    >
      {[1, 2].map((item) => (
        <li key={item} className="rounded-lg bg-white p-5 shadow">
          <div className="h-6 w-1/2 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full rounded bg-slate-200" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
        </li>
      ))}
    </ul>
  );
}

export default function SchoolProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">School Projects</h1>

      <Suspense fallback={<SchoolProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </section>
  );
}
