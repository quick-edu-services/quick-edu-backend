import * as statsService from "./statistics.service.js";

export const getStats = async (req, res) => {
    try {
        const stats = await statsService.getStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStats = async (req, res) => {
    try {
        const stats = await statsService.updateStats(req.body);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
