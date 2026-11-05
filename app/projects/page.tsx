import type { Project } from "@/lib/projects-db";

export default async function ProjectsPage() {
  const response = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const projects: Project[] = await response.json();

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Projects Overview</h1>
      <p className="mt-4 text-slate-600">
        Explore my open source and school projects.
      </p>

      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="rounded-lg bg-white p-5 shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-slate-600">{project.description}</p>
            <p className="mt-2 text-sm text-slate-500">
              Type: {project.type} · Technologies: {project.technologies.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}