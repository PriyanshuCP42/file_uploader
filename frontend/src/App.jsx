import { useState, useEffect } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisDisplay from './components/AnalysisDisplay';
import { processPdf } from './services/api';
import { HiXMark } from 'react-icons/hi2';
import './App.css';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleFileSelect(file) {
    try {
      const result = await processPdf(file);
      if (result.success) {
        setAnalysisData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Analysis failed. Please try again.');
    }
  }

  function handleReset() {
    setAnalysisData(null);
    setError(null);
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {error && (
            <div className="error-banner">
              <p>{error}</p>
            </div>
          )}

          {!analysisData ? (
             <FileUpload 
               onFileSelect={handleFileSelect} 
               onProcessingStatus={setIsProcessing}
               onError={setError} 
             />
          ) : (
            <>
              <div className="upload-card-compact">
                <button className="btn btn-secondary" onClick={handleReset}>
                  <HiXMark style={{ fontSize: '1.2rem' }} /> Analyze Another Document
                </button>
              </div>

              <AnalysisDisplay data={analysisData} />
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Built with React & Node.js · Structured AI Document Analysis</p>
      </footer>
    </div>
  );
}

export default App;
