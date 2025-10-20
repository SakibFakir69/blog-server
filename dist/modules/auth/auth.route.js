"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const VerifyToken_1 = require("../../middleware/VerifyToken");
const router = (0, express_1.Router)();
// 
router.post('/login', auth_controller_1.authController.loginUser);
router.post('/log-out', VerifyToken_1.verifyToken, auth_controller_1.authController.logoutUser);
router.get('/me', VerifyToken_1.verifyToken, auth_controller_1.authController.getMe);
exports.authRouter = router;
