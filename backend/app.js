import express from "express";
import { errorMiddleware } from "./middleware/error.middleware.js";
import connectToDatabase from "./database/db.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to Convo API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

try {
    await connectToDatabase();

    app.listen(PORT || 5500, () => {
        console.log(`Convo API is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
}

export default app;
