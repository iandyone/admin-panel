import * as yup from "yup";

import {
  EValidationMessages,
  getMaxLengthErrorMessage,
  getMinLengthErrorMessage,
} from "@/constants";
import { EUserRoles } from "@/types";

const { REQUIRED } = EValidationMessages;

const PHONE_REGEXP = /^\+375(25|29|33|44)\d{7}$/;

export const createUserSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .max(15, getMaxLengthErrorMessage(15))
    .required(REQUIRED),
  lastName: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .max(15, getMaxLengthErrorMessage(15))
    .required(REQUIRED),
  role: yup.string().trim().oneOf(Object.values(EUserRoles)).required(REQUIRED),
  email: yup.string().email(),
  phone: yup
    .string()
    .trim()
    .min(12, getMinLengthErrorMessage(12))
    .matches(PHONE_REGEXP, {
      message: "Invalid format (example: +375291111111)",
    })
    .required(REQUIRED),
});
