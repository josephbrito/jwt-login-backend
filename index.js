require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const apiRoute = require("./routes/routes");
const logged = require("./routes/home.js");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@loginjwt.nwv6u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

let db = mongoose.connection;

db.on("error", () => console.log("error on database load"));

db.once("open", () => console.log("database running"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", apiRoute);
app.use("/home", logged);

const ROOM = process.env.PORT;
app.listen(ROOM, () => console.log("server running at port", ROOM));
