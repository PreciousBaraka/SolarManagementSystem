import joi from "joi";

// user schema for creating or updating a user
export const userSchema = joi.object({
  fullName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  phoneNumber: joi.string().min(10).max(15).required(),
  isActive: joi.boolean().default(true),
  createdAt: joi.date(),
});
// installer schema for creating
export const installerSchema = joi.object({
  fullName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  phoneNumber: joi.string().min(10).max(15).required(),
});

// installer schema for updating
export const updateInstallerSchema = joi.object({
  fullName: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6).max(30),
  phoneNumber: joi.string().min(10).max(15).required(),
});

// admin schema for creating
export const adminSchema = joi.object({
  fullName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  phoneNumber: joi.string().min(10).max(15).optional(),
});

// admin schema for updating
export const updateAdminSchema = joi.object({
  fullName: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6).max(30),
  phoneNumber: joi.string().min(10).max(15).optional(),
});

// Manager schema for creating
export const managerSchema = joi.object({
  fullName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  phoneNumber: joi.string().min(10).max(15).optional(),
});

// Manager schema for updating
export const updateManagerSchema = joi.object({
  fullName: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6).max(30),
  phoneNumber: joi.string().min(10).max(15).optional(),
});

// inventory_officer schema for creating
export const inventoryOfficerSchema = joi.object({
  fullName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  phoneNumber: joi.string().min(10).max(15).optional(),
});

// inventory_officer schema for updating
export const updateInventoryOfficerSchema = joi.object({
  fullName: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6).max(30),
  phoneNumber: joi.string().min(10).max(15).optional(),
});

// user login schema
export const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});
