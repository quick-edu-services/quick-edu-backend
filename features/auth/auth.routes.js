import { Router } from "express";
import * as ctrl from "./auth.controller.js";
import { signupSchema, loginSchema } from "./auth.validation.js";

const router = Router();

router.post("/signup",
  /* 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Signup Data',
      required: true,
      schema: {
        fullName: "John Doe",
        email: "john@example.com",
        password: "password123"
      }
    } 
  */
  ctrl.signup
);

router.post("/login",
  /* 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Login Data',
      required: true,
      schema: {
        email: "john@example.com",
        username: "johndoe (optional)",
        password: "password123"
      }
    } 
  */
  ctrl.login
);

router.post("/forgot-password",
  /* 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Forgot Password Data',
      required: true,
      schema: {
        email: "john@example.com"
      }
    } 
  */
  ctrl.forgotPassword
);

router.post("/reset-password",
  /* 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Reset Password Data',
      required: true,
      schema: {
        email: "john@example.com",
        otp: "123456",
        newPassword: "newpassword123"
      }
    } 
  */
  ctrl.resetPassword
);

router.post("/register-admin",
  /* 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Admin Registration Data',
      required: true,
      schema: {
        fullName: "Admin User",
        username: "adminuser",
        email: "admin@example.com",
        password: "adminpassword123"
      }
    } 
  */
  ctrl.registerAdmin
);

export default router;
