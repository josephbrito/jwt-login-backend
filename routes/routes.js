const express = require("express");
const router = express.Router();
const controller = require("../routesController/routesController");
// const path = require("path");

// router.use(express.static(path.join("../", "front", "build")));

router.post("/register", controller.registerAuth);

router.post("/login", controller.loginAuth);

module.exports = router;
