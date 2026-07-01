import React, { useState, useEffect } from 'react';
import './App.css';

const villagerPool = 
['🔧AR', '⚜️BI', '🍞BK', '🙏CF', '📸CM',
  '🎭CP', '🎀CU', '💭DM', '🩺DR', '📝DT', 
  '🛠️EG', '🎥FM', '🔮FT', '💎GC', '💖HL', 
  '🤒IF', '🔍IN', '⚖️JG', '🧵KT', '🐑LB', 
  '📌LC', '📚LI', '🖌️MA', '📬MM', '🧮MT', 
  '👑NB', '☯️NJ', '💊NR', '📣PA', '📡RD', 
  '🐦RK', '🥼SC', '🎖️SH', '🏹SL', '📊ST', 
  '🎓TE', '🎯 TG', '🛡️TK', '☂️WM', '✏️WR', 
  '🧙🏻WZ', '👁️XR'];
const outcastPool = 
['🚨AL', '💰BH', '💣BM', '🤵🏻BT', '🐱CC', 
  '🍺DK', '🔌ET', '🔗FG', '🤝GT', '🙃ID', 
  '⚡JM', '💕LV', '🐮MK', '🎵NM', '✝️PR',
   '🤪PV', '🤖RB', '💉SG', '🦑SQ', '❓SS',
    '⚰️SU', '🦇VB', '🧸VD', '👦🏻YS'];
const minionPool = 
['🧬CL', '🗣️CR', '🔒CT', '👥ET', '👻GH', 
  '🦴GR', '👽HK', '🔫HM', '🤡JK', '🎃MB',
   '🧪PN', '🐛PS', '🔔RC', '🥛RM', '🐀RT',
    '🏴󠁧󠁢󠁳󠁣󠁴󠁿SB','👤SD', '🧛🏻‍♀️VP', '👾VR', '🧹WI'];
const disguises = 
['🔧AR', '⚜️BI', '🍞BK', '🙏CF', '📸CM', 
  '🎭CP', '🎀CU', '💭DM', '🩺DR', '📝DT', 
  '🛠️EG', '🎥FM', '🔮FT', '💎GC', '💖HL', 
  '🤒IF', '🔍IN', '⚖️JG', '🧵KT', '🐑LB', 
  '📌LC', '📚LI', '🖌️MA', '📬MM', '🧮MT', 
  '☯️NJ', '💊NR', '📣PA', '📡RD', '🐦RK', 
  '🥼SC', '🎖️SH', '🏹SL', '📊ST', '🎓TE', 
  '🎯 TG', '🛡️TK', '☂️WM', '✏️WR', '🧙🏻WZ', 
  '👁️XR', '🚨AL', '💰BH', '💣BM', '🤵🏻BT', 
  '🍺DK', '🔌ET', '🔗FG', '🤝GT', '⚡JM', 
  '💕LV', '🐮MK', '🎵NM', '✝️PR', '🤖RB',
  '💉SG', '🦑SQ', '⚰️SU', '🧸VD', 
  '👦🏻YS'];
const disguiseMins = 
['🧬CL', '🗣️CR', '🔒CT', '👻GH', '🦴GR',
  '👽HK', '🔫HM', '🤡JK', '🧪PN', '🔔RC',
  '🐀RT', '👤SD', '🧛🏻‍♀️VP', '👾VR', '🧹WI'];

const selectcount = {"🙏CF":0,"🏹SL":1,"🎀CP":2,"🐐GT":0,"💖HL":0,"🔮FT":0,"🩺DC":0,"🧙🏻WZ":3,"⚖️JG":1,"🧵KT":0,"☯️NJ":0,"🕵UC":0,"🔍IN":2,"📡RD":0,"📌LC":0,"📬MM":0,"☂️WM":0,"🧮MT":0,"⚜️BI":0,"👁️XR":1,"📚LI":3,"🎭MA":0,"✏️PT":0};

function App() {
  // --- Persisted State ---
  const [roleCounts, setRoleCounts] = useState(() => JSON.parse(localStorage.getItem('roleCounts')) || { v: 7, o: 2, m: 3 , sv: 5, so: 2, sm: 2 });
  const [nextroleCounts, setnextRoleCounts] = useState(() => JSON.parse(localStorage.getItem('nextroleCounts')) || { v: 7, o: 2, m: 3 , sv: 5, so: 2, sm: 2 });

  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [killConfirm, setKillConfirm] = useState(() => JSON.parse(localStorage.getItem('killConfirm')) || false);
  const [suspectList, setSuspectList] = useState(() => JSON.parse(localStorage.getItem('suspectList')) || false);
  const [charStatus, setCharStatus] = useState(() => JSON.parse(localStorage.getItem('charStatus')) || {});
  const [villagersus, setvillagersus] = useState(() => JSON.parse(localStorage.getItem('villagersus')) || '');
  const [outcastsus, setoutcastsus] = useState(() => JSON.parse(localStorage.getItem('outcastsus')) || '');
  const [minionsus, setminionsus] = useState(() => JSON.parse(localStorage.getItem('minionsus')) || '');

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
    localStorage.setItem('suspectList', JSON.stringify(suspectList));
    localStorage.setItem('charStatus', JSON.stringify(charStatus));
    localStorage.setItem('grid', JSON.stringify(grid))
  }, [roleCounts, darkMode, killConfirm, charStatus, grid]);

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
    type, regtype: type, id, char: role, app: role, reg: role,
    highlight: [], adjs: {},
    announce: "",
    revealed: 0, used: 0, killed: -1,
    lie: false, convert: '✅', corrupt: '✅', jammed: '✅', blurred: '✅',
    note: "",
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
    setRoleCounts(nextroleCounts);
    localStorage.setItem('roleCounts',JSON.stringify(nextroleCounts));
    if (animatingIndices.size > 0) return;

    const pickRoles = (pool, targetCount) => {
      const forced = pool.filter(c => getStatus(c) === 1);
      const maybe = pool.filter(c => getStatus(c) === 0);
      const combined = [...shuffle(forced), ...shuffle(maybe)].slice(0, targetCount);
      return combined;
    };

    const slV = suspectList ? pickRoles(villagerPool, nextroleCounts.v + nextroleCounts.sv).sort((a, b) => a.slice(-2).localeCompare(b.slice(-2))) : villagerPool;
    const slO = suspectList ? pickRoles(outcastPool, nextroleCounts.o + nextroleCounts.so).sort((a, b) => a.slice(-2).localeCompare(b.slice(-2))) : outcastPool;
    const slM = suspectList ? pickRoles(minionPool.filter(c => c !=='🧛🏻‍♀️VP' && c !=='🥛RM'), nextroleCounts.m + nextroleCounts.sm).sort((a, b) => a.slice(-2).localeCompare(b.slice(-2))) : minionPool.filter(c => c !=='🧛🏻‍♀️VP' && c !=='🥛RM');

    setvillagersus(JSON.stringify(slV));
    setoutcastsus(JSON.stringify(slO));
    setminionsus(JSON.stringify(slM));

    let sV = pickRoles(slV, nextroleCounts.v);
    let sO = pickRoles(slO, nextroleCounts.o);
    let sM = pickRoles(slM, nextroleCounts.m);

    const pCount = sV.length + sO.length + sM.length;
    let p = shuffle([
      ...sV.map(v => ({ r: v, t: 'villager' })),
      ...sO.map(o => ({ r: o, t: 'outcast' })),
      ...sM.map(m => ({ r: m, t: 'minion' })),
      ...Array(16 - pCount).fill({ t: 'empty', type: 'empty'})
    ]);

    let curId = 1;
    const nextG = p.map(x => x.t !== 'empty' ? createPlayer(x.r, x.t, curId++) : x);
    const finalGrid = nextG.map((cell, i) => {
      if (cell.type === 'empty') return cell;

      const row = Math.floor(i / 4), col = i % 4, adjs = { N: null, S: null, W: null, E: null };
      for (let r = row - 1; r >= 0; r--) if (nextG[r * 4 + col].type !== 'empty') { adjs.N = nextG[r * 4 + col].id; break; }
      for (let r = row + 1; r < 4; r++) if (nextG[r * 4 + col].type !== 'empty') { adjs.S = nextG[r * 4 + col].id; break; }
      for (let c = col - 1; c >= 0; c--) if (nextG[row * 4 + c].type !== 'empty') { adjs.W = nextG[row * 4 + c].id; break; }
      for (let c = col + 1; c < 4; c++) if (nextG[row * 4 + c].type !== 'empty') { adjs.E = nextG[row * 4 + c].id; break; }
      return { ...cell, adjs };
    });

    const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    function joker_ability(p, cV) {
      const adjIds = Object.values(p.adjs).filter(id => id !== null);
      const adjVills = finalGrid.filter(c => c.type === 'villager' && adjIds.includes(c.id) && !cV.includes(c.id));
      const target = adjVills[Math.floor(Math.random() * adjVills.length)];
      const B = getRand(slO.filter(r => !sO.includes(r)));
      if (target) {
        cV.push(target.id);
        target.type = "outcast";
        target.char = B;
        target.app = B;
        target.reg = B;
        target.convert = '🤡';
        p.note = '🤡#'+target.id;
        sV = [...new Set(finalGrid.filter(p => p.type === 'villager').map(p => p.char))];
        sO = [...new Set(finalGrid.filter(p => p.type === 'outcast').map(p => p.char))];
      }
      else {
        p.note = '⚠️🤡';
      }
    }

    function clone_ability(p, cV) {
      const adjIds = Object.values(p.adjs).filter(id => id !== null);
      const adjVills = finalGrid.filter(c => c.type === 'villager' && adjIds.includes(c.id) && !cV.includes(c.id));
      const target = adjVills[Math.floor(Math.random() * adjVills.length)];
      if (target) {
        const ranVills = finalGrid.filter(c => c.type === 'villager' && !cV.includes(c.id) && target.id!==c.id);
        const ran = ranVills[Math.floor(Math.random() * ranVills.length)];
        const B = getRand(slV.filter(r => !sV.includes(r)));
        if (ran) {
          cV.push(target.id);
          cV.push(ran.id);
          target.app = B;
          target.char = B;
          target.reg = B;
          target.convert = '🧬'; 
          ran.app = B;
          ran.char = B;
          ran.reg = B;
          ran.convert = '🧬';
          const [aa,bb]=[target.id,ran.id].sort((a, b) => a - b);
          p.note = '🧬#'+aa+','+bb;
          sV = [...new Set(finalGrid.filter(p => p.type === 'villager').map(p => p.char))];
        }
        else {
          p.note = '⚠️🧬';
        }
      }
      else {
        p.note = '⚠️🧬';
      }
    }

    // 1. Setup initial sets and helpers
    const order = ['🤡JK', "🧬CL"].sort(() => Math.random() - 0.5);
    let cV = [];
    order.forEach(x =>
    // 2. Perform Transformations
    finalGrid.forEach(p => {
      if (x === '🤡JK' && p.char === '🤡JK') {
        joker_ability(p, cV);
      }
      if (x === "🧬CL" && p.char === "🧬CL") {
        clone_ability(p, cV);
      }
    }));

    finalGrid.forEach(p => {
      if (p.char === '💰BH') {
        const ranVills = finalGrid.filter(c => c.type === 'villager' && !cV.includes(c.id));
        const ran = ranVills[Math.floor(Math.random() * ranVills.length)];
        const B = getRand(slM.filter(r => !sM.includes(r)));
        if (ran) {
          cV.push(ran.id);
          ran.type = "minion";
          ran.char = B;
          ran.app = B;
          ran.reg = B;
          ran.convert = '💰';
          p.note = '💰#'+ran.id;
          if (ran.char==='🤡JK') {
            joker_ability(ran, cV);
          }
          if (ran.char==="🧬CL") {
            clone_ability(ran, cV);
          }
          sV = [...new Set(finalGrid.filter(p => p.type === 'villager').map(p => p.char))];
          sO = [...new Set(finalGrid.filter(p => p.type === 'outcast').map(p => p.char))];
          sM = [...new Set(finalGrid.filter(p => p.type === 'minion').map(p => p.char))];
        }
        else {
          p.announce = '⚠️💰';
          p.note = '⚠️💰';
        }
      }
      
    });

    finalGrid.forEach(p => {
      if (p.char === '🔔RC') {
        const adjIds = Object.values(p.adjs).filter(id => id !== null);
        const adjOut = finalGrid.filter(c => c.type === 'outcast' && adjIds.includes(c.id) && !cV.includes(c.id) && c.char!=='💰BH');
        const target = adjOut[Math.floor(Math.random() * adjOut.length)];
        const B = getRand(slM.filter(r => !sM.includes(r)));
        if (target) {
          cV.push(target.id);
          target.type = "minion";
          target.char = B;
          target.app = B;
          target.reg = B;
          target.convert = '🔔';
          p.note = '🔔#'+target.id;
          if (target.char==='🤡JK') {
            joker_ability(target, cV);
          }
          if (target.char==="🧬CL") {
            clone_ability(target, cV);
          }
          sV = [...new Set(finalGrid.filter(p => p.type === 'villager').map(p => p.char))];
          sO = [...new Set(finalGrid.filter(p => p.type === 'outcast').map(p => p.char))];
          sM = [...new Set(finalGrid.filter(p => p.type === 'minion').map(p => p.char))];
        }
        else {
          p.note = '⚠️🔔';
        }
      }
    });

    finalGrid.forEach(p => {
      if (p.char === '❓SS') {
        const adjIds = Object.values(p.adjs).filter(id => id !== null);
        const adjVills = finalGrid.filter(c => c.type === 'villager' && adjIds.includes(c.id));
        const target = adjVills[Math.floor(Math.random() * adjVills.length)];
        if (target) {
          cV.push(target.id);
          p.type = 'villager';
          p.char = target.char;
          p.app = target.app;
          p.reg = target.reg;
          p.convert = '❓';
          sV = [...new Set(finalGrid.filter(p => p.type === 'villager').map(p => p.char))];
          sO = [...new Set(finalGrid.filter(p => p.type === 'outcast').map(p => p.char))];
        }
        else {
          p.note = '⚠️❓';
        }
      }
    });

    //disguises
    const alldisguise = disguises.filter(r => slV.includes(r) || slO.includes(r));
    let nipdisguise = alldisguise.filter(r => !sV.includes(r) && !sO.includes(r));
    let ipdisguise = alldisguise.filter(r => sV.includes(r) || sO.includes(r));
    let disguisingmin = disguiseMins.filter(r => sM.includes(r));
    let dV = [];

    finalGrid.forEach(p => {
      if (p.char === "🙃ID") {
        const target = getRand(nipdisguise.filter(r => slV.includes(r)));
        if (target) {
          p.app = target;
          nipdisguise = nipdisguise.filter(r => r !== target);
        }
        else {
          p.note="⚠️🙃"
        }
      }
      if (p.char === "🐱CC") {
        const target = getRand(finalGrid.filter(c => c.type === 'villager'));
        if (target) {
          p.app = target.app;
          p.note = '🐱#'+target.id;
        }
        else {
          p.note = '⚠️🐱';
        }
      }
      if (p.char === "🤪PV") {
        p.app = getRand(slM);
        const target = getRand(finalGrid.filter(r => disguiseMins.includes(r.char)));
        if (target) {
          disguisingmin = disguisingmin.filter(r => r !== target.char);
          p.note = '🤪#'+target.id;
        }
        else {
          p.note = '⚠️🤪';
        }
      }
    });
    
    const order2 = ['🤝GT', "👥ET"].sort(() => Math.random() - 0.5);
    dV=[];
    order2.forEach(x =>
    finalGrid.forEach(p => {
      if (x === '🤝GT' && p.char === '🤝GT') {
        const target = getRand(finalGrid.filter(c => c.type === 'villager' && !dV.includes(c.id)));
        if (target) {
          target.app = "🤝GT";
          dV.push(target.id);
          p.note = '🤝#'+target.id;
        }
        else {
          p.note = '⚠️🤝';
        }
      }
      if (x === "👥ET" && p.char === "👥ET") {
        const target = getRand(finalGrid.filter(c => c.type === 'villager' && !dV.includes(c.id)));
        if (target) {
          target.app = "👥ET";
          dV.push(target.id);
          p.note = '👥#'+target.id;
        }
        else {
          p.note = '⚠️👥';
        }
      }
    }));

    let dlist = [...nipdisguise, ...ipdisguise].slice(0, disguisingmin.length);
    const leftover = getRand(ipdisguise.filter(r => !dlist.includes(r)));
    if (Math.random() < 0.5 && leftover) {
      dlist[0] = leftover;
    }
    dlist = shuffle(dlist);

    finalGrid.forEach(p => {
      if (disguisingmin.includes(p.char)) {
        const D = dlist[0];
        if (D) {
          p.app = D;
          dlist = dlist.slice(1);
        }
      }
    });

    //Liars & Betrayals
    finalGrid.forEach((p) => {
      if (disguiseMins.includes(p.char)) {
        p.corrupt='🤥';
      }
      if (p.char==="🙃ID") {
        p.corrupt='🙃';
      }
    });

    finalGrid.forEach((p) => {
      if (p.char === "🐀RT") {
        const adjIds = Object.values(p.adjs).filter(id => id !== null);
        const adjLies = finalGrid.filter(c => c.corrupt !== '✅' && adjIds.includes(c.id));
        if (adjLies.length > 0) {
          const y = adjLies[Math.floor(Math.random() * adjLies.length)];
          y.corrupt = '🐀';
          p.note = "🐀#"+y.id;
        }
      }
    });
    //Registers
    finalGrid.forEach((p) => {
      if (p.app === "🔗FG") {
        if (['✅','🐀'].includes(p.corrupt)) {
          p.reg=getRand(slM);
          p.regtype="minion";
          p.announce="["+p.reg+"]";
        }
        else {
          p.announce="["+p.char+"]";
        }
      }
      if (p.char === "🔒CT") {
        p.reg="🔗FG";
        p.regtype="outcast";
      }
      if (p.char === "🧹WI") {
        const adjIds = Object.values(p.adjs).filter(id => id !== null);
        const adjVills = finalGrid.filter(c => c.type === 'villager' && adjIds.includes(c.id));
        if (adjVills.length > 0) {
          const y = adjVills[Math.floor(Math.random() * adjVills.length)];
          y.reg = getRand(slM.filter(r => !["🔒CT","👤SD"].includes(r)));
          y.regtype = "minion";
          p.note="🧹#"+y.id;
        }
        else {
          p.note="⚠️🧹";
        }
      }
      if (p.app === "🍺DK") {
        if (['✅','🐀'].includes(p.corrupt)) {
          p.reg=getRand(slO.filter(r => r!=="🍺DK"));
          p.announce="["+p.reg+"]";
        }
        else {
          p.announce="["+getRand(slO.filter(r => r!=="🍺DK"))+"]";
        }
      }
      if (p.char === "👤SD") {
        p.reg=getRand(slM.filter(r => !["🔒CT","👤SD"].includes(r)));
      }
    });

    finalGrid.forEach((p) => {
      if (p.app === "🥼SC") {
        const nonvils = finalGrid.filter(c => c.regtype !== 'villager');
        const target = getRand(nonvils);
        if (target) {
          p.announce = '#'+target.id;
          p.highlight.push(target.id);
          if (['✅','🐀'].includes(p.corrupt)) {
            p.regtype=target.regtype;
            p.reg=target.reg;
          }
          else {
            if (target.regtype==='outcast') {
              p.regtype='minion';
              p.reg=getRand(slM.filter(r => r!=="👤SD"));
            }
            else {
              p.regtype='outcast';
              p.reg=getRand(slO.filter(r => r!=="🍺DK"));
            }
          }
        }
        else {
          p.announce="⚠️🥼"
        }
      }
    });

    //Corruptions
    const order3 = ["🧪PN", "🐛PS"].sort(() => Math.random() - 0.5);
    order3.forEach(xx =>
    finalGrid.forEach((x) => {
      if (xx==="🧪PN" && x.char === "🧪PN") {
        const adjIds = Object.values(x.adjs).filter(id => id !== null);
        const adjVills = finalGrid.filter(c => c.regtype === 'villager' && adjIds.includes(c.id) && c.corrupt=='✅');
        if (adjVills.length > 0) {
          const y = adjVills[Math.floor(Math.random() * adjVills.length)];
          y.corrupt = "🧪";
          x.note = "🧪#"+y.id;
        }
        else {
          x.note = "⚠️🧪";
        }
      }
      if (xx==="🐛PS" && x.char === "🐛PS") {
        const adjIds = Object.values(x.adjs).filter(id => id !== null);
        const adjVills = finalGrid.filter(c => c.regtype === 'villager' && adjIds.includes(c.id) && c.corrupt=='✅');
        if (adjVills.length > 0) {
          const y = adjVills[Math.floor(Math.random() * adjVills.length)];
          y.corrupt = "🐛";
          x.note = "🐛#"+y.id;
        }
        else {
          x.note = "⚠️🐛";
        }
      }
    }));

    finalGrid.forEach((p) => {
      if (p.app === "🤵🏻BT") {
        if (['✅','🐀'].includes(p.corrupt)) {
          const vils = finalGrid.filter(c => c.regtype === 'villager' && c.corrupt=='✅');
          const v = vils[Math.floor(Math.random() * vils.length)]
          const others = finalGrid.filter(c => c.type !== 'empty' && c.id !== p.id && c.id !== v.id);
          const o = others[Math.floor(Math.random() * others.length)];
          const [a,b] = [v.id,o.id].sort((a, b) => a - b);
          p.highlight.push(a);
          p.highlight.push(b);
          v.corrupt = "🤵🏻";
          p.announce = `🤵🏻#${a},${b}`;
        }
        else {
          const mini = finalGrid.filter(c => !['✅','🐀'].includes(c.corrupt) && c !== p);
          const m = mini[Math.floor(Math.random() * mini.length)]
          const others = finalGrid.filter(c => c.type !== 'empty' && c.id !== p.id && c.id !== m.id);
          const o = others[Math.floor(Math.random() * others.length)];
          const [a,b] = [m.id,o.id].sort((a, b) => a - b);
          p.highlight.push(a);
          p.highlight.push(b);
          p.announce = `🤵🏻#${a},${b}`;
        }
      }
    });

    //jam
    finalGrid.forEach((p) => {
      if (p.app === "⚡JM") {
        p.announce = Math.random()<0.5 ? '↔️' : '↕️';
        let tars = [];
        if (p.announce==='↔️') {
          tars.push(p.adjs.E);
          tars.push(p.adjs.W);
        }
        else {
          tars.push(p.adjs.N);
          tars.push(p.adjs.S);
        }
        tars.forEach((tid) => {
          if (tid) {
            const target = finalGrid.filter(r => r.id === tid)[0];
            p.highlight.push(tid);
            if (['✅','🐀'].includes(p.corrupt) && target.regtype!=="minion") {target.jammed = "⚡";}
            if (!['✅','🐀'].includes(p.corrupt) && target.regtype=="minion") {target.jammed = "⚡";}
          }
        })
      }
    });

    finalGrid.forEach((p) => {
      if (p.app === "🤖RB") {
        const vills = finalGrid.filter(r => r.regtype === 'villager' && r.jammed === '✅');
        const minis = finalGrid.filter(r => r.regtype === 'minion' && r.jammed === '✅');
        if (['✅','🐀'].includes(p.corrupt)) {
          if (vills && minis) {
            const jv = getRand(vills);
            const jm = getRand(minis);
            jv.jammed = '🤖';
            jm.jammed = '🤖';
            const [a,b] = [jv.id,jm.id].sort((a, b) => a - b);
            p.note = '🤖#'+a+','+b;
          }
          else {
            p.note = '⚠️🤖';
          }
        }
        else {
          if (vills.length>=2) {
            const jvs = shuffle(vill);
            jvs[0].jammed = '🤖';
            jvs[1].jammed = '🤖';
            const [a,b] = [jvs[0].id,jvs[1].id].sort((a, b) => a - b);
            p.note = '🤖#'+a+','+b;
          }
          else {
            p.note = '⚠️🤖';
          }
        }
      }
    });

    finalGrid.forEach((p) => {
      if (p.char === "👽HK") {
        const jams = shuffle(finalGrid.filter(r => r.jammed === '✅' && r.regtype !== 'minion'));
        if (jams.length>=2) {
          jams[0].jammed = '👽';
          jams[1].jammed = '👽';
          const [a,b] = [jams[0].id,jams[1].id].sort((a, b) => a - b);
          p.note = '👽#'+a+','+b;
        }
        else {
          p.note = '⚠️👽';
        }
      }
    });

    //blur
    finalGrid.forEach((p) => {
      if (p.app === "🚨AL") {
        const adjIds = Object.values(p.adjs).filter(id => id !== null);
        const adjMins = finalGrid.filter(c => c.type === 'minion' && adjIds.includes(c.id));
        if (['✅','🐀'].includes(p.corrupt) && adjMins.length>=1) {p.blurred="🚨";}
        if (!['✅','🐀'].includes(p.corrupt) && adjMins.length<1) {p.blurred="🚨";}
      }
    });

    finalGrid.forEach((p) => {
      if (p.char === "👾VR") {
        const blurs = shuffle(finalGrid.filter(r => r.blurred === '✅' && r.regtype !== 'outcast'));
        if (blurs) {
          blurs[0].blurred = '👾';
          p.note = '👾#'+blurs[0].id;
        }
        else {
          p.note = '⚠️👾';
        }
      }
    });

    //debuff swap



    console.log('newboard');
    console.log(sV, sO, sM);
    console.log(finalGrid);
    
    setGameMode('Default');
    setAbilityUserIdx(null); 
    setSelectedIndices([]);
    setShowSettings(false);
    triggerAnimation([...Array(16).keys()], 'flip', finalGrid, -turns);
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
      if (killConfirm && !window.confirm(`Kill #${cell.id}?`)) return;

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

  const getCombinedTableData = () => {
    const allActive = [
      ...JSON.parse(villagersus).filter(c => getStatus(c) <= 1).map(c => ({ name: c, role: 'v', isForced: getStatus(c) === 1 })),
      ...JSON.parse(outcastsus).filter(c => getStatus(c) <= 1).map(c => ({ name: c, role: 'o', isForced: getStatus(c) === 1 })),
      ...JSON.parse(minionsus).filter(c => getStatus(c) <= 1).map(c => ({ name: c, role: 'm', isForced: getStatus(c) === 1 })),
    ];

    // 2. Chunk into rows of 4
    const rows = [];
    for (let i = 0; i < allActive.length; i += 4) {
      rows.push(allActive.slice(i, i + 4));
    }
    return rows;
  };

  const wrongs = grid.filter(c => c.type !== 'empty' && c.type !== 'minion' && c.killed !== -1).length;

  const updateRoleCount = (type, delta) => {
    setnextRoleCounts(prev => {
      const newVal = prev[type] + delta;
      if (type === 'm' && newVal < 1) return prev;
      if (newVal < 0) return prev;
      if (type === 'sv' && newVal < prev.m) return prev;
      const otherRolesSum = (type === 'v' ? 0 : prev.v) + (type === 'o' ? 0 : prev.o) + (type === 'm' ? 0 : prev.m);
      if (type[0]!=='s' && otherRolesSum + newVal > 16) return prev;
      const newrole = { ...prev, [type]: newVal };
      localStorage.setItem('nextroleCounts', JSON.stringify(newrole));
      return newrole;
    });
  };

  return (
    <div className={`main-viewport ${darkMode ? 'dark-mode' : ''} ${gameMode === 'Kill' ? (darkMode ? 'dark-kill-mode' : 'kill-mode') : ''} ${animatingIndices.size > 0 ? 'input-locked' : ''}`}>
      <div className="game-container">
        <header className="branding">
          <h1 className="title">GridBluff</h1>
          <p className="subtitle">minimal solo social deduction game inspired by Demon Bluff & Dupery</p>
        </header>

        <div className="control-bar">
          <div className="control-left">
            <button className="square-btn" onClick={() => setShowSettings(true)}>☆</button>
            <span className="turns">🕒{turns}</span>
          </div>
          <div className="control-right">
            <span className="stats-text">{roleCounts.v}/{roleCounts.o}/{roleCounts.m}={roleCounts.v+roleCounts.o+roleCounts.m}</span>
            <button className="square-btn" onClick={initializeGrid}>⟲</button>
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
                   {cell.type !== 'empty' && <div className={`id-triangle ${cell.killed !== -1 ? 'id-triangle-dead' : ''}`}><span className={abilityUserIdx === index ? 'id-number-y-txt' : 'id-number'}>{cell.id}</span></div>}
                   {cell.type === 'empty' ? <span className="text-xl"></span> : (cell.revealed === -1 && cell.killed === -1 && gameMode!=="Ended") ? <span className="text-xl">?</span> : (
                     <div className="c-info">
                      <span className="text-xs">⠀⠀{cell.convert}{cell.corrupt}{cell.reg===cell.char ? '✅' : cell.reg.slice(0, -2)}{cell.jammed}{cell.blurred}</span>
                      <span className="text-xs">{cell.char!==cell.app ? cell.char+" ("+cell.app+")" : cell.char}</span>
                      <span className="text-xs">{cell.announce}</span>
                      <span className="text-xs">{cell.revealed !== -1 ? `🗝️${cell.revealed}` : ""}{cell.used > 0 ? `💡${cell.used}` : ""}{cell.killed !== -1 ? `🔪${cell.killed}` : ""}</span>
                      <span className="text-xs">{cell.note}</span>
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
          {gameMode === 'Ended' && <button className="tool-btn bg-ended" disabled>Game Over: 🕒{turns} 🩸{wrongs}</button>}
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
                      <h2>Current Village</h2>
                      <div className="stats-summary">
                        <div className="control-left">
                        <span className="turns">🕒{turns}</span>
                        </div>
                        <div className="control-right">
                        <span className="stats-text">{roleCounts.v}/{roleCounts.o}/{roleCounts.m}={roleCounts.v+roleCounts.o+roleCounts.m}</span>
                        </div>
                      </div>
                      
                      <table className="char-grid-table">
                        <tbody>
                          {getCombinedTableData().map((row, ri) => (
                            <tr key={ri}>
                              {row.map((c, ci) => {
                                const roleClass = c.role === 'v' ? 'c-state-alive-v' : c.role === 'o' ? 'c-state-alive-o' : 'c-state-alive-m';
                                const borderClass = c.isForced ? 'b-lime-mod' : '';
                                
                                return (
                                  <td key={ci} className={`${roleClass} ${borderClass}`}>
                                    {c.name}
                                  </td>
                                );
                              })}
                              {row.length < 4 && Array(4 - row.length).fill(0).map((_, i) => (
                                <td key={`empty-${i}`} className="td-empty" />
                              ))}
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
                        <div className="toggle-row"><span>Suspect List</span><button className={`toggle-btn ${suspectList ? 'on' : ''}`} onClick={() => setSuspectList(!suspectList)}>{suspectList ? 'ON' : 'OFF'}</button></div>
                        <div className="divider" />
                        <h2>Village Settings</h2>
                        <div className="counter-row"><span>Villagers</span><div className="controls"><button onClick={() => updateRoleCount('v', -1)}>-</button><span>{nextroleCounts.v}</span><button onClick={() => updateRoleCount('v', 1)}>+</button></div></div>
                        <div className="counter-row"><span>Outcasts</span><div className="controls"><button onClick={() => updateRoleCount('o', -1)}>-</button><span>{nextroleCounts.o}</span><button onClick={() => updateRoleCount('o', 1)}>+</button></div></div>
                        <div className="counter-row"><span>Minions</span><div className="controls"><button onClick={() => updateRoleCount('m', -1)}>-</button><span>{nextroleCounts.m}</span><button onClick={() => updateRoleCount('m', 1)}>+</button></div></div>
                        {suspectList && (<>
                        <div className="counter-row"><span>Suspected Villagers</span><div className="controls"><button onClick={() => updateRoleCount('sv', -1)}>-</button><span>+{nextroleCounts.sv}</span><button onClick={() => updateRoleCount('sv', 1)}>+</button></div></div>
                        <div className="counter-row"><span>Suspected Outcasts</span><div className="controls"><button onClick={() => updateRoleCount('so', -1)}>-</button><span>+{nextroleCounts.so}</span><button onClick={() => updateRoleCount('so', 1)}>+</button></div></div>
                        <div className="counter-row"><span>Suspected Minions</span><div className="controls"><button onClick={() => updateRoleCount('sm', -1)}>-</button><span>+{nextroleCounts.sm}</span><button onClick={() => updateRoleCount('sm', 1)}>+</button></div></div>
                        </>)}
                        <div className="modal-footer-btns">
                           <button className="footer-btn reset" onClick={() => setnextRoleCounts({v:7, o:2, m:3, sv:5, so:2, sm:2})}>Reset</button>
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
                                {(v !=='🧛🏻‍♀️VP' && v !=='🥛RM') ?  <button 
                                  className={`toggle-btn-ternary status-btn-${status}`}
                                  onClick={() => {
                                    setCharStatus(prev => ({
                                      ...prev,
                                      [v]: (status + 1) % 3 // Cycles 0 -> 1 -> 2 -> 0
                                    }));
                                  }}
                                >
                                  {statusLabels[status]}
                                </button> : <></>}
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