import express from 'express';
import { getUserById, getUsers, loginUser, registerUser, updateUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById)
userRouter.put("/:id/edit", updateUser)

export default userRouter;