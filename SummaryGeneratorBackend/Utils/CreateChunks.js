// npm install sentence-splitter
const { split } = require("sentence-splitter");

function createChunks(text, maxChunkSize = 700) {
  const sentences = split(text)
    .filter((node) => node.type === "Sentence") // get only sentences
    .map((s) => s.raw.trim());

  const chunks = [];
  let currentChunk = "";

  for (let sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxChunkSize) {
      // Add sentence to current chunk
      currentChunk += (currentChunk ? " " : "") + sentence;
    } else {
      // Current chunk is full, push it
      if (currentChunk) chunks.push(currentChunk);

      // Start new chunk with this sentence
      currentChunk = sentence;

      // If sentence itself is bigger than maxChunkSize, keep it as single chunk
      // so we never split a sentence
      if (sentence.length > maxChunkSize) {
        chunks.push(currentChunk);
        currentChunk = "";
      }
    }
  }

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
}

module.exports = createChunks;
