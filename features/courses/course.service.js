
import mongoose from "mongoose";
import { Course } from "./course.schema.js";

const getFilter = (id) => {
    return mongoose.isValidObjectId(id) ? { _id: id } : { id };
};

export const getAllCourses = async (query) => {
    const { search, category } = query;
    let filter = {};

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    if (category && category !== 'All') {
        filter.category = category;
    }

    return await Course.find(filter);
};

export const getCourseById = async (id) => {
    return await Course.findOne(getFilter(id));
};

export const getCourseBySlug = async (slug) => {
    return await Course.findOne({ slug });
};

export const createCourse = async (courseData) => {
    // Ensure unique ID if not provided (simple timestamp based for now to match frontend logic)
    if (!courseData.id) {
        courseData.id = `course-${Date.now()}`;
    }
    return await Course.create(courseData);
};

export const updateCourse = async (id, updateData) => {
    const { _id, id: logicId, createdAt, updatedAt, ...cleanData } = updateData;
    return await Course.findOneAndUpdate(getFilter(id), cleanData, { new: true });
};

export const deleteCourse = async (id) => {
    return await Course.findOneAndDelete(getFilter(id));
};
