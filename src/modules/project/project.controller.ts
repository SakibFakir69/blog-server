import { Request, Response } from "express"
import { projectServies } from "./project.services"
import { prisma } from "../../db"




// create project
const createProject =async (req:Request, res:Response)=>{
    
     const user = (req as any).user; // 👈 now works ()
  console.log(user, "api hit");
  const id = user.id;



    try {
        // 
        console.log("create project hit")
        console.log(req.body)

        const  result = await projectServies.createProject(req.body , id);
        console.log(result , " result");


        return res.status(201).json({
            status:true,
            message:"Project created successfully" ,
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


const updateProject = async (req:Request, res:Response)=>{

    try{
        const {id,data} = req.body;
         if (!id || !data) {
      return res.status(400).json({
        status: false,
        message: "Project id and data are required",
      });
    }
    console.log(id, data);

        const result  = await projectServies.updateProject(id,data);

        return res.status(200).json({
            status:true,
            message:"Project update successfull",
            data:result
        })

    }catch(error){

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


const getByProjectID = async (req:Request, res:Response)=>{

    try {
        const {id} = req.params;
        console.log(id, "params");


        const getprojectId:string = String(id);

        const result = await  projectServies.getByProjectID(getprojectId);

        return res.status(200).json({
            status:true,
            message:"User Data reterive successfully",
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

const deleteProject = async (req:Request, res:Response)=>{

    try {
      const { id } = req.params;
      console.log(id , " delete trigger")

        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Project ID is required",
            });
        }

        const deleteprojectId:string =String(id); 

        const result = await projectServies.deleteProject(deleteprojectId);

        return res.status(200).json({
            status: true,
            message: "Project deleted successfully",
            data: result
        });
        
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


// all project


export const allProject = async (req: Request, res: Response) => {
  const { id: userId } =  (req as any ).user;

  if (!userId) {
    return res.status(400).json({ status: false, message: "UserId is required" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { userId },
    });

    return res.status(200).json({
      status: true,
      message: "Projects fetched successfully",
      data: projects,
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



export const projectController = {
    createProject,updateProject , getByProjectID,deleteProject , allProject
}