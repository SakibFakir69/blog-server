import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../db";

import bcrypt from "bcrypt";

const createUser = async (payload: Prisma.UserCreateInput) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword, // replace plain password with hash
    },
  });

  // Exclude password from return
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};



export const userServices={
    createUser
    
}