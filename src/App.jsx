import React, { useState, useEffect } from 'react';
import './App.css';

const villagerPool = ['🔧AR', '⚜️BI', '🙏CF', '🎭CP', '🎀CU', '💭DM', '🩺DR', '🔮FT', '🐐GT', '💖HL', '🔍IN', '⚖️JG', '🧵KT', '📌LC', '📚LI', '🖌️MA', '📬MM', '🧮MT', '☯️NJ', '💊NR', '✝️PR', '✏️PT', '📡RD', '🐦RK', '🏹SL', '📊ST', '🛡️TK', '🕵UC', '☂️WM', '🧙🏻WZ', '👁️XR']
const outcastPool = ['🚨AL', '💣BM', '🤵🏻BT', '🐱CC', '🍺DK', '🔗FG', '🤡JK', '⚡JM', '💕LV', '🤪PV', '❓SS', '🧸VD', '👦🏻YS']
const minionPool = ['🧬CL', '👤CM', '🗣️CR', '👥ET', '👻GH', '👽HK', '🎃MB', '🧪PN', '🐛PS', '📣RC', '🐀RT', '👾VR', '🧹WI']
const selectcount = {"🙏CF":0,"🏹SL":1,"🎀CP":2,"🐐GT":0,"💖HL":0,"🔮FT":0,"🩺DC":0,"🧙🏻WZ":3,"⚖️JG":1,"🧵KT":0,"☯︎NJ":0,"🕵UC":0,"🔍IN":2,"📡RD":0,"📌LC":0,"📬MM":0,"☂️WM":0,"🧮MT":0,"⚜️BI":0,"👁️XR":1,"📚LI":3,"🎭MA":0,"✏️PT":0};

function App() {
  // --- Persisted State ---
  const [roleCounts, setRoleCounts] = useState(() => JSON.parse(localStorage.getItem('roleCounts')) || { v: 7, o: 2, m: 3 });
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [killConfirm, setKillConfirm] = useState(() => JSON.parse(localStorage.getItem('killConfirm')) || false);
  const [charStatus, setCharStatus] = useState(() => JSON.parse(localStorage.getItem('charStatus')) || {});

  // --- Game State ---
  const [grid, setGrid] = useState([]);
  const [turns, setTurns] = useState(0);
  const [gameMode, setGameMode] = useState('Default');
  const [abilityUserIdx, setAbilityUserIdx] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [animType, setAnimType] = useState('flip');

  // --- Modal State ---
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('Info'); 
  const [activeCharCat, setActiveCharCat] = useState('Villagers');
  const [detailedChar, setDetailedChar] = useState(null);

  useEffect(() => {
    localStorage.setItem('roleCounts', JSON.stringify(roleCounts));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('killConfirm', JSON.stringify(killConfirm));
    localStorage.setItem('charStatus', JSON.stringify(charStatus));
  }, [roleCounts, darkMode, killConfirm, charStatus]);

  const getStatus = (char) => charStatus[char] ?? 0;

  const shuffle = (arr) => {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const createPlayer = (role, type, id) => ({
    type, id, char: role, app: role, revealed: -1, used: 0, killed: -1,
    highlight: [(id + 1) % 12 === 0 ? 12 : (id + 1) % 12],
    converted: Math.random() < 0.5, corrupt: Math.random() < 0.5, jammed: Math.random() < 0.5, blurred: Math.random() < 0.5,
  });

  const triggerAnimation = (indices, type, targetGrid, turnAdd) => {
    setAnimType(type);
    setAnimatingIndices(new Set(indices));
    if (type === 'flip') {
      setTimeout(() => setGrid(targetGrid), 250);
      setTimeout(() => { setAnimatingIndices(new Set()); setTurns(t => t + turnAdd); }, 500);
    } else {
      setGrid(targetGrid); setTurns(t => t + turnAdd);
      setTimeout(() => setAnimatingIndices(new Set()), 300);
    }
  };

  const initializeGrid = () => {
    if (animatingIndices.size > 0) return;

    const pickRoles = (pool, targetCount) => {
      const forced = pool.filter(c => getStatus(c) === 1);
      const maybe = pool.filter(c => getStatus(c) === 0);
      
      // Combine forced first, then fill remainder from 'maybe' pool
      const combined = [...forced, ...shuffle(maybe)].slice(0, targetCount);
      return combined;
    };

    const sV = pickRoles(villagerPool, roleCounts.v);
    const sO = pickRoles(outcastPool, roleCounts.o);
    const sM = pickRoles(minionPool, roleCounts.m);

    const pCount = sV.length + sO.length + sM.length;
    let p = shuffle([
      ...sV.map(v => ({ r: v, t: 'villager' })),
      ...sO.map(o => ({ r: o, t: 'outcast' })),
      ...sM.map(m => ({ r: m, t: 'minion' })),
      ...Array(16 - pCount).fill({ t: 'empty', type: 'empty'})
    ]);

    let curId = 1;
    const nextG = p.map(x => x.t !== 'empty' ? createPlayer(x.r, x.t, curId++) : x);
    
    setGameMode('Default');
    setAbilityUserIdx(null); 
    setSelectedIndices([]); 
    setShowSettings(false);
    triggerAnimation([...Array(16).keys()], 'flip', nextG, -turns);
  };

  useEffect(() => { if(grid.length === 0) initializeGrid(); }, []);

  const getCellStateClass = (cell, gm) => {
    if (cell.type === 'empty') return 'cell-empty';
    
    const isRevealed = cell.revealed !== -1;
    const isAlive = cell.killed === -1;
    const isDead = !isAlive;

    // 1. Unrevealed (Always treated as alive/hidden in your logic)
    if (!isRevealed && isAlive && gm!=='Ended') return 'c-state-unrev';

    // 2-4. Revealed and Alive
    if (isAlive) {
      if (villagerPool.includes(cell.app)) return 'c-state-alive-v';
      if (outcastPool.includes(cell.app)) return 'c-state-alive-o';
      if (minionPool.includes(cell.app)) return 'c-state-alive-m';
    } 
    
    // 5-6. Dead (Prompt likely meant dead for these high-contrast colors)
    if (isDead) {
      if (villagerPool.includes(cell.char)) return 'c-state-dead-v';
      if (outcastPool.includes(cell.char)) return 'c-state-dead-o';
      if (minionPool.includes(cell.char)) return 'c-state-dead-m';
    }

    return '';
  };

  const handleCellClick = (idx) => {
    if (animatingIndices.size > 0) return;
    const cell = grid[idx];
    if (!cell || cell.type === 'empty') return;
    if (gameMode === 'Kill') {
      if (cell.killed !== -1) return;
      if (killConfirm && !window.confirm(`Kill Player ${cell.id}?`)) return;

      const cost = cell.type === 'minion' ? 1 : 5;
      const nextGrid = [...grid];
      
      // 1. Mark current cell as killed
      nextGrid[idx] = { ...cell, killed: turns };

      // 2. Check if this was the last alive minion
      const aliveMinions = nextGrid.filter(c => c.type === 'minion' && c.killed === -1);
      
      if (aliveMinions.length === 0) {
        // Collect indices of all players currently unrevealed to reveal them
        const revealIndices = [];
        nextGrid.forEach((c, i) => {
          if (c.type !== 'empty') {
            revealIndices.push(i);
          }
        });

        // Animate the killed cell and all newly revealed cells together
        const allAnimIndices = [...new Set([idx, ...revealIndices])];
        triggerAnimation(allAnimIndices, 'fade', nextGrid, cost);
        setGameMode('Ended');
      } else {
        // Standard kill logic
        triggerAnimation([idx], 'fade', nextGrid, cost);
      }
    } else if (gameMode === 'Default') {
      if (cell.revealed !== -1 && cell.killed === -1 && selectcount[cell.app] > 0) {
        setGameMode('Ability'); setAbilityUserIdx(idx); setSelectedIndices([]);
      } else if (cell.revealed === -1 && cell.killed === -1) {
        const nG = [...grid]; nG[idx] = { ...cell, revealed: turns };
        triggerAnimation([idx], 'flip', nG, 2);
      }
    } else if (gameMode === 'Ability') {
      const limit = selectcount[grid[abilityUserIdx].app];
      if (selectedIndices.includes(idx)) setSelectedIndices(s => s.filter(i => i !== idx));
      else if (selectedIndices.length < limit && (limit > 1 || idx !== abilityUserIdx)) setSelectedIndices(s => [...s, idx]);
    }
  };

  const getCategorizedTableData = () => {
    const getByStatus = (status) => [
      ...villagerPool.filter(c => getStatus(c) === status),
      ...outcastPool.filter(c => getStatus(c) === status),
      ...minionPool.filter(c => getStatus(c) === status),
    ];

    const forced = getByStatus(1); // Included
    const maybe = getByStatus(0);  // Maybe

    // Helper to chunk into rows of 4
    const chunk = (arr) => {
      const res = [];
      for (let i = 0; i < arr.length; i += 4) res.push(arr.slice(i, i + 4));
      return res;
    };

  return {
    forcedRows: chunk(forced),
    maybeRows: chunk(maybe),
    showDash: forced.length > 0 && maybe.length > 0
    };
  };

  const wrongs = grid.filter(c => c.type !== 'empty' && c.type !== 'minion' && c.killed !== -1).length;

  return (
    <div className={`main-viewport ${darkMode ? 'dark-mode' : ''} ${gameMode === 'Kill' ? (darkMode ? 'dark-kill-mode' : 'kill-mode') : ''} ${animatingIndices.size > 0 ? 'input-locked' : ''}`}>
      <div className="game-container">
        <header className="branding">
          <h1 className="title">GridBluff</h1>
          <p className="subtitle">minimal solo social deduction game</p>
        </header>

        <div className="control-bar">
          <div className="control-left">
            <button className="square-btn" onClick={() => setShowSettings(true)}>⚙️</button>
            <span className="turns">Turn: {turns}</span>
          </div>
          <div className="control-right">
            <span className="stats-text">{roleCounts.v}/{roleCounts.o}/{roleCounts.m}/{16 - (roleCounts.v+roleCounts.o+roleCounts.m)}</span>
            <button className="square-btn" onClick={initializeGrid}>🔄</button>
          </div>
        </div>

        <div className="grid-layer">
          {grid.map((cell, index) => {
             const hSource = hoveredIdx !== null ? grid[hoveredIdx] : null;
             const isSel = gameMode === 'Ability' && selectedIndices.includes(index);
             const isTar = gameMode === 'Default' && hSource?.revealed !== -1 && hSource?.highlight?.includes(cell.id);
             const bCls = isSel || isTar ? 'b-lime' : (hoveredIdx === index ? 'b-yellow' : '');
             return (
               <div key={index} className={`cell ${getCellStateClass(cell, gameMode)} cell-${cell.type} ${cell.type !== 'empty' ? 'is-clickable' : ''} ${bCls} ${animatingIndices.has(index) ? `anim-${animType}` : ''}`}
                 onClick={() => handleCellClick(index)} onMouseEnter={() => cell.type !== 'empty' && setHoveredIdx(index)} onMouseLeave={() => setHoveredIdx(null)}>
                 <div className="cell-inner">
                   {cell.type !== 'empty' && <div className={`id-triangle ${cell.killed !== -1 ? 'id-triangle-dead' : ''}`}><span className={abilityUserIdx === index ? 'y-txt' : 'id-number'}>{cell.id}</span></div>}
                   {cell.type === 'empty' ? <span className="text-xl"></span> : (cell.revealed === -1 && cell.killed === -1 && gameMode!=="Ended") ? <span className="text-xl">?</span> : (
                     <div className="c-info"><span className="text-xs" /><span className="text-xs">{cell.char} ({cell.app})</span><span className="text-xs" />
                       <span className="text-xs">{cell.revealed !== -1 ? `🗝️${cell.revealed}` : ""}{cell.used > 0 ? `💡${cell.used}` : ""}{cell.killed !== -1 ? `🔪${cell.killed}` : ""}</span>
                       <span className="text-xs">{cell.converted ? "✨" : ""}{cell.corrupt ? "😵" : ""}{cell.blurred ? "🕶️" : ""}{cell.jammed ? "🚫" : ""}</span>
                     </div>
                   )}
                 </div>
               </div>
             );
          })}
        </div>

        <div className="tool-bar">
          {gameMode === 'Default' && <><button className="tool-btn bg-paint">🎨 Paint</button><button className="tool-btn bg-kill" onClick={() => setGameMode('Kill')}>⚔️ Execute</button></>}
          {gameMode === 'Kill' && <button className="tool-btn bg-neutral" onClick={() => setGameMode('Default')}>Back</button>}
          {gameMode === 'Ability' && (
            <div className="ability-tools">
              <button className="tool-btn bg-neutral" onClick={() => {setGameMode('Default'); setAbilityUserIdx(null);}}>Back</button>
              <button className="tool-btn bg-neutral" onClick={() => setSelectedIndices([])}>Reset</button>
              <button className="tool-btn bg-use" onClick={() => triggerAnimation([abilityUserIdx], 'fade', grid.map((c,i)=>i===abilityUserIdx?{...c,used:turns}:c), 1)} disabled={selectedIndices.length !== selectcount[grid[abilityUserIdx]?.app]}>
                Use {grid[abilityUserIdx]?.app} ({selectedIndices.length}/{selectcount[grid[abilityUserIdx]?.app]})
              </button>
            </div>
          )}
          {gameMode === 'Ended' && <button className="tool-btn bg-ended" disabled>Game Over, Turn: {turns}, Wrongs: {wrongs}</button>}
        </div>

        {showSettings && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => {setShowSettings(false); setDetailedChar(null);}}>×</button>
              {!detailedChar ? (
                <>
                  <div className="modal-tabs">
                    {['Info', 'Current', 'Game', 'Characters'].map(t => (
                      <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
                    ))}
                  </div>
                  <div className="tab-scroll-container">
                    {activeTab === 'Info' && <div className="info-tab"><h2>GridBluff Info</h2><p>Grindbluffsample</p></div>}
                    {activeTab === 'Current' && (
                    <div className="current-tab">
                      <h2>Current Setup</h2>
                      <div className="stats-summary">
                        V: {roleCounts.v} | O: {roleCounts.o} | M: {roleCounts.m} | E: {16 - (roleCounts.v + roleCounts.o + roleCounts.m)}
                      </div>
                      
                      <table className="char-grid-table">
                        <tbody>
                          {/* Render Forced Section */}
                          {getCategorizedTableData().forcedRows.map((row, ri) => (
                            <tr key={`f-${ri}`}>
                              {row.map((c, ci) => <td key={ci} className={`td-forced ${villagerPool.includes(c) ? 'c-state-alive-v' : outcastPool.includes(c) ? 'c-state-alive-o' : 'c-state-alive-m'}`}>{c}</td>)}
                              {/* Fill empty cells in partial row */}
                              {row.length < 4 && Array(4 - row.length).fill(0).map((_, i) => <td key={`fe-${i}`} className="td-empty" />)}
                            </tr>
                          ))}
                        </tbody></table>

                          {/* Separator Line */}
                          {getCategorizedTableData().showDash && (
                            <div className="divider" />
                          )}

                          {/* Render Maybe Section */}
                        <table className="char-grid-table"><tbody>
                          {getCategorizedTableData().maybeRows.map((row, ri) => (
                            <tr key={`m-${ri}`}>
                              {row.map((c, ci) => <td key={ci} className={`${villagerPool.includes(c) ? 'c-state-alive-v' : outcastPool.includes(c) ? 'c-state-alive-o' : 'c-state-alive-m'}`}>{c}</td>)}
                              {/* Fill empty cells in partial row */}
                              {row.length < 4 && Array(4 - row.length).fill(0).map((_, i) => <td key={`me-${i}`} className="td-empty" />)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                    {activeTab === 'Game' && (
                      <div className="game-tab">
                        <h2>Game Settings</h2>
                        <div className="toggle-row"><span>Dark Mode</span><button className={`toggle-btn ${darkMode ? 'on' : ''}`} onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'ON' : 'OFF'}</button></div>
                        <div className="toggle-row"><span>Kill Confirm</span><button className={`toggle-btn ${killConfirm ? 'on' : ''}`} onClick={() => setKillConfirm(!killConfirm)}>{killConfirm ? 'ON' : 'OFF'}</button></div>
                        <div className="divider" />
                        <div className="counter-row"><span>Villagers</span><div className="controls"><button onClick={() => updateRoleCount('v', -1)}>-</button><span>{roleCounts.v}</span><button onClick={() => updateRoleCount('v', 1)}>+</button></div></div>
                        <div className="counter-row"><span>Outcasts</span><div className="controls"><button onClick={() => updateRoleCount('o', -1)}>-</button><span>{roleCounts.o}</span><button onClick={() => updateRoleCount('o', 1)}>+</button></div></div>
                        <div className="counter-row"><span>Minions</span><div className="controls"><button onClick={() => updateRoleCount('m', -1)}>-</button><span>{roleCounts.m}</span><button onClick={() => updateRoleCount('m', 1)}>+</button></div></div>
                        <div className="modal-footer-btns">
                           <button className="footer-btn reset" onClick={() => setRoleCounts({v:7, o:2, m:3})}>Reset</button>
                           <button className="footer-btn action" onClick={initializeGrid}>New Game</button>
                        </div>
                      </div>
                    )}
                    {activeTab === 'Characters' && (
                    <div className="char-tab">
                      <h2>Characters</h2>
                      <div className="secondary-tabs">
                        {[
                          { name: 'Villagers', pool: villagerPool },
                          { name: 'Outcasts', pool: outcastPool },
                          { name: 'Minions', pool: minionPool }
                        ].map(cat => (
                          <button 
                            key={cat.name} 
                            className={`sec-tab-btn ${activeCharCat === cat.name ? 'active' : ''}`} 
                            onClick={() => setActiveCharCat(cat.name)}
                          >
                            {cat.name} ({cat.pool.filter(c => getStatus(c) !== 2).length}/{cat.pool.length})
                          </button>
                        ))}
                      </div>

                      <div className="sub-header">
                        <h3>{activeCharCat}</h3>
                        <button className="unban-all" onClick={() => {
                          const pool = activeCharCat === 'Villagers' ? villagerPool : activeCharCat === 'Outcasts' ? outcastPool : minionPool;
                          const next = { ...charStatus };
                          pool.forEach(c => next[c] = 0);
                          setCharStatus(next);
                        }}>Reset All</button>
                      </div>

                      <div className="char-list">
                        {(activeCharCat === 'Villagers' ? villagerPool : activeCharCat === 'Outcasts' ? outcastPool : minionPool).map(v => {
                          const status = getStatus(v);
                          const statusLabels = ["Maybe", "Include", "Banned"];
                          const statusClasses = ["status-maybe", "status-include", "status-banned"];

                          return (
                            <div key={v} className={`char-row ${statusClasses[status]}`}>
                              <span className="char-name">{v}</span>
                              <div className="row-btns">
                                <button 
                                  className={`toggle-btn-ternary status-btn-${status}`}
                                  onClick={() => {
                                    setCharStatus(prev => ({
                                      ...prev,
                                      [v]: (status + 1) % 3 // Cycles 0 -> 1 -> 2 -> 0
                                    }));
                                  }}
                                >
                                  {statusLabels[status]}
                                </button>
                                <button className="info-circle" onClick={() => setDetailedChar(v)}>ⓘ</button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  </div>
                </>
              ) : (
                <div className="char-detail"><button className="back-btn" onClick={() => setDetailedChar(null)}>← Back</button><h2>{detailedChar}</h2><p>{detailedChar}</p></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;