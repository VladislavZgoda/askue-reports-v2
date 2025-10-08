import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { db } from "../prisma/db-client";

const getSubstations = createServerFn({ method: "GET" }).handler(async () => {
  return await db.transformerSubstation.findMany({
    select: { id: true, name: true },
  });
});

export const substationsQueryOptions = () =>
  queryOptions({
    queryKey: ["substations"],
    queryFn: () => getSubstations(),
  });
