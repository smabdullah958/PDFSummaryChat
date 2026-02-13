require("dotenv").config();
console.log("Port No", process.env.Port, process.env.FrontendURL);
let PortNo = process.env.Port;
let URL = process.env.FrontendURL;
const cookieParser = require("cookie-parser");
let express = require("express");
let App = express();
let cors = require("cors");
App.use(cookieParser());
App.use(
  cors({
    origin: URL,
    credentials: true,
  }),
);
App.use(express.json());

//create database connecton
let mongoose = require("mongoose");
mongoose.connect(`${process.env.Connection}/ChatSummary`);

//for file upload
let upload = require("./Config/multerConfig");

let AuthController = require("./Routes/AuthRoute");
let SummaryRoute = require("./Routes/SummaryRoutes");
let PDFChat = require("./Routes/PDFChatRoute.js");

App.use("/AuthRoute", AuthController);
App.use("/SummaryRoute", upload.single("pdf"), SummaryRoute);
App.use("/PDFChat", upload.single("pdf"), PDFChat);
App.listen(PortNo);
