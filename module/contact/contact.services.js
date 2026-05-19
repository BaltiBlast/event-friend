import { ContactMapper } from "../../models/index.mapper.js";

export function getContactsViewData() {
  return {
    title: "Contacts",
    scripts: ["/js/contacts.js"],
  };
}

export async function createContact(contactData, userId) {
  return ContactMapper.createContact(formatContactData(contactData), userId);
}

export async function updateContact(contactId, contactData, userId) {
  return ContactMapper.updateContact(contactId, formatContactData(contactData), userId);
}

export async function deleteContact(contactId, userId) {
  return ContactMapper.deleteContact(contactId, userId);
}

function formatContactData(contactData) {
  const { lastName, firstName, nickname, email, phone, address } = contactData;

  return {
    lastName,
    firstName,
    nickname,
    email,
    phone,
    address,
  };
}
