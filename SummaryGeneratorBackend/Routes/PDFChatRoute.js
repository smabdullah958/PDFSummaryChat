let express = require("express");
let PDFChatRoute = express.Router();
let ChatController = require("../Controller/PDFChat/Chat.js");
let AuthMiddleware = require("../Middleware/AuthMiddleware.js");

PDFChatRoute.post("/", AuthMiddleware, ChatController);

module.exports = PDFChatRoute;
