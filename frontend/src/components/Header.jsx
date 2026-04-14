import { HiDocumentText } from 'react-icons/hi2';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <HiDocumentText />
          </div>
          <div>
            <h1>PDF Reader</h1>
            <p className="tagline">Fast, private, local PDF viewing in your browser.</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
