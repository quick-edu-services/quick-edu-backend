
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Instructor } from '../features/instructors/instructor.schema.js';

dotenv.config();

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const count = await Instructor.countDocuments();
        console.log(`Total Instructors: ${count}`);

        const sample = await Instructor.findOne({ id: 'instructor-1' });
        console.log("Sample Instructor Social:", sample.social);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyData();
