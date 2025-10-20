import * as z from "zod";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { formOptions } from "@tanstack/react-form";
import {
  getFormData,
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/start";

export const formOpts = formOptions({
  defaultValues: {
    login: "",
    password: "",
  },
});

const loginSchema = z.object({
  login: z.string().min(1, { error: "Пустое поле." }),
  password: z.string().min(1, { error: "Пустое поле." }),
});

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: loginSchema,
});

export const handleForm = createServerFn({
  method: "POST",
})
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid form data");
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const validatedData = await serverValidate(data);
      console.log("validatedData", validatedData);
    } catch (e) {
      if (e instanceof ServerValidateError) {
        console.error(e);
        setResponseStatus(e.response.status);
        return {
          error: "Validation failed",
          status: e.response.status,
          message: await e.response.text(),
        };
      }

      console.error(e);
      setResponseStatus(500);
      return "There was an internal error";
    }

    return "Form has validated successfully";
  });

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  },
);
