import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Content } from '../features/content/content.schema.js';

dotenv.config();

async function seedContent() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Seed About Content
        await Content.findOneAndUpdate(
            { type: 'about' },
            {
                type: 'about',
                data: {
                    title: "About QuickEdu",
                    description: "At QuickEdu, (MirawoTech Solutions Private Limited) where ambition meets achievement, Hyderabad's emerging learning destination.",
                    mission: "To democratize education by providing high-quality, affordable online courses that empower individuals to acquire new skills, advance their careers, and achieve their goals. We believe that everyone deserves access to world-class education, regardless of their background or location.",
                    vision: "To become the world's most trusted online learning platform, where millions of learners connect with expert instructors to build the skills they need to thrive in an ever-changing world. We envision a future where learning knows no boundaries."
                }
            },
            { upsert: true }
        );
        console.log('✅ Seeded About Content');

        // Seed Hero Content
        await Content.findOneAndUpdate(
            { type: 'hero' },
            {
                type: 'hero',
                data: {
                    title: "Unlock Your Potential with QuickEdu",
                    subtitle: "Learn from Industry Experts",
                    description: "Access 100+ high-quality courses and advance your career today.",
                    ctaText: "Explore Courses"
                }
            },
            { upsert: true }
        );
        console.log('✅ Seeded Hero Content');

        await mongoose.connection.close();
        console.log('✅ Content seeding completed');
    } catch (error) {
        console.error('❌ Error seeding content:', error);
    }
}

seedContent();
