import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";

async function askLine(prompt) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    return await rl.question(prompt);
  } finally {
    rl.close();
  }
}

function askHidden(prompt) {
  return new Promise((resolve, reject) => {
    const input = process.stdin;

    if (!input.isTTY || typeof input.setRawMode !== "function") {
      reject(new Error("Run this script in an interactive terminal."));
      return;
    }

    let value = "";
    const onData = (chunk) => {
      for (const character of chunk.toString("utf8")) {
        if (character === "\u0003") {
          cleanup();
          process.stdout.write("\n");
          reject(new Error("Cancelled."));
          return;
        }

        if (character === "\r" || character === "\n") {
          cleanup();
          process.stdout.write("\n");
          resolve(value);
          return;
        }

        if (character === "\u007f" || character === "\b") {
          value = value.slice(0, -1);
        } else if (character >= " ") {
          value += character;
        }
      }
    };

    function cleanup() {
      input.off("data", onData);
      input.setRawMode(false);
      input.pause();
    }

    process.stdout.write(prompt);
    input.setRawMode(true);
    input.resume();
    input.on("data", onData);
  });
}

async function main() {
  const connectionString =
    process.env.PORTFOLIO_DATABASE_URL ||
    process.env.PORTFOLIO_POSTGRES_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Database connection is missing. Check your .env.local configuration.",
    );
  }

  const name = (await askLine("Administrator name: ")).trim();
  const email = (await askLine("Administrator email: ")).trim().toLowerCase();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid name and email address.");
  }

  const password = await askHidden("Password (input hidden): ");
  const confirmation = await askHidden("Confirm password (input hidden): ");

  if (password.length < 12) {
    throw new Error("Use a password with at least 12 characters.");
  }

  if (password !== confirmation) {
    throw new Error("The passwords do not match.");
  }

  const sql = neon(connectionString);
  const existing = await sql`
    SELECT id
    FROM portfolio_users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  if (existing.length > 0) {
    throw new Error("An account with that email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO portfolio_users (name, email, password_hash, role)
    VALUES (${name}, ${email}, ${passwordHash}, 'admin')
  `;

  console.log("Administrator account created successfully.");
  console.log("The password was hashed before being stored.");
}

main().catch((error) => {
  console.error("Administrator setup failed:", error.message);
  process.exitCode = 1;
});
