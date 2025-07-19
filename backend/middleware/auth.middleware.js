import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No Token Provided",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid Token",
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
