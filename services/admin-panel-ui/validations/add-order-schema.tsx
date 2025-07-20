import * as yup from "yup";

import { EValidationMessages, getMinLengthErrorMessage } from "@/constants";

const { REQUIRED } = EValidationMessages;

export const addOrderValidationSchema = yup.object({
  order: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
  customer: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
  location: yup
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
