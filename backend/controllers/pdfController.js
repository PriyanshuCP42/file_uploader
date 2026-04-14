/**
 * PDF Controller
 * 
 * Intercepts the uploaded file, validates it, and delegates to the PDF service.
 */

const pdfService = require('../services/pdfService');
const { formatProcessingTime } = require('../utils/helpers');

/**
 * POST /api/analyze-pdf
 * 
 * Accepts a raw PDF file, processes it, and returns an AI-generated structured analysis.
 */
async function analyzePDF(req, res) {
  const startTime = Date.now();

  try {
    const file = req.file;

    // --- Validation ---
    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please attach a PDF file.',
      });
    }

    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        error: 'Uploaded file is not a valid PDF.',
      });
    }

    // --- Delegate to service ---
    console.log(`\n📨 Analyzing PDF: ${file.originalname} (${(file.size / 1024).toFixed(1)}KB)`);
    // Pass the raw memory buffer to the service
    const document = await pdfService.processDocumentBuffer(file.buffer);

    // --- Respond ---
    return res.status(200).json({
      success: true,
      data: {
        id: document.id,
        summary: document.summary,
        pageCount: document.pageCount,
        processingTime: formatProcessingTime(startTime),
      },
    });
  } catch (error) {
    console.error('❌ Error processing PDF:', error.message);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process PDF. Please try again.',
    });
  }
}

module.exports = { analyzePDF };
