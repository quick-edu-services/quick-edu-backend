import * as service from "./auth.service.js";
import status from "../../utils/statusCodes.js";
import messages from "../../utils/messages.js";
import { success } from "../../utils/response.js";

export const signup = async (req, res, next) => {
  try {
    await service.signup(req.body);
    success(res, status.CREATED, messages.SIGNUP_SUCCESS);
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    success(res, status.OK, messages.LOGIN_SUCCESS, data);
  } catch (err) { next(err); }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const data = await service.forgotPassword(req.body);
    success(res, status.OK, "OTP sent successfully", data);
  } catch (err) { next(err); }
};

export const resetPassword = async (req, res, next) => {
  try {
    const data = await service.resetPassword(req.body);
    success(res, status.OK, "Password reset successful", data);
  } catch (err) { next(err); }
};

export const registerAdmin = async (req, res, next) => {
  try {
    await service.registerAdmin(req.body);
    success(res, status.CREATED, "Admin registered successfully");
  } catch (err) { next(err); }
};
