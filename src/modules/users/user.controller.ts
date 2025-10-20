import type { Request, Response } from "express"
import { userServices } from "./user.services"




const createUser =async (req:Request, res:Response)=>{

    try {
        const result = await userServices.createUser(req.body);

        console.log("user api hit")

        return res.status(201).json({
            status:true ,
            message:"User Created Successfully",
            data:result
        })

    } catch (error: unknown) {
  if (error instanceof Error) {
    
    return res.status(500).json({
      status: false,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
  } else {
    // if the thrown thing is not an Error (rare but possible)
    return res.status(500).json({
      status: false,
      message: "An unknown error occurred",
    });
  }
}

        
    }





export const userController = {

    createUser

}