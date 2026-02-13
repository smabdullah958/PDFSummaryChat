let PDFTextExtractor = require("../../Utils/TextExtractor.js");
let ChatDatabase = require("../../Models/PDFDatabase.js");
let Chat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "PDF file is required" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      console.log("File Size received:", req.file.size); // Debugging line
      return res.status(400).json({ errorMessage: "PDF is exceeds than 5MB" });
    }

    // pdf text extractor
    let PDFText = await PDFTextExtractor(req.file.buffer);
    if (!PDFText.text) {
      return res.status(400).json({ errorMessage: "empty pdf" });
    }
    //create instance of chat database
    let ChatData = new ChatDatabase({
      Text: PDFText.text,
      UserID: req.user._id,
    });
    // store text in database
    let result = await ChatData.save();
    console.log("Chat saved successfully", result);
    res.status(200).json({
      message: "Chat saved successfully",
      ShowChat: true,
      ChatId: result._id,
    });
  } catch (err) {
    console.log("internal eror", err);
    //if APi is a free tier is completed than show issue
    if (err?.status === 429) {
      return res.status(429).json({
        errorMessage: "AI has high load. Please try  again after 24 hour",
      });
    }

    //only 100 pages are allowed for chat
    if (err?.status === 410) {
      return res.status(400).json({
        errorMessage: err.message,
      });
    }

    res
      .status(500)
      .json({ errorMessage: "Please try  again after  some time" });
  }
};
module.exports = Chat;
