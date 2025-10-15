import { Prisma } from "../../../generated/prisma"
import { prisma } from "../../db"



const createBlog =async (payload:Prisma.BlogCreateInput)=>{


    const result = await  prisma.blog.create({
        data:payload
    });
    return result;



}

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

const updateBlog = async (id:number,data:any)=>{

    const result = await prisma.blog.update({
        where:{
            id:id

        },
        data

    })
}




export const blogServices = {
    createBlog  , deleteBlog , singleBlog , updateBlog
}