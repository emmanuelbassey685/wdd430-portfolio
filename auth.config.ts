import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
  },
  providers: [],
} satisfies NextAuthConfig;