import { getLoginViewData, getRegisterViewData, registerUser } from "./auth.services.js";

export function showLogin(req, res) {
  res.render("auth/login", getLoginViewData());
}

export function showRegister(req, res) {
  res.render("auth/register", getRegisterViewData());
}

export async function register(req, res) {
  try {
    await registerUser(req.body);
    res.redirect("/login");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
