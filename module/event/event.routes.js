import express from "express";
import { createEvent, deleteEvent, showCreateEvent, showEvent, showEvents, updateEvent } from "./event.controllers.js";

const router = express.Router();

router.get("/events", showEvents);
router.get("/events/:eventId", showEvent);
router.get("/create-event", showCreateEvent);
router.get("/events/create", showCreateEvent);
router.post("/create-event", createEvent);
router.post("/events/:eventId/delete", deleteEvent);
router.post("/events/:eventId/update", updateEvent);

export default router;
