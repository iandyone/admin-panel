import { $Enums } from '@prisma/client';
import joi from 'joi';

const ROLES = Object.values($Enums.Role).map((role) => role.toLowerCase());
const STATUSES = Object.values($Enums.OrderStatus).map((role) =>
  role.toLowerCase(),
);

export const idSchema = joi
  .string()
  .pattern(new RegExp('^[0-9]{1,4}$'))
  .message('Id with value {{#value}} doesn`t match the required pattern')
  .required();

export const passwordSchema = joi
  .string()
  .min(6)
  .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));

export const customerSchema = joi.string().min(2).max(50);
export const locationSchema = joi.string().min(10).max(80);
export const productsIdsSchema = joi.array().items(joi.number());
export const deliverymanIdSchema = joi.number().min(1).optional();
export const managerIdSchema = joi.number().min(1);
export const nameSchema = joi.string().min(4).max(15);
export const phoneSchema = joi.string().min(12);
export const emailSchema = joi.string().email({ minDomainSegments: 2 });

export const pageSchema = joi.number().min(0);
export const userRoleSchema = joi.string().valid(...ROLES);
export const orderStatusSchema = joi.string().valid(...STATUSES);
