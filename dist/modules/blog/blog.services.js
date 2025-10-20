"use strict";
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
exports.blogServices = exports.createBlog = void 0;
const db_1 = require("../../db");
const createBlog = (payload, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.create({
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
});
exports.createBlog = createBlog;
// delete blog 
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.delete({
        where: {
            id: id
        }
    });
    return result;
});
// single blog 
const singleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.findUnique({
        where: {
            id: id
        }
    });
    return result;
});
// update blog
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new Error("Blog ID is required");
    const result = yield db_1.prisma.blog.update({
        where: { id }, // pass the actual number
        data,
    });
    return result;
});
exports.blogServices = {
    createBlog: exports.createBlog, deleteBlog, singleBlog, updateBlog
};
