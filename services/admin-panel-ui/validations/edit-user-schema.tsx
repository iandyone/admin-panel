import * as yup from "yup";

import { EValidationMessages, getMinLengthErrorMessage } from "@/constants";

const { REQUIRED } = EValidationMessages;

export const editUserValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
  role: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
  phone: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
  status: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
});
