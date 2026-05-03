import { getCreateEventViewData, getEventViewData } from "./event.services.js";

export function showEvent(req, res) {
  res.render("event", getEventViewData());
}

export function showCreateEvent(req, res) {
  res.render("create-event", getCreateEventViewData());
}

export function createEvent(req, res) {
  console.log(req.body);
  res.redirect("/create-event");
}
