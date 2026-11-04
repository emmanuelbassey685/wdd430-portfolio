
import ProjectList from "../components/ProjectList";
import type { Project } from "../components/ProjectList";

const projects: Project[] = [
  {
    title: "Kizuna Rail",
    description:
      "A railway booking application that allows users to explore train services and manage travel bookings.",
    technologies: ["JavaScript", "Node.js", "Express", "EJS", "MongoDB"],
    link: "https://github.com/24on7store/cse341-team7-project",
  },
  {
    title: "Ocean Wave Development",
    description:
      "A corporate website presenting marine, offshore, engineering, procurement, and project management services.",
    technologies: ["HTML", "CSS", "JavaScript", "Vite"],
    link: "https://github.com/emmanuelbassey685/Ocean-Wave-Development-Company-Nigeria-Limited",
  },
];

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
          functional, responsive, and user-friendly web applications.
          I enjoy learning new technologies and turning ideas into practical
          digital solutions.
        </p>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            My Projects
          </h2>
          <p className="mt-2 text-slate-600">
            Here are some of the projects I have worked on.
          </p>
        </div>

        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
