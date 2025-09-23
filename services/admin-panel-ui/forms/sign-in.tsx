"use client";

import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FC } from "react";

import { InputField } from "@/components/ui/input-field";
import { ENotificationTypes, ERoutes } from "@/constants";
import { useToast } from '@/hooks';
import { signInValidationSchema } from "@/validations/signin-schema";

const initialState = {
  email: "",
  password: "",
};

export const SignInForm: FC = () => {
  const router = useRouter();
  const { sendNotification } = useToast();

  const handleOnSubmit = async ({ email, password }: typeof initialState) => {
    try {
      const data = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: `/${ERoutes.ORDERS}`,
      });

      if (data.code === "credentials") {
        return sendNotification(ENotificationTypes.SIGN_IN_WRONG_CREDENTIALS);
      }

      router.push(data.url!);
    } catch (error) {
      sendNotification(ENotificationTypes.SIGN_IN_ERROR);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      initialErrors={initialState}
      validationSchema={signInValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
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

            <Button type="submit" variant="outlined" disabled={isSubmitting}>
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
