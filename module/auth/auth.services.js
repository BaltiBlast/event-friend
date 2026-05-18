import { UserMapper } from "../../models/index.mapper.js";

export function getLoginViewData() {
  return {
    title: "Connexion - Gay'vent",
    hideChrome: false,
  };
}

export async function registerUser(userData) {
  const { email, firstName, lastName, password } = userData;

  return UserMapper.createUser({
    email,
    firstName,
    lastName,
    password,
  });
}

export function getRegisterViewData() {
  return {
    title: "Inscription - Gay'vent",
    hideChrome: false,
  };
}
