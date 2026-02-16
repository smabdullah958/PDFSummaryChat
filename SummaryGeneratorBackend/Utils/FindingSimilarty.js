let { CloudClient } = require("chromadb");
let VectorEmbeeding = require("./VectorEmbedding.js");
require("dotenv").config();
const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});
let FindingSimilarty = async (PDFID, Question) => {
  try {
    let collection = await client.getOrCreateCollection({
      name: "SummaryChat",
    });
    //create embeedding for  a question
    const vector = await VectorEmbeeding(Question);
    let vectorSimilarty = await collection.query({
      queryEmbeddings: [vector],
      nResults: 10,
      where: { chatId: PDFID }, //  Filter by ChatID only!
    });
    console.log(vectorSimilarty);
    //  Extract and return the relevant documents
    if (vectorSimilarty?.documents && vectorSimilarty.documents[0]) {
      const relevantChunks = vectorSimilarty.documents[0];
      const distances = vectorSimilarty.distances?.[0] || [];

      console.log(` Found ${relevantChunks.length} relevant chunks`);

      return {
        chunks: relevantChunks,
        distances: distances,
        ids: vectorSimilarty.ids?.[0] || [],
      };
    }

    // No results found
    return {
      chunks: [],
      distances: [],
      ids: [],
    };
  } catch (error) {
    const status =
      error?.status || error?.response?.status || error?.error?.code;

    if (status === 429) {
      const err = new Error("Please try again after 24 hours.");
      err.status = 429;
      throw err;
    }

    if (status === 500) {
      const err = new Error("Please try again after some time.");
      err.status = 500;
      throw err;
    }
    throw error;
  }
};
module.exports = FindingSimilarty;
