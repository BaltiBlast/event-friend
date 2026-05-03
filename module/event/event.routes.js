import express from "express";
import { createEvent, showCreateEvent, showEvent } from "./event.controllers.js";

const router = express.Router();

router.get("/event", showEvent);
router.get("/create-event", showCreateEvent);
router.post("/create-event", createEvent);

export default router;
