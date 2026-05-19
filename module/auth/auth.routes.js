import express from "express";
import { login, logout, register, showLogin, showRegister } from "./auth.controllers.js";

const router = express.Router();

router.get("/login", showLogin);
router.get("/logout", logout);
router.get("/register", showRegister);
router.post("/login", login);
router.post("/register", register);

export default router;
