import "dotenv/config";
import type { PrismaConfig } from "prisma";

export default {
  schema: "./src/prisma/schema.prisma",
  migrations: {
    path: "./src/prisma/migrations",
    seed: "node --import=tsx ./src/prisma/seed.ts",
  },
} satisfies PrismaConfig;
