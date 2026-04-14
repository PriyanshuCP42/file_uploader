import { useState, useRef } from 'react';
import { HiDocumentArrowDown, HiArrowPath } from 'react-icons/hi2';

function FileUpload({ onFileSelect, onProcessingStatus, onError }) {
  const fileInputRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    await processSelection(selectedFile);
  }

  async function handleDrop(event) {
    event.preventDefault();
    setIsHovering(false);
    
    const droppedFile = event.dataTransfer.files[0];
    if (!droppedFile) return;

    await processSelection(droppedFile);
  }

  async function processSelection(file) {
    if (file.type !== 'application/pdf') {
      onError('Please select a valid PDF file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onError('File size must be under 10MB.');
      return;
    }

    onError(null);
    setIsProcessing(true);
    onProcessingStatus(true);
    
    try {
      await onFileSelect(file);
    } finally {
      setIsProcessing(false);
      onProcessingStatus(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsHovering(true);
  }

  function handleDragLeave() {
    setIsHovering(false);
  }

  return (
    <div className="upload-wrapper">
      <div className="upload-card">
        <div
          className={`drop-zone ${isHovering ? 'hover' : ''} ${isProcessing ? 'processing' : ''}`}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          onDrop={!isProcessing ? handleDrop : undefined}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
            id="pdf-file-input"
            disabled={isProcessing}
          />
          
          {isProcessing ? (
            <>
              <div className="drop-icon spin">
                <HiArrowPath />
              </div>
              <p className="drop-text" style={{color: 'var(--accent)'}}>Analyzing Document...</p>
              <p className="drop-hint">Extracting data via AI, please wait.</p>
            </>
          ) : (
            <>
              <div className="drop-icon">
                <HiDocumentArrowDown />
              </div>
              <p className="drop-text">Click to choose a PDF</p>
              <p className="drop-hint">or drag and drop to analyze (Max 10MB)</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
