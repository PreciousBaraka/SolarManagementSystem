import Joi from "joi";

// Product schema for creating
export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    unit:Joi.integer().min(1).required(),
    unitPrice: Joi.number().min(0).required(),
    quantity:Joi.integer().min(0).required(),
});

// Product schema for updating
export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    unit:Joi.integer().min(1),
    unitPrice: Joi.number().min(0),
    quantity:Joi.integer().min(0),
});