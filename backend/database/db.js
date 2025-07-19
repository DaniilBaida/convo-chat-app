import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define the DB_URI environment variable in .env");
}

const connectToDatabase = async (next) => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to the DB in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Failed to connect to DB: ", error.message);
        process.exit(1);
    }
};

export default connectToDatabase;
