import { Statistics } from "./statistics.schema.js";
import { Course } from "../courses/course.schema.js";
import { Instructor } from "../instructors/instructor.schema.js";

export const getStats = async () => {
    let stats = await Statistics.findOne({ type: 'manual' });
    if (!stats) {
        stats = await Statistics.create({});
    }

    const totalCourses = await Course.countDocuments();
    const totalInstructors = await Instructor.countDocuments();

    return {
        activeStudents: stats.activeStudents,
        branches: stats.branches,
        totalCourses,
        totalInstructors
    };
};

export const updateStats = async (data) => {
    // Only allow updating activeStudents and branches
    const updateData = {};
    if (data.activeStudents !== undefined) updateData.activeStudents = data.activeStudents;
    if (data.branches !== undefined) updateData.branches = data.branches;

    const stats = await Statistics.findOneAndUpdate(
        { type: 'manual' },
        { $set: updateData },
        { new: true, upsert: true }
    );
    return stats;
};
