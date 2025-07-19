import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        avatarUrl: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
