import { getLoginViewData, getRegisterViewData } from "./auth.services.js";

export function showLogin(req, res) {
  res.render("auth/login", getLoginViewData());
}

export function showRegister(req, res) {
  res.render("auth/register", getRegisterViewData());
}
