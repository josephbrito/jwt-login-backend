const User = require("../User/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAuth = async (req, res) => {
  const userAuthExist = await User.findOne({ email: req.body.email });
  if (userAuthExist) return res.status(400).send("email already exist");
  let userRegister = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  };

  try {
    let userSaved = await User.create(userRegister);
    res.status(200).redirect("/");
  } catch (error) {
    console.log("erro no registro", erro);
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
  if (!userFound) return res.status(404).send("senha incorreta");
  const token = await jwt.sign(
    { _id: userAuthExist._id },
    process.env.TOKEN_SECRET
  );

  res.cookie("token", token);
  res.status(200).redirect("/home");
};

module.exports = { registerAuth, loginAuth };
