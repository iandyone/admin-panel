import joi from 'joi';

import { CreateUserDto } from '../modules/users/dto/create-user.dto';

export const createUserSchema = joi.object<CreateUserDto>({
  firstName: joi.string().min(4).max(10).required(),
  lastName: joi.string().min(4).max(10).required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi
    .string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required(),
  phone: joi.string().min(12).required(),
});

export const updateUserSchema = joi.object<Partial<CreateUserDto>>({
  firstName: joi.string().min(4).max(10).optional(),
  lastName: joi.string().min(4).max(10).optional(),
  email: joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: joi.string().min(12).optional(),
});
