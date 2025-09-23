import * as yup from "yup";

import {
  EValidationMessages,
  getMaxLengthErrorMessage,
  getMinLengthErrorMessage,
  getPleaseEnterAValidFieldErrorMessage,
} from "@/constants";

const { REQUIRED } = EValidationMessages;

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email(getPleaseEnterAValidFieldErrorMessage("email"))
    .required(REQUIRED),
  password: yup
    .string()
    .trim()
    .min(6, getMinLengthErrorMessage(6))
    .max(30, getMaxLengthErrorMessage(30))
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_\-+=\[{\]};:<>/?\\|~]{6,30}$/,
      "Password contains unsupported symbols",
    )
    .required(REQUIRED),
});
