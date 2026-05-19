import {
  createEvent as createEventService,
  getCreateEventViewData,
  getEventViewData,
  getEventsViewData,
  updateEvent as updateEventService,
} from "./event.services.js";

export function showEvents(req, res) {
  res.render("events", getEventsViewData(res.locals.events));
}

export function showCreateEvent(req, res) {
  res.render("create-event", getCreateEventViewData());
}

export async function createEvent(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const event = await createEventService(req.body, userId);

    req.session.events = [...(req.session.events || []), event.toObject()];

    if (req.is("application/json")) {
      return res.status(201).json(event);
    }

    return res.redirect("/events");
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

export async function showEvent(req, res) {
  const userId = req.user._id || req.user.id;
  const viewData = await getEventViewData(req.params.eventId, userId);

  if (!viewData) {
    return res.status(404).send("Événement introuvable.");
  }

  return res.render("event", viewData);
}

export async function updateEvent(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const event = await updateEventService(req.params.eventId, req.body, userId);

    if (!event) {
      return res.status(404).send("Événement introuvable.");
    }

    req.session.events = (req.session.events || []).map((sessionEvent) => {
      const sessionEventId = sessionEvent._id?.toString() || sessionEvent.id;

      if (sessionEventId === event.id) {
        return event.toObject();
      }

      return sessionEvent;
    });

    return res.redirect("/events");
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
