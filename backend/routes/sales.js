import express from "express";
import {
  createSale,
  deleteSale,
  getSaleById,
  getSales,
  getSalesByCustomer,
  getSalesByDateRange,
  getSalesBySalesPerson,
  //   updateSale,
} from "../controllers/sales.js";
import { authenticate, authorizeUser } from "../middlewares/auth.js";
import { UserType } from "@prisma/client";

const salesRouter = express.Router();

salesRouter.post(
  "/create",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  createSale
);
salesRouter.get(
  "/",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  getSales
);
salesRouter.get(
  "/sale/:id",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  getSaleById
);
salesRouter.delete(
  "/delete/:id",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  deleteSale
);
salesRouter.get(
  "/salesPerson/:id",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  getSalesBySalesPerson
);
salesRouter.get(
  "/customer/:customerId",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  getSalesByCustomer
);
// salesRouter.put("/update/:id", updateSale);
// Get sales by date range using createdAt field
// Example: /sale/date?start=2024-06-01&end=2024-06-30
salesRouter.get(
  "/sale/date",
  authenticate,
  authorizeUser([UserType.ADMIN, UserType.SALES_PERSON, UserType.MANAGER]),
  getSalesByDateRange
);

export default salesRouter;
