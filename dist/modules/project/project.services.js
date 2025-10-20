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
exports.projectServies = void 0;
const db_1 = require("../../db");
// const createProject = async (payload:Prisma.ProjectCreateInput , id:string)=>{
//     const result = await prisma.project.create(
//         {
//             data:{
//                 ...payload,userId:id
//             },
//               include: {
//             user: {
//                 select: {
//                     id: true,
//                     name: true,
//                     image: true,
//                 },
//             },
//         },
//         }
//     )
//     console.log(result);
//     return result;
// }
// update project 
const createProject = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.create({
        data: {
            title: payload.title,
            description: payload.description,
            image: payload.image,
            githubUrl: payload.githubUrl,
            liveUrl: payload.liveUrl,
            techStack: payload.techStack,
            status: payload.status,
            // ✅ Proper relation connection
            user: {
                connect: { id: userId },
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
const updateProject = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.update({
        where: {
            id: id
        },
        data
    });
    return result;
});
// get ptojecy by id
const getByProjectID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.findUnique({
        where: {
            id: id
        }
    });
    console.log(result, " id ");
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield db_1.prisma.project.delete({
        where: {
            id: id
        }
    });
    return result;
});
exports.projectServies = {
    createProject, updateProject, getByProjectID, deleteProject
};
