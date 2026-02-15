let { CloudClient } = require("chromadb");
let PDFTextVector = require("./VectorEmbedding.js");
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

    //divide the text into a chuncks
    const chunks = text.match(/.{1,1000}/g) || [];

    // 2. Loop through chunks and save them
    for (let i = 0; i < chunks.length; i++) {
      const vector = await PDFTextVector(chunks[i]); // Get embedding for ONE chunk

      await collection.add({
        ids: [`${id}_chunk_${i}`], // Unique ID for each chunk
        embeddings: [vector],
        metadatas: [{ chatId: id }],
        documents: [chunks[i]],
      });
    }
    console.log("All chunks stored in ChromaDB");
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
