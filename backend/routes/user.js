import express from 'express';
import { changeUserActiveStatus, getUserById, getUsers, loginUser, registerUser, updateUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById)
userRouter.put("/:id/edit", updateUser)
userRouter.put("/:id/activate-deactivate", changeUserActiveStatus)

export default userRouter;