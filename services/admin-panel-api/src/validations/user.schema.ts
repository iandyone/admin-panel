import joi from 'joi';

import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  pageSchema,
  idSchema,
  userRoleSchema,
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
  isActive: joi.bool().optional(),
  role: userRoleSchema.optional(),
});

export const findAllUsersSchema = joi.object({
  page: pageSchema,
  perPage: pageSchema,
  id: idSchema.optional(),
  firstName: nameSchema.min(1).optional(),
  lastName: nameSchema.min(1).optional(),
  phone: phoneSchema.min(1).optional(),
  role: userRoleSchema.optional(),
  isActive: joi.bool().optional(),
  orders: joi.number().min(0).optional(),
});
