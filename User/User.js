const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: { type: String, required: true, minlength: 4, maxlength: 50 },
  email: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, minlength: 6, maxlength: 200 },
  logged: { type: Boolean, default: false },
});

module.exports = model("User", userSchema);
