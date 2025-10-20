"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.logoutUser = void 0;
const db_1 = require("../../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // ✅ Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required",
            });
        }
        // ✅ Find user by email
        const user = yield db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }
        // ✅ Verify password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials",
            });
        }
        // ✅ Create JWT payload
        const payload = { id: user.id, email: user.email };
        // ✅ Sign JWT
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // ✅ Send response
        return res.status(200).json({
            status: true,
            message: "User login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({
                status: false,
                message: error.message,
                stack: error.stack,
            });
        }
        return res.status(500).json({
            status: false,
            message: "An unknown error occurred",
        });
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // use `true` in production (HTTPS)
            sameSite: "lax",
        });
        return res.status(200).json({
            status: true,
            message: "User logged out successfully",
        });
    }
    catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            status: false,
            message: "Failed to logout user",
            error: error.message,
        });
    }
});
exports.logoutUser = logoutUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        console.log(user, " user ");
        if (!user) {
            return res
                .status(401)
                .json({ status: false, message: "User unAuthorize" });
        }
        const userInfo = yield db_1.prisma.user.findUnique({
            where: {
                id: user.id
            }
        });
        return res.status(200).json({
            status: true,
            message: "User info fetch successfully",
            data: userInfo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.authController = {
    loginUser, getMe, logoutUser: exports.logoutUser
};
