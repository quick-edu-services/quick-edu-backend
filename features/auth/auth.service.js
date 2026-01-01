import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "./auth.schema.js";
import messages from "../../utils/messages.js";

// Initialize transporter with improved configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL/TLS
  pool: true,   // Use connection pooling for better performance
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Transporter configuration error:", error);
  } else {
    console.log("Mail server is ready to take our messages");
  }
});

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

  // Hash the OTP with minimum rounds (fastest for limited hardware like Render free tier)
  user.resetPasswordToken = await bcrypt.hash(otp, 4);
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  const message = `
    <h1>Password Reset Request</h1>
    <p>Your OTP for password reset is:</p>
    <h2 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${otp}</h2>
    <p>This OTP will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  // Send email asynchronously
  transporter.sendMail({
    from: `"Quick Edu Support" <${process.env.APP_EMAIL}>`,
    to: user.email,
    subject: 'Password Reset OTP',
    html: message
  }).then(info => {
    console.log(`OTP Email sent successfully to ${user.email}. MessageId: ${info.messageId}`);
  }).catch(err => {
    console.error("Critical: OTP Email delivery failed:", err);
  });

  return { message: "OTP sent successfully" };
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
