import { getLoginViewData, getRegisterViewData, loginUser, registerUser } from "./auth.services.js";

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

export async function login(req, res) {
  try {
    const { user, events } = await loginUser(req.body);

    req.session.user = user;
    req.session.events = events;
    req.user = user;
    res.locals.user = req.user;
    res.locals.events = events;

    return req.session.save((error) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      return res.redirect("/");
    });
  } catch (error) {
    return res.status(401).render("auth/login", {
      ...getLoginViewData(),
      error: error.message,
    });
  }
}
