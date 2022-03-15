const jwt = require("jsonwebtoken");

//validate user token
function userAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acess denied. Token is required");
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

//check admin
function isAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
}

module.exports = {
  userAuth,
  isAdmin,
};
