import joi from 'joi';

export const dashboardStatisticSchema = joi.object({
  dateFrom: joi.number().optional(),
  dateTo: joi.number().optional(),
});
