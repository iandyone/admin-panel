"use client";

import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { InputField } from "@/components/ui/input-field";
import { EUserRoles, EUserStatuses, UserData } from "@/types";
import { UpdateUserDto } from '@/types/user';
import { editUserValidationSchema } from "@/validations";

interface Props {
  data: UserData;
  onSubmit: (state: UpdateUserDto) => void;
  onCancel: () => void;
}

export const EditUserForm: FC<Props> = ({
  data: { name, role, phone, status },
  onCancel,
  onSubmit,
}) => {
  const initialValues: UpdateUserDto = {
    name,
    role,
    phone,
    status,
  };

  return (
    <Stack direction="column" spacing={2}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={editUserValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <Stack direction="column" spacing={2}>
              <InputField
                name="name"
                label="Name"
                type="text"
                size="medium"
                error={Boolean(touched.name && errors.name)}
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
                value={values.status}
                onChange={(_, newValue) => {
                  setFieldValue("status", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="status"
                    label="Status"
                    error={Boolean(touched.status && errors.status)}
                  />
                )}
              />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ minWidth: 100 }}
                >
                  Apply
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="info"
                  onClick={onCancel}
                  sx={{ minWidth: 100 }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
