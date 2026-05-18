import express from "express";
import authRouter from "./module/auth/auth.routes.js";
import eventRouter from "./module/event/event.routes.js";
import homeRouter from "./module/home/home.routes.js";
import userRouter from "./module/user/user.routes.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", homeRouter);
router.use("/", eventRouter);
router.use("/", userRouter);

export default router;
