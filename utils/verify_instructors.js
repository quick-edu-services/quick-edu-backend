import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Instructor } from '../features/instructors/instructor.schema.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function verifyInstructors() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Read instructors from JSON file
        const instructorsPath = join(__dirname, '../../Quick-Edu-Frontend/src/data/instructors.json');
        const jsonInstructors = JSON.parse(readFileSync(instructorsPath, 'utf-8'));
        const jsonIds = jsonInstructors.map(i => i.id).sort();

        // Get instructors from database
        const dbInstructors = await Instructor.find({}).select('id name title rating students courses expertise');
        const dbIds = dbInstructors.map(i => i.id).filter(id => id).sort();

        console.log('📊 INSTRUCTOR VERIFICATION REPORT');
        console.log('═'.repeat(80));
        console.log(`\n📁 JSON File: ${jsonInstructors.length} instructors`);
        console.log(`💾 Database: ${dbInstructors.length} instructors`);
        console.log(`\n✅ Match: ${jsonIds.length === dbIds.length ? 'YES' : 'NO'}`);

        // Find missing instructors
        const missingInDb = jsonIds.filter(id => !dbIds.includes(id));
        const extraInDb = dbIds.filter(id => !jsonIds.includes(id));

        if (missingInDb.length > 0) {
            console.log(`\n❌ Missing in Database (${missingInDb.length}):`);
            missingInDb.forEach(id => {
                const instructor = jsonInstructors.find(i => i.id === id);
                console.log(`   - ${id}: ${instructor?.name || 'Unknown'}`);
            });
        } else {
            console.log('\n✅ All instructors from JSON are in the database!');
        }

        if (extraInDb.length > 0) {
            console.log(`\n⚠️  Extra in Database (${extraInDb.length}):`);
            extraInDb.forEach(id => console.log(`   - ${id}`));
        }

        // Detailed instructor list
        console.log('\n👥 COMPLETE INSTRUCTOR ROSTER:');
        console.log('═'.repeat(80));

        const sortedInstructors = dbInstructors.sort((a, b) => {
            const numA = parseInt(a.id.replace('instructor-', ''));
            const numB = parseInt(b.id.replace('instructor-', ''));
            return numA - numB;
        });

        sortedInstructors.forEach((inst, idx) => {
            console.log(`\n${(idx + 1).toString().padStart(2)}. ${inst.id} - ${inst.name}`);
            console.log(`    Title: ${inst.title}`);
            console.log(`    Rating: ⭐ ${inst.rating}/5.0`);
            console.log(`    Students: ${inst.students.toLocaleString()} | Courses: ${inst.courses}`);
            console.log(`    Expertise: ${inst.expertise?.join(', ') || 'N/A'}`);
        });

        // Statistics
        console.log('\n📈 STATISTICS:');
        console.log('═'.repeat(80));

        const totalStudents = dbInstructors.reduce((sum, i) => sum + i.students, 0);
        const totalCourses = dbInstructors.reduce((sum, i) => sum + i.courses, 0);
        const avgRating = dbInstructors.reduce((sum, i) => sum + i.rating, 0) / dbInstructors.length;

        console.log(`   Total Students Taught: ${totalStudents.toLocaleString()}`);
        console.log(`   Total Courses Created: ${totalCourses}`);
        console.log(`   Average Rating: ⭐ ${avgRating.toFixed(2)}/5.0`);
        console.log(`   Avg Students per Instructor: ${Math.round(totalStudents / dbInstructors.length).toLocaleString()}`);
        console.log(`   Avg Courses per Instructor: ${(totalCourses / dbInstructors.length).toFixed(1)}`);

        // Top instructors
        console.log('\n🏆 TOP INSTRUCTORS:');
        console.log('─'.repeat(80));

        console.log('\n   By Students:');
        const byStudents = [...dbInstructors].sort((a, b) => b.students - a.students).slice(0, 5);
        byStudents.forEach((inst, idx) => {
            console.log(`   ${idx + 1}. ${inst.name.padEnd(25)} - ${inst.students.toLocaleString()} students`);
        });

        console.log('\n   By Rating:');
        const byRating = [...dbInstructors].sort((a, b) => b.rating - a.rating).slice(0, 5);
        byRating.forEach((inst, idx) => {
            console.log(`   ${idx + 1}. ${inst.name.padEnd(25)} - ⭐ ${inst.rating}/5.0`);
        });

        console.log('\n   By Courses:');
        const byCourses = [...dbInstructors].sort((a, b) => b.courses - a.courses).slice(0, 5);
        byCourses.forEach((inst, idx) => {
            console.log(`   ${idx + 1}. ${inst.name.padEnd(25)} - ${inst.courses} courses`);
        });

        // ID list
        console.log('\n📋 ALL INSTRUCTOR IDs:');
        console.log('─'.repeat(80));
        console.log(`   ${dbIds.join(', ')}`);

        await mongoose.connection.close();
        console.log('\n' + '═'.repeat(80));
        console.log('✅ Verification complete!\n');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

verifyInstructors();
