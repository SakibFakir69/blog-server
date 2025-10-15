
// 1
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

// 2
export const prisma = new PrismaClient()
  .$extends(withAccelerate())