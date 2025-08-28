"use client";

import { Button, Stack } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FC } from "react";

import { InputField } from "@/components/ui/input-field";
import { ERoutes } from "@/constants";
import { signInValidationSchema } from "@/validations/signin-schema";

const initialState = {
  email: "",
  password: "",
};

export const SignInForm: FC = () => {
  const router = useRouter();

  const handleOnSubmit = async (
    { email, password }: typeof initialState,
    { setFieldError }: FormikHelpers<typeof initialState>,
  ) => {
    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: `/${ERoutes.ORDERS}`,
    });

    if (data.code === "credentials") {
      // TODO: toast notification
      return setFieldError("password", "Wrong user email or password");
    }

    router.push(data.url!);
  };

  return (
    <Formik
      initialValues={initialState}
      initialErrors={initialState}
      validationSchema={signInValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack direction="column" spacing={2}>
            <InputField
              name="email"
              type="text"
              label="email"
              error={Boolean(touched.email && errors.email)}
            />
            <InputField
              name="password"
              type="password"
              label="password"
              error={Boolean(touched.password && errors.password)}
            />

            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
