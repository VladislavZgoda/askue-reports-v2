import { getCookie } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

const getCookieByNameFn = createServerFn()
  .inputValidator((data: { name: string }) => data)
  .handler(({ data }) => {
    return getCookie(data.name) ?? null;
  });

export const cookieByNameQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ["cookie", name],
    queryFn: () => getCookieByNameFn({ data: { name } }),
  });
