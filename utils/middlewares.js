export function isAuthenticated(req, res, next) {
  const user = req.session?.user || req.session?.userId;

  if (user) {
    return next();
  }

  if (req.accepts("html")) {
    return res.redirect("/login");
  }

  return res.status(401).json({ message: "Vous devez etre connecte pour acceder a cette route." });
}
