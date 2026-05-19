import argon2 from "argon2";
import { ContactMapper, EventMapper, UserMapper } from "../../models/index.mapper.js";

export function getLoginViewData() {
  return {
    title: "Connexion - Gay'vent",
    hideChrome: false,
  };
}

export async function registerUser(userData) {
  const { email, firstName, lastName, password } = userData;
  const hashedPassword = await argon2.hash(password);

  return UserMapper.createUser({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });
}

export async function loginUser(userData) {
  const { email, password } = userData;
  const user = await UserMapper.getUserByEmail(email);

  if (!user) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  const isValidPassword = await verifyPassword(user.password, password);

  if (!isValidPassword) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  const loggedUser = removePassword(user);
  const events = await EventMapper.getEventsByUser(loggedUser._id);
  const contacts = await ContactMapper.getContactsByUser(loggedUser._id);

  return {
    user: loggedUser,
    events: events.map((event) => event.toObject()),
    contacts: contacts.map((contact) => contact.toObject()),
  };
}

export function getRegisterViewData() {
  return {
    title: "Inscription - Gay'vent",
    hideChrome: false,
  };
}

function removePassword(user) {
  const userData = user.toObject();
  delete userData.password;

  return userData;
}

async function verifyPassword(hashedPassword, password) {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch {
    return false;
  }
}
