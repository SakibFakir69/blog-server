import { Router } from "express";
import { blogController } from "./blog.controller";


const route = Router();



route.post('/create-blog', blogController.createBlog);
route.get('/:id' , blogController.singleBlog)
route.delete('/:id', blogController.deleteBlog);
route.put('/update-blog', blogController.updateBlog);
route.get('/all-blog', blogController.allBlog);
// update , allblog 
// find by email => 
// auth start project 



export const blogRouter = route;