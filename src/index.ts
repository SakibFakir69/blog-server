import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./modules/users/user.route";
import { projectRouter } from "./modules/project/project.route";
import { blogRouter } from "./modules/blog/blog.route";
import { authRouter } from "./modules/auth/auth.route";

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser()); // ✅ Needed to read cookies

// ✅ Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/auth", authRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Global error handling (optional but recommended)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
});

export const ServerApp = app;
