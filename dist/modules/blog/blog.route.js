"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const VerifyToken_1 = require("../../middleware/VerifyToken");
const route = (0, express_1.Router)();
route.post('/create-blog', VerifyToken_1.verifyToken, blog_controller_1.blogController.createBlog);
route.get('/all-blog', VerifyToken_1.verifyToken, blog_controller_1.blogController.allBlog);
route.put('/update-blog', blog_controller_1.blogController.updateBlog);
route.get('/:id', blog_controller_1.blogController.singleBlog);
route.delete('/:id', blog_controller_1.blogController.deleteBlog);
// update , allblog 
// find by email => 
// auth start project 
exports.blogRouter = route;
