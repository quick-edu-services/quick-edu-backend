
import { Settings } from "./settings.schema.js";

export const getSettings = async () => {
    let settings = await Settings.findOne({ type: 'general' });
    if (!settings) {
        settings = await Settings.create({ type: 'general' });
    }
    return settings;
};

export const updateSettings = async (data) => {
    return await Settings.findOneAndUpdate({ type: 'general' }, data, { new: true, upsert: true });
};
