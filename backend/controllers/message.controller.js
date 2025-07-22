import mongoose from "mongoose";
import Message from "../models/message.model.js";
import createError from "../utils/createError.js";

export const getConversationMessages = async (req, res, next) => {
    const { id: recipientUserId } = req.params;
    const currentUserId = req.user._id;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: recipientUserId },
                { senderId: recipientUserId, receiverId: currentUserId },
            ],
        });

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            data: messages,
        });
    } catch (error) {
        console.log(
            `[MessageController.getMessages] error caught: ${error.message}`
        );
        next(error);
    }
};
export const getUserConversations = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
};
export const createConversationMessage = async (req, res, next) => {
    const { id: recipientId } = req.params;
    const currentUserId = req.user._id;
    const { text, image } = req.body;
    try {
        if (!text && !image) {
            throw createError("Message must not be empty", 400);
        }

        if (!mongoose.isValidObjectId(recipientId)) {
            throw createError("RecipientId must be valid", 400);
        }

        let imageUrl;
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url;
        }

        const message = await Message.create({
            senderId: currentUserId,
            receiverId: recipientId,
            text,
            imageUrl,
        });

        // TODO: Emit Socket.IO event for real-time updates here

        res.status(201).json({
            success: true,
            message: "Message created successfully",
            data: message,
        });
    } catch (error) {
        console.error(
            `[MessageController.createConversationMessage] error caught: ${error.message}`
        );
        next(error);
    }
};
