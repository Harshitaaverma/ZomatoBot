const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  preferences: { type: [String], default: [] }
});

module.exports = mongoose.model("User", userSchema);