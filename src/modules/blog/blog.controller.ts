


// create blog 

import { Request, Response } from "express";
import { blogServices } from "./blog.services";
import { prisma } from "../../db";


const createBlog = async (req:Request, res:Response)=>{
   
    const userId = (req as any).user?.id;

    try {

        const result = await blogServices.createBlog(req.body,userId);


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

        const result = await blogServices.deleteBlog(blogId);

        return res.status(200).json({
          status:true,
          message:"Blog post deleted",
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

// const updateBlog= async (req:Request, res:Response)=>{

//     try {
//         const {id,data} = req.body;
//         const result = await blogServices.updateBlog(Number(id), data);


//         return res.status(201).json({
//             staus:true,
//             message:'User Update Successfully',
//             data:result
//         })
        
        
//     } catch (error) {
//           if(error instanceof Error)
//         {
//             return res.status(500).json({
//                 status:false,
//                 messgage:error.name,
//                 stack:error.stack
//             })
//         }
        
//     }
// }
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id, title, content } = req.body; // <- get id from body
    if (!id) {
      return res.status(400).json({ status: false, message: "Blog ID is required" });
    }

    const data: any = {};
    if (title) data.title = title;
    if (content) data.content = content;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ status: false, message: "No fields to update" });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data,
    });

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      messgage: error.name,
      stack: error.stack,
    });
  }
};
// all blog 
const allBlog = async (req: Request, res: Response) => {
  console.log("all blog hit");

  try {
    const userId = (req as any).user?.id;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID not found",
      });
    }

    console.log("Fetching blogs for user:", userId);

    // Fetch all blogs for this user
    const blogs = await prisma.blog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // optional: latest first
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
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