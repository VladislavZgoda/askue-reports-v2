import * as z from "zod";
import bcrypt from "bcryptjs";
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { db } from "../prisma/db-client";
import { useAppSession } from "../utils/session";

const loginSchema = z.object({
  login: z.string().min(1, { error: "Пустое поле" }),
  password: z.string().min(1, { error: "Пустое поле" }),
});

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const userLogin = await authenticateUser(data.login, data.password);

    if (!userLogin) {
      return { error: "Недействительные учетные данные" };
    }

    const session = await useAppSession();
    await session.update({
      login: userLogin,
    });

    throw redirect({ to: "/" });
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useAppSession();
  await session.clear();

  throw redirect({ to: "/" });
});

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    const userLogin = session.data.login;

    return userLogin ?? null;
  },
);

async function authenticateUser(login: string, password: string) {
  const user = await db.user.findUnique({
    select: { login: true, password: true },
    where: {
      login,
    },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user.login : null;
}
