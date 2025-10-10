import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { substationQueryOptions } from "~/server/services/transformer-substation";
import { NotFound } from "~/components/NotFound";

export const Route = createFileRoute("/substations/$substationId")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(
      substationQueryOptions(params.substationId),
    ),
  component: SubstationComponent,
});

function SubstationComponent() {
  const { substationId } = Route.useParams();
  const { data } = useSuspenseQuery(substationQueryOptions(substationId));

  if (!data) {
    return <NotFound>ТП не найдена</NotFound>;
  }

  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  );
}
