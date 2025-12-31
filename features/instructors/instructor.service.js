
import mongoose from "mongoose";
import { Instructor } from "./instructor.schema.js";

const getFilter = (id) => {
    return mongoose.isValidObjectId(id) ? { _id: id } : { id };
};

export const getAllInstructors = async (query) => {
    const { search } = query;
    let filter = {};

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { title: { $regex: search, $options: 'i' } }
        ];
    }

    return await Instructor.find(filter);
};

export const getInstructorById = async (id) => {
    return await Instructor.findOne(getFilter(id));
};

export const createInstructor = async (data) => {
    if (!data.id) {
        data.id = `instructor-${Date.now()}`;
    }
    return await Instructor.create(data);
};

export const updateInstructor = async (id, data) => {
    const { _id, id: logicId, createdAt, updatedAt, ...cleanData } = data;
    return await Instructor.findOneAndUpdate(getFilter(id), cleanData, { new: true });
};

export const deleteInstructor = async (id) => {
    return await Instructor.findOneAndDelete(getFilter(id));
};
