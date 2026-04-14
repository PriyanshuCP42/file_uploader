/**
 * Application Configuration
 * 
 * Centralizes all environment variables in one place.
 * If a required variable is missing, the app fails fast with a clear message.
 */

const dotenv = require('dotenv');
dotenv.config();

const config = {
  // Server
  port: process.env.PORT || 3001,

  // Groq AI — required for summarization
  groqApiKey: process.env.GROQ_API_KEY,

  // AI Model to use (Groq-hosted)
  aiModel: process.env.AI_MODEL || 'llama-3.3-70b-versatile',

  // Processing limits
  maxChunkSize: parseInt(process.env.MAX_CHUNK_SIZE, 10) || 3000,
  maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 10,
};

// Validate required config on startup
if (!config.groqApiKey) {
  console.error('❌ GROQ_API_KEY is missing. Add it to your .env file.');
  process.exit(1);
}

module.exports = config;
