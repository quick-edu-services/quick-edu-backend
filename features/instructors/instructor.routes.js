
import express from "express";
import * as ctrl from "./instructor.controller.js";

const router = express.Router();

router.get("/", ctrl.getAllInstructors);
router.get("/:id", ctrl.getInstructorById);
router.post("/", ctrl.createInstructor);
router.put("/:id", ctrl.updateInstructor);
router.delete("/:id", ctrl.deleteInstructor);

export default router;
