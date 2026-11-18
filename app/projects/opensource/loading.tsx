export default function OpenSourceProjectsLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading open-source projects"
      className="mx-auto max-w-5xl animate-pulse px-6 py-12"
    >
      <div className="h-9 w-72 rounded bg-slate-200" />
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-lg bg-white p-5 shadow">
            <div className="h-6 w-1/2 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-full rounded bg-slate-200" />
            <div className="mt-2 h-4 w-4/5 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
