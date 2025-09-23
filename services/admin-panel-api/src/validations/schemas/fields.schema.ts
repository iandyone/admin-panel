import { $Enums } from '@prisma/client';
import joi from 'joi';

import {
  CUSTOMER_MAX_LENGTH,
  CUSTOMER_MIN_LENGTH,
  LOCATION_MAX_LENGTH,
  LOCATION_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../constants';

const ROLES = Object.values($Enums.Role).map((role) => role.toLowerCase());
const STATUSES = Object.values($Enums.OrderStatus).map((role) =>
  role.toLowerCase(),
);

export const idSchema = joi.number().required();

export const passwordSchema = joi
  .string()
  .min(PASSWORD_MIN_LENGTH)
  .pattern(/^[a-zA-Z0-9!@#$%^&*()_\-+=\[{\]};:,.<>/?\\|~]{6,30}$/);

export const customerSchema = joi
  .string()
  .trim()
  .min(CUSTOMER_MIN_LENGTH)
  .max(CUSTOMER_MAX_LENGTH);
export const locationSchema = joi
  .string()
  .trim()
  .min(LOCATION_MIN_LENGTH)
  .max(LOCATION_MAX_LENGTH);
export const productsIdsSchema = joi.array().items(joi.number().min(1));
export const deliverymanIdSchema = joi.number().min(1).optional();
export const managerIdSchema = joi.number().min(1);
export const nameSchema = joi
  .string()
  .trim()
  .min(NAME_MIN_LENGTH)
  .max(NAME_MAX_LENGTH);
export const phoneSchema = joi.string().min(PHONE_MIN_LENGTH).trim();
export const emailSchema = joi.string().email({ minDomainSegments: 2 }).trim();

export const pageSchema = joi.number().min(0);
export const userRoleSchema = joi.string().valid(...ROLES);
export const orderStatusSchema = joi.string().valid(...STATUSES);
