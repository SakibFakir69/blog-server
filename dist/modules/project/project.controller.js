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
exports.projectController = exports.allProject = void 0;
const project_services_1 = require("./project.services");
const db_1 = require("../../db");
// create project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // 👈 now works ()
    console.log(user, "api hit");
    const id = user.id;
    try {
        // 
        console.log("create project hit");
        console.log(req.body);
        const result = yield project_services_1.projectServies.createProject(req.body, id);
        console.log(result, " result");
        return res.status(201).json({
            status: true,
            message: "Project created successfully",
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
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, data } = req.body;
        if (!id || !data) {
            return res.status(400).json({
                status: false,
                message: "Project id and data are required",
            });
        }
        console.log(id, data);
        const result = yield project_services_1.projectServies.updateProject(id, data);
        return res.status(200).json({
            status: true,
            message: "Project update successfull",
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
const getByProjectID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, "params");
        const getprojectId = String(id);
        const result = yield project_services_1.projectServies.getByProjectID(getprojectId);
        return res.status(200).json({
            status: true,
            message: "User Data reterive successfully",
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
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, " delete trigger");
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Project ID is required",
            });
        }
        const deleteprojectId = String(id);
        const result = yield project_services_1.projectServies.deleteProject(deleteprojectId);
        return res.status(200).json({
            status: true,
            message: "Project deleted successfully",
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
// all project
const allProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.user;
    if (!userId) {
        return res.status(400).json({ status: false, message: "UserId is required" });
    }
    try {
        const projects = yield db_1.prisma.project.findMany({
            where: { userId },
        });
        return res.status(200).json({
            status: true,
            message: "Projects fetched successfully",
            data: projects,
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
exports.allProject = allProject;
exports.projectController = {
    createProject, updateProject, getByProjectID, deleteProject, allProject: exports.allProject
};
