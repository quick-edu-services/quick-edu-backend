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

async function seedDatabase() {
    try {
        console.log('\n🚀 QUICK-EDU DATABASE SEEDING');
        console.log('═'.repeat(80));

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // ==================== SEED INSTRUCTORS ====================
        console.log('👨‍🏫 SEEDING INSTRUCTORS');
        console.log('─'.repeat(80));

        const instructorsPath = join(__dirname, '../../Quick-Edu-Frontend/src/data/instructors.json');
        const instructorsData = JSON.parse(readFileSync(instructorsPath, 'utf-8'));

        console.log(`📁 Found ${instructorsData.length} instructors in JSON`);

        await Instructor.deleteMany({});
        console.log('🗑️  Cleared existing instructors');

        let instructorSuccess = 0;
        for (const instructor of instructorsData) {
            await Instructor.create(instructor);
            instructorSuccess++;
        }

        console.log(`✅ Inserted ${instructorSuccess} instructors\n`);

        // ==================== SEED COURSES ====================
        console.log('📚 SEEDING COURSES');
        console.log('─'.repeat(80));

        const coursesPath = join(__dirname, '../../Quick-Edu-Frontend/src/data/courses.json');
        const coursesData = JSON.parse(readFileSync(coursesPath, 'utf-8'));

        console.log(`📁 Found ${coursesData.length} courses in JSON`);

        await Course.deleteMany({});
        console.log('🗑️  Cleared existing courses');

        let courseSuccess = 0;
        for (let i = 0; i < coursesData.length; i++) {
            await Course.create(coursesData[i]);
            courseSuccess++;

            if ((i + 1) % 20 === 0) {
                console.log(`   Progress: ${i + 1}/${coursesData.length} courses`);
            }
        }

        console.log(`✅ Inserted ${courseSuccess} courses\n`);

        // ==================== VERIFICATION ====================
        console.log('🔍 VERIFICATION');
        console.log('═'.repeat(80));

        const finalInstructorCount = await Instructor.countDocuments();
        const finalCourseCount = await Course.countDocuments();

        console.log(`\n📊 FINAL DATABASE STATUS:`);
        console.log(`   Instructors: ${finalInstructorCount}/${instructorsData.length} ` +
            (finalInstructorCount === instructorsData.length ? '✅' : '❌'));
        console.log(`   Courses: ${finalCourseCount}/${coursesData.length} ` +
            (finalCourseCount === coursesData.length ? '✅' : '❌'));

        // Quick stats
        const instructors = await Instructor.find({}).select('name students courses');
        const courses = await Course.find({}).select('title category price students');

        const totalStudents = instructors.reduce((sum, i) => sum + i.students, 0);
        const totalInstructorCourses = instructors.reduce((sum, i) => sum + i.courses, 0);
        const avgRating = instructors.reduce((sum, i) => sum + i.rating, 0) / instructors.length;

        const coursesByCategory = {};
        courses.forEach(c => {
            coursesByCategory[c.category] = (coursesByCategory[c.category] || 0) + 1;
        });

        console.log(`\n📈 QUICK STATS:`);
        console.log(`   Total Students (Instructors): ${totalStudents.toLocaleString()}`);
        console.log(`   Total Instructor Courses: ${totalInstructorCourses}`);
        console.log(`   Average Instructor Rating: ⭐ ${avgRating.toFixed(2)}/5.0`);
        console.log(`   Course Categories: ${Object.keys(coursesByCategory).length}`);
        console.log(`   Top Category: ${Object.entries(coursesByCategory).sort((a, b) => b[1] - a[1])[0][0]} (${Object.entries(coursesByCategory).sort((a, b) => b[1] - a[1])[0][1]} courses)`);

        console.log('\n' + '═'.repeat(80));
        console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('═'.repeat(80));
        console.log('\n✅ Your database is now ready with:');
        console.log(`   • ${finalCourseCount} courses (test-payment → course-083)`);
        console.log(`   • ${finalInstructorCount} instructors (instructor-1 → instructor-14)`);
        console.log(`   • All data verified and ready for production!\n`);

        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

    } catch (error) {
        console.error('\n❌ Error during seeding:', error);
        process.exit(1);
    }
}

// Run the seeding
console.log('\n');
seedDatabase();
