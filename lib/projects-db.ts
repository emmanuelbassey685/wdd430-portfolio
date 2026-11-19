import { neon } from "@neondatabase/serverless";

export type ProjectType = "opensource" | "school";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: ProjectType;
  technologies: string[];
  link?: string;
}

interface ProjectRow extends Omit<Project, "link"> {
  link: string | null;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item: unknown) => typeof item === "string")
  );
}

function parseProjectRow(row: Record<string, unknown>): ProjectRow {
  const { id, title, description, type, technologies, link } = row;

  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    (type !== "opensource" && type !== "school") ||
    !isStringArray(technologies) ||
    (link !== null && typeof link !== "string")
  ) {
    throw new Error("The projects table returned a row with an invalid shape.");
  }

  return {
    id,
    title,
    description,
    type,
    technologies,
    link,
  };
}

function parseProjectRows(rows: Record<string, unknown>[]): ProjectRow[] {
  return rows.map(parseProjectRow);
}

export function getSql() {
  const connectionString =
    process.env.PORTFOLIO_DATABASE_URL ||
    process.env.PORTFOLIO_POSTGRES_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Database connection is not configured. Set PORTFOLIO_DATABASE_URL, POSTGRES_URL, or DATABASE_URL.",
    );
  }

  return neon(connectionString);
}

function toProject(row: ProjectRow): Project {
  const { link, ...project } = row;
  return link ? { ...project, link } : project;
}

export async function getProjects(
  type?: string | null,
): Promise<Project[]> {
  const sql = getSql();
  const rows = type
    ? await sql`
        SELECT id, title, description, type, technologies, link
        FROM projects
        WHERE type = ${type}
        ORDER BY id
      `
    : await sql`
        SELECT id, title, description, type, technologies, link
        FROM projects
        ORDER BY id
      `;

  return parseProjectRows(rows).map(toProject);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, title, description, type, technologies, link
    FROM projects
    WHERE id = ${id}
    LIMIT 1
  `;

  const project = parseProjectRows(rows)[0];
  return project ? toProject(project) : null;
}

export const PROJECTS_PER_PAGE = 6;

function normalizeSearchQuery(query: string): string {
  return query.trim().slice(0, 100).replace(/[\\%_]/g, "\\$&");
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
): Promise<Project[]> {
  const sql = getSql();
  const safeQuery = normalizeSearchQuery(query);
  const page = Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
  const offset = (page - 1) * PROJECTS_PER_PAGE;
  const rows = safeQuery
    ? await sql`
        SELECT id, title, description, type, technologies, link
        FROM projects
        WHERE title ILIKE ${`%${safeQuery}%`}
          OR description ILIKE ${`%${safeQuery}%`}
          OR array_to_string(technologies, ' ') ILIKE ${`%${safeQuery}%`}
        ORDER BY id
        LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
      `
    : await sql`
        SELECT id, title, description, type, technologies, link
        FROM projects
        ORDER BY id
        LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
      `;

  return parseProjectRows(rows).map(toProject);
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const sql = getSql();
  const safeQuery = normalizeSearchQuery(query);
  const rows = safeQuery
    ? await sql`
        SELECT COUNT(*)::int AS count
        FROM projects
        WHERE title ILIKE ${`%${safeQuery}%`}
          OR description ILIKE ${`%${safeQuery}%`}
          OR array_to_string(technologies, ' ') ILIKE ${`%${safeQuery}%`}
      `
    : await sql`SELECT COUNT(*)::int AS count FROM projects`;
  const count = rows[0]?.count;

  if (
    typeof count !== "number" ||
    !Number.isInteger(count) ||
    count < 0
  ) {
    throw new Error("The projects count query returned an invalid result.");
  }

  return Math.ceil(count / PROJECTS_PER_PAGE);
}
