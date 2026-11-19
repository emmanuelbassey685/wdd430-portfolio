import { Suspense } from "react";
import DatabaseProjectList from "@/components/DatabaseProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import Link from "next/link";

interface ProjectsPageProps {
  searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>;
}

async function ProjectsContent({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.query) ? params.query[0] : params.query;
  const query = typeof rawQuery === "string" ? rawQuery.slice(0, 100) : "";
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number(rawPage);
  const currentPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Projects Overview</h1>
      <p className="mt-4 text-slate-600">
        Explore my open source and school projects.
      </p>
      <ProjectSearch />

      <Link
        href="/projects/create"
        className="inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
      >
        + Add New Project
      </Link>

      <Suspense
        fallback={
          <p className="mt-8 text-slate-600" role="status">
            Loading projects…
          </p>
        }
      >
        <DatabaseProjectList query={query} currentPage={currentPage} />
      </Suspense>
    </section>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-5xl px-6 py-12" aria-busy="true">
          <h1 className="text-3xl font-bold">Projects Overview</h1>
          <p className="mt-8 text-slate-600" role="status">
            Loading projects…
          </p>
        </section>
      }
    >
      <ProjectsContent searchParams={searchParams} />
    </Suspense>
  );
}
