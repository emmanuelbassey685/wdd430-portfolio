
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/projects-db";

const ProjectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must contain at least 2 characters")
    .max(255, "Title cannot exceed 255 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters"),
  type: z.enum(["opensource", "school"]),
  technologies: z
    .string()
    .trim()
    .min(1, "Enter at least one technology")
    .refine(
      (value) => value.split(",").some((item) => item.trim().length > 0),
      "Enter at least one valid technology",
    ),
  link: z.union([z.url(), z.literal("")]).optional(),
});

export type CreateProjectState = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    link?: string[];
  };
  message?: string;
};

export async function createProject(
  _prevState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    link: formData.get("link") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const { title, description, type, technologies, link } =
    validatedFields.data;

  const technologyList = technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  try {
    const sql = getSql();

    await sql`
      INSERT INTO projects (title, description, type, technologies, link)
      VALUES (
        ${title},
        ${description},
        ${type},
        ${technologyList},
        ${link || null}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      message: "Failed to create project. Please try again later.",
    };
  }

  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");

  redirect("/projects");
}


export async function updateProject(
  id: string,
  formData: FormData,
): Promise<void> {
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId < 1) {
    throw new Error("Invalid project ID.");
  }

  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    link: formData.get("link") ?? "",
  });

  if (!validatedFields.success) {
    throw new Error("Invalid project information. Please check your entries.");
  }

  const { title, description, type, technologies, link } =
    validatedFields.data;

  const technologyList = technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  let updatedCount = 0;

try {
  const sql = getSql();

  const updated = await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      type = ${type},
      technologies = ${technologyList},
      link = ${link || null}
    WHERE id = ${projectId}
    RETURNING id
  `;

  updatedCount = updated.length;
} catch (error) {
  console.error("Error updating project:", error);
  throw new Error(
    "Failed to update project. Please try again later.",
  );
}

  if (updatedCount === 0) {
    throw new Error("Project not found.");
  }

  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");

  redirect("/projects");
}


export async function deleteProject(
  id: string,
  formData: FormData,
): Promise<void> {
  void formData;

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId < 1) {
    throw new Error("Invalid project ID.");
  }

  let deletedCount = 0;

  try {
    const sql = getSql();

    const deleted = await sql`
      DELETE FROM projects
      WHERE id = ${projectId}
      RETURNING id
    `;

    deletedCount = deleted.length;
  } catch (error) {
    console.error("Error deleting project:", error);

    throw new Error(
      "Failed to delete project. Please try again later.",
    );
  }

  if (deletedCount === 0) {
    throw new Error("Project not found.");
  }

  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");

  redirect("/projects");
}