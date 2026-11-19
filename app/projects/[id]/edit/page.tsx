
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/app/lib/actions";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

async function EditProjectForm({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId < 1) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Edit Project
      </h1>

      <p className="mt-2 text-slate-600">
        Update the information for {project.title}.
      </p>

      <form
        action={updateProject.bind(null, id)}
        className="mt-8 space-y-6"
      >
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            maxLength={255}
            defaultValue={project.title}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            rows={5}
            defaultValue={project.description}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block font-medium">
            Project Category
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue={project.type}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="school">School Project</option>
            <option value="opensource">Open Source Project</option>
          </select>
        </div>

        <div>
          <label htmlFor="technologies" className="mb-2 block font-medium">
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            defaultValue={project.technologies.join(", ")}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
          <p className="mt-1 text-sm text-slate-500">
            Separate technologies with commas.
          </p>
        </div>

        <div>
          <label htmlFor="link" className="mb-2 block font-medium">
            Project URL (Optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link ?? ""}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Update Project
          </button>

          <Link
            href="/projects"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

export default function EditProjectPage({
  params,
}: EditProjectPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-2xl px-6 py-12">
          <h1 className="text-3xl font-bold text-slate-900">
            Loading project...
          </h1>
          <p className="mt-2 text-slate-600">
            Please wait while the project information loads.
          </p>
        </main>
      }
    >
      <EditProjectForm params={params} />
    </Suspense>
  );
}
