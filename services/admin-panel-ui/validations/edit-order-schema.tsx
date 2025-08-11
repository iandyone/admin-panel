import * as yup from "yup";

import { EValidationMessages, getMinLengthErrorMessage } from "@/constants";

const { REQUIRED } = EValidationMessages;

export const editOrderValidationSchema = yup.object({
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
    .min(10, getMinLengthErrorMessage(10))
    .required(REQUIRED),
  status: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
});
