import express from "express";
import {
  changeUserActiveStatus,
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.js";
import { authenticate, authorizeUser } from "../middlewares/auth.js";
import { UserType } from "@prisma/client";

const userRouter = express.Router();

userRouter.post(
  "/register",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  registerUser
);
userRouter.post("/login", loginUser);
userRouter.get("/", authenticate, authorizeUser([UserType.ADMIN]), getUsers);
userRouter.get(
  "/:id",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  getUserById
);
userRouter.put(
  "/:id/edit",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  updateUser
);
userRouter.put(
  "/:id/activate-deactivate",
  authenticate,
  authorizeUser([UserType.ADMIN]),
  changeUserActiveStatus
);

export default userRouter;
