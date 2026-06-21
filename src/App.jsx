import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([]);
  const [turns, setTurns] = useState(0);
  const [activeTool, setActiveTool] = useState(null);

  const initializeGrid = () => {
    // 1. Create the pool
    const pool = [
      ...Array(3).fill({ type: 'empty' }),
      ...Array(3).fill({ type: 'evil' }),
      ...Array(10).fill({ type: 'good' })
    ];

    // 2. Shuffle
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Assign IDs (Skipping empty cells)
    let currentId = 1;
    const gridWithIds = shuffled.map(cell => {
      if (cell.type !== 'empty') {
        return { ...cell, id: currentId++ };
      }
      return cell;
    });

    setGrid(gridWithIds);
    setTurns(0);
    setActiveTool(null);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const handleCellClick = (type) => {
    if (type !== 'empty') {
      setTurns(prev => prev + 1);
    }
  };

  const toggleTool = (tool) => {
    setActiveTool(prev => prev === tool ? null : tool);
  };

  return (
    <div className="main-viewport">
      <div className="game-container">
        
        <header className="branding">
          <h1 className="title">GridBluff</h1>
          <p className="subtitle">minimal solo social deduction game</p>
        </header>

        <div className="control-bar">
        <div className="control-left">
          <button className="square-btn" onClick={() => alert('Settings')}>⚙️</button>
          <span className="turns">Turn used: {turns}</span>
        </div>
        
        {/* New container for the right side elements */}
        <div className="control-right">
          <span className="stats-text">5/1/1/2</span>
          <button className="square-btn" onClick={initializeGrid}>🔄</button>
        </div>
      </div>

        <div className="grid-layer">
          {grid.map((cell, index) => (
            <div 
              key={index} 
              className={`cell cell-${cell.type} ${cell.type !== 'empty' ? 'is-clickable' : ''}`}
              onClick={() => handleCellClick(cell.type)}
            >
              {/* The ID Triangle */}
              {cell.id && (
                <div className="id-triangle">
                  <span className="id-number">{cell.id}</span>
                </div>
              )}

              {cell.type === 'empty' ? (
                <span className="text-xl">X</span>
              ) : (
                <>
                  <span className="text-xs">⚙️GD (⏱️AB)</span>
                  <span className="text-xs">🗝️11🔪11🔪11</span>
                  <span className="text-xs">(⏱️AB) #11,12,23</span>
                  <span className="text-xs">🔫10,11,12,13</span>
                  <span className="text-xs">✨💫🕶️🚫</span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="tool-bar">
          <button 
            className={`tool-btn ${activeTool === 'paint' ? 'bg-paint' : ''}`}
            onClick={() => toggleTool('paint')}
          >
            🎨 Paint
          </button>
          <button 
            className={`tool-btn ${activeTool === 'kill' ? 'bg-kill' : ''}`}
            onClick={() => toggleTool('kill')}
          >
            💀 Kill
          </button>
        </div>

        <footer className="footer-credits">
          an Undarfly Project since 20th June 2026, by Ulfred Chan
        </footer>

      </div>
    </div>
  );
}

export default App;