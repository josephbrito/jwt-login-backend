const jwt = require("jsonwebtoken");
const { LocalStorage } = require("node-localstorage");

module.exports = function (req, res, next) {
  const token = req.header("authorization-token");
  if (!token) return res.status(401).send("acesso negado");

  try {
    const userverify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = userverify;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send("acesso negado no catch");
  }
};
