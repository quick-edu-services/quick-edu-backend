import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
    type: { type: String, default: 'manual', unique: true },
    activeStudents: { type: String, default: '250,000+' },
    branches: { type: String, default: '3+' }
}, { timestamps: true });

export const Statistics = mongoose.model("Statistics", statisticsSchema);
