let { GoogleGenAI } = require("@google/genai");

let apiKeys = [
  process.env.PDFChat1,
  process.env.PDFChat2,
  process.env.PDFChat3,
  process.env.PDFChat4,
  process.env.PDFChat5,
  process.env.PDFChat6,
  process.env.PDFChat7
].filter(Boolean);

let LLMClient = async ({ text, language, format, length }) => {
  const prompt = `
TASK:
Summarize the given text.

STRICT RULES (NO EXCEPTIONS):
1. Output language MUST be ${language}.
2. Do not use any other language
3. Output format MUST be ${format}.
4. Output length MUST be ${length}.

LENGTH RULES (MANDATORY):

- Short:
  • BETWEEN 4 AND 7 bullet points OR sentences
  • Do NOT exceed 7

- Detail:
  
  • BETWEEN 10 AND 14 bullet points OR sentences
  • Do NOT exceed 14


FORMAT RULES:
- bullet:
  • Use bullet points only
  • heading  starts with "•"
  • NO paragraphs
- paragraph:
  • paragraph only
  • NO bullets

  IMPORTANT:
- Ignore the input language
- Always respond in ${language}


TEXT TO SUMMARIZE:${text}

FINAL CHECK:
Language = ${language}
Format = ${format}
Length = ${length}

`;

  const systemPrompt = `
You are a STRICT summarization engine.
You MUST follow instructions exactly.
You are NOT allowed to translate unless explicitly told.
`;

  for (let key of apiKeys) {
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      let response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        },
      });
      let summary;
      if (
        response?.candidates?.length > 0 &&
        response.candidates[0]?.content?.parts?.length > 0
      ) {
        summary = response.candidates?.[0]?.content?.parts[0]?.text;
      }
      console.log(summary);
      return summary;
    } catch (err) {
      lastError = err;
      console.warn(`API key failed: ${key}, trying next...`);
      continue; // try the next key
    }
  }
  const error = new Error("All AI keys are exhausted or invalid");
  error.status = lastError?.status || 500;
  throw error;
};

module.exports = LLMClient;
