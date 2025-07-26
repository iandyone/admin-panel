import { $Enums } from '@prisma/client';
import joi from 'joi';

const ORDER_STATUSES = Object.values($Enums.OrderStatus);

export const createOrderSchema = joi.object({
  customer: joi.string().min(4).max(50),
  location: joi.string().min(10).max(80),
  status: joi
    .string()
    .valid(...ORDER_STATUSES)
    .optional(),
  productsIds: joi.array().items(joi.string()),
  deliverymanId: joi.number().min(1).optional(),
  managerId: joi.number().min(1),
});

export const updateOrderSchema = joi.object({
  customer: joi.string().min(4).max(50).optional(),
  location: joi.string().min(10).max(80).optional(),
  status: joi
    .string()
    .valid(...ORDER_STATUSES)
    .optional(),
  productsIds: joi.array().items(joi.string()).optional(),
  deliverymanId: joi.number().min(1).optional(),
  managerId: joi.number().min(1).optional(),
});
