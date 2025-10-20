"use strict";
// create blog 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = exports.updateBlog = void 0;
const blog_services_1 = require("./blog.services");
const db_1 = require("../../db");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const result = yield blog_services_1.blogServices.createBlog(req.body, userId);
        return res.status(201).json({
            status: true,
            message: "Blog Created Successfully",
            data: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                status: false,
                messgage: error.name,
                stack: error.stack
            });
        }
    }
});
// delete blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blogId = Number(id);
        const result = yield blog_services_1.blogServices.deleteBlog(blogId);
        return res.status(200).json({
            status: true,
            message: "Blog post deleted",
            data: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                status: false,
                messgage: error.name,
                stack: error.stack
            });
        }
    }
});
const singleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blogID = Number(id);
        const result = yield blog_services_1.blogServices.singleBlog(blogID);
        return res.status(200).json({
            statu: true,
            message: "User Retrive Succesfullt",
            data: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                status: false,
                messgage: error.name,
                stack: error.stack
            });
        }
    }
});
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
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, content } = req.body; // <- get id from body
        if (!id) {
            return res.status(400).json({ status: false, message: "Blog ID is required" });
        }
        const data = {};
        if (title)
            data.title = title;
        if (content)
            data.content = content;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ status: false, message: "No fields to update" });
        }
        const updatedBlog = yield db_1.prisma.blog.update({
            where: { id: Number(id) },
            data,
        });
        return res.status(200).json({
            status: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            messgage: error.name,
            stack: error.stack,
        });
    }
});
exports.updateBlog = updateBlog;
// all blog 
const allBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("all blog hit");
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID not found",
            });
        }
        console.log("Fetching blogs for user:", userId);
        // Fetch all blogs for this user
        const blogs = yield db_1.prisma.blog.findMany({
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                status: false,
                message: error.message,
                stack: error.stack,
            });
        }
    }
});
exports.blogController = {
    createBlog, deleteBlog, singleBlog, updateBlog: exports.updateBlog, allBlog
};
