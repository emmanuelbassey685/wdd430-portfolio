
import { connection } from "next/server";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
  getProjects,
  type ProjectType,
} from "@/lib/projects-db";
import Pagination from "@/components/Pagination";
import ProjectActions from "@/components/ProjectActions";

interface DatabaseProjectListProps {
  type?: ProjectType;
  query?: string;
  currentPage?: number;
}

export default async function DatabaseProjectList({
  type,
  query = "",
  currentPage = 1,
}: DatabaseProjectListProps) {
  await connection();

  const projects = type
    ? await getProjects(type)
    : await fetchFilteredProjects(query, currentPage);

  const totalPages = type ? 0 : await fetchProjectsPages(query);

  return (
    <ul className="mt-8 space-y-4">
      {projects.map((project) => (
        <li key={project.id} className="rounded-lg bg-white p-5 shadow">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <p className="mt-2 text-slate-600">
            {project.description}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Type: {project.type} · Technologies:{" "}
            {project.technologies.join(", ")}
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
          <ProjectActions projectId={project.id} />
        </li>
      ))}
      {projects.length === 0 ? (
        <li className="rounded-lg border border-dashed border-slate-300 p-5 text-slate-600">
          No school projects found. Add your first project to get started.
        </li>
      ) : null}
      {!type ? (
        <li className="list-none">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </li>
      ) : null}
    </ul>
  );
}
