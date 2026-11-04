import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Emmanuel Bassey | Web Developer Portfolio",
  description:
    "A portfolio showcasing my web development projects, skills, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />

        <main className="flex-1">{children}</main>

        <Suspense
          fallback={
            <footer className="mt-auto bg-slate-900 px-6 py-5 text-center text-white">
              <p>&copy; 2026 My Portfolio. All rights reserved.</p>
            </footer>
          }
        >
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}