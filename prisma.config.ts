import "dotenv/config";
import type { PrismaConfig } from "prisma";

export default {
  schema: "./src/server/prisma/schema.prisma",
  migrations: {
    path: "./src/server/prisma/migrations",
    seed: "node --import=tsx ./src/server/prisma/seed.ts",
  },
} satisfies PrismaConfig;
