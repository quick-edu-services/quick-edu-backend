
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    type: { type: String, default: 'general', unique: true },
    siteName: { type: String, default: 'QuickEdu' },
    tagline: { type: String, default: 'LEARN • GROW • SUCCEED' },
    email: { type: String, default: 'info@quickedu.org.in' },
    phone: { type: String, default: '+91 9392328940' },
    address: { type: String, default: 'PLOT NO - 39/C, H. NO - 301, SR TOWERS, HMT HILLS, ADDAGUTTA, TIRUMALAGIRI, KUKATPALLY, Medchal - Malkajgiri, HYDERABAD, TELANGANA - 500072, INDIA' },
    aboutText: { type: String, default: "At QuickEdu, (MirawoTech Solutions Private Limited) where ambition meets achievement, Hyderabad's emerging learning destination. Your online path to progress simple, smart, and career-focused. Empowering learners to rise with skill, clarity, and confidence." },
    socialLinks: {
        facebook: { type: String, default: '#' },
        twitter: { type: String, default: '#' },
        linkedin: { type: String, default: '#' },
        instagram: { type: String, default: '#' }
    }
}, { timestamps: true });

export const Settings = mongoose.model("Settings", settingsSchema);
