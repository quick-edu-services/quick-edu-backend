import { Transaction } from "./transaction.schema.js";
import User from "../auth/auth.schema.js";
import { Course } from "../courses/course.schema.js";

export const recordTransaction = async (data) => {
    const { orderId, cfOrderId, userId, userName, userEmail, courses, amount, status } = data;

    // Create the transaction record
    const transaction = await Transaction.create({
        orderId,
        cfOrderId,
        userId,
        userName,
        userEmail,
        courses,
        amount,
        status: status || 'SUCCESS'
    });

    if (status === 'SUCCESS' || !status) {
        // 1. Update User's enrolled courses
        const courseIds = courses.map(c => c.courseId);
        await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: { $each: courseIds } }
        });

        // 2. Increment student count for each course
        await Course.updateMany(
            { _id: { $in: courseIds } },
            { $inc: { students: 1 } }
        );
    }

    return transaction;
};

export const getTransactions = async (filters = {}) => {
    return await Transaction.find(filters).populate('userId').sort({ createdAt: -1 });
};
