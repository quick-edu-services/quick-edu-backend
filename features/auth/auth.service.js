import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "./auth.schema.js";
import messages from "../../utils/messages.js";

export const signup = async (payload) => {
  const exists = await User.findOne({ email: payload.email });
  if (exists) throw messages.USER_EXISTS;

  payload.password = await bcrypt.hash(payload.password, 10);
  return await User.create(payload);
};

export const login = async (payload) => {
  // Allow login with email or username (payload.email coming from frontend might be either)
  const user = await User.findOne({
    $or: [
      { email: payload.email },
      { username: payload.email }
    ]
  });
  if (!user) throw messages.INVALID_CREDENTIALS;

  const match = await bcrypt.compare(payload.password, user.password);
  if (!match) throw messages.INVALID_CREDENTIALS;

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  const userData = user.toObject();
  delete userData.password;

  return { token, user: userData };
};

export const forgotPassword = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw messages.INVALID_CREDENTIALS;

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP before saving
  user.resetPasswordToken = await bcrypt.hash(otp, 10);
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  const message = `
    <h1>Password Reset Request</h1>
    <p>Your OTP for password reset is:</p>
    <h2>${otp}</h2>
    <p>This OTP will expire in 10 minutes.</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `Quick Edu Support <${process.env.APP_EMAIL}>`,
      to: user.email,
      subject: 'Password Reset OTP',
      html: message
    });

    return { message: "OTP sent successfully" };
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.error("Email send error:", err);
    throw new Error("Email could not be sent");
  }
};

export const resetPassword = async (payload) => {
  const { email, otp, newPassword } = payload;
  const user = await User.findOne({
    email: email,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new Error("Invalid or expired OTP");

  const isMatch = await bcrypt.compare(otp, user.resetPasswordToken);
  if (!isMatch) throw new Error("Invalid OTP");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return { message: "Password reset successful" };
};

export const registerAdmin = async (payload) => {
  const exists = await User.findOne({
    $or: [{ email: payload.email }, { username: payload.username }]
  });
  if (exists) throw messages.USER_EXISTS;

  payload.password = await bcrypt.hash(payload.password, 10);
  payload.role = 'admin';
  return await User.create(payload);
};
