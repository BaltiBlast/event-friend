import express from "express";
import { register, showLogin, showRegister } from "./auth.controllers.js";

const router = express.Router();

router.get("/login", showLogin);
router.get("/register", showRegister);
router.post("/register", register);

export default router;
