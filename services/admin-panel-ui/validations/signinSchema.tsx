import * as yup from "yup";

import {
  EValidationMessages,
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
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
});
