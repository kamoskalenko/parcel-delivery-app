import Joi from 'joi';

export const createRequestSchema = Joi.object({
  fromCity: Joi.string().trim().required(),
  toCity: Joi.string().trim().required(),
  parcelType: Joi.string()
    .valid('gadgets', 'drinks', 'clothes', 'medicines', 'other')
    .required(),
  dispatchDate: Joi.date().required(),
  parcelDescription: Joi.string().trim().required(),
});
