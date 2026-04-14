/**
 * Chunk Service
 * 
 * Responsibility: Split large text into smaller chunks that fit
 * within the AI model's context window.
 * 
 * Why chunking? LLMs have token limits. A 50-page PDF might have
 * 30,000+ characters. We split it into ~3000-char chunks so each
 * chunk can be summarized individually, then combined.
 */

const config = require('../config');

/**
 * Splits text into chunks, trying to break at sentence boundaries.
 * 
 * @param {string} text - The full extracted text
 * @param {number} chunkSize - Max characters per chunk (default from config)
 * @returns {string[]} Array of text chunks
 */
function splitText(text, chunkSize = config.maxChunkSize) {
  // If text is small enough, return as single chunk
  if (!text || text.length <= chunkSize) {
    return [text];
  }

  const chunks = [];
  let remainingText = text;

  while (remainingText.length > 0) {
    if (remainingText.length <= chunkSize) {
      // Last chunk — take everything that's left
      chunks.push(remainingText.trim());
      break;
    }

    // Find a good break point (end of sentence) near the chunk limit
    let breakPoint = findSentenceBreak(remainingText, chunkSize);
    
    chunks.push(remainingText.substring(0, breakPoint).trim());
    remainingText = remainingText.substring(breakPoint).trim();
  }

  // Filter out empty chunks
  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * Finds the best sentence boundary to break text at.
 * Looks for period, exclamation, or question mark followed by a space.
 * Falls back to the chunk size limit if no sentence break is found.
 * 
 * @param {string} text - Text to search within
 * @param {number} maxPos - Maximum position to search up to
 * @returns {number} The position to break at
 */
function findSentenceBreak(text, maxPos) {
  // Search backwards from maxPos for a sentence-ending punctuation
  const searchWindow = text.substring(0, maxPos);

  // Look for ". " or "! " or "? " going backwards
  for (let i = searchWindow.length - 1; i >= searchWindow.length - 500; i--) {
    if (i < 0) break;
    const char = searchWindow[i];
    if ((char === '.' || char === '!' || char === '?') && searchWindow[i + 1] === ' ') {
      return i + 1; // Break after the punctuation
    }
  }

  // No sentence break found — break at a space near the limit
  const lastSpace = searchWindow.lastIndexOf(' ');
  return lastSpace > 0 ? lastSpace : maxPos;
}

module.exports = { splitText };
