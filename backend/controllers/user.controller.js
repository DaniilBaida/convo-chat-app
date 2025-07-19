import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const updateAvatar = async (req, res, next) => {
    const { avatarUrl } = req.body;
    const { user } = req;
    try {
        if (!avatarUrl) {
            return res.status(400).json({
                success: false,
                message: "Avatar URL is required",
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - user not found",
            });
        }

        const uploadResult = await cloudinary.uploader.upload(avatarUrl)
            .secure_url;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                avatarUrl: uploadResult,
            },
            { new: true }
        );

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
