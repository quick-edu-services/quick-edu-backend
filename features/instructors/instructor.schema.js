
import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
    twitter: { type: String },
    linkedin: { type: String },
    website: { type: String }
});

const instructorSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    avatar: { type: String }, // Initial or URL
    rating: { type: Number, default: 4.5 },
    students: { type: Number, default: 0 },
    courses: { type: Number, default: 0 },
    bio: { type: String },
    expertise: [{ type: String }],
    social: socialSchema
}, { timestamps: true });

export const Instructor = mongoose.model("Instructor", instructorSchema);
