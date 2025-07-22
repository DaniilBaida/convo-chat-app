import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import createError from "../utils/createError.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw createError("Email and password fields are required", 400);
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw createError("Invalid email or password", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw createError("Invalid email or password", 401);
        }

        generateToken(user._id, res);

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    const { name, email, password, avatarUrl } = req.body;
    try {
        if (!name || !email || !password || !avatarUrl) {
            throw createError("All fields are required", 400);
        }

        if (password.length < 6) {
            throw createError("Password must be at least 6 characters", 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw createError("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            avatarUrl,
        });

        generateToken(newUser._id, res);

        newUser.password = undefined;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { user: newUser },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getAuthenticatedUser = (req, res) => {
    const { _id, name, email, avatarUrl } = req.user;

    res.status(200).json({
        success: true,
        message: "Authenticated user retrieved",
        data: { _id, name, email, avatarUrl },
    });
};
