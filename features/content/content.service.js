
import { Content } from "./content.schema.js";

export const getContent = async (type) => {
    const content = await Content.findOne({ type });
    return content ? content.data : null;
};

export const updateContent = async (type, data) => {
    const content = await Content.findOneAndUpdate(
        { type },
        { type, data },
        { new: true, upsert: true }
    );
    return content.data;
};
