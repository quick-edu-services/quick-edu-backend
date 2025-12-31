import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Course } from '../features/courses/course.schema.js';

dotenv.config();

async function checkCourses() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const courses = await Course.find({}).select('id title').sort({ id: 1 });
        console.log(`\nTotal courses in DB: ${courses.length}`);

        if (courses.length > 0) {
            console.log('\nFirst 5 courses:');
            courses.slice(0, 5).forEach(c => console.log(`  - ${c.id}: ${c.title}`));

            console.log('\nLast 5 courses:');
            courses.slice(-5).forEach(c => console.log(`  - ${c.id}: ${c.title}`));

            // Get all IDs
            const ids = courses.map(c => c.id).filter(id => id);
            console.log('\nAll course IDs:', ids.join(', '));
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkCourses();
