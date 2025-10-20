import { createFileRoute } from "@tanstack/react-router";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import {
  formOpts,
  handleForm,
  getFormDataFromServer,
} from "./-handle-form-auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "~/components/ui/field";

export const Route = createFileRoute("/login/")({
  component: Login,
  loader: async () => ({
    state: await getFormDataFromServer(),
  }),
});

function Login() {
  const { state } = Route.useLoaderData();
  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 self-center text-2xl font-black">
            Отчеты АСКУЭ
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Войдите в свою учетную запись</CardTitle>
              <CardDescription>
                Введите свой логин ниже, чтобы войти в свою учетную запись.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action={handleForm.url}
                method="POST"
                encType={"multipart/form-data"}
              >
                {formErrors.map((error) => (
                  <p key={error as string}>{error}</p>
                ))}
                <FieldGroup>
                  <form.Field
                    name="login"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Логин</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                            placeholder="IvanovII"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  ></form.Field>
                  <form.Field
                    name="password"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="password"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  ></form.Field>
                  <Field>
                    <form.Subscribe
                      selector={(formState) => [
                        formState.canSubmit,
                        formState.isSubmitting,
                      ]}
                    >
                      {([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit}>
                          {isSubmitting ? "..." : "Войти"}
                        </Button>
                      )}
                    </form.Subscribe>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
