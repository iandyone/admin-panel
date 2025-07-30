import * as yup from "yup";

import {
  EValidationMessages,
  getMaxLengthErrorMessage,
  getMinLengthErrorMessage,
} from "@/constants";

const { REQUIRED } = EValidationMessages;

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
    .required(REQUIRED),
  status: yup.string().trim().required(REQUIRED),
});
