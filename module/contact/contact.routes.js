import express from "express";
import { createContact, deleteContact, showContacts, updateContact } from "./contact.controllers.js";

const router = express.Router();

router.get("/contacts", showContacts);
router.post("/contacts", createContact);
router.post("/contacts/:contactId/delete", deleteContact);
router.post("/contacts/:contactId/update", updateContact);

export default router;
