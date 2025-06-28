import Joi from "joi";

// Product schema for creating
export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    unit:Joi.string().min(3).required(),
    unitPrice: Joi.number().integer().positive().min(0).required(),
    quantity:Joi.number().min(0).required(),
});

// Product schema for updating
export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  unit: Joi.string().min(3),
  unitPrice: Joi.number().integer().positive().min(0),
  quantity: Joi.number().min(0),
});
