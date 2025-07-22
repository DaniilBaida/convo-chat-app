import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { updateAvatar } from "../controllers/user.controller.js";
import {
    createConversationMessage,
    getConversationMessages,
    getUserConversations,
} from "../controllers/message.controller.js";

const userRouter = Router();

userRouter.patch("/me/avatar", authorize, updateAvatar);

userRouter.get("/me/conversations", authorize, getUserConversations);
userRouter.get(
    "/me/conversations/:recipientId/messages",
    authorize,
    getConversationMessages
);
userRouter.post(
    "/me/convesrstions/:recipientId/messages",
    authorize,
    createConversationMessage
);

export default userRouter;
