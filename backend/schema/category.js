import Joi from 'joi';

// category schema for create
 export const categorySchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
 });

// category schema for update
export const updateCategorySchema = Joi.object({
    name: Joi.string().min(3).max(50),
})