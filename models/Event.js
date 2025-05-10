const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  city: String,
  genre: String,
  date: String,
  url: String,
  image: String, 
});

module.exports = mongoose.model("Event", eventSchema);
