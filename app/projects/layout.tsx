import Link from "next/link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav
        aria-label="Projects navigation"
        className="mx-auto flex max-w-5xl flex-wrap gap-6 border-b border-slate-200 px-6 py-4 text-sm font-medium"
      >
        <Link href="/projects" className="hover:text-indigo-600">
          Overview
        </Link>
        <Link href="/projects/opensource" className="hover:text-indigo-600">
          Open Source
        </Link>
        <Link href="/projects/school" className="hover:text-indigo-600">
          School
        </Link>
      </nav>

      {children}
    </section>
  );
}