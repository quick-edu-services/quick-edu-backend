import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    cfOrderId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String },
    userEmail: { type: String },
    courses: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        title: { type: String },
        price: { type: Number }
    }],
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    paymentMethod: { type: String },
    transactionDate: { type: Date, default: Date.now }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);
