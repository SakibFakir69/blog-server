


// create blog 

import { Request, Response } from "express";
import { blogServices } from "./blog.services";
import { prisma } from "../../db";


const createBlog = async (req:Request, res:Response)=>{
    console.log("create blog hit")

    try {

        const result = await blogServices.createBlog(req.body);


        return res.status(201).json({
            status:true,
            message:"Blog Created Successfully",
            data:result
        })



        
    } catch (error) {
          if(error instanceof Error)
        {
            return res.status(500).json({
                status:false,
                messgage:error.name,
                stack:error.stack
            })
        }

        
    }
}

// delete blog

const deleteBlog = async (req:Request , res:Response)=>{

    try {
        const {id} = req.params;

        const blogId:number= Number(id);

        const result = await blogServices.deleteBlog(blogId)
        
    } catch (error) {
          if(error instanceof Error)
        {
            return res.status(500).json({
                status:false,
                messgage:error.name,
                stack:error.stack
            })
        }
        
    }

}

const singleBlog = async (req:Request , res:Response)=>{

    try {
        const {id} = req.params;
        const blogID:number = Number(id);
        const result = await blogServices.singleBlog(blogID);

        return res.status(200).json({
            statu:true,
            message:"User Retrive Succesfullt",
            data:result
        })
        
    } catch (error) {
           if(error instanceof Error)
        {
            return res.status(500).json({
                status:false,
                messgage:error.name,
                stack:error.stack
            })
        }
        
    }
}
// update blog

const updateBlog= async (req:Request, res:Response)=>{

    try {
        const {id} = req.params;
        const data = req.body;      // updated fields from request body
        const result = await blogServices.updateBlog(Number(id), data);


        return res.status(201).json({
            staus:true,
            message:'User Update Successfully',
            data:result
        })
        
        
    } catch (error) {
          if(error instanceof Error)
        {
            return res.status(500).json({
                status:false,
                messgage:error.name,
                stack:error.stack
            })
        }
        
    }
}

// all blog 
const allBlog =  async (req: Request, res: Response) => {
    console.log("all blog hit")
  try {
    const { email } = req.body;

    // Find the user first
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Get all blogs for this user
    const blogs = await prisma.blog.findMany({
      where: { userId: user.id },
    });

    return res.status(200).json({
      status: true,
      message: "All blogs retrieved",
      data: blogs,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        stack: error.stack,
      });
    }
  }
};

export const blogController ={
    createBlog , deleteBlog , singleBlog , updateBlog , allBlog
}