import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2-minute timeout
});

/**
 * Upload a raw PDF file as FormData to the backend.
 */
export async function processPdf(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/analyze-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
}
