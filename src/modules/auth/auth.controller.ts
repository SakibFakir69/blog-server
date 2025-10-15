import { Request, Response } from "express";
import { prisma } from "../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (req: Request, res: Response) => {
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
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // ✅ Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Create JWT payload
    const payload = { id: user.id, email: user.email };

    // ✅ Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // ✅ Set HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // HTTPS only in production
      sameSite: "lax",
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
  } catch (error) {
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
};

export const authController = {
  loginUser,
};
