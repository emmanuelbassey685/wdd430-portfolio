import { getProjects } from "@/lib/projects-db";

export default function OpenSourceProjectsPage() {
  const projects = getProjects("opensource");

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
          </li>
        ))}
      </ul>
    </section>
  );
}