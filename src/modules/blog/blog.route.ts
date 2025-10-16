import { Router } from "express";
import { blogController } from "./blog.controller";
import { verify } from "crypto";
import { verifyToken } from "../../middleware/VerifyToken";


const route = Router();



route.post('/create-blog',verifyToken, blogController.createBlog);
route.get('/all-blog',verifyToken, blogController.allBlog);
route.put('/update-blog',blogController.updateBlog);
route.get('/:id' , blogController.singleBlog)
route.delete('/:id', blogController.deleteBlog);


// update , allblog 
// find by email => 
// auth start project 



export const blogRouter = route;