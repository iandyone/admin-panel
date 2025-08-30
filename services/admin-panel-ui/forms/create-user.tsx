"use client";

import { Autocomplete, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { FormControls } from "@/components/form-controls";
import { InputField } from "@/components/ui/input-field";
import { useCreateUserMutation } from "@/query/useCreateUserMutation";
import { CreateUserPayload, EUserRoles, EUserStatuses } from "@/types";
import { createUserSchema } from "@/validations";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
}

const { ACTIVE, INACTIVE } = EUserStatuses;

const initialValues: CreateUserPayload = {
  firstName: "",
  lastName: "",
  email: "",
  role: "" as EUserRoles,
  phone: "",
  isActive: false,
};

export const CreateUserForm: FC<Props> = ({ onCancel, onSubmit }) => {
  const { mutateAsync: createUser } = useCreateUserMutation();

  const handleOnSubmit = async (userData: CreateUserPayload) => {
    await createUser(userData);
    onSubmit();
  };

  return (
    <Stack direction="column" spacing={2}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={createUserSchema}
        onSubmit={handleOnSubmit}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <Stack direction="column" spacing={2}>
              <InputField
                name="firstName"
                label="First name"
                type="text"
                size="medium"
                error={Boolean(touched.firstName && errors.firstName)}
              />

              <InputField
                name="lastName"
                label="Last name"
                type="text"
                size="medium"
                error={Boolean(touched.lastName && errors.lastName)}
              />

              <InputField
                name="email"
                label="Email"
                type="email"
                size="medium"
                error={Boolean(touched.phone && errors.phone)}
              />

              <InputField
                name="phone"
                label="Phone"
                type="text"
                size="medium"
                error={Boolean(touched.phone && errors.phone)}
              />

              <Autocomplete
                options={Object.values(EUserRoles)}
                value={values.role}
                onChange={(_, newValue) => {
                  setFieldValue("role", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="role"
                    label="Role"
                    error={Boolean(touched.role && errors.role)}
                  />
                )}
              />
              <Autocomplete
                options={Object.values(EUserStatuses)}
                value={values.isActive ? ACTIVE : INACTIVE}
                onChange={(_, newValue) => {
                  setFieldValue("isActive", newValue === ACTIVE);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="isActive"
                    label="Status"
                    error={Boolean(touched.isActive && errors.isActive)}
                  />
                )}
              />

              <FormControls onClickReset={onCancel} resetLabel="Cancel" />
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
