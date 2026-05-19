export function injectSessionInLocals(req, res, next) {
  req.user = req.session?.user;
  res.locals.user = req.user;
  res.locals.events = req.session?.events || [];
  res.locals.contacts = req.session?.contacts || [];
  res.locals.successMessage = req.session?.successMessage;

  delete req.session.successMessage;

  next();
}

export function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }

  if (req.accepts("html")) {
    return res.redirect("/login");
  }

  return res.status(401).json({ message: "Vous devez etre connecte pour acceder a cette route." });
}
