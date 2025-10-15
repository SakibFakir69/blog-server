import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // 1️⃣ Check Authorization header first
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } 
    // 2️⃣ If not in header, check cookies
    else if (req.cookies?.token) {
      token = req.cookies.token; // cookie usually stores raw token
    }

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Attach user info to request object
    req.user = decoded;
    next(); // proceed to the route handler
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};
