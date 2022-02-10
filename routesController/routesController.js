const User = require("../User/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAuth = async (req, res) => {
  const userAuthExist = await User.findOne({ email: req.body.email });
  if (userAuthExist) return res.status(400).send("email already exist");
  let userRegister = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });

  try {
    let userSaved = await userRegister.save();
    res.redirect("/");
  } catch (error) {
    res.send("error register user :-(");
  }
};

const loginAuth = async (req, res) => {
  const userAuthExist = await User.findOne({ email: req.body.email });
  if (!userAuthExist) return res.status(404).send("user not found");

  const userFound = bcrypt.compareSync(
    req.body.password,
    userAuthExist.password
  );
  if (!userFound) return res.status(404).send("user not found");
  const token = jwt.sign({ _id: userAuthExist._id }, process.env.TOKEN_SECRET);

  if (!token) return console.log("esse token deixou de ser válido");

  res.header("authorization-token", token);

  res.send("user logged :)");
};

module.exports = { registerAuth, loginAuth };
