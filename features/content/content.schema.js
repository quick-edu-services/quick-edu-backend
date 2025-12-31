
import mongoose from "mongoose";

const heroContentSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    ctaText: String
});

const aboutContentSchema = new mongoose.Schema({
    title: String,
    description: String,
    mission: String,
    vision: String
});

const scrollingCoursesSchema = new mongoose.Schema({
    courses: [String]
});

// Single document collection pattern for global content
const contentSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true }, // 'hero', 'about', 'scrolling'
    data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export const Content = mongoose.model("Content", contentSchema);
