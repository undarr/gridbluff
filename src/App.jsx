import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([]);
  const [turns, setTurns] = useState(0);
  const [activeTool, setActiveTool] = useState(null);

  const initializeGrid = () => {
    const pool = [
      ...Array(3).fill({ type: 'empty' }),
      ...Array(3).fill({ type: 'evil' }),
      ...Array(10).fill({ type: 'good' })
    ];

    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setGrid(shuffled);
    setTurns(0);
    setActiveTool(null);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const handleCellClick = () => {
    setTurns(prev => prev + 1);
  };

  const toggleTool = (tool) => {
    setActiveTool(prev => prev === tool ? null : tool);
  };

  return (
    <div className="fullscreen-container">
      <div className="game-wrapper">
        
        {/* Branding Section */}
        <header className="branding">
          <h1 className="title">GridBluff</h1>
          <p className="subtitle">minimal solo social deduction game</p>
        </header>

        {/* Top Controls Bar */}
        <div className="header-bar">
          <div className="header-left">
            <button className="icon-button" onClick={() => alert('Settings')}>⚙️</button>
            <span className="turns-text">Turn used: {turns}</span>
          </div>
          <button className="icon-button" onClick={initializeGrid}>🔄</button>
        </div>

        {/* The 4x4 Grid */}
        <main className="grid-board">
          {grid.map((cell, index) => (
            <div 
              key={index} 
              className={`cell cell-${cell.type}`}
              onClick={handleCellClick}
            >
              {cell.type === 'empty' ? (
                <span className="main-text">X</span>
              ) : (
                <>
                  <span className="label-text">{cell.type}</span>
                  <span className="main-text">{cell.type}</span>
                  <span className="label-text">{cell.type}</span>
                </>
              )}
            </div>
          ))}
        </main>

        {/* Action Tools */}
        <div className="footer-bar">
          <button 
            className={`action-button ${activeTool === 'paint' ? 'active-paint' : ''}`}
            onClick={() => toggleTool('paint')}
          >
            🎨 Paint
          </button>
          <button 
            className={`action-button ${activeTool === 'kill' ? 'active-kill' : ''}`}
            onClick={() => toggleTool('kill')}
          >
            💀 Kill
          </button>
        </div>

        {/* Credits Section */}
        <footer className="credits">
          <p>an Undarfly Project since 20th June 2026, by Ulfred Chan</p>
        </footer>

      </div>
    </div>
  );
}

export default App;