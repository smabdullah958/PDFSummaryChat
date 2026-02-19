let { CloudClient } = require("chromadb");
let PDFTextVector = require("./VectorEmbedding.js");
let createChuncks = require("./CreateChunks.js");
require("dotenv").config();

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});
let PDFTextChromaDb = async (text, id) => {
  try {
    let collection = await client.getOrCreateCollection({
      name: "SummaryChat",
    });

    //  create smaller chuncks
    const chunks = createChuncks(text, 700);

    //  Generate  embeddings at once time
    const vectors = await PDFTextVector(chunks);

    //  store embedding at once time
    await collection.add({
      ids: chunks.map((_, i) => `${id}_chunk_${i}`),
      embeddings: vectors,
      metadatas: chunks.map(() => ({ chatId: id })),
      documents: chunks,
    });
    return true;
  } catch (error) {
    console.log("eror ina chromadb", error);
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

module.exports = PDFTextChromaDb;
