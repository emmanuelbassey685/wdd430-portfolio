
import SkillCard from "../../components/SkillCard";

const skills = [
  {
    title: "Frontend Development",
    description:
      "Building responsive and accessible user interfaces with HTML, CSS, JavaScript, React, and Next.js.",
  },
  {
    title: "Backend Development",
    description:
      "Developing server-side applications, REST APIs, and database-driven solutions using Node.js, Express, and MongoDB.",
  },
  {
    title: "Problem Solving",
    description:
      "Applying analytical thinking and engineering principles to understand problems and develop practical solutions.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-12">
        <h1 className="mb-6 text-4xl font-bold text-slate-900">
          About Me
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          My name is Emmanuel Bassey. I have a background in Mechanical
          Engineering and I am currently developing my skills in web design
          and full-stack development through BYU-Pathway Worldwide and
          BYU-Idaho coursework. My goal is to become a professional web
          developer who creates useful, reliable, and user-friendly
          applications.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold text-slate-900">
          My Skills and Interests
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.title}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
