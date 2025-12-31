import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Instructor } from '../features/instructors/instructor.schema.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedAllInstructors() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Read instructors from JSON file
        const instructorsPath = join(__dirname, '../../Quick-Edu-Frontend/src/data/instructors.json');
        const instructorsData = JSON.parse(readFileSync(instructorsPath, 'utf-8'));

        console.log(`\n👨‍🏫 Found ${instructorsData.length} instructors in JSON file`);
        console.log(`   First instructor: ${instructorsData[0].id} - ${instructorsData[0].name}`);
        console.log(`   Last instructor: ${instructorsData[instructorsData.length - 1].id} - ${instructorsData[instructorsData.length - 1].name}`);

        // Check current database state
        const existingInstructors = await Instructor.find({});
        console.log(`\n📊 Current database has ${existingInstructors.length} instructors`);

        // Clear existing instructors
        console.log('\n🗑️  Clearing existing instructors...');
        await Instructor.deleteMany({});
        console.log('   ✅ Cleared successfully');

        // Insert all instructors
        console.log(`\n📥 Inserting ${instructorsData.length} instructors...`);

        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        for (let i = 0; i < instructorsData.length; i++) {
            const instructorData = instructorsData[i];
            try {
                await Instructor.create(instructorData);
                successCount++;
                console.log(`   ✅ [${i + 1}/${instructorsData.length}] ${instructorData.id} - ${instructorData.name}`);
            } catch (error) {
                errorCount++;
                errors.push({
                    instructorId: instructorData.id,
                    name: instructorData.name,
                    error: error.message
                });
                console.log(`   ❌ [${i + 1}/${instructorsData.length}] ${instructorData.id} - ${instructorData.name}: ${error.message}`);
            }
        }

        console.log(`\n✅ Insertion complete!`);
        console.log(`   ✅ Successfully inserted: ${successCount} instructors`);
        if (errorCount > 0) {
            console.log(`   ❌ Failed: ${errorCount} instructors`);
        }

        // Verify final count
        const finalCount = await Instructor.countDocuments();
        console.log(`\n📊 Final database count: ${finalCount} instructors`);

        // Show all inserted instructors
        const allInstructors = await Instructor.find({}).select('id name title students courses').sort({ id: 1 });
        console.log('\n👥 ALL INSTRUCTORS IN DATABASE:');
        console.log('═'.repeat(80));
        allInstructors.forEach((inst, idx) => {
            console.log(`${(idx + 1).toString().padStart(2)}. ${inst.id.padEnd(15)} | ${inst.name.padEnd(25)} | ${inst.title}`);
            console.log(`    Students: ${inst.students.toLocaleString().padEnd(10)} | Courses: ${inst.courses}`);
        });

        // List all instructor IDs
        const allIds = allInstructors.map(i => i.id).filter(id => id);
        console.log('\n📋 All instructor IDs:');
        console.log(`   ${allIds.join(', ')}`);

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        console.log('\n🎉 Instructor seeding completed successfully!');

    } catch (error) {
        console.error('\n❌ Error during seeding:', error);
        process.exit(1);
    }
}

seedAllInstructors();
