
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { authConfig } from "./auth.config";
import { getSql } from "./lib/projects-db";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const parsedCredentials =
          loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const sql = getSql();

        const rows = await sql`
          SELECT id, name, email, password_hash, role
          FROM portfolio_users
          WHERE LOWER(email) = LOWER(${email})
          LIMIT 1
        `;

        const user = rows[0] as
          | {
              id: number;
              name: string;
              email: string;
              password_hash: string;
              role: string;
            }
          | undefined;

        if (!user || user.role !== "admin") {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          password,
          user.password_hash,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
