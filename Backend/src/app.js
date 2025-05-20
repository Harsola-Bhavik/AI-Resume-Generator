import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
import { ApiError } from "./utils/ApiError.js";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: [process.env.ALLOWED_SITE],
    credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

// Global error handling
app.use((err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

export default app;
