let express = require("express");
let PDFChatRoute = express.Router();
let Upload_Pdf = require("../Controller/PDFChat/Upload_Pdf.js");
let AuthMiddleware = require("../Middleware/AuthMiddleware.js");
let AskQuestion = require("../Controller/PDFChat/AskQuestion.js");

PDFChatRoute.post("/", AuthMiddleware, Upload_Pdf);
PDFChatRoute.post("/ask", AuthMiddleware, AskQuestion);

module.exports = PDFChatRoute; 
