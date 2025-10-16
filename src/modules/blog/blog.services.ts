import { Prisma } from "../../../generated/prisma"
import { prisma } from "../../db"



export const createBlog = async (payload: Prisma.BlogCreateInput, userID: string) => {
  const result = await prisma.blog.create({
    data: {
      title: payload.title,
      content: payload.content,
      tags: payload.tags,
      user: {
        connect: { id: userID },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return result;
};

// delete blog 

const deleteBlog = async (id:number)=>{
    const result = await prisma.blog.delete({
        where:{
            id:id
        }
    });
    return result;
}

// single blog 

const singleBlog = async(id:number)=>{

    const result = await prisma.blog.findUnique({
        where:{
            id:id
        }
    })
    return result;

}

// update blog
const updateBlog = async (id: number, data: any) => {
  if (!id) throw new Error("Blog ID is required");

  const result = await prisma.blog.update({
    where: { id }, // pass the actual number
    data,
  });

  return result;
};





export const blogServices = {
    createBlog  , deleteBlog , singleBlog , updateBlog
}