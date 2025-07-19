import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const updateAvatar = async (req, res, next) => {
    const { avatarUrl } = req.body;
    const { user } = req;

    try {
        if (!avatarUrl) {
            const error = new Error("Avatar URL is required");
            error.status = 400;
            throw error;
        }

        if (!user) {
            const error = new Error("Authentication required");
            error.status = 401;
            throw error;
        }

        const uploadResult = await cloudinary.uploader.upload(avatarUrl)
            .secure_url;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { avatarUrl: uploadResult },
            { new: true }
        );

        if (!updatedUser) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
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
