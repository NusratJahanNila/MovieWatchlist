import express from "express";
// import { register } from "node:module";
import { register, login, logout } from "../controllers/authController.js";
const router = express.Router();
//defination
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


export default router;