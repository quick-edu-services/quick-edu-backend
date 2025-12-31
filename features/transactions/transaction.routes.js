import express from "express";
import * as transactionController from "./transaction.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = express.Router();

// Publicly accessible for recording (after payment gateway verify)
// or we can protect it with user token if we send it from frontend
router.post("/record", authenticate, transactionController.createTransaction);
router.get("/my-history", authenticate, transactionController.getMyTransactions);

export default router;
