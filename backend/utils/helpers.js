/**
 * Utility / Helper Functions
 * 
 * Small, reusable functions for validation and formatting.
 */

/**
 * Validates that a string is a well-formed URL.
 * @param {string} str - The string to validate
 * @returns {boolean}
 */
function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Checks if a URL points to a PDF file.
 * Looks at the URL path (ignoring query params) for a .pdf extension,
 * or checks if the URL is from Cloudinary's /raw/upload path.
 * @param {string} url - The URL to check
 * @returns {boolean}
 */
function isPdfUrl(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();
    // Accept .pdf extension or Cloudinary raw upload paths
    return path.endsWith('.pdf') || path.includes('/raw/upload');
  } catch {
    return false;
  }
}

/**
 * Formats elapsed time in a human-readable way.
 * @param {number} startTime - Date.now() value when processing started
 * @returns {string} e.g. "3.2s"
 */
function formatProcessingTime(startTime) {
  const elapsed = (Date.now() - startTime) / 1000;
  return `${elapsed.toFixed(1)}s`;
}

module.exports = {
  isValidUrl,
  isPdfUrl,
  formatProcessingTime,
};
