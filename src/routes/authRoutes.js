import express from "express";
// import { register } from "node:module";
import { register } from "../controllers/authController.js";
const router = express.Router();
//defination
router.post("/register", register);


export default router;