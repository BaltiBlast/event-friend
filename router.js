import express from "express";
import authRouter from "./module/auth/auth.routes.js";
import contactRouter from "./module/contact/contact.routes.js";
import eventRouter from "./module/event/event.routes.js";
import homeRouter from "./module/home/home.routes.js";
import userRouter from "./module/user/user.routes.js";
import { isAuthenticated } from "./utils/middlewares.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", homeRouter);
router.use(isAuthenticated);
router.use("/", contactRouter);
router.use("/", eventRouter);
router.use("/", userRouter);

export default router;
