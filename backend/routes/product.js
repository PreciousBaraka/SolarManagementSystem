import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/product.js";
import { authenticate, authorizeUser } from "../middlewares/auth.js";
import { UserType } from "@prisma/client";

const productRouter = express.Router();

productRouter.post(
  "/create",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  createProduct
);
productRouter.get(
  "/",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  listProducts
);
productRouter.get(
  "/:id",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  getProductById
);
productRouter.put(
  "/:id/update",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  updateProduct
);
productRouter.delete(
  "/:id/delete",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  deleteProduct
);

export default productRouter;
