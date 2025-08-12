import * as yup from "yup";

import {
  EValidationMessages,
  getMaxLengthErrorMessage,
  getMinLengthErrorMessage,
} from "@/constants";

const { REQUIRED } = EValidationMessages;

export const createOrderSchema = yup.object({
  order: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
  customer: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .max(50, getMaxLengthErrorMessage(50))
    .required(REQUIRED),
  location: yup
    .string()
    .trim()
    .min(10, getMinLengthErrorMessage(10))
    .max(80, getMaxLengthErrorMessage(80))
    .required(REQUIRED),
  manager: yup
    .object({
      name: yup.string().min(4, getMinLengthErrorMessage(4)).required(REQUIRED),
    })
    .required(REQUIRED),
  deliveryman: yup
    .object({
      name: yup.string().min(4, getMinLengthErrorMessage(4)),
    })
    .optional(),
  status: yup
    .string()
    .trim()
    .min(4, getMinLengthErrorMessage(4))
    .required(REQUIRED),
});
