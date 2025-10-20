"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        let token;
        // 1️⃣ Check Authorization header first
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        // 2️⃣ If not in header, check cookies
        else if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) {
            token = req.cookies.token; // cookie usually stores raw token
        }
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "No token provided",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach user info to request object
        req.user = decoded;
        next(); // proceed to the route handler
    }
    catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token",
        });
    }
};
exports.verifyToken = verifyToken;
