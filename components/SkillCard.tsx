
interface SkillCardProps {
  title: string;
  description: string;
}

export default function SkillCard({
  title,
  description,
}: SkillCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-3 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="leading-7 text-slate-600">
        {description}
      </p>
    </article>
  );
}
