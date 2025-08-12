"use client";

import { Autocomplete, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { FormControls } from "@/components/form-controls";
import { InputField } from "@/components/ui/input-field";
import { useUpdateUserMutation } from "@/query/useUpdateUserMutation";
import { EUserRoles, EUserStatuses, User } from "@/types";
import { UpdateUserDto } from "@/types/user";
import { updateUserValidationSchema } from "@/validations";

interface Props {
  data: User;
  onSubmit: () => void;
  onCancel: () => void;
}

const { ACTIVE, INACTIVE } = EUserStatuses;

export const UpdateUserForm: FC<Props> = ({
  data: { firstName, lastName, role, phone, isActive, id },
  onCancel,
  onSubmit,
}) => {
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const initialValues: UpdateUserDto = {
    firstName,
    lastName,
    role,
    phone,
    isActive,
  };

  const handleOnSubmit = async (userData: UpdateUserDto) => {
    await updateUser({ id, userData });
    onSubmit();
  };

  return (
    <Stack direction="column" spacing={2}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={updateUserValidationSchema}
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
