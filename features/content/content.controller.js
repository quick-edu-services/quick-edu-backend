
import * as service from "./content.service.js";

export const getContent = async (req, res, next) => {
    try {
        const { type } = req.params;
        const content = await service.getContent(type);

        // Return default empty object if not found, rather than 404 for easier frontend handling
        res.json(content || {});
    } catch (err) {
        next(err);
    }
};

export const updateContent = async (req, res, next) => {
    try {
        const { type } = req.params;
        const content = await service.updateContent(type, req.body);
        res.json(content);
    } catch (err) {
        next(err);
    }
};
