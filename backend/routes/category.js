import express from "express";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../controllers/category.js";
import { authenticate, authorizeUser } from "../middlewares/auth.js";
import { UserType } from "@prisma/client";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  createCategory
);
categoryRouter.get(
  "/",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  listCategories
);
categoryRouter.put(
  "/:id/update",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  updateCategory
);
categoryRouter.delete(
  "/:id/delete",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  deleteCategory
);
export default categoryRouter;
