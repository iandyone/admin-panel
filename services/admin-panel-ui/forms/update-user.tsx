"use client";

import { Autocomplete, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { FormControls } from "@/components/form-controls";
import { InputField } from "@/components/ui/input-field";
import { USER_ROLES_OPTIONS_MAP } from "@/configs";
import { EPermissions } from "@/constants";
import { usePermissions } from "@/hooks";
import { useUpdateUserMutation } from "@/query/useUpdateUserMutation";
import { EUserStatuses, User } from "@/types";
import { UpdateUserDto } from "@/types/user";
import { updateUserSchema } from "@/validations";

interface Props {
  data: User;
  onSubmit: () => void;
  onCancel: () => void;
}

const { ACTIVE, INACTIVE } = EUserStatuses;
const { DEACTIVATE_USERS, EDIT_USER_ROLE } = EPermissions;

export const UpdateUserForm: FC<Props> = ({
  data: { firstName, lastName, role, phone, isActive, id },
  onCancel,
  onSubmit,
}) => {
  const { mutateAsync: updateUser, isPending } = useUpdateUserMutation();
  const { role: currentUserRole, checkPermission } = usePermissions();

  const availableRolesOptions = currentUserRole
    ? USER_ROLES_OPTIONS_MAP[currentUserRole]
    : [];

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
        validationSchema={updateUserSchema}
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
                options={availableRolesOptions}
                value={values.role}
                disabled={!checkPermission(EDIT_USER_ROLE)}
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
                disabled={!checkPermission(DEACTIVATE_USERS)}
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

              <FormControls onClickReset={onCancel} resetLabel="Cancel" disabled={isPending} />
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
