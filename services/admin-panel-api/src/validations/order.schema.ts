import { $Enums } from '@prisma/client';
import joi from 'joi';

import {
  customerSchema,
  locationSchema,
  productsIdsSchema,
  deliverymanIdSchema,
  managerIdSchema,
} from './schemas';

const ORDER_STATUSES = Object.values($Enums.OrderStatus);

export const createOrderSchema = joi.object({
  customer: customerSchema,
  location: locationSchema,
  status: joi
    .string()
    .valid(...ORDER_STATUSES)
    .optional(),
  productsIds: productsIdsSchema,
  deliverymanId: deliverymanIdSchema.optional(),
  managerId: managerIdSchema,
});

export const updateOrderSchema = joi.object({
  customer: customerSchema.optional(),
  location: locationSchema.optional(),
  status: joi
    .string()
    .valid(...ORDER_STATUSES)
    .optional(),
  productsIds: productsIdsSchema.optional(),
  deliverymanId: deliverymanIdSchema.optional(),
  managerId: managerIdSchema.optional(),
});
