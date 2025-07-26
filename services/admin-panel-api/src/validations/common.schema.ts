import joi from 'joi';

export const idSchema = joi
  .string()
  .pattern(new RegExp('^[0-9]{1,4}$'))
  .message('Id with value {{#value}} doesn`t match the required pattern')
  .required();
