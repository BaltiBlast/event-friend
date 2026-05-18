import express from "express";
import { removeUser, updateUserById } from "./user.controllers.js";

const router = express.Router();

router.patch("/users/:userId", updateUserById);
router.delete("/users/:userId", removeUser);

export default router;
