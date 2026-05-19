import { EventMapper } from "../../models/index.mapper.js";

export function getEventsViewData(events) {
  return {
    title: "Mes événements",
    events: events.map(formatEvent),
    scripts: ["/js/events.js"],
  };
}

export async function createEvent(eventData, userId) {
  const { user, userId: eventUserId, ...eventPayload } = eventData;

  return EventMapper.createEvent({
    ...eventPayload,
    user: userId || user || eventUserId,
    participants: formatParticipants(eventData.participants),
  });
}

export async function updateEvent(eventId, eventData, userId) {
  const event = await EventMapper.getEventByIdAndUser(eventId, userId);

  if (!event) {
    return null;
  }

  return EventMapper.updateEvent(eventId, {
    ...eventData,
    user: userId,
    participants: formatParticipants(eventData.participants),
  });
}

export async function deleteEvent(eventId, userId) {
  return EventMapper.deleteEventByIdAndUser(eventId, userId);
}

export async function getEventViewData(eventId, userId) {
  const event = await EventMapper.getEventByIdAndUser(eventId, userId);

  if (!event) {
    return null;
  }

  return {
    title: event.title,
    event: formatEvent(event),
  };
}

function formatEvent(event) {
  const eventData = typeof event.toObject === "function" ? event.toObject() : event;

  return {
    ...eventData,
    id: eventData._id?.toString() || eventData.id,
    dateLabel: formatDate(eventData.date),
    dateInputValue: formatDateInput(eventData.date),
  };
}

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateInput(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toISOString().split("T")[0];
}

function formatParticipants(participants) {
  if (!participants) {
    return [];
  }

  if (Array.isArray(participants)) {
    return participants;
  }

  return participants
    .split(",")
    .map((participant) => participant.trim())
    .filter(Boolean);
}
