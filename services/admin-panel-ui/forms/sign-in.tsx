"use client";

import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { InputField } from "@/components/ui/input-field";
import { signInValidationSchema } from '@/validations/signinSchema';

interface Props {
  handleOnSubmit: () => void;
}

const initialState = {
  email: "",
  password: "",
};

export const SignInForm: FC<Props> = ({ handleOnSubmit }) => {
  return (
    <Formik
      initialValues={initialState}
      initialErrors={initialState}
      validationSchema={signInValidationSchema}
      onSubmit={() => {
        handleOnSubmit();
      }}
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
