
import * as service from "./instructor.service.js";

export const getAllInstructors = async (req, res, next) => {
    try {
        const instructors = await service.getAllInstructors(req.query);
        res.json(instructors);
    } catch (err) {
        next(err);
    }
};

export const getInstructorById = async (req, res, next) => {
    try {
        const instructor = await service.getInstructorById(req.params.id);
        if (!instructor) return res.status(404).json({ message: "Instructor not found" });
        res.json(instructor);
    } catch (err) {
        next(err);
    }
};

export const createInstructor = async (req, res, next) => {
    try {
        const instructor = await service.createInstructor(req.body);
        res.status(201).json(instructor);
    } catch (err) {
        next(err);
    }
};

export const updateInstructor = async (req, res, next) => {
    try {
        const instructor = await service.updateInstructor(req.params.id, req.body);
        if (!instructor) return res.status(404).json({ message: "Instructor not found" });
        res.json(instructor);
    } catch (err) {
        next(err);
    }
};

export const deleteInstructor = async (req, res, next) => {
    try {
        const instructor = await service.deleteInstructor(req.params.id);
        if (!instructor) return res.status(404).json({ message: "Instructor not found" });
        res.json({ message: "Instructor deleted successfully" });
    } catch (err) {
        next(err);
    }
};
