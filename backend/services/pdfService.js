/**
 * PDF Service
 * 
 * Responsibility: Orchestrate the entire PDF processing pipeline.
 */

const pdfParse = require('pdf-parse');
const { v4: uuidv4 } = require('uuid');
const chunkService = require('./chunkService');
const aiService = require('./aiService');

/**
 * Processes a PDF document directly from a memory buffer.
 * 
 * @param {Buffer} pdfBuffer - The uploaded PDF file buffer
 * @returns {Promise<Object>} Document object with analysis, text, and metadata
 */
async function processDocumentBuffer(pdfBuffer) {
  console.log('🔄 Starting PDF text extraction...');

  // Step 1: Extract text directly from the memory buffer
  const { text, pageCount } = await extractText(pdfBuffer);
  console.log(`   ✅ Extracted text (${text.length} chars, ${pageCount} pages)`);

  if (!text || text.trim().length === 0) {
    throw new Error('No readable text found in the PDF. The file may be scanned/image-based.');
  }

  // Step 2: Split text into manageable chunks
  const chunks = chunkService.splitText(text);
  console.log(`   ✅ Split into ${chunks.length} chunk(s)`);

  // Step 3: Analyze using AI
  const summary = await aiService.analyze(chunks);
  console.log('   ✅ AI structured analysis generated');

  // Step 4: Build and return the document object
  const document = {
    id: uuidv4(),
    extractedText: text,
    summary, // Keeping 'summary' var name for backwards compatibility in API response
    pageCount,
    createdAt: new Date().toISOString(),
  };

  return document;
}

/**
 * Extracts text content from a PDF buffer using pdf-parse.
 */
async function extractText(buffer) {
  try {
    const data = await pdfParse(buffer);
    return {
      text: data.text,
      pageCount: data.numpages,
    };
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

module.exports = { processDocumentBuffer };
