import mongoose from "mongoose";
import Event from "./event.mapper.js";
import User from "./user.mapper.js";

export const EventMapper = new Event(mongoose);
export const UserMapper = new User(mongoose);
