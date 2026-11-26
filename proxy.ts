import { auth } from "./auth";

export const proxy = auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/create",
    "/projects/:id/edit",
  ],
};