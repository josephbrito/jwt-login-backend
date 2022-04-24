const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("acesso negado");

  try {
    const userverify = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = userverify;

    next();
  } catch (error) {
    res.status(401).send("acesso negado no catch");
  }
};
