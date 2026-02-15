let PDFID = require("../../Models/PDFDatabase");
let FindingSimilarty = require("../../Utils/FindingSimilarty");
let LLMAnswere = require("../../Utils/AskQuestionLLM");
let AskQuestion = async (req, res) => {
  try {
    // chat id isa  text id brohter
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

    let result = await FindingSimilarty(ChatID, Question);
    console.log(result);

    // Check if relevant chunks were found
    if (!result.chunks || result.chunks.length === 0) {
      return res.status(404).json({
        errorMessage:
          "No relevant information found in the PDF for your question",
      });
    }

    // Combine chunks into context
    const context = result.chunks.join("\n\n");

    //  Generate proper answer using LLM
    console.log("🤖 Generating answer...");
    const answer = await LLMAnswere(Question, context);

    console.log("✅ Sending response");

    res.status(200).json({
      message: "Answer generated successfully",
      answer,
    });
  } catch (error) {
    console.log("error in a ask question", error);
    //if APi is a free tier is completed than show issue
    if (err?.status === 429) {
      return res.status(429).json({
        errorMessage: err.message || "plz try again after 24 hour",
      });
    }

    //only 100 pages are allowed for chat
    if (err?.status === 410) {
      return res.status(400).json({
        errorMessage: err.message || "only 100 pages are allowed",
      });
    }

    res.status(500).json({
      errorMessage: err.message || "Please try  again after  some time",
    });
  }
};
module.exports = AskQuestion;
