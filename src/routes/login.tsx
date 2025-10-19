import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "~/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
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
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="login">Логин</FieldLabel>
                    <Input
                      id="login"
                      type="text"
                      placeholder="IvanovII"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Пароль</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <Button type="submit">Войти</Button>
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
