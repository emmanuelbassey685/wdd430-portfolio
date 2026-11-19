"use client";

import Link from "next/link";
import { deleteProject } from "@/app/lib/actions";

export default function ProjectActions({
  projectId,
}: {
  projectId: number;
}) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <Link
        href={`/projects/${projectId}/edit`}
        className="font-medium text-indigo-700 underline hover:text-indigo-900"
      >
        Edit
      </Link>

      <form
        action={deleteProject.bind(null, String(projectId))}
        onSubmit={(event) => {
          if (!window.confirm("Are you sure you want to delete this project?")) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          className="font-medium text-red-700 underline hover:text-red-900"
        >
          Delete
        </button>
      </form>
    </div>
  );
}