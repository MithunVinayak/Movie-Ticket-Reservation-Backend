import express from "express";
import {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user-controllers";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);

export default userRouter;
