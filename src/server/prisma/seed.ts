import bcrypt from "bcryptjs";
import { db } from "./db-client";

const substations = Array(20)
  .fill(null)
  .map((_, i) => {
    const num = i + 1;

    if (num % 2 === 0) return { name: `ТП-${num}П` };

    return { name: `ТП-${num}` };
  });

substations.push({ name: "ТП-166П+200П" });

async function main() {
  await db.transformerSubstation.createMany({ data: substations });
  await db.user.create({
    data: {
      login: "test",
      password: await bcrypt.hash("test", 12),
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
