"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type LoginState = {
  error?: string;
};

export async function authenticate(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return { error: "Enter your email and password." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }

  return {};
}