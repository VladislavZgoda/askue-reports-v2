import { useSession } from "@tanstack/react-start/server";

interface SessionData {
  login?: string;
}

export function useAppSession() {
  return useSession<SessionData>({
    name: "app-session",
    password: process.env.SESSION_SECRET!,
    cookie: {
      sameSite: "lax",
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60, // 3 days
    },
  });
}
