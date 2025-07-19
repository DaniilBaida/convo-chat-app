import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { updateAvatar } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.patch("/me/avatar", authorize, updateAvatar);

export default userRouter;
