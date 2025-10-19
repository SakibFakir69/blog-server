import { Router } from "express";
import { authController } from "./auth.controller";
import { verifyToken } from "../../middleware/VerifyToken";



const router = Router();


router.post('/login',authController.loginUser );
router.post('/log-out',verifyToken, authController.logoutUser);
router.get('/me', verifyToken,authController.getMe);


export const authRouter = router;