"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = require("./modules/users/user.route");
const project_route_1 = require("./modules/project/project.route");
const blog_route_1 = require("./modules/blog/blog.route");
const auth_route_1 = require("./modules/auth/auth.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://blog-qvx3b2ykl-sakibfakirs-projects.vercel.app", "https://blog-5ad23efxt-sakibfakirs-projects.vercel.app", 'https://blog-ui-rosy.vercel.app'], // frontend URL
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allow headers
}));
app.use((0, cookie_parser_1.default)()); // ✅ Needed to read cookies
app.use(express_1.default.json());
// ✅ Routes
app.use("/api/v1/users", user_route_1.userRouter);
app.use("/api/v1/project", project_route_1.projectRouter);
app.use("/api/v1/blog", blog_route_1.blogRouter);
app.use("/api/v1/auth", auth_route_1.authRouter);
// ✅ Test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// ✅ Global error handling (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: false,
        message: err.message || "Internal Server Error",
    });
});
exports.ServerApp = app;
