
import * as service from "./settings.service.js";

export const getSettings = async (req, res, next) => {
    try {
        const settings = await service.getSettings();
        res.json(settings);
    } catch (err) {
        next(err);
    }
};

export const updateSettings = async (req, res, next) => {
    try {
        const settings = await service.updateSettings(req.body);
        res.json(settings);
    } catch (err) {
        next(err);
    }
};
