import * as Joi from 'joi';

export const joiValidation = Joi.object({
  PORT: Joi.number().default(3001),
  MONGODB: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(5),
});
