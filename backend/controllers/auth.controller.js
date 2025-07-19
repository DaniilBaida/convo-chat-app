import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password fields are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            const error = new Error("Email/password combination is invalid");
            error.status = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Email/password combination is invalid");
            error.status = 401;
            throw error;
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
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists!");
            error.status = 400;
            throw error;
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
            message: "User created successfully",
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
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};
