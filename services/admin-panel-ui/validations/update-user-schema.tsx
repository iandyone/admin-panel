import * as yup from "yup";

import {
  EValidationMessages,
  getMaxLengthErrorMessage,
  getMinLengthErrorMessage,
} from "@/constants";

const { REQUIRED } = EValidationMessages;

const PHONE_REGEXP = /^\+375(25|29|33|44)\d{7}$/;

export const updateUserValidationSchema = yup.object({
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
  role: yup.string().trim().required(REQUIRED),
  phone: yup
    .string()
    .trim()
    .min(12, getMinLengthErrorMessage(12))
    .matches(PHONE_REGEXP, {message: 'Invalid format (exampe: +375291111111)'})
    .required(REQUIRED),
  isActive: yup.string().trim().required(REQUIRED),
});
