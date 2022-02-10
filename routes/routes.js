const express = require("express");
const router = express.Router();
const controller = require("../routesController/routesController");

router.post("/register", controller.registerAuth);

router.post("/login", controller.loginAuth);

module.exports = router;
