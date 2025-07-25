import joi from 'joi';

export const idSchema = joi
  .string()
  .pattern(new RegExp('^[1-9]{1,4}$'))
  .message('Id with value {{#value}} doesn`t match the required pattern')
  .required();
