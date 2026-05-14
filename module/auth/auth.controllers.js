import { getLoginViewData } from "./auth.services.js";

export function showLogin(req, res) {
  res.render("auth/login", getLoginViewData());
}
