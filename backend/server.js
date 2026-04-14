/**
 * Express Server — Entry Point
 * 
 * Sets up middleware (CORS, JSON parsing) and mounts routes.
 * This file should stay small — all logic lives in controllers/services.
 */

const express = require('express');
const cors = require('cors');
const config = require('./config');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();

// --- Middleware ---
app.use(cors());                          // Allow cross-origin requests from React
app.use(express.json({ limit: '1mb' })); // Parse JSON bodies (limit for safety)

// --- Routes ---
app.use('/api', pdfRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// --- Start Server ---
app.listen(config.port, () => {
  console.log(`\n🚀 PDF Processing Server running on http://localhost:${config.port}`);
  console.log(`   Health check: http://localhost:${config.port}/api/health\n`);
});
