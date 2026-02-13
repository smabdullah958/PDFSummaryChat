let PDFTextExtractor = require("../../Utils/TextExtractor.js");
let LLMClient = require("../../Utils/SummaryLLMClient.js");
let { validationResult } = require("express-validator");

let SummaryController = async (req, res) => {
  try {
    let { Language, Format, Length } = req.body;
    console.log(Length);
    console.log(Language, Format, req.file, Length);

    //validation
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).json({ errorMessage: error.array() });
    }

    if (!req.file) {
      return res.status(400).json({ errorMessage: "PDF file is required" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      console.log("File Size received:", req.file.size); // Debugging line
      return res.status(400).json({ errorMessage: "PDF is exceeds than 5MB" });
    }

    // pdf text extractor
    let result = await PDFTextExtractor(req.file.buffer);
    if (!result.text) {
      return res.status(400).json({ errorMessage: "empty pdf" });
    }

    let Summary = await LLMClient({
      text: result.text,
      language: Language,
      length: Length,
      format: Format,
    });

    console.log("the summary of a file isa ", Summary);
    res.status(200).json({ Summary: Summary });
  } catch (err) {
    console.log("internal eror", err);
    //if APi is a free tier is completed than show issue
    if (err?.status === 429) {
      return res.status(429).json({
        errorMessage: "AI has high load. Please try  again after 24 hour",
      });
    }

    //only 100 pages are allowed for summary
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

module.exports = SummaryController;
