import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const updateAvatar = async (req, res, next) => {
    const { avatarUrl } = req.body;
    const { user } = req;

    try {
        if (!avatarUrl) {
            throw createError("Avatar URL is required", 400);
        }

        if (!user) {
            throw createError("Authentication required", 401);
        }

        const uploadResult = await cloudinary.uploader.upload(avatarUrl)
            .secure_url;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { avatarUrl: uploadResult },
            { new: true }
        );

        if (!updatedUser) {
            throw createError("User not found", 404);
        }

        updatedUser.password = undefined;

        res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            data: { user: updatedUser },
        });
    } catch (error) {
        next(error);
    }
};
