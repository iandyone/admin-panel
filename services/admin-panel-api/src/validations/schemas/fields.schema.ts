import joi from 'joi';

export const idSchema = joi
  .string()
  .pattern(new RegExp('^[0-9]{1,4}$'))
  .message('Id with value {{#value}} doesn`t match the required pattern')
  .required();

export const passwordSchema = joi
  .string()
  .min(6)
  .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));

export const customerSchema = joi.string().min(4).max(50);
export const locationSchema = joi.string().min(10).max(80);
export const productsIdsSchema = joi.array().items(joi.string());
export const deliverymanIdSchema = joi.number().min(1).optional();
export const managerIdSchema = joi.number().min(1);
export const nameSchema = joi.string().min(4).max(15);
export const phoneSchema = joi.string().min(12);
export const emailSchema = joi.string().email({ minDomainSegments: 2 });
