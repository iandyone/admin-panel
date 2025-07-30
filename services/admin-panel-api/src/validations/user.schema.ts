import { $Enums } from '@prisma/client';
import joi from 'joi';

import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
} from './schemas';

const ROLES = Object.values($Enums.Role);

export const createUserSchema = joi.object({
  firstName: nameSchema.required(),
  lastName: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  phone: phoneSchema.required(),
});

export const updateUserSchema = joi.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  isActive: joi.bool().optional(),
  role: joi
    .string()
    .valid(...ROLES)
    .optional(),
});
