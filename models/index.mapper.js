import mongoose from "mongoose";
import Contact from "./contact.mapper.js";
import Event from "./event.mapper.js";
import User from "./user.mapper.js";

export const ContactMapper = new Contact(mongoose);
export const EventMapper = new Event(mongoose);
export const UserMapper = new User(mongoose);
