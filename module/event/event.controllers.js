import { createEvent as createEventService, getCreateEventViewData, getEventViewData } from "./event.services.js";

export function showEvent(req, res) {
  res.render("event", getEventViewData());
}

export function showCreateEvent(req, res) {
  res.render("create-event", getCreateEventViewData());
}

export async function createEvent(req, res) {
  try {
    const userId = req.user?._id || req.user?.id || req.body.userId || req.body.user;
    const event = await createEventService(req.body, userId);

    if (req.is("application/json")) {
      return res.status(201).json(event);
    }

    return res.redirect("/event");
  } catch (error) {
    if (req.is("application/json")) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(400).render("create-event", {
      ...getCreateEventViewData(),
      error: error.message,
    });
  }
}
