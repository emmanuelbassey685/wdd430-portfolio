import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/projects-db";

export function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  return NextResponse.json(getProjects(type));
}