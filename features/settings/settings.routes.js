
import express from "express";
import * as ctrl from "./settings.controller.js";

const router = express.Router();

router.get("/", ctrl.getSettings);
router.put("/", ctrl.updateSettings);

export default router;
