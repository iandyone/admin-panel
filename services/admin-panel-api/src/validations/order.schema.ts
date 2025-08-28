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

import { STRING_FILTER_MIN_LENGTH } from '../constants';

const ORDER_STATUSES = Object.values($Enums.OrderStatus);

export const createOrderSchema = joi.object({
  customer: customerSchema,
  location: locationSchema,
  managerId: managerIdSchema,
  productsIds: productsIdsSchema,
  deliverymanId: deliverymanIdSchema.optional(),
  status: joi
    .string()
    .valid(...ORDER_STATUSES)
    .optional(),
});

export const updateOrderSchema = joi.object({
  customer: customerSchema,
  location: locationSchema,
  managerId: managerIdSchema,
  productsIds: productsIdsSchema,
  status: joi.string().valid(...ORDER_STATUSES),
  deliverymanId: deliverymanIdSchema.optional(),
});

export const findAllOrdersSchema = joi.object({
  page: pageSchema,
  perPage: pageSchema,
  id: idSchema.optional(),
  order: joi.string().min(STRING_FILTER_MIN_LENGTH).optional(),
  totalAmount: joi.number().min(0).optional(),
  location: joi.string().min(STRING_FILTER_MIN_LENGTH).optional(),
  customer: customerSchema.optional(),
  deliveryman: customerSchema.optional(),
  dateFromCreated: joi.number().optional(),
  dateToCreated: joi.number().optional(),
  dateFromUpdated: joi.number().optional(),
  dateToUpdated: joi.number().optional(),
  manager: customerSchema.optional(),
  status: orderStatusSchema.optional(),
});
