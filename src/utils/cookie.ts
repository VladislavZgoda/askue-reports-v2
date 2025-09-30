import { getCookie } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const getCookieByName = createServerFn()
  .inputValidator((data: { name: string }) => data)
  .handler(({ data }) => {
    return getCookie(data.name);
  });
