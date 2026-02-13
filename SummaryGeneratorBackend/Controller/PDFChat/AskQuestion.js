let PDFID = require("../../Models/PDFDatabase");

let AskQuestion = async (req, res) => {
  try {
    // 698f9bd8eeb1e7e351916b06
    let { ChatID, Question } = req.body;
    if (!ChatID || !Question) {
      return res
        .status(400)
        .json({ message: "pdf is empty or question required" });
    }
    console.log(ChatID, Question);

    let CheckPDFID = await PDFID.findOne({ _id: ChatID });
    if (!CheckPDFID) {
      return res.status(400).json({ message: "pdf id is incorrect" });
    }
    res.status(200).json({ message: "data is fetch" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = AskQuestion;
