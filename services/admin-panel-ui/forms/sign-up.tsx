"use client";

import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { InputField } from "@/components/ui/input-field";
import { signUpValidationSchema } from "@/validations";

interface Props {
  handleOnSubmit: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  repeatPassword: "",
  email: "",
};

export const SignUpForm: FC<Props> = ({ handleOnSubmit }) => {
  return (
    <Formik
      initialValues={initialState}
      initialErrors={initialState}
      validationSchema={signUpValidationSchema}
      onSubmit={() => {
        handleOnSubmit();
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack direction="column" spacing={2}>
            <InputField
              name="firstName"
              label="firstName"
              type="text"
              error={Boolean(touched.firstName && errors.firstName)}
            />
            <InputField
              name="lastName"
              type="text"
              label="lastName"
              error={Boolean(touched.lastName && errors.lastName)}
            />
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
            <InputField
              name="repeatPassword"
              type="password"
              label="repeat password"
              error={Boolean(touched.repeatPassword && errors.repeatPassword)}
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
