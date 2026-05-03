import express from "express";
import eventRouter from "./module/event/event.routes.js";
import homeRouter from "./module/home/home.routes.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/", eventRouter);

export default router;
