import handler from "@tanstack/react-start/server-entry";

process.loadEnvFile(".env.local");

const requiredServerEnv = ["DATABASE_URL"] as const;

for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export default {
  fetch(request: Request) {
    return handler.fetch(request);
  },
};
