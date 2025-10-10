import * as z from "zod";
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

const idSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.int()),
});

const getSubstation = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => {
    return await db.transformerSubstation.findFirst({
      select: { name: true },
      where: {
        id: data.id,
      },
    });
  });

export const substationQueryOptions = (substationId: string) =>
  queryOptions({
    queryKey: ["substation", substationId],
    queryFn: () => getSubstation({ data: { id: substationId } }),
  });
