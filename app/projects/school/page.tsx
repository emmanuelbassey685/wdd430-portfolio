import { Suspense } from "react";
import DatabaseProjectList from "@/components/DatabaseProjectList";

export default function SchoolProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">School Projects</h1>

      <Suspense
        fallback={
          <p className="mt-8 text-slate-600" role="status">
            Loading projects…
          </p>
        }
      >
        <DatabaseProjectList type="school" />
      </Suspense>
    </section>
  );
}
