import { Suspense } from "react";
import DatabaseProjectList from "@/components/DatabaseProjectList";

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Projects Overview</h1>
      <p className="mt-4 text-slate-600">
        Explore my open source and school projects.
      </p>

      <Suspense
        fallback={
          <p className="mt-8 text-slate-600" role="status">
            Loading projects…
          </p>
        }
      >
        <DatabaseProjectList />
      </Suspense>
    </section>
  );
}
