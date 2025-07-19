import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            const error = new Error("Authentication required");
            error.status = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            const error = new Error("Authentication required");
            error.status = 401;
            throw error;
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
