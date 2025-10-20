"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const VerifyToken_1 = require("../../middleware/VerifyToken");
const router = (0, express_1.Router)();
router.post('/create-project', VerifyToken_1.verifyToken, project_controller_1.projectController.createProject);
router.put('/project-update', project_controller_1.projectController.updateProject);
router.get('/all-project', VerifyToken_1.verifyToken, project_controller_1.projectController.allProject);
router.get('/:id', project_controller_1.projectController.getByProjectID);
router.delete('/:id', VerifyToken_1.verifyToken, project_controller_1.projectController.deleteProject);
// all project
exports.projectRouter = router;
