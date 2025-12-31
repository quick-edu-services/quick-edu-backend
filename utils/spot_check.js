import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Course } from '../features/courses/course.schema.js';

dotenv.config();

async function spotCheck() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('\n🔍 SPOT CHECK - Verifying Key Courses\n');
        console.log('═'.repeat(70));

        // Check specific courses
        const testCourses = [
            'test-payment',
            'course-001',
            'course-050',
            'course-083',
            'web-dev-bootcamp',
            'data-science-ai'
        ];

        for (const courseId of testCourses) {
            const course = await Course.findOne({ id: courseId });
            if (course) {
                console.log(`\n✅ ${courseId}`);
                console.log(`   Title: ${course.title}`);
                console.log(`   Category: ${course.category}`);
                console.log(`   Level: ${course.level}`);
                console.log(`   Price: ₹${course.price.toLocaleString('en-IN')}`);
                console.log(`   Students: ${course.students.toLocaleString('en-IN')}`);
            } else {
                console.log(`\n❌ ${courseId} - NOT FOUND`);
            }
        }

        console.log('\n' + '═'.repeat(70));
        console.log('\n✅ Spot check complete!\n');

        await mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

spotCheck();
