let { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

let apiKeys = [
  process.env.ChatSummary1,
  process.env.ChatSummary2,
  process.env.ChatSummary3,
  process.env.ChatSummary4,
  process.env.ChatSummary5,
  process.env.ChatSummary6,
  process.env.ChatSummary7,
].filter(Boolean);

let LLMAnswer = async (question, context) => {
  let lastError = null;

  // Create prompt for LLM
  const prompt = `You are a helpful AI assistant. Answer the question based ONLY on the context provided below.

IMPORTANT RULES:
- If the answer is in the context, provide a clear and concise answer
- If the answer is NOT in the context, say "I cannot find the answer in the provided document"
- Do not make up information
- Be specific and direct

CONTEXT FROM PDF:
${context}
  
QUESTION:
${question}

ANSWER:`;

  // Try each API key
  for (let key of apiKeys) {
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      let answer;
      if (
        response?.candidates?.length > 0 &&
        response.candidates[0]?.content?.parts?.length > 0
      ) {
        answer = response.candidates[0].content.parts[0].text;
      }
      console.log("Answer generated successfully");
      return answer || "Unable to generate answer";
    } catch (error) {
      lastError = error;
      console.warn(" API key failed, trying next...");
      continue;
    }
  }

  // All keys failed
  console.log(" All API keys exhausted:", lastError?.message);

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

  const err = new Error("Failed to generate answer");
  err.status = 500;
  throw err;
};

module.exports = LLMAnswer;
