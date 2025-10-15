import { Router } from "express";
import { projectController } from "./project.controller";
import { verify } from "crypto";
import { verifyToken } from "../../middleware/VerifyToken";


const router = Router();


router.post('/create-project' ,verifyToken, projectController.createProject)
router.put('/project-update', projectController.updateProject)
router.get('/all-project',verifyToken, projectController.allProject)
router.get('/:id', projectController.getByProjectID)
router.delete('/:id',verifyToken, projectController.deleteProject);
// all project
export const projectRouter = router;