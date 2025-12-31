import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Course } from '../features/courses/course.schema.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function verifySeeding() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Read courses from JSON file
        const coursesPath = join(__dirname, '../../Quick-Edu-Frontend/src/data/courses.json');
        const jsonCourses = JSON.parse(readFileSync(coursesPath, 'utf-8'));
        const jsonIds = jsonCourses.map(c => c.id).sort();

        // Get courses from database
        const dbCourses = await Course.find({}).select('id title category level price');
        const dbIds = dbCourses.map(c => c.id).filter(id => id).sort();

        console.log('📊 VERIFICATION REPORT');
        console.log('═'.repeat(60));
        console.log(`\n📁 JSON File: ${jsonCourses.length} courses`);
        console.log(`💾 Database: ${dbCourses.length} courses`);
        console.log(`\n✅ Match: ${jsonIds.length === dbIds.length ? 'YES' : 'NO'}`);

        // Find missing courses
        const missingInDb = jsonIds.filter(id => !dbIds.includes(id));
        const extraInDb = dbIds.filter(id => !jsonIds.includes(id));

        if (missingInDb.length > 0) {
            console.log(`\n❌ Missing in Database (${missingInDb.length}):`);
            missingInDb.forEach(id => {
                const course = jsonCourses.find(c => c.id === id);
                console.log(`   - ${id}: ${course?.title || 'Unknown'}`);
            });
        } else {
            console.log('\n✅ All courses from JSON are in the database!');
        }

        if (extraInDb.length > 0) {
            console.log(`\n⚠️  Extra in Database (${extraInDb.length}):`);
            extraInDb.forEach(id => console.log(`   - ${id}`));
        }

        // Category breakdown
        console.log('\n📂 COURSES BY CATEGORY:');
        console.log('─'.repeat(60));
        const categoryCount = {};
        dbCourses.forEach(c => {
            categoryCount[c.category] = (categoryCount[c.category] || 0) + 1;
        });
        Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .forEach(([category, count]) => {
                console.log(`   ${category.padEnd(30)} : ${count} courses`);
            });

        // Level breakdown
        console.log('\n📊 COURSES BY LEVEL:');
        console.log('─'.repeat(60));
        const levelCount = {};
        dbCourses.forEach(c => {
            levelCount[c.level] = (levelCount[c.level] || 0) + 1;
        });
        Object.entries(levelCount)
            .sort((a, b) => b[1] - a[1])
            .forEach(([level, count]) => {
                console.log(`   ${level.padEnd(30)} : ${count} courses`);
            });

        // Price range
        const prices = dbCourses.map(c => c.price).filter(p => p > 0);
        console.log('\n💰 PRICE STATISTICS:');
        console.log('─'.repeat(60));
        console.log(`   Minimum Price: ₹${Math.min(...prices).toLocaleString('en-IN')}`);
        console.log(`   Maximum Price: ₹${Math.max(...prices).toLocaleString('en-IN')}`);
        console.log(`   Average Price: ₹${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString('en-IN')}`);

        // Complete course list
        console.log('\n📋 COMPLETE COURSE LIST (ID Range):');
        console.log('─'.repeat(60));
        console.log(`   From: ${dbIds[0]}`);
        console.log(`   To: ${dbIds[dbIds.length - 1]}`);
        console.log(`\n   All IDs: ${dbIds.join(', ')}`);

        await mongoose.connection.close();
        console.log('\n' + '═'.repeat(60));
        console.log('✅ Verification complete!\n');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

verifySeeding();
