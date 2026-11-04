
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mb-4 text-slate-600">
        {description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {technology}
          </span>
        ))}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-700 hover:underline"
        >
          View Project →
        </a>
      )}
    </article>
  );
}
