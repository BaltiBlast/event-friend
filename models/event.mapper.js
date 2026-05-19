import CoreMapper from "./core.mapper.js";
import eventSchema from "../schemas/event.schemas.js";

class Event extends CoreMapper {
  constructor(mongoose) {
    super(mongoose);
    this.model = this.mongoose.models.Event || this.mongoose.model("Event", eventSchema);
  }

  async createEvent(eventData) {
    return this.model.create(eventData);
  }

  async updateEvent(eventId, eventData) {
    return this.model.findByIdAndUpdate(eventId, eventData, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async deleteEvent(eventId) {
    return this.model.findByIdAndDelete(eventId);
  }

  async getEventsByUser(userId) {
    return this.model.find({ user: userId }).sort({ date: 1, time: 1 });
  }

  async getEventByIdAndUser(eventId, userId) {
    return this.model.findOne({ _id: eventId, user: userId });
  }
}

export default Event;
