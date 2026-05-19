import CoreMapper from "./core.mapper.js";
import contactSchema from "../schemas/contact.schemas.js";

class Contact extends CoreMapper {
  constructor(mongoose) {
    super(mongoose);
    this.model = this.mongoose.models.Contact || this.mongoose.model("Contact", contactSchema);
  }

  async createContact(contactData, userId) {
    return this.model.create({
      ...contactData,
      user: userId,
    });
  }

  async getContactsByUser(userId) {
    return this.model.find({ user: userId }).sort({ lastName: 1, firstName: 1 });
  }

  async updateContact(contactId, contactData, userId) {
    return this.model.findOneAndUpdate(
      {
        _id: contactId,
        user: userId,
      },
      contactData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
  }

  async deleteContact(contactId, userId) {
    return this.model.findOneAndDelete({
      _id: contactId,
      user: userId,
    });
  }
}

export default Contact;
