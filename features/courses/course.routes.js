
import express from "express";
import * as ctrl from "./course.controller.js";

const router = express.Router();

router.get("/", ctrl.getAllCourses);
router.get("/:id", ctrl.getCourseById);
router.get("/slug/:slug", ctrl.getCourseBySlug);
router.post("/", ctrl.createCourse);
router.put("/:id", ctrl.updateCourse);
router.delete("/:id", ctrl.deleteCourse);

export default router;
