import express from "express";
import { showLogin } from "./auth.controllers.js";

const router = express.Router();

router.get("/login", showLogin);

export default router;
