import express from "express";
import { removeUser } from "./user.controllers.js";

const router = express.Router();

router.delete("/users/:userId", removeUser);

export default router;
