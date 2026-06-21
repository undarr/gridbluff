import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // 1. Create the pool
    const pool = [
      ...Array(3).fill({ type: 'empty' }),
      ...Array(3).fill({ type: 'evil' }),
      ...Array(10).fill({ type: 'good' })
    ];

    // 2. Shuffle using Fisher-Yates algorithm
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setGrid(shuffled);
  }, []);

  return (
    <div className="fullscreen-container">
      <div className="grid-board">
        {grid.map((cell, index) => (
          <div key={index} className={`cell cell-${cell.type}`}>
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
      </div>
    </div>
  );
}

export default App;