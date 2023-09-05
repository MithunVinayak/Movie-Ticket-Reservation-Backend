import express from "express";
import { adminSignup, loginAdmin } from "../controllers/admin-controllers";

const adminRouter = express.Router();

adminRouter.post("/signup", adminSignup);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
