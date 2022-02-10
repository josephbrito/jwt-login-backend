const express = require("express");
const router = express.Router();
const auth = require("./userLogged");

router.get("/", auth, (req, res) => {
  res.send("Hello World :)");
});

module.exports = router;
