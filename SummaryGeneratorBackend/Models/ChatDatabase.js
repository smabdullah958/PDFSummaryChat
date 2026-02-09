require("dotenv").config();
console.log("connection", process.env.Connection);
let mongoose = require("mongoose");

let Sch = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Khang",
    required: true,
  },
  Text: {
    type: String,
    required: true,
  },
});

let Model = mongoose.model("Chat", Sch);
module.exports = Model;
