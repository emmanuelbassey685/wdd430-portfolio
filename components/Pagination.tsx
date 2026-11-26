"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Project pages" className="mt-8 flex items-center justify-center gap-6">
      {currentPage > 1 ? (
        <Link className="font-medium text-indigo-700 underline" href={createPageURL(currentPage - 1)}>
          Previous
        </Link>
      ) : <span className="text-slate-400">Previous</span>}
      <span aria-current="page" className="text-sm text-slate-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link className="font-medium text-indigo-700 underline" href={createPageURL(currentPage + 1)}>
          Next
        </Link>
      ) : <span className="text-slate-400">Next</span>}
    </nav>
  );
}
