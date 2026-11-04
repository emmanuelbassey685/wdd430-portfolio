import { connection } from "next/server";

export default async function Footer() {
  await connection();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-900 px-6 py-5 text-center text-white">
      <p>
        &copy; {currentYear} My Portfolio. All rights reserved.
      </p>
    </footer>
  );
}