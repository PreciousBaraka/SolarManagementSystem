import Joi from "joi";

export const salesSchema = Joi.object({
  customerId: Joi.string().optional(),
  customerName: Joi.string().optional(),
  customerPhoneNumber: Joi.string().optional(),
  salesPersonId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});
