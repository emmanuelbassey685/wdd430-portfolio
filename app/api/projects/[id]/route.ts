
import { NextResponse } from "next/server";
import { getProjectById } from "@/lib/projects-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json(
        { error: "Invalid id" },
        { status: 400 },
      );
    }

    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to fetch project:", error);

    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 },
    );
  }
}
