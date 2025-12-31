import * as transactionService from "./transaction.service.js";

export const createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.recordTransaction(req.body);
        res.status(201).json({
            success: true,
            message: "Transaction recorded successfully",
            data: transaction
        });
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export const getMyTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getTransactions({ userId: req.user._id });
        res.status(200).json({
            success: true,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
