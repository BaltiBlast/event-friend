import {
  createEvent as createEventService,
  deleteEvent as deleteEventService,
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
    req.session.successMessage = `${event.title} a bien été créé !`;

    if (req.is("application/json")) {
      return res.status(201).json(event);
    }

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/events");
    });
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
    req.session.successMessage = `${event.title} a bien été mis à jour !`;

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/events");
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export async function deleteEvent(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const event = await deleteEventService(req.params.eventId, userId);

    if (!event) {
      return res.status(404).send("Événement introuvable.");
    }

    req.session.events = (req.session.events || []).filter((sessionEvent) => {
      const sessionEventId = sessionEvent._id?.toString() || sessionEvent.id;

      return sessionEventId !== event.id;
    });
    req.session.successMessage = `${event.title} a bien été supprimé !`;

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/events");
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
