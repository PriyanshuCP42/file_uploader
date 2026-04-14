# PDF Upload + AI Processing System

Upload a PDF document and get an AI-powered summary in seconds.

Built with **React** (frontend), **Node.js/Express** (backend), **Cloudinary** (file storage), **pdf-parse** (text extraction), and **Groq AI** (summarization).

---

## 🏗️ Architecture

```
User → React App → Cloudinary (storage) → Express API → pdf-parse → Groq AI → Summary
```

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React + Vite | File upload UI, Cloudinary upload, display summary |
| Storage | Cloudinary | Hosts the uploaded PDF files |
| Backend | Express.js | REST API, orchestrates processing pipeline |
| Processing | pdf-parse | Extracts text from PDF binary |
| AI | Groq (Llama 3.3 70B) | Generates concise summaries from text |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Cloudinary account](https://cloudinary.com) (free tier works)
- A [Groq API key](https://console.groq.com) (free tier works)

### 1. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
npm install
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env and add your CLOUDINARY cloud name + upload preset
npm install
npm run dev
```

### 3. Open the App

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api/health

---

## 📁 Project Structure

```
├── backend/
│   ├── config/index.js          # Environment config
│   ├── controllers/pdfController.js  # HTTP handler
│   ├── routes/pdfRoutes.js      # Route definitions
│   ├── services/
│   │   ├── pdfService.js        # PDF download + extract
│   │   ├── chunkService.js      # Text chunking
│   │   └── aiService.js         # Groq API integration
│   ├── utils/helpers.js         # Validation utilities
│   └── server.js                # Express entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Header.jsx       # App header
        │   ├── FileUpload.jsx   # Upload UI + logic
        │   └── SummaryDisplay.jsx  # Summary card
        ├── config/cloudinary.js # Cloudinary config
        ├── services/api.js      # Backend API calls
        ├── App.jsx              # Root component
        ├── App.css              # Component styles
        └── index.css            # Design system
```

---

## 🔑 Environment Variables

### Backend (`.env`)
| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ | Your Groq API key |
| `PORT` | ❌ | Server port (default: 3001) |
| `AI_MODEL` | ❌ | Groq model (default: llama-3.3-70b-versatile) |

### Frontend (`.env`)
| Variable | Required | Description |
|---|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | ✅ | Your Cloudinary cloud name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | ✅ | Unsigned upload preset name |
| `VITE_API_BASE_URL` | ❌ | Backend URL (default: http://localhost:3001/api) |

---

## 🎯 Interview Explanation

> "I built a PDF summarization system using React, Node.js, and AI. The user uploads a PDF which goes to Cloudinary for storage. The backend then downloads the PDF, extracts text using pdf-parse, breaks it into manageable chunks, and sends each chunk to Groq's AI API for summarization. I used a layered architecture — Controller handles HTTP, Service handles business logic, and separate services for chunking and AI. This makes the code easy to test and extend. For example, I could add 'chat with PDF' by adding a vector database layer."

---

## 📄 License

MIT
