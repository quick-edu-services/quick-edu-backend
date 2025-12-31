
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    section: { type: String, required: true },
    lectures: { type: Number, default: 0 },
    duration: { type: String }
});

const courseSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Keeping string ID for backward compat with frontend mock data if needed, or we can transition to _id
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    instructor: { type: String }, // redundant info for display
    instructorId: { type: String }, // should ideally be ObjectId ref
    duration: { type: String },
    lectures: { type: Number, default: 0 },
    description: { type: String },
    highlights: [{ type: String }],
    image: { type: String },
    curriculum: [sectionSchema]
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
