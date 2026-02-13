require("dotenv").config();
console.log("connection", process.env.Connection);
let mongoose = require("mongoose");
let Sch = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Role: {
    type: String,
    required: true,
    enum: ["User", "Admin", ""],
    default: "",
  },
  Password: {
    type: String,
    required: true,
    min: 6,
  },
});

let Model = mongoose.model("user", Sch);
module.exports = Model;
