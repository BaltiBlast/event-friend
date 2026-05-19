import {
  createContact as createContactService,
  deleteContact as deleteContactService,
  getContactsViewData,
  updateContact as updateContactService,
} from "./contact.services.js";

export function showContacts(req, res) {
  res.render("contacts", getContactsViewData());
}

export async function createContact(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const contact = await createContactService(req.body, userId);

    req.session.contacts = [...(req.session.contacts || []), contact.toObject()];

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/contacts");
    });
  } catch (error) {
    return res.status(400).render("contacts", {
      ...getContactsViewData(),
      error: error.message,
    });
  }
}

export async function updateContact(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const contact = await updateContactService(req.params.contactId, req.body, userId);

    if (!contact) {
      return res.status(404).send("Contact introuvable.");
    }

    req.session.contacts = (req.session.contacts || []).map((sessionContact) => {
      const sessionContactId = sessionContact._id?.toString() || sessionContact.id;

      if (sessionContactId === contact.id) {
        return contact.toObject();
      }

      return sessionContact;
    });

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/contacts");
    });
  } catch (error) {
    return res.status(400).render("contacts", {
      ...getContactsViewData(),
      error: error.message,
    });
  }
}

export async function deleteContact(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const contact = await deleteContactService(req.params.contactId, userId);

    if (!contact) {
      return res.status(404).send("Contact introuvable.");
    }

    req.session.contacts = (req.session.contacts || []).filter((sessionContact) => {
      const sessionContactId = sessionContact._id?.toString() || sessionContact.id;

      return sessionContactId !== contact.id;
    });

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/contacts");
    });
  } catch (error) {
    return res.status(400).render("contacts", {
      ...getContactsViewData(),
      error: error.message,
    });
  }
}
