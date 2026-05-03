import { getHomeViewData } from "./home.services.js";

export function showHome(req, res) {
  res.render("home", getHomeViewData());
}
