import express from "express";
import * as statsController from "./statistics.controller.js";

const router = express.Router();

router.get("/", statsController.getStats);
router.put("/", statsController.updateStats);

export default router;
