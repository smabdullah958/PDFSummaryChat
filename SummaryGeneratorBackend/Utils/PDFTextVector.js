// let { GoogleGenAI } = require("@google/genai");
// require("dotenv").config();
// let apikey = [
//   process.env.ChatSummary1,
//   process.env.ChatSummary2,
//   process.env.ChatSummary3,
//   process.env.ChatSummary4,
// ].filter(Boolean);
// let PDFTextVector = async (data) => {
//   try {
//     const ai = new GoogleGenAI({ apiKey: apikey });
//     const response = await ai.models.embedContent({
//       model: "gemini-embedding-001",
//       contents: data,
//     });
//     console.log(response.embeddings[0]?.values);
//     return response.embeddings[0]?.values;
//   } catch (error) {
//     console.log("error in a vector embeeding", error);
//     const status =
//       error?.status || error?.response?.status || error?.error?.code;

//     if (status === 429) {
//       const err = new Error("Please try again after 24 hours.");
//       err.status = 429;
//       throw err;
//     }

//     if (status === 500) {
//       const err = new Error("Please try again after some time.");
//       err.status = 500;
//       throw err;
//     }
//   }
// };
// module.exports = PDFTextVector;

let { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

let apiKeys = [
  process.env.ChatSummary1,
  process.env.ChatSummary2,
  process.env.ChatSummary3,
  process.env.ChatSummary4,
].filter(Boolean);

let PDFTextVector = async (data) => {
  let lastError = null;

  //  Try each API key one by one
  for (let key of apiKeys) {
    try {
      const ai = new GoogleGenAI({ apiKey: key }); //  Use ONE key at a time
      const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: data,
      });

      console.log(
        " Vector embedding generated successfully",
        response.embeddings[0]?.values,
      );
      return response.embeddings[0]?.values;
    } catch (error) {
      lastError = error;
      console.warn(` API key failed, trying next...`);
      continue; // Try next key
    }
  }

  // ✅ All keys failed, throw error
  console.log(" All API keys exhausted:", lastError);

  const status =
    lastError?.status || lastError?.response?.status || lastError?.error?.code;

  if (status === 429) {
    const err = new Error("Please try again after 24 hours");
    err.status = 429;
    throw err;
  }

  if (status === 500) {
    const err = new Error("Please try again after some time");
    err.status = 500;
    throw err;
  }

  // Generic error
  const err = new Error("Failed to generate embeddings");
  err.status = 500;
  throw err;
};

module.exports = PDFTextVector;
