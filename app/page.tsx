import { Suspense } from "react";
import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

async function LatestProjects() {
  await connection();
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-16 text-center">
        <p className="mb-3 font-semibold uppercase tracking-widest text-blue-700">
          Welcome to my portfolio
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Hello, I&apos;m Emmanuel Bassey
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
          I am an aspiring full-stack web developer passionate about building
          functional, responsive, and user-friendly web applications. I enjoy
          learning new technologies and turning ideas into practical digital
          solutions.
        </p>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">My Projects</h2>
          <p className="mt-2 text-slate-600">
            Here are some of the projects I have worked on.
          </p>
        </div>

        <Suspense
          fallback={
            <p className="text-slate-600" role="status">
              Loading latest projects…
            </p>
          }
        >
          <LatestProjects />
        </Suspense>
      </section>
    </div>
  );
}
