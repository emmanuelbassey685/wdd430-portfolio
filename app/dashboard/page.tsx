
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProjects } from "@/lib/projects-db";
import ProjectActions from "@/components/ProjectActions";

async function DashboardContent() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Welcome, {session.user.name ?? "Administrator"}.
            Manage your portfolio projects here.
          </p>
        </div>

        <Link
          href="/projects/create"
          className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Add New Project
        </Link>
      </div>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            Your Projects
          </h2>
          <p className="text-sm text-slate-500">
            {projects.length} project(s)
          </p>
        </div>

        {projects.length > 0 ? (
          <ul className="space-y-5">
            {projects.map((project) => (
              <li
                key={project.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {project.description}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      Category: {project.type}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Technologies: {project.technologies.join(", ")}
                    </p>

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-blue-700 underline"
                      >
                        View Project
                      </a>
                    ) : null}
                  </div>

                  <ProjectActions projectId={project.id} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-slate-600">
              You have not added any projects yet.
            </p>
            <Link
              href="/projects/create"
              className="mt-4 inline-block font-semibold text-indigo-700 underline"
            >
              Create your first project
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-slate-600" role="status">
            Loading dashboard...
          </p>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
