import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../features/auth/auth.schema.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function seedUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await User.deleteMany({});
        console.log('🗑️  Cleared existing users');

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            fullName: 'System Admin',
            email: 'admin@quickedu.co.in',
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('✅ Created Admin: admin@quickedu.co.in / admin123');

        const studentPassword = await bcrypt.hash('user123', 10);
        const student = await User.create({
            fullName: 'Test Student',
            email: 'user@quickedu.co.in',
            username: 'student',
            password: studentPassword,
            role: 'student'
        });
        console.log('✅ Created Student: user@quickedu.co.in / user123');

        await mongoose.connection.close();
        console.log('✅ User seeding completed');
    } catch (error) {
        console.error('❌ Error seeding users:', error);
    }
}

seedUsers();
