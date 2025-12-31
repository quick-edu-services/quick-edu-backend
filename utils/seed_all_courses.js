import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Course } from '../features/courses/course.schema.js';
import { Instructor } from '../features/instructors/instructor.schema.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedAllCourses() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Read courses from JSON file
        const coursesPath = join(__dirname, '../../Quick-Edu-Frontend/src/data/courses.json');
        const coursesData = JSON.parse(readFileSync(coursesPath, 'utf-8'));

        console.log(`\n📚 Found ${coursesData.length} courses in JSON file`);
        console.log(`   First course: ${coursesData[0].id}`);
        console.log(`   Last course: ${coursesData[coursesData.length - 1].id}`);

        // Check current database state
        const existingCourses = await Course.find({});
        console.log(`\n📊 Current database has ${existingCourses.length} courses`);

        // Clear existing courses
        console.log('\n🗑️  Clearing existing courses...');
        await Course.deleteMany({});
        console.log('   ✅ Cleared successfully');

        // Insert all courses
        console.log(`\n📥 Inserting ${coursesData.length} courses...`);

        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        for (let i = 0; i < coursesData.length; i++) {
            const courseData = coursesData[i];
            try {
                await Course.create(courseData);
                successCount++;

                // Progress indicator every 10 courses
                if ((i + 1) % 10 === 0) {
                    console.log(`   Progress: ${i + 1}/${coursesData.length} courses inserted`);
                }
            } catch (error) {
                errorCount++;
                errors.push({
                    courseId: courseData.id,
                    title: courseData.title,
                    error: error.message
                });
            }
        }

        console.log(`\n✅ Insertion complete!`);
        console.log(`   ✅ Successfully inserted: ${successCount} courses`);
        if (errorCount > 0) {
            console.log(`   ❌ Failed: ${errorCount} courses`);
            console.log('\n❌ Errors:');
            errors.forEach(err => {
                console.log(`   - ${err.courseId} (${err.title}): ${err.error}`);
            });
        }

        // Verify final count
        const finalCount = await Course.countDocuments();
        console.log(`\n📊 Final database count: ${finalCount} courses`);

        // Show sample of inserted courses
        const sampleCourses = await Course.find({}).select('id title').limit(5).sort({ id: 1 });
        console.log('\n📝 Sample courses (first 5):');
        sampleCourses.forEach(c => console.log(`   - ${c.id}: ${c.title}`));

        const lastCourses = await Course.find({}).select('id title').limit(5).sort({ id: -1 });
        console.log('\n📝 Sample courses (last 5):');
        lastCourses.reverse().forEach(c => console.log(`   - ${c.id}: ${c.title}`));

        // List all course IDs to verify completeness
        const allCourses = await Course.find({}).select('id').sort({ id: 1 });
        const allIds = allCourses.map(c => c.id).filter(id => id);
        console.log(`\n📋 All ${allIds.length} course IDs in database:`);
        console.log(`   ${allIds.join(', ')}`);

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        console.log('\n🎉 Seed completed successfully!');

    } catch (error) {
        console.error('\n❌ Error during seeding:', error);
        process.exit(1);
    }
}

seedAllCourses();
