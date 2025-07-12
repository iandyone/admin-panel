import * as yup from "yup";

import {
  EValidationMessages,
  getMaxLengthErrorMessage,
  getMinLengthErrorMessage,
} from "@/constants";
import { signInValidationSchema } from "@/validations/signinSchema";

const { REQUIRED } = EValidationMessages;

const signInPasswordSchema = signInValidationSchema.pick(["password"]);
const signInEmailSchema = signInValidationSchema.pick(["email"]);

export const signUpValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .max(15, getMaxLengthErrorMessage(15))
    .required(REQUIRED),
  lastName: yup
    .string()
    .trim()
    .max(20, getMinLengthErrorMessage(20))
    .required(REQUIRED),
  email: signInEmailSchema,
  password: signInPasswordSchema,
  repeatPassword: signInPasswordSchema,
});
