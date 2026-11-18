import { connection } from "next/server";
import { getProjects } from "@/lib/projects-db";

export default async function OpenSourceProjectsPage() {
  await connection();
  const projects = await getProjects("opensource");

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Open Source Projects</h1>

      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="rounded-lg bg-white p-5 shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-slate-600">{project.description}</p>
            <p className="mt-2 text-sm text-slate-500">
              Technologies: {project.technologies.join(", ")}
            </p>
            {project.link ? (
              <a
                className="mt-3 inline-block font-medium text-blue-700 underline"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                View project
              </a>
            ) : null}
          </li>
        ))}
        {projects.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-300 p-5 text-slate-600">
            No open-source projects found.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
