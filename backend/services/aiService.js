/**
 * AI Service
 * 
 * Groq integration tailored for Structured Analysis.
 */

const Groq = require('groq-sdk');
const config = require('../config');

const groq = new Groq({ apiKey: config.groqApiKey });

/**
 * Provide a structured analysis of PDF text chunks.
 */
async function analyze(chunks) {
  if (chunks.length === 0) {
    return 'No text content found in the document.';
  }

  if (chunks.length === 1) {
    return await analyzeChunk(chunks[0]);
  }

  console.log(`📄 Processing ${chunks.length} chunks...`);

  // Summarize chunks first
  const chunkSummaries = [];
  for (let i = 0; i < chunks.length; i++) {
    console.log(`   Chunk ${i + 1}/${chunks.length}...`);
    const summary = await analyzeChunk(chunks[i]);
    chunkSummaries.push(summary);
  }

  // Final synthetic analysis
  const combinedText = chunkSummaries.join('\n\n---\n\n');
  return await combineAnalyses(combinedText);
}

const SYSTEM_PROMPT = `You are an expert Data Analyst and Document Reviewer. 
Your task is to analyze the provided text and strictly output a structured markdown report.

Follow this exact structure:
## Executive Summary
(1-2 sentences capturing the absolute core essence)

## Key Findings & Core Arguments
(3-5 bullet points of the most critical facts, numbers, or assertions)

## Detailed Breakdown
(Categorized sub-points depending on document context, explaining *how* and *why*)

## Conclusion / Action Items
(Takeaways or recommended actions based on the text)`;

async function analyzeChunk(text) {
  const response = await groq.chat.completions.create({
    model: config.aiModel,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Please provide a structured analysis for this text:\n\n${text}` },
    ],
    temperature: 0.2, // Low temperature for high accuracy
    max_tokens: 1500,
  });

  return response.choices[0]?.message?.content || 'Unable to generate analysis.';
}

async function combineAnalyses(summariesText) {
  const response = await groq.chat.completions.create({
    model: config.aiModel,
    messages: [
      { role: 'system', content: `You are an executive synthesiser. I am giving you multiple chunk analyses of a single large document. Assimilate all of them into one cohesive, final structured analysis.\n\n` + SYSTEM_PROMPT },
      { role: 'user', content: `Combine these section analyses into a final comprehensive report:\n\n${summariesText}` },
    ],
    temperature: 0.2,
    max_tokens: 2500,
  });

  return response.choices[0]?.message?.content || 'Unable to generate final analysis.';
}

module.exports = { analyze };
