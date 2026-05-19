import argon2 from "argon2";
import { UserMapper } from "../../models/index.mapper.js";

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

export function getRegisterViewData() {
  return {
    title: "Inscription - Gay'vent",
    hideChrome: false,
  };
}
