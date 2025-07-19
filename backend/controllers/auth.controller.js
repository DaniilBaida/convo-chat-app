import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            await bcrypt.compare(password, "qafwdejkbglhva217>!>!>!>!");
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
        user.password = undefined;

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                token,
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
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
        });
        newUser.password = undefined;

        const token = jwt.sign({ UserId: newUser._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { token, user: newUser },
        });
    } catch (error) {
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        //SIGN IN LOGIC
        console.log("Sign OUT");
    } catch (error) {
        next(error);
    }
};
