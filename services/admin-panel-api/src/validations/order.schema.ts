import { $Enums } from '@prisma/client';
import joi from 'joi';

import {
  customerSchema,
  locationSchema,
  productsIdsSchema,
  deliverymanIdSchema,
  managerIdSchema,
  pageSchema,
  idSchema,
  orderStatusSchema,
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

export const findAllOrdersSchema = joi.object({
  page: pageSchema,
  perPage: pageSchema,
  id: idSchema.optional(),
  order: joi.string().min(2).optional(),
  totalAmount: joi.number().min(1).optional(),
  location: joi.string().min(2).optional(),
  customer: customerSchema.optional(),
  deliveryman: customerSchema.optional(),
  dateFrom: joi.number().optional(),
  dateTo: joi.number().optional(),
  manager: customerSchema.optional(),
  status: orderStatusSchema.optional(),
});
