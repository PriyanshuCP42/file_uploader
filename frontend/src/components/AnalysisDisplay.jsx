import { HiSparkles, HiClock, HiDocumentText } from 'react-icons/hi2';

function AnalysisDisplay({ data }) {
  if (!data) return null;

  const { summary, pageCount, processingTime } = data;

  return (
    <div className="pdf-viewer-container" style={{ padding: '0' }}>
      <div className="pdf-viewer-header" style={{ padding: '1rem 1.5rem', background: 'var(--accent)', borderColor: 'var(--accent-hover)' }}>
        <div className="pdf-filename" style={{ color: 'white', fontSize: '1.1rem' }}>
          <HiSparkles style={{ color: '#fbbf24' }} /> AI Structured Analysis
        </div>
        <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><HiDocumentText /> {pageCount} pages</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><HiClock /> {processingTime}</span>
        </div>
      </div>

      <div className="analysis-body" style={{ padding: '2rem', overflowY: 'auto' }}>
        {summary.split('\n').map((line, index) => {
          if (!line.trim()) return <br key={index} />;

          if (line.startsWith('## ')) {
            return <h2 key={index} style={{ color: 'var(--accent)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('# ')) {
            return <h1 key={index} style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>{line.replace('# ', '')}</h1>;
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            // Check for bolding inside bullet points
            let formattedLine = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary); font-weight:600">$1</strong>');
            return <li key={index} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
          }

          let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary); font-weight:600">$1</strong>');
          return <p key={index} style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        })}
      </div>
    </div>
  );
}

export default AnalysisDisplay;
