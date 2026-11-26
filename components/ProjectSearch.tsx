"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const query = searchParams.get("query") ?? "";

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function handleSearch(term: string) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      if (term.trim()) params.set("query", term.trim());
      else params.delete("query");
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);
  }

  return (
    <label className="mt-6 block max-w-xl text-sm font-medium text-slate-700">
      Search projects
      <input
        type="search"
        placeholder="Search by title, description, or technology"
        defaultValue={query}
        onChange={(event) => handleSearch(event.target.value)}
        className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </label>
  );
}
