
import * as service from "./course.service.js";

export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await service.getAllCourses(req.query);
        res.json(courses);
    } catch (err) {
        next(err);
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        const course = await service.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        next(err);
    }
};

export const getCourseBySlug = async (req, res, next) => {
    try {
        const course = await service.getCourseBySlug(req.params.slug);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        next(err);
    }
};

export const createCourse = async (req, res, next) => {
    try {
        const course = await service.createCourse(req.body);
        res.status(201).json(course);
    } catch (err) {
        next(err);
    }
};

export const updateCourse = async (req, res, next) => {
    try {
        const course = await service.updateCourse(req.params.id, req.body);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        next(err);
    }
};

export const deleteCourse = async (req, res, next) => {
    try {
        const course = await service.deleteCourse(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        next(err);
    }
};
