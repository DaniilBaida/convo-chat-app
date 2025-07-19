import { Router } from "express";
import {
    getAuthenticatedUser,
    login,
    logout,
    register,
} from "../controllers/auth.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/me", authorize, getAuthenticatedUser);

export default authRouter;
