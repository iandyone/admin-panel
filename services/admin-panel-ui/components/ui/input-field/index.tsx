import { Stack, TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { FC } from "react";

import { ErrorLabel } from "@/components/ui/error-label";

interface Props {
  name: string;
  label?: string;
  type: string;
  error: boolean;
}

export const InputField: FC<Props> = ({ name, label, type, error }) => {
  return (
    <Stack direction="column">
      <Field
        name={name}
        label={label ?? name}
        type={type}
        as={TextField}
        error={error}
      />
      <ErrorMessage name={name} component={ErrorLabel} />
    </Stack>
  );
};
