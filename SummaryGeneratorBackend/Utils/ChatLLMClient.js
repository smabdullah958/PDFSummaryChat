import { ChromaClient } from "chromadb";
import dotenv from "dotenv";
dotenv.config();
let PDFVectors = () => {
  const client = new ChromaClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
  });
};
