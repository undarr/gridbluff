import React, { useState, useEffect } from 'react';
import './App.css';

// Character Lists
const villagers = ["🙏CF","🏹SL","🎀CP","🐐GT","💖HL","🔮FT","🩺DC","🧙🏻WZ","⚖️JG","🧵KT","☯︎NJ","🕵UC","🔍IN","📡RD","📌LC","📬MM","☂️WM","🔧AR","🧮MT","⚜️BI","👁️XR","📚LI","🎭MA","✏️PT"];
const outcasts = ["🔗FG","🍺DK","🤵🏻BT","🚨AL","🐱CT","⚡JM","🤪PV","🤡JK"];
const minions = ["👹DM","👽HK","📣RC","👾VR","🧪PN","👻GH","🧬CL","🎃MB","👤CM"];
const activate = ["🏹SL","🎀CP","🧙🏻WZ","⚖️JG","🔍IN","🔧AR","👁️XR","📚LI"];

function App() {
  const [grid, setGrid] = useState([]);
  const [turns, setTurns] = useState(0);
  const [activeTool, setActiveTool] = useState(null);

  const shuffle = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const getRandomInt = () => Math.floor(Math.random() * 3); // 0, 1, or 2
  const getRandomBool = () => Math.random() < 0.5;

  const createPlayer = (role, type) => ({
    type,
    char: role,
    app: role,
    converted: getRandomBool(),
    corrupt: getRandomBool(),
    jammed: getRandomBool(),
    blurred: getRandomBool(),
    revealed: getRandomInt(),
    used: getRandomInt(),
    killed: getRandomInt(),
  });

  const initializeGrid = () => {
    // Select random unique characters from pools
    const selectedVillagers = shuffle(villagers).slice(0, 7).map(v => createPlayer(v, 'villager'));
    const selectedOutcasts = shuffle(outcasts).slice(0, 2).map(o => createPlayer(o, 'outcast'));
    const selectedMinions = shuffle(minions).slice(0, 3).map(m => createPlayer(m, 'minion'));
    
    // Create pool of 12 players and 4 empty cells
    let pool = [
      ...selectedVillagers,
      ...selectedOutcasts,
      ...selectedMinions,
      ...Array(4).fill({ type: 'empty' })
    ];

    // Shuffle total grid
    let shuffledPool = shuffle(pool);

    // Assign IDs (Skipping empty cells)
    let currentId = 1;
    const finalGrid = shuffledPool.map(cell => {
      if (cell.type !== 'empty') {
        return { ...cell, id: currentId++ };
      }
      return cell;
    });

    setGrid(finalGrid);
    setTurns(0);
    setActiveTool(null);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

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
              onClick={() => cell.type !== 'empty' && setTurns(t => t + 1)}
            >
              {cell.id && (
                <div className="id-triangle">
                  <span className="id-number">{cell.id}</span>
                </div>
              )}

              {cell.type === 'empty' ? (
                <span className="text-xl">X</span>
              ) : (
                <>
                  <span className="text-xs"></span>
                  <span className="text-xs">{cell.char} ({cell.app})</span>
                  <span className="text-xs"></span>
                  <span className="text-xs">
                    {cell.revealed > 0 ? `🗝️${cell.revealed}` : ""}
                    {cell.used > 0 ? `💡${cell.used}` : ""}
                    {cell.killed > 0 ? `🔪${cell.killed}` : ""}
                  </span>
                  <span className="text-xs">
                    {cell.converted ? "✨" : ""}{cell.corrupt ? "😵" : ""}{cell.blurred ? "🕶️" : ""}{cell.jammed ? "🚫" : ""}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="tool-bar">
          <button className={`tool-btn ${activeTool === 'paint' ? 'bg-paint' : ''}`} onClick={() => setActiveTool(activeTool === 'paint' ? null : 'paint')}>🎨 Paint</button>
          <button className={`tool-btn ${activeTool === 'kill' ? 'bg-kill' : ''}`} onClick={() => setActiveTool(activeTool === 'kill' ? null : 'kill')}>💀 Kill</button>
        </div>

        <footer className="footer-credits">
          an Undarfly Project since 20th June 2026, by Ulfred Chan
        </footer>
      </div>
    </div>
  );
}

export default App;