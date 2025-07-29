import joi from 'joi';

import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
} from './schemas';

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
});
