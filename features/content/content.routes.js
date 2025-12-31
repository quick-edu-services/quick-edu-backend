
import express from "express";
import * as ctrl from "./content.controller.js";

const router = express.Router();

router.get("/:type", ctrl.getContent);
router.put("/:type", ctrl.updateContent);

export default router;
