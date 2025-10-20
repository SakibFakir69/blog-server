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

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});


    // Send response
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


export const logoutUser = async (req: Request, res: Response) => {
  try {
    //  Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // use `true` in production (HTTPS)
      sameSite: "lax",
    });

    return res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error: any) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to logout user",
      error: error.message,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = req?.user

    console.log(user, " user ");

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User unAuthorize" });
    }

    const userInfo = await prisma.user.findUnique({
      where:{
        id:user.id
      }
    })

    return res.status(200).json({
      status: true,
      message: "User info fetch successfully",
      data: userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};


export const authController = {
  loginUser,getMe,logoutUser
};
