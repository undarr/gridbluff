import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const villagerPool = 
['👁️AB', '😇AG', '📏AR', '🪕BA', '⚜️BI',
'🍞BK', '🍖CB', '🙏CF', '🗺️CG', '📸CM',
'🎭CP', '🎀CU', '💭DM', '📝DT', '🩺DR',
'🛠️EG', '🧠EL', '😎EV', '🔮FT', '🔨FX',
'💎GC', '⚰️GK', '🐐GO', '🛡️GU', '💔HB', 
'💖HL', '🔍IN', '🤐IV', '🤹JE', '⚖️JG', 
'💍JS', '👑KI', '🗡️KN', '🧵KT', '🐑LB', 
'🧭LC', '📚LI', '💼LW', '🖌️MA', '📬MM',
'🧮MT', '🏛️MY', '☯️NJ', '💊NR', '📣PA',
'🕊️PC', '🎤PF', '📡RD', '🕯️RI', '🔭RG',
'🐦RK', '🗿SE', '🎖️SH', '🏹SL', '📊ST',
'📐SV', '🎓TE', '☕TL', '☂️WM', '✏️WR',
'🧙🏻WZ', '🎞️XR'];

const outcastPool = 
['🍷AC', '🤖AI', '🚨AL', '💰BH', '💣BM', '🤵🏻BT', 
'🐱CC', '🍺DK', '😔DP', '🔊EC', '🔌EE', 
'🔗FG', '🤢FP', '🎲GB', '🎮GM',
'🦴GR', '🤝GT', '⚡JM', '🤡JX', '💕LV',
'🌙MC', '🐙MI', '🎵NM', '😝PD', '✝️PR', '🤪PV', 
'🥼SC', '💉SG', '🍬SH', '🦑SQ', '❓SS', 
'🦇VB', '🧸VD', '👦🏻YS'];


const minionPool = 
['👮🏻‍♂️BC', '🧬CL', '🤬CR', '👹DE', '👥ET', 
'👗FD', '👻GH', '👽HK', '🔫HM', '🃏JK', 
'🎃MB', '🎩MG', '🐺MU', '🧪PN', '🐛PS', 
'🔔RC', '🕹️SB', '👤SD', '🪓SK', '🚬SM', '🐍SN',
'🦊TK', '🌀TP', '🧛🏻‍♀️VP', '👾VR', '🧹WI', '🧟ZB']

const disguises = 
['👁️AB', '😇AG', '📏AR', '🪕BA', '⚜️BI',
'🍞BK', '🍖CB', '🙏CF', '🗺️CG', '📸CM',
'🎭CP', '🎀CU', '💭DM', '📝DT', '🩺DR',
'🛠️EG', '🧠EL', '😎EV', '🔮FT', '🔨FX', '💎GC',
'⚰️GK', '🐐GO', '🛡️GU', '💔HB', '💖HL',
'🔍IN', '🤐IV', '🤹JE', '⚖️JG', '💍JS',
'👑KI', '🗡️KN', '🧵KT', '🐑LB', '🧭LC',
'📚LI', '💼LW', '🖌️MA', '📬MM', '🧮MT', 
'🏛️MY', '☯️NJ', '💊NR', '📣PA', '🕊️PC', 
'🎤PF', '📡RD', '🕯️RI', '🔭RG', '🐦RK', 
'🗿SE', '🎖️SH', '🏹SL', '📊ST', '📐SV', 
'🎓TE', '☕TL', '☂️WM', '✏️WR', '🧙🏻WZ',
'🎞️XR',
'🍷AC', '🚨AL', '💰BH', '💣BM', 
'🤵🏻BT', '🔊EC', 
'🔌EE', '🔗FG', '🎲GB', '🎮GM', 
'🤝GT', '⚡JM', '🤡JX', '💕LV',
'🌙MC', '🎵NM', '✝️PR', 
'🥼SC', '💉SG', '🦑SQ',
'🧸VD', '👦🏻YS'];


const selectcount = {
  '👁️AB': 1, '😇AG': -1, '📏AR': -1, '🪕BA': -1, '⚜️BI': -1, 
  '🍞BK': -1, '🍖CB': 1, '🙏CF': -1, '🗺️CG': -1, '📸CM': 0, 
  '🎭CP': -1, '🎀CU': 2, '💭DM': 1, '📝DT': -1, '🩺DR': 1, 
  '🛠️EG': -1, '🧠EL': -1, '😎EV': -1, '🔮FT': 2, '🔨FX': 1, 
  '💎GC': -1, '⚰️GK': 1, '🐐GO': -1, '🛡️GU': 1, '💔HB': -1, 
  '💖HL': -1, '🔍IN': -1, '🤐IV': -1, '🤹JE': 3, '⚖️JG': 1, 
  '💍JS': -1, '👑KI': -1, '🗡️KN': -1, '🧵KT': -1, '🐑LB': -1, 
  '🧭LC': 1, '📚LI': 3, '💼LW': 3, '🖌️MA': -1, '📬MM': -1, 
  '🧮MT': -1, '🏛️MY': -1, '☯️NJ': -1, '💊NR': -1, '📣PA': -1, 
  '🕊️PC': -1, '🎤PF': -1, '📡RD': -1, '🕯️RI': 3, '🔭RG': -1, 
  '🐦RK': -1, '🗿SE': -1, '🎖️SH': -1, '🏹SL': 1, '📊ST': -1, 
  '📐SV': -1, '🎓TE': -1, '☕TL': -1, '☂️WM': -1, '✏️WR': -1, 
  '🧙🏻WZ': -1, '🎞️XR': 3, '🍷AC': -1, '🚨AL': -1, '💰BH': -1, 
  '💣BM': -1, '🤵🏻BT': -1, '🔊EC': -1, '🔌EE': -1, '🔗FG': -1, 
  '🎲GB': -1, '🎮GM': -1, '🤝GT': -1, '⚡JM': -1, '🤡JX': -1, 
  '💕LV': -1, '🌙MC': -1, '🎵NM': -1, '✝️PR': -1, '🥼SC': -1, 
  '💉SG': -1, '🦑SQ': -1, '🧸VD': -1, '👦🏻YS': -1};

function details(p) {
  if (p=="👁️AB") {
    return (<>The <b>Arbiter (👁️AB)</b> checks if a selected member is in a disguise.<br/><br/>
            <b>Ability:</b> Selects 1 player with member id x,<br/>
            <b>When neither lying nor corrupted,</b> announces "#x✅🤓" if the selected member is in a disguise 
            and announce "#x❌🤓" if the selected member is not in a disguise.<br/>
            <b>When lying or corrupted,</b> announce the opposite of that above.<br/>
            </>)
  }
  else if (p=="😇AG") {
    return (<>The <b>Angel (😇AG)</b> heals a row or column, whichever more corrupted.<br/><br/>
            <b>Initial Phase:</b><br/>
            CorruptRemove2: <b><br/>When neither lying nor corrupted,</b> if there are more corrupted members in its row than its column, remove corruption from all members in its row,
            if there are more corrupted members in its column than its row, remove corruption from all members in its column,
            if there are equal amount of corrupted members in its row and its column, remove corruption from all members in either its row or its column randomly.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if it removed corruption from all members in its row, announce "😇↔️", if it removed corruption from all members in its column, announce "😇↕️".<br/>
            <b>When lying or corrupted,</b> if it removed corruption from any member, announce the opposite of that above, else announce one of the option above randomly.
            </>)
  }
  else if (p=="📏AR") {
    return (<>The <b>Architect (📏AR)</b> checks if there are more or less minions in its row or column.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if there are more minions in its row than its column, announce "📏:↔️{'>'}↕️", 
            if there are more minions in its column than its row, announce "📏:↔️{'<'}↕️", 
            if there are equal amount of minions in its row and its column, announce "📏:↔️=↕️".<br/>
            <b>When lying or corrupted,</b> announce one of the options different from that above.
            </>)
  }
  else if (p=="🪕BA") {
    return (<>The <b>Bard (🪕BA)</b> counts the number of corrupted members.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🪕:😵n", where n is the total number of corrupted members.<br/>
            <b>When lying or corrupted,</b> announce "🪕:😵n", where n is 1 off the total number of corrupted members.
            </>)
  }
  else if (p=="⚜️BI") {
    return (<>The <b>Bishop (⚜️BI)</b> finds 3 members of different roles.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "⚜️#x,y,z", where x, y and z are the member ids 
            of a random villager, a random outcast and a random minion, in random order.<br/>
            <b>When lying or corrupted,</b> if possible, announces "⚜️#x,y,z", where x, y and z are the member ids 
            of a random villager, a random outcast and a different random non-minion, in random order.
            </>)
  }
  else if (p=="🍞BK") {
    return (<>The <b>Baker (🍞BK)</b> keep baking unrevealed villagers into itself.<br/><br/>
            A member who was not baked by any baker is defined as an original baker. Let the baker count of an original baker be 1, and the baker count of a non-original baker be 1 more than the baker count of the baker that baked it.<br/>
            <b>Ability:</b> When woken,<br/>
            Announces "🍞n:p", where p is my original appearance and n is the baker count of the baker.<br/>
            <b>When neither lying nor corrupted,</b> if possible, a random unwoken villager that is not in a disguise, will be baked and now disguise as a baker.<br/>
            <b>When lying or corrupted,</b> if possible, a random unwoken non-villager who was disguising as a villager, will be baked and now disguise as a baker.<br/><br/>
            Note: An original baker can be baked by another baker.
            </>)
  }
  else if (p=="🙏CF") {
    return (<>The <b>Confesser (🙏CF)</b> confesses if it's a liar or not.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🙏👍"<br/>
            <b>When lying or corrupted,</b> announces "🙏👎"
            </>)
  }
  else if (p=="🍖CB") {
    return (<>The <b>Cannibal (🍖CB)</b> eats a member and reports its character type.<br/><br/>
            <b>Ability:</b> Select a member with id x,<br/>
            x becomes a final excution target. If x did not die, announce "🍖⚠️#x", else x dies and keeps its original appearance.
            <b>When neither lying nor corrupted,</b> announces "🍖#x=t" where t is "😄" if x is a villager, "🥴" if x is an outcast and 
            "😈" if x is a minion.<br/>
            <b>When lying or corrupted,</b> announces one of the options different from that above.
            </>)
  }
  else if (p=="🗺️CG") {
    return (<>The <b>Cartography (🗺️CG)</b> locates a nearby Outcast and Minion.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "🗺️:pq", where p is one of the characters of the nearest non-self Outcast and q is one of the characters of the nearest non-self Minion.<br/>
            <b>When lying or corrupted,</b> announces "🗺️:pq", where p is an Outcast that isn't one of the characters of the nearest non-self Outcast and q is a Minion that isn't one of the characters of the nearest non-self Minion. Note that p and q can both independently be either in play or not in-play.
            </>)
  }
  else if (p=="📸CM") {
    return (<>The <b>Cameraman (📸CM)</b> counts the number of revealed minions.<br/><br/>
            <b>Ability:</b> When activated,<br/>
            <b>When neither lying nor corrupted,</b> announces "📸n", where n is the total number of revealed minions.<br/>
            <b>When lying or corrupted,</b> announces "📸n", where n is reasonably 1 off from that above.
            </>)
  }
  else if (p=="🎭CP") {
    return (<>The <b>Cosplayer (🎭CP)</b> counts the number of disguised members.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🎭:🤓n", where n is the total number of disguised members.<br/>
            <b>When lying or corrupted,</b> announces "🎭:🤓n", where n is 1 off the total number of disguised members.
            </>)
  }
  else if (p=="🎀CU") {
    return (<>The <b>Cupid (🎀CU)</b> checks if 2 members are of the same alignment.<br/><br/>
            <b>Ability:</b> Select 2 members with member ids x,y,<br/>
            <b>When neither lying nor corrupted,</b> if the two selected players are both minions or both non-minions, announces "🎀#x=y", else announce "🎀#x≠y".<br/>
            <b>When lying or corrupted,</b> announces the opposite of that above.
            </>)
  }
  else if (p=="💭DM") {
    return (<>The <b>Dreamer (💭DM)</b> checks a member's character among 2 characters.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            <b>When neither lying nor corrupted,</b> announces "💭#x=pq", where p is a non-minion character, q is a minion character, and x is either x or y.<br/>
            <b>When lying or corrupted,</b> announces "💭#x=pq", where p is a non-minion character, q is a minion character, and x is neither p nor q.
            </>)
  }
  else if (p=="🩺DR") {
    return (<>The <b>Doctor (🩺DR)</b> checks for the source of debuff of a random role.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            <b>When neither lying nor corrupted,</b> announce "🩺#x:pqr", where p is "👍" if x is not corrupted, else p is the source of x's corruption, 
            q is "👍" if it is not jammed, else q is the source of x's jamming, r is "👍" if it is not blurred, else r is the source of x's blurness.<br/>
            <b>When lying or corrupted,</b> announce "🩺#x:pqr", where p is "👍" if x is corrupted, else p is a random way of corruption, 
            q is "👍" if it is not jammed, else q is a random source of jamming different from that caused to x, 
            r is "👍" if it is not blurred, else r is a random source of blurness different from that caused to x.<br/>
            </>)
  }
  else if (p=="📝DT") {
    return (<>The <b>Detective (📝DT)</b> finds an unrevealed liar at halftime.<br/><br/>
            <b>Ability:</b> When woken, and after halftime, whichever latter,<br/>
            <b>When neither lying nor corrupted,</b> if there is at least 1 unrevealed member that is lying or corrupted, announces "📝#x",
            where x is the id of a random unrevealed member that is lying or corrupted, else, announce "📝👍"<br/>
            <b>When lying or corrupted,</b> if there is at least 1 unrevealed member that is neither lying nor corrupted, announces "📝#x",
            where x is the id of a random unrevealed member that is neither lying nor corrupted, else, announce "📝👍"
            </>)
  }
  else if (p=="🛠️EG") {
    return (<>The <b>Engineer (🛠️EG)</b> fixs nearby jamming and blurness.<br/><br/>
            <b>Initial Phase:</b><br/>
            JamRemove: Removes jamming from itself and all adjacent members.<br/>
            BlurRemove: Removes jamming from itself and all adjacent members.<br/>
            <b>When lying or corrupted,</b> corrupts all adjacent non-minion members who has jamming and blurness removed by it.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Announce "🛠️n", where n is the number of members who had their jamming or blur or both, removed by it.<br/>
            </>)
  }
  else if (p=="🧠EL") {
    return (<>The <b>Enlightened (🧠EL)</b> focuses to learn its own morality.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When not corrupted,</b> Announce "🧠:t", where t is "👍" if I am a villager, "👎" if I am a minion and "👍" or "👎" randomly if I am an outcast.<br/>
            <b>When corrupted,</b> Announce "🧠:t", where t is "👎" if I am a villager, "👍" if I am a minion and "👍" or "👎" randomly if I am an outcast.<br/>
            Note: lying does not affect my ability.
            </>)
  }
  else if (p=="😎EV") {
    return (<>The <b>Extrovert (😎EV)</b> finds friends of different types across the grid.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announce "😎:pqr", where p, q and r are an in-play villager character, an in-play outcast character and an in-play minion character.<br/>
            <b>When lying or corrupted,</b> announce "😎:pqr", where p, q and r are a villager character, an outcast character and a minion character where exactly 1 or exactly 2 of them are in-play characters.
            </>) 
  }
  else if (p=="🔮FT") {
    return (<>The <b>Fortune Teller (🔮FT)</b> checks if minions are among 2 members.<br/><br/>
            <b>Ability:</b> Select 2 members with member ids x,y,<br/>
            <b>When neither lying nor corrupted,</b> announce "🔮👍#x,y", if neither x or y are minions, else announce "🔮👎#x,y".<br/>
            <b>When lying or corrupted,</b> announce the opposite of that above.
            </>) 
  }
  else if (p=="🔨FX") {
    return (<>The <b>Fixer (🔨FX)</b> fixs jamming and blurness on request.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            If x is jammed or corrupted, removes jamming and blurness from x and announce "🔨#x"
            <b>When lying or corrupted,</b> if x is non-minion, corrupts x.
            Else, announce "🔨⚠️#x".
            </>) 
  }
  else if (p=="💎GC") {
    return (<>The <b>Gemcrafter (💎GC)</b> finds a good member.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announce "💎👍#x", where x is a random non-minion member appearing as a non-minion.
            <b>When lying or corrupted,</b> if possible, announce "💎👍#x", where x is a random minion member disguising as a non-minion.
            </>) 
  }
  else if (p=="⚰️GK") {
    return (<>The <b>Gravekeeper (⚰️GK)</b> investigates a dead member.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            Announces "⚰️#x" if x is alive, else
            <b>When neither lying nor corrupted,</b> announce "⚰️#x:pq", where p is the source of x's death q is "👍" if x is not corrupted, else q is the source of q's corruption.
            <b>When lying or corrupted,</b> announce "⚰️#x:pq", where p and q are both different from that of above.<br/>
            Note: Ability only works when I am alive.
            </>) 
  }
  else if (p=='🐐GO') {
    return (<>The <b>Goat (🐐GO)</b> locates a minion.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🐐:n", where n is the tile-distance between it and the nearest minion.<br/>
            <b>When lying or corrupted,</b> announce "🐐:m"  where m is reasonably 1 off n if possible.
            </>)
  }
  else if (p=='🛡️GU') {
    return (<>The <b>Guard (🛡️GU)</b> protects a member.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            If x is alive, announce "🛡️#x". When x is killed for the first time, member x keeps its original appearance, announce "🛡️#x:p", where p is the source of x's death.<br/>
            <b>When neither lying nor corrupted,</b> and x is not corrupted, when x is killed for the first time, x does not die.
            </>) 
  }
  else if (p=="💔HB") {
    return (<>The <b>Heartbrokened (💔HB)</b> cries out lies.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            If possible, choses an information gaining villager character p, preferably not-in-play.<br/>
            <b>When neither lying nor corrupted,</b> announces whatever p would announce were it lying.
            <b>When lying or corrupted,</b> announces whatever p would announce were it truthful and uncorrupted.
            </>) 
  }
  else if (p=="💖HL") {
    return (<>The <b>Healer (💖HL)</b> heals nearby corruptions.<br/><br/>
            <b>Initial Phase:</b><br/>
            CorruptRemove2: <b>When neither lying nor corrupted,</b> removes corruption from adjacent neighbours.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Let m be the number of members who had corruption removed by it.<br/>
            Let n be the number of adjacent members who had corruption.<br/>
            <b>When neither lying nor corrupted,</b> announces "💖m"<br/>
            <b>When lying or corrupted,</b> announces "💖k" where k is reasonably 1 off from m.
            </>) 
  }
  else if (p=="🔍IN") {
    return (<>The <b>Investigator (🔍IN)</b> finds a minion.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🔍p#x,y", where x and y are the ids of a non-self minion and a non-self non-minion in random order and p is the character of the minion.<br/>
            <b>When lying or corrupted,</b> announces "🔍p#x,y", where x and y are the ids of 2 non-self non-minions in random order and p is a in-play minion character.
            </>)
  }
  else if (p=="🤐IV") {
    return (<>The <b>Introvert (🤐IV)</b> befriends whoever talks to him.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Let x be the first member to <br/>
            <b>When neither lying nor corrupted,</b> announces "🤐:p", where p is a character of one of its neighbours.<br/>
            <b>When lying or corrupted,</b> announces "🤐:p", where p is a character that does not belong to any of its neighbours.
            </>) 
  }
  else if (p=="🤹JE") {
    return (<>The <b>Jester (🤹JE)</b> counts and juggles minions.<br/><br/>
            <b>Ability:</b> Select 3 members with member ids x,y and z,<br/>
            <b>When neither lying nor corrupted,</b> announces "🤹#x,y,z=n", where n is the number of minions among x, y and z.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="⚖️JG") {
    return (<>The <b>Judge (⚖️JG)</b> judges a member's honesty.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            <b>When neither lying nor corrupted,</b> announces "⚖️#x✅🤥" if the selected member is lying or corrupted
            and announce "⚖️#x❌🤥" if the selected member is neither lying nor corrupted.<br/>
            <b>When lying or corrupted,</b> announces the opposite of that above.
            </>) 
  }
  else if (p=="💍JS") {
    return (<>The <b>Jewelsmith (💍JS)</b> finds a honest member.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announce "💍👍#x", where x is a non-self member that is not lying nor corrupted
            <b>When lying or corrupted,</b> if possible, announce "💍👍#x", where x is a non-self member that is lying or corrupted
            </>) 
  }
  else if (p=="👑KI") {
    return (<>The <b>King (👑KI)</b> is always good.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Minions cannot disguise as the King.<br/>
            Register: <b>When corrupted,</b> registers as a random in-play minion.
            </>)
  }
  else if (p=="🗡️KN") {
    return (<>The <b>Knight (🗡️KN)</b> protects itself.<br/><br/>
            <b>Ability:</b> When killed for the first time,<br/>
            Announces "🗡️:p", where p is the source of death. Use up this ability<br/>
            <b>When neither lying nor corrupted,</b> does not die.<br/>
            Note: A truthful minion disguising as a knight will not die upon the first execution.
            </>) 
  }
  else if (p=="🧵KT") {
    return (<>The <b>Knitter (🧵KT)</b> counts knitted minions.<br/><br/>
            Let n be the number of pairs of minion. A pair of minion consists of 2 adjacent members in which both are minions. 
            Note that a minion can be in up to 4 pairs. <br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🧵:n".<br/>
            <b>When lying or corrupted,</b> announce a reasonable output 1 off from that above.
            </>)
  }
  else if (p=="🐑LB") {
    return (<>The <b>Lamb (🐑LB)</b> locates an outcast.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🐑n", where n is the tile-distance between it and the nearest outcast.<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
            </>)
  }
  else if (p=="🧭LC") {
    return (<>The <b>Locator (🧭LC)</b> helps a member locate someone similar.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "🧭#x:n", where n is the tile-distance between it and y, where y the nearest member from x that has the same character type as x.<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
            </>)
  }
  else if (p=='📚LI') {
    return (<>The <b>Librarian (📚LI)</b> finds an outcast.<br/><br/>
            <b>Ability:</b> Select 3 members with member ids x,y and z,<br/>
            <b>When neither lying nor corrupted,</b> if there is an outcast among x,y and z, announces "📚#x,y,z=p", where p is an Outcast character among x,y and z, else announce "📚⚠️#x,y,z".<br/>
            <b>When lying or corrupted,</b> either announces "📚#x,y,z=p", where p is an Outcast character not among x,y and z, or announce "📚⚠️#x,y,z", randomly. Note that if the prior is selected, p can either be in-play or not-in-play.
            </>)
  }
  else if (p=='💼LW') {
    return (<>The <b>Lawyer (💼LW)</b> counts liars.<br/><br/>
            <b>Ability:</b> Select 3 members with member ids x,y and z,<br/>
            <b>When neither lying nor corrupted,</b> announces "💼#x,y,z=🤥n", where n is the number of members that are lying or corrupted among x, y and z.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>)
  }
  else if (p=="🖌️MA") {
    return (<>The <b>Make-up artist (🖌️MA)</b> finds a disguise used by minions.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "🖌️:p", where p is the appearance of a disguising minion.<br/>
            <b>When lying or corrupted,</b> announce "🖌️:p", where p is the appearance of a good in-play member.
            </>) 
  }
  else if (p=="📬MM") {
    return (<>The <b>Mailman (📬MM)</b> finds people in town.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "📬:✅p❌q", where p is an in-play character and q is a not in-play character.<br/>
            <b>When lying or corrupted,</b> announce "📬:✅p❌q", where p is a not in-play character and q is an in-play character.
            </>) 
  }
  else if (p=="🧮MT") {
    return (<>The <b>Mathematician (🧮MT)</b> sums up the minions.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "🧮:n", where n is the sum of all minions member ids.<br/>
            <b>When lying or corrupted,</b> announces "🧮:n", where m is reasonably different from and at most k+1 away from n, where k is the number of minions.
            </>) 
  }
  else if (p=='🏛️MY') {
    return (<>The <b>Mayor (🏛️MY)</b> governs the village.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "🏛️:a😄/b🥴/c😈", where a,b and c are the number of villagers, outcasts and minions respectively.<br/>
            <b>When lying or corrupted,</b> announce the above but have 2 numbers are off by 1.
            </>)
  }
  else if (p=="☯️NJ") {
    return (<>The <b>Ninja (☯️NJ)</b> counts adjacent minions.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "☯️:n", where n is the number of adjacent minions.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output 1 off from that above.
            </>) 
  }
  else if (p=="💊NR") {
    return (<>The <b>Nurse (💊NR)</b> performs self diagnosis on herself.<br/><br/>
            <b>When woken,</b><br/>
            <b>When not lying,</b> announce "💊:pqr", where p is "👍" if it is not corrupted, else p is the source of its corruption, 
            q is "👍" if it is not jammed, else q is the source of its jamming, r is "👍" if it is not blurred, else r is the source of its blurness.<br/>
            <b>When lying,</b> choose a non-minion adjacent member with id x, announce "💊:pqr", where p is "👍" if x is not corrupted, else p is the source of x's corruption, 
            q is "👍" if it is not jammed, else q is the source of x's jamming, r is "👍" if it is not blurred, else r is the source of x's blurness.<br/>
            </>) 
  }
  else if (p=="📣PA") {
    return (<>The <b>Patrol (📣PA)</b> wakes up a truthful member.<br/><br/>
            <b>Ability:</b> In the beginning,<br/>
            Choose d as "↕️" or "↔️" randomly,<br/>
            <b>When neither lying nor corrupted,</b> if possible, wake up an adjacent villager or outcast member with id x and announce "📣#x"<br/>
            <b>When lying or corrupted,</b>  if possible, wake up an adjacent outcast or minion member with id x and announce "📣#x"<br/>
            Else, announce "📣⚠️".
            </>) 
  }
  else if (p=="🕊️PC") {
    return (<>The <b>Pacifist (🕊️PC)</b> protects its truthful neighbours.<br/><br/>
            <b>Ability:</b> When any neighbour with member id x is killed for the first time,<br/>
            Member x keeps its original appearance. Announces "🕊️#x:p", where p is the source of x's death. Use up this ability.<br/>
            <b>When neither lying nor corrupted,</b> and x is not lying nor corrupted, x does not die.<br/>
            Note: A Pacifist's ability is activated even when not woken up.
            </>) 
  }
  else if (p=="🎤PF") {
    return (<>The <b>Performer (🎤PF)</b> gives a speech, but is trembled by evil.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            If possible, choses an information gaining villager character p, preferably not-in-play.<br/>
            <b>When neither lying nor corrupted and all its neighbours are non-minions,</b> announces whatever p would announce were it truthful and uncorrupted.
            <b>When lying or corrupted or at least one of its neighbours is a minion,</b> announces whatever p would announce were it lying.
            </>) 
  }
  else if (p=="📡RD") {
    return (<>The <b>Radar (📡RD)</b> detects a disguised member.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> "📡:p", where p is the role of the nearest member in disguise.<br/>
            <b>When lying or corrupted,</b> "📡:p", where p is the role of a member that has the same tile distance as that of the nearest member in disguise.
            </>) 
  }
  else if (p=="🕯️RI") {
    return (<>The <b>Ritualist (🕯️RI)</b> counts different types of members.<br/><br/>
            <b>Ability:</b> Select 3 members with member ids x,y and z,<br/>
            <b>When neither lying nor corrupted,</b> announces "🕯️#x,y,z=n", where n is the number of member types among x, y and z.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.<br/>
            Note: There are 3 member types: Villagers, Outcasts and Minions.
            </>) 
  }
  else if (p=="🔭RG") {
    return (<>The <b>Ranger (🔭RG)</b> locates a far minion.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🔭n", where n is the tile-distance between it and the furthest.<br/>
            <b>When lying or corrupted,</b> announce a reasonable output 1 off from that above.
            </>)
  }
  else if (p=="🐦RK") {
    return (<>The <b>Ravenkeeper (🐦RK)</b> finds a minion after death.<br/><br/>
            <b>Ability:</b> When dead,<br/>
            <b>When neither lying nor corrupted,</b> announces "🐦#x", where x is the member id of an alive minion.<br/>
            <b>When lying or corrupted,</b> announces "🐦#x", where x is the member id of an alive non-minion.<br/><br/>
            When dead: Keep my original appearance. <br/>
            </>)
  }
  else if (p=="🗿SE") {
    return (<>The <b>Sentinel (🗿SE)</b> finds corrupted members.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "🗿#x,y", where x and y are the ids of a corrupted member and a non-corrupted member in random order.<br/>
            <b>When lying or corrupted,</b> if possible, announces "🗿#x,y", where x and y are the ids of 2 non-corrupted members.
            </>) 
  }
  else if (p=="🎖️SH") {
    return (<>The <b>Sheriff (🎖️SH)</b> finds corrupted characters.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "🎖️:p", where p is the character of a member who was corrupted.<br/>
            <b>When lying or corrupted,</b> if possible, announces "🎖️:p", where p is the character of a member of a non-corrupted member.
            </>) 
  }
  else if (p=="🏹SL") {
    return (<>The <b>Slayer (🏹SL)</b> shoots minions<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            <b>When neither lying nor corrupted and x is a minion,</b>  announces "🏹🔪#x" and kill x.<br/>
            Else, announce "🏹⚠️#x"
            </>) 
  }
  else if (p=="📊ST") {
    return (<>The <b>Statistician (📊ST)</b> finds the range of minions.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "📊:n", where n is the range of all minions member ids. (max id - min id)<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="📐SV") {
    return (<>The <b>Surveyor (📐SV)</b> measures the nearest minions in its range and column<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "📐:⬆️", "📐:⬇️", "📐:⬅️" and "📐:➡️" to indicate the direction of the nearest minion (tile-distance wise) in my row or column. 
            If the closest minions are of the same distance, announce "📐:🟰", if there are no minions in my row or column, announce "📐:⚠️".<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="🎓TE") {
    return (<>The <b>Teacher (🎓TE)</b> checks who is in the villager.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "🎓:pqr=n", where p, q and r are 3 characters and n is the number of in-play characters among p, q and r.<br/>
            <b>When lying or corrupted,</b> announces "🎓:pqr=m" where m is reasonably 1 off from n.
            </>) 
  }
  else if (p=="☕TL") {
    return (<>The <b>Tea Lady (☕TL)</b> protects its neightbours if they are good.<br/><br/>
            Choose d as "↕️" or "↔️" randomly,<br/>
            <b>Ability:</b> When woken, or when any neighbour with member id x in the corresponding direction of d is killed for the first time,<br/>
            When woken, announce "☕:d", and when any neighbour with member id x in the corresponding direction of d is killed for the first time,
            <b>When neither lying nor corrupted, and both neighbours in the corresponding direction of d are non-minions,</b>
            announces "☕#x:p", where p is the source of x's death, and x does not die.<br/>
            </>) 
  }
  else if (p=="☂️WM") {
    return (<>The <b>Weatherman (☂️WM)</b> forecasts which side of the village is more evil.<br/><br/>
            Choose ↕️ or ↔️ randomly,<br/>
            <b>Ability:</b> When woken,<br/>
            If ↕️ is chosen,<br/>
            <b>When neither lying nor corrupted,</b> announce "☂️:⬆️" if there are more minions in the top half than the bottom half, 
            announce "☂️:⬇️" if there are more minions in the bottom half than the top half, else announce ☂️:⬆️=⬇️.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.<br/>
            If ↔️ is chosen,<br/>
            <b>When neither lying nor corrupted,</b> announce "☂️:⬅️" if there are more minions in the left half than the right half, 
            announce "☂️:➡️" if there are more minions in the right half than the left half, else announce ☂️:⬅️=➡️.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.<br/>
            </>) 
  }
  else if (p=="✏️WR") {
    return (<>The <b>Writer (✏️WR)</b> writes down random information.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            If possible, choses an information gaining villager character p, preferably not-in-play.<br/>
            <b>When neither lying nor corrupted,</b> announces whatever p would announce were it truthful and uncorrupted.
            <b>When lying or corrupted,</b> announces whatever p would announce were it lying.
            </>)
  }
  else if (p=='🧙🏻WZ') {
    return (<>The <b>Wizard (🧙🏻WZ)</b> finds hidden members.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "🧙🏻p#x,y", where x and y are the ids of a disguising member and a non-disguising member in random order and p is the character of the member who was disguising.<br/>
            <b>When lying or corrupted,</b> if possible, announces "🧙🏻p#x,y", where x and y are the ids of 2 non-disguising members in random order and p is a random character that can disguise itself and preferably in-play.
            </>) 
  }
  else if (p=='🎞️XR') {
    return (<>The <b>XRay operator (🎞️XR)</b> counts the number of members in disguises.<br/><br/>
            <b>Ability:</b> Select 3 members with member ids x,y and z,<br/>
            <b>When neither lying nor corrupted,</b> announces "🎞️#x,y,z=n", where n is the number of members wearing disguises among x, y and z.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>)
  }
  //Outcasts
  else if (p=='🍷AC') {
    return (<>The <b>Alchemist (🍷AC)</b> drinks blood from 2 selected members.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: Choose 2 members with id x and y, if either of them is a minion, convert myself into a Vampire (🧛🏻‍♀️VP) disguised as an Alchemist (🍷AC).<br/>
            <b>Ability:</b> When woken,<br/>
            If x and y are not yet chosen, choose x and y as 2 random member ids. <br/>
            Announce "🍷#x,y"
            </>) 
  }
  else if (p=='🤖AI') {
    return (<>The <b>Artifical Intelligence (🤖AI)</b> jams members<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as a not-in-play villager member.<br/>
            Jam: <br/>
            <b>When neither lying nor corrupted,</b> if possible, jam myself and 1 villager member. <br/>
            <b>When lying or corrupted,</b> jam myself and 1 minion member.
            </>) 
  }
  else if (p=='🚨AL') {
    return (<>The <b>Alerter (🚨AL)</b> blurs<br/><br/>
            <b>Initial Phase:</b><br/>
            Blur: <br/>
            <b>When neither lying nor corrupted,</b> if at least 1 of my neighbours is a minion, blur myself. <br/>
            <b>When lying or corrupted,</b> if none of my neighbours are minions, blur myself.
            </>) 
  }
  else if (p=='💰BH') {
    return (<>The <b>Bounty Hunter (💰BH)</b> puts a bounty on a getaway minion.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: Convert a villager member with member id x into a minion. That member is involved in convertion.<br/><br/>

            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted and I've converted x,</b> announce "💰#x".<br/>
            <b>When lying or corrupted or I've not converted anyone,</b> choose a random non-minion member with member id y, announce "💰#y".<br/>
            </>) 
  }
  else if (p=='💣BM') {
    return (<>The <b>Bombardier (💣BM)</b> explodes on death.<br/><br/>
            <b>Ability:</b> When dead,<br/>
            <b>When neither lying nor corrupted,</b> choose a random adjacent member with member id x, announce "💣#x" and execute x.<br/>
            <b>When lying or corrupted,</b> announce "💣⚠️".<br/>
            Note: It is possible that x is a minion.
            </>) 
  }
  else if (p=='🤵🏻BT') {
    return (<>The <b>Bartender (🤵🏻BT)</b> makes a villager drunk.<br/><br/>
            <b>Initial Phase:</b><br/>
            Corrupt: <br/>
            <b>When neither lying nor corrupted,</b> Choose a villager member and a different random member with member ids x and y respectively. Corrupt x.<br/><br/>
            
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> If I corrupted someone, announce "🤵🏻#x/#y" if x{"<"}y, else announce "🤵🏻#y/#x". If I didn't corrupt anyone, announce "🤵🏻⚠️".<br/>
            <b>When lying nor corrupted,</b> Choose 2 random members with member ids a and b. Announce "🤵🏻#a/#b" if a{"<"}b, else announce "🤵🏻#b/#a".<br/>
            </>) 
  }
  else if (p=='🐱CC') {
    return (<>The <b>Copy Cat (🐱CC)</b> copies a villager<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as an in-play villager member.
            </>) 
  }
  else if (p=='🍺DK') {
    return (<>The <b>Drunk (🍺DK)</b> drinks too much.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as a not-in-play villager.<br/>
            Corrupt: Corrupt myself<br/><br/>
            Note: The Drunk can be cured.
            </>) 
  }
  else if (p=='😔DP') {
    return (<>The <b>Depressed (😔DP)</b> count on his good friends.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as a not-in-play villager.<br/><br/>
            <b>Ability:</b> When a non-minion dies,<br/>
            <b>When neither lying nor corrupted,</b> execute myself.
            </>) 
  }
  else if (p=='🔊EC') {
    return (<>The <b>Echoer (🔊EC)</b> registers as perhaps anything.<br/><br/>
            <b>Initial Phase:</b><br/>
            Register: <br/>
            <b>When neither lying nor corrupted,</b> register as a random villager or outcast but an Echoer (🔊EC), not-necessarily in-play. <br/>
            <b>When lying or corrupted,</b> register as an Echoer (🔊EC).
            </>) 
  }
  else if (p=='🔌EE') {
    return (<>The <b>Electrian (🔌EE)</b> blurs a jammed member.<br/><br/>
            <b>Initial Phase:</b><br/>
            Blur: <br/>
            <b>When neither lying nor corrupted,</b> if possible, blur a jammed member. <br/>
            <b>When lying or corrupted,</b> blur a non-jammed member.
            </>) 
  }
  else if (p=='🔗FG') {
    return (<>The <b>Fallguy (🔗FG)</b> is seen as evil.<br/><br/>
            <b>Initial Phase:</b><br/>
            Register: <br/>
            <b>When not lying nor corrupted,</b> register as a random minion, not-necessarily in-play. <br/>
            <b>When lying or corrupted,</b> register as a Fallguy (🔗FG).
            </>) 
  }
  /*
  else if (p=='😣FR') {
    return (<>The <b>Frightened (😣FR)</b> is scared by minions.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lies: If there is at least 1 adjacent minion, corrupt myself.<br/>
            Disguise: Disguise as a not-in-play villager.<br/>
            </>) 
  }
  */
  else if (p=='🤢FP') {
    return (<>The <b>Fatal Patient (🤢FP)</b> dies if corrupted.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise1: Disguise as a not-in-play villager or outcast.<br/>
            <b>Ability:</b> At halftime, even if not yet woken, or when corrupted after mid-game,<br/>
            <b>When corrupted,</b> execute myself.
            </>) 
  }
  else if (p=='🎲GB') {
    return (<>The <b>Gambler (🎲GB)</b> gambles on an unwoken minion.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> if the next woken card is a minion, make it the final execute target, else blur it. <br/>
            <b>When lying or corrupted,</b> blur the next woken card. 
            </>) 
  }
  else if (p=='🎮GM') {
    return (<>The <b>Gamemaster (🎮GM)</b> makes villagers register as itself.<br/><br/>
            <b>Initial Phase:</b><br/>
            Register: <br/>
            <b>When neither lying nor corrupted,</b> all non-corrupted villagers who register as themselves now registers as a Gamemaster (🎮GM). <br/>
            <b>When lying or corrupted,</b> all corrupted villagers who register as themselves now registers as a Gamemaster (🎮GM). 
            </>) 
  }
  else if (p=='🦴GR') {
    return (<>The <b>Grim Reaper (🦴GR)</b> make deaths come faster.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as a not-in-play villager.<br/>
            Halftime: Choose t as an integer between 0.5*n and n-1, where n is the number of members, set halftime to t.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> change the time to halftime immediately.
            </>) 
  }
  else if (p=='🤝GT') {
    return (<>The <b>Good Twin (🤝GT)</b> makes a villager his twin.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise3: Have a villager originally disguising as itself disguise as a Good Twin (🤝GT)<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Announce "🤝#x", where x is the member id of a member who is preferrably not me, and disguising as a Good Twin (🤝GT).
            </>)
  }
  else if (p=='⚡JM') {
    return (<>The <b>Jammer (⚡JM)</b> jams truthful information<br/><br/>
            <b>Initial Phase:</b><br/>
            Choose ↕️ or ↔️ randomly,<br/>
            Blur: <br/>
            <b>When neither lying nor corrupted,</b> jams neighbours in the chosen direction if they are neither lying nor corrupted. <br/>
            <b>When lying or corrupted,</b> blur neighbours in the chosen direction if they are lying or corrupted. <br/>
            <b>Ability:</b> When woken,<br/>
            Announce "⚡:↕️" or "⚡:↔️" respectively.
            </>) 
  }
  else if (p=='🤡JX') {
    return (<>The <b>Jinx (🤡JX)</b> corrupts the next woken member.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as a not-in-play villager.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> corrupt the next woken card. <br/>
            </>) 
  }
  else if (p=='💕LV') {
    return (<>The <b>Lover (💕LV)</b> falls in love with a good soulmate.<br/><br/>
            <b>Initial Phase:</b><br/>
            Choose a non-minion member with member id x randomly,<br/>
            <b>When not lying,</b> whenever I am corrupted, have corrupted removed, am jammed, have jammed removed, am blurred, 
            have blurness removed, or am misregistered, I corrupt, remove corruptness from, jam, remove jam from, blur, remove blur from,
            and misregister #x with the same source as well.<br/>
            <b>When not lying nor corrupted,</b><br/>
            Register1: Register as x's character.<br/>

            <b>When I am dead:</b> When not lying, x dies with the same source as me.<br/>
            <b>When x is dead:</b> When not lying, I die with the same source as me.<br/><br/>

            <b>Ability:</b> When woken,<br/>
            <b>When not lying,</b> announce "💕#x"<br/>
            <b>When lying,</b> announce "💕#y", where y is the member id of someone that is not myself.
            </>) 
  }
  else if (p=='🌙MC') {
    return (<>The <b>Moonchild (🌙MC)</b> may turn into a vampire.<br/><br/>
            <b>Ability:</b> At halftime,<br/>
            <b>When neither lying nor corrupted,</b> 50% of the time, convert myself into a lying Vampire (🧛🏻‍♀️VP) disguising as a Moonchild (🌙MC).<br/>
            <b>When lying or corrupted,</b> 100% of the time, convert myself into a Vampire (🧛🏻‍♀️VP) disguising as a Moonchild (🌙MC).<br/>
            </>) 
  }
  else if (p=='🐙MI') {
    return (<>The <b>Mimic (🐙MI)</b> mimics a minion on death.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Performs general diguise.<br/><br/>
            <b>Right before death,</b><br/>
            If I am in a disguise, I soulconvert into a random in-play minion.<br/>
            </>) 
  }
  else if (p=='🎵NM') {
    return (<>The <b>Noisemaker (🎵NM)</b> annoys a member with noise.<br/><br/>
            <b>Initial Phase:</b><br/>
            Choose a random unwaken member with member id x whose appearance is not a Noisemaker (🎵NM).<br/><br/>
            <b>Ability:</b> In the beginning,<br/>
            Wake myself,<br/>
            <b>When neither lying, corrupted nor blurred,</b> if x is woken, deal 1 blood.<br/>
            Announce "🎵#x"
            </>) 
  }
  else if (p=='😝PD') {
    return (<>The <b>Play Dead (😝PD)</b> pretends to be dead.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Performs general disguise.<br/><br/>
            <b>Ability:</b> At halftime,<br/>
            <b>When neither lying nor corrupted,</b> execute myself. If I die this way, I deal 0 blood and keep my original appearance.<br/>
            </>)
  }
  else if (p=='✝️PR') {
    return (<>The <b>Priest (✝️PR)</b> jams corruptness.<br/><br/>
            <b>Initial Phase:</b><br/>
            Jam: Jam all corrupted neighbours. <br/>
            <b>When lying or corrupted,</b> jam one more non-corrupted neighbour, or unjam one corrupted neighbour. <br/>
            Let the number of neighbours jammed by me be n.<br/>
            <b>Ability:</b> When woken,<br/>
            Announce "✝️:n".
            </>)
  }
  else if (p=='🤪PV') {
    return (<>The <b>Play Villain (🤪PV)</b> pretends to be a minion.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Disguise as an in-play minion.<br/>
            Disguise2: 1 disguising minion loses their disguise.<br/>
            </>)
  }
  /*
  else if (p=='✨PX') {
    return (<>The <b>Pixie (✨PX)</b> copies a minion's ability.<br/><br/>
            <b>Initial Phase:</b><br/>
            Copy: Choose an in-play minion p, does whatever p does during the disguising phase expect for lying, general disguise and register.<br/>
            Register: Register as myself, overwrite all other registers.<br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announce "✨:p".<br/>
            <b>When lying or corrupted,</b> announce "✨:p", where p is the character of a random minion, not necessarily in play.<br/>
            </>)
  }
  */
  else if (p=='🥼SC') {
    return (<>The <b>Scientist (🥼SC)</b> makes its neightbours misregister.<br/><br/>
            <b>Initial Phase:</b><br/>
            Register:<br/>
            When neither lying nor corrupted and if there is less than 2 non-minion neighbours, choose n as 1, else choose n between 1 and 2.<br/>
            <b>When neither lying nor corrupted and there is at least 1 non-minion neighbour,</b> n non-minion neighbours register as a Scientist (🥼SC).<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Announce "🥼n".
            </>)
  }
  else if (p=='💉SG') {
    return (<>The <b>Surgeon (💉SG)</b> performs fatal surgery at halftime.<br/><br/>
            <b>Ability:</b> At halftime,<br/>
            <b>When neither lying nor corrupted,</b> if no one died at halftime beofre my ability is used, execute a random member.<br/>
            </>)
  }
  else if (p=='🍬SH') {
    return (<>The <b>Sweetheart (🍬SH)</b> corrupts someone on death.<br/><br/>
            <b>Ability:</b> When dead,<br/>
            <b>When neither lying nor corrupted,</b> if possible, corrupt a random unwoken villager member.<br/>
            </>)
  }
  else if (p=='🦑SQ') {
    return (<>The <b>Squid (🦑SQ)</b> blurs a random good member.<br/><br/>
            <b>Initial Phase:</b><br/>
            <b>When neither lying nor corrupted,</b> choose a random villager with member id x.<br/>
            <b>When lying or corrupted,</b> choose a random minion with member id x.<br/>
            Blur: Blur x.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Announce "🦑#x".<br/>
            </>)
  }
  else if (p=='❓SS') {
    return (<>The <b>Shapeshifter (❓SS)</b> converts into an adjacent character.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert1: Convert into a random neighbour's character. That neighbour is involved in convertion.<br/><br/>
            Note: The Shapeshifter can convert into a minion.
            </>)
  }
  else if (p=='🦇VB') {
    return (<>The <b>Vampire Bat (🦇VB)</b> converts into a vampire when unwoken.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Performs general diguise.<br/><br/>
            <b>At halftime,</b><br/>
            <b>When unwoken, and neither lying nor corrupted,</b> convert myself into a lying Vampire (🧛🏻‍♀️VP) that keep my appearance.<br/>
            </>)
  }
  else if (p=='🧸VD') {
    return (<>The <b>Vodouisant (🧸VD)</b> practices Voodoo on a villager.<br/><br/>
            <b>Initial Phase:</b><br/>
            <b>When not lying,</b> Choose a villager member and a different random member with member ids x and y respectively.<br/>
            <b>When lying,</b> Choose 2 random member with member ids x and y respectively.<br/>
            Whenever I am corrupted, jammed, blurred or misregistered, add 1 to n. Immediately remove
            the debuff and when not lying, have member x receive the debuff from the same source instead of me.<br/><br/>
            
            <b>Ability:</b> When woken,<br/>
            Announce "🧸:n-{">"}#x/#y" if x{"<"}y, else announce "🧸:n-{">"}#y/#x".
            </>) 
  }
  else if (p=='👦🏻YS') {
    return (<>The <b>Youngster (👦🏻YS)</b> punishes you if you wrongly execute them.<br/><br/>
            <b>When dead, and neither lying nor corrupted,</b> deal 2 extra blood.<br/>
            </>)
  }
  //Minions
  else if (p=='👮🏻‍♂️BC') {
    return (<>The <b>Bap Cop (👮🏻‍♂️BC)</b> promotes evil.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise2: I disguise as another minion, a random non-minion that was not disguising now disguises as a minion.<br/>
            <br/>
            Minions used as disguises may be either in play or not in play.
            </>) 
  }
  else if (p=='🧬CL') {
    return (<>The <b>Cloner (🧬CL)</b> clones a villager.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: If possible, convert a different villager member into a neighbouring villager member. These two members are involved in convertion.<br/>
            Lie: Makes myself lie.<br/>
            Disguise2: Performs general diguise.<br/>
            </>) 
  }
  else if (p=='🤬CR') {
    return (<>The <b>Critic (🤬CR)</b> punishes innocent kills.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise2: Performs general diguise.<br/><br/>
            <b>When alive, and in true form,</b> <br/>
            <b>When you execute a true non-minion member,</b> deal 2 extra blood.<br/>
            </>) 
  }
  else if (p=='👹DE') {
    return (<>The <b>Demon (👹DE)</b> think that all minions are demons.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise2: Performs general diguise.<br/>
            Register: All minions who register as themselves now register as a Demon (👹DE).
            <br/><br/>
            </>) 
  }
  else if (p=='👥ET') {
    return (<>The <b>Evil Twin (👥ET)</b> makes a villager his twin.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise3: Have a villager originally disguising as itself disguise as an Evil Twin (👥ET)<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Announce "👥#x", where x is the member id of a member who is preferrably not me, and disguising as an Evil Twin (👥ET).<br/>
            </>) 
  }
  else if (p=='👗FD') {
    return (<>The <b>Fashion Designer (👗FD)</b> may steal a neighbour's costume.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Choose a member with member id x among myself and all non-minion neighbours who are disguising as themselves.<br/>
            Disguise3: If I am x, does nothing, else disguise as x and x now disguises as a Fashion Designer (👗FD).<br/>
            </>) 
  }
  else if (p=='👻GH') {
    return (<>The <b>Ghost (👻GH)</b> makes a neighbour ghosty.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/>
            Register: If possible, a villager neighbour registers as a Ghost (👻GH)<br/><br/>
            </>) 
  }
  else if (p=='👽HK') {
    return (<>The <b>Hacker (👽HK)</b> jams 2 random members.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general diguise.<br/>
            Jam: Jams 2 random members.<br/><br/>
            Note: The Hacker can jam other minions, including itself.
            </>) 
  }
  else if (p=='🔫HM') {
    return (<>The <b>Hitman (🔫HM)</b> executes when you do.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>
            <b>When alive,</b> <br/>
            <b>When you execute a true non-minion member,</b> execute a random true non-minion member.<br/>
            </>) 
  }
  else if (p=='🃏JK') {
    return (<>The <b>Joker (🃏JK)</b> creates an outcast.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: If possible, convert a random villager neightbour into an outcast. That neighbour is involved in convertion.<br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>
            </>) 
  }
  else if (p=='🎃MB') {
    return (<>The <b>Mafia Boss (🎃MB)</b> shall only be executed last.<br/><br/>
            <b>When dead</b><br/>
            If I am not in a disguise and there are non Mafia Boss (🎃MB) minions left alive, deal 4 extra blood.<br/><br/>
            Note: The Mafia Boss should only be executed after all other minions are dead.
            </>) 
  }
  else if (p=='🎩MG') {
    return (<>The <b>Magician (🎩MG)</b> hides all minions' identity.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>
            <b>When alive,</b> <br/>
            Right before any other disguising minion dies, they soulconvert into a Magician (🎩MG) disguising as who they were disguising.<br/>
            </>) 
  }
  else if (p=='🐺MU') {
    return (<>The <b>Mutant (🐺MU)</b> mutates its neighbours.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: If possible, if I am not being converted by a mutant, convert a random neighbour into a Mutant (🐺MU). That neighbour is involved in convertion.<br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>
            Note: The Mutant can mutate neighbouring minions too.
            </>) 
  }
  else if (p=='🧪PN') {
    return (<>The <b>Poisoner (🧪PN)</b> poisons an adjacent villager.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general diguise.<br/>
            Corrupt: If possible, corrupt an adjacent villager member.
            </>) 
  }
  else if (p=='🐛PS') {
    return (<>The <b>Parasite (🐛PS)</b> lives within an adjacent villager.<br/><br/>
            <b>Initial Phase:</b><br/>
            Corrupt: If possible, choose an adjacent villager will member id x, x gets corrupted.<br/><br/>

            <b>Right before I dies:</b><br/>
            SoulConvert: If I have any corrupted neighbours, choose one of them with member id y randomly. 
            I soulconvert into y's character and y soulconverts into a Parasite (🐛PS).<br/><br/>

            <b>Right before any corrupted neightbours y dies:</b><br/>
            SoulConvert: I soulconvert into y's character and y soulconverts into a Parasite (🐛PS).<br/><br/>

            Note: Therefore, to kill a Parasite (🐛PS), you should execute any of its corrupted neighbours if any. 
            If the Parasite (🐛PS) has no corrupted neighbours, execute the Parasite (🐛PS) directly.
            </>) 
  }
  else if (p=='🔔RC') {
    return (<>The <b>Recruiter (🔔RC)</b> creates a minion.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: If possible, convert a random outcast neightbour into a minion. That neighbour is involved in convertion.<br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general disguise.<br/>
            </>) 
  }
  else if (p=='🕹️SB') {
    return (<>The <b>Saboteur (🕹️SB)</b> corrupts the furthest villager.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general diguise.<br/>
            Corrupt: One of the furthest villager members gets corrupted.
            </>) 
  }
  else if (p=='👤SD') {
    return (<>The <b>Shadow (👤SD)</b> registers as its disguise.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/>
            Register: If my appearance is neither an Echo (🔊EC) nor a Fallguy (🔗FG), register as a not in-play Outcast character that 
            does not disguise by itself and is not my appearance, if possible.<br/><br/>
            <b>When dead,</b> keeps my original appearance.<br/>
            </>) 
  }
  else if (p=='🪓SK') {
    return (<>The <b>Serial Killer (🪓SK)</b> executes at halftime.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general diguise.<br/>
            <b>When alive at halftime,</b> <br/>
            Execute a random true non-minion member at halftime.
            </>) 
  }
  else if (p=='🚬SM') {
    return (<>The <b>Smoker (🚬SM)</b> hides the true identity of all dead neighbours.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>
            <b>When alive,</b> <br/>
            When any of my disguised neighbours die, they keep their original appearance.<br/>
            <b>When dead,</b> <br/>
            Keep my original appearance.
            </>) 
  }
  else if (p=='🐍SN') {
    return (<>The <b>Snake (🐍SN)</b> bites those who touch it.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>

            <b>When a member with member id x chose it in an ability,</b> if x is not corrupted and a non-minion, corrupt x.
            </>) 
  }
  else if (p=='🦊TK') {
    return (<>The <b>Trickster (🦊TK)</b> lies in a way others don't feel it.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie, but others register him as truthful.<br/>
            Disguise: Performs general diguise.<br/><br/>
            </>) 
  }
  else if (p=='🌀TP') {
    return (<>The <b>Teleporter (🌀TP)</b> teleports away before execution.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/><br/>

            <b>Right before death,</b><br/>
            If I am in a disguise and there is a disguising minion with member id x, 
            I soul convert into x's character and x soul converts into a Teleporter (🌀TP).
            </>) 
  }
  else if (p=='🧛🏻‍♀️VP') {
    return (<>The <b>Vampire (🧛🏻‍♀️VP)</b> is only summoned by other players.<br/><br/>
            Note: The Vampire (🧛🏻‍♀️VP) is not in the initial deck, and can only be created by the Alchemist (🍷AC), the Moonchild (🌙MC), the Vampire Bat (🦇VB) and the Witch (🧹WI).
            </>) 
  }
  else if (p=='👾VR') {
    return (<>The <b>Virus (👾VR)</b> blurs a random member.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general diguise.<br/>
            Blur: Blurs 1 random member.<br/><br/>
            Note: The Virus can blur other minions, including itself.
            </>) 
  }
  else if (p=='🧹WI') {
    return (<>The <b>Witch (🧹WI)</b> creates a Vampire.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert2: If possible, an adjacent villager converts into a truthful Vampire (🧛🏻‍♀️VP), that villager is involved in convertion.<br/>
            Lie: Makes myself lie.<br/>
            Disguise: Me and the Vampire(🧛🏻‍♀️VP) I converted both perform general diguise.<br/>
            </>) 
  }
  else if (p=='🧟ZB') {
    return (<>The <b>Zombie (🧟ZB)</b> poisons an adjacent outcast.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie<br/>
            Disguise: Performs general diguise.<br/>
            Corrupt: If possible, corrupt an adjacent outcast member.
            </>) 
  }
  else {return p;}
}

function App() {
  // --- Persisted State ---
  const [roleCounts, setRoleCounts] = useState(() => JSON.parse(localStorage.getItem('roleCounts')) || { v: 7, o: 2, m: 3 , sv: 5, so: 2, sm: 2 });
  const [nextroleCounts, setnextRoleCounts] = useState(() => JSON.parse(localStorage.getItem('nextroleCounts')) || { v: 7, o: 2, m: 3 , sv: 5, so: 2, sm: 2 });

  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [killConfirm, setKillConfirm] = useState(() => JSON.parse(localStorage.getItem('killConfirm')) || false);
  const [suspectList, setSuspectList] = useState(() => JSON.parse(localStorage.getItem('suspectList')) || false);
  const [charStatus, setCharStatus] = useState(() => JSON.parse(localStorage.getItem('charStatus')) || {});

  const nbV = useRef([]);
  const nbO = useRef([]);
  const nbM = useRef([]);

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
  const [gridlength, setGridlength] = useState(() => JSON.parse(localStorage.getItem('gridlength')) || 4);
  const [nextgridlength, setnextGridlength] = useState(() => JSON.parse(localStorage.getItem('gridlength')) || 4);
  const [nwarp, setnwarp] = useState(() => JSON.parse(localStorage.getItem('nwarp')) || true);
  const [nextnwarp, setnextnwarp] = useState(() => JSON.parse(localStorage.getItem('nwarp')) || true);

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
    localStorage.setItem('gridlength', JSON.stringify(gridlength));
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
    type, regtype: type, id, char: role, app: role, deathapp: role, reg: role,
    highlight: [], adjs: {},
    announce: "",
    revealed: -2, used: 0, killed: -1,
    lie: false, convert: '✅', corrupt: '✅', jammed: '✅', blurred: '✅',
    note: "",
    ramnote: ""
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

  //helper functions
  const typeMap = { "v": "villager", "o": "outcast", "m": "minion" };

  const getAdjNeighbors = (grid, target_id, dir = "", includetypes = []) => {
    const player = grid.find((p) => p.id === target_id);
    if (!player || !player.adjs) return [];

    const directions = [];
    const d = dir.toLowerCase();
    if (d === "ns") directions.push("N", "S");
    else if (d === "ew") directions.push("W", "E");
    else directions.push("N", "S", "W", "E");

    const neighborIds = directions
      .map((dirKey) => player.adjs[dirKey])
      .filter((id) => id !== null && id !== undefined);

    let neighbors = grid.filter((p) => neighborIds.includes(p.id));

    // Filter by types if provided
    if (includetypes.length > 0) {
      const mappedTypes = includetypes.map((t) => typeMap[t]);
      neighbors = neighbors.filter((n) => mappedTypes.includes(n.regtype));
    }

    const shuffled = shuffle(neighbors);
    return shuffled;
  };

  const getRands = (array, exclude = [], n = 1) => {
    const pool = array.filter((item) => !exclude.includes(item));
    if (pool.length === 0) return null;
    
    const shuffled = shuffle(pool);
    if (n==1) {return shuffled[0];}
    return shuffled.slice(0, Math.min(n, pool.length));
  };

  const getRandNeighbor = (grid, target_id, dir = "", includetypes = []) => {
    return getAdjNeighbors(grid, target_id, dir, includetypes)[0];
  };

  const getInPlay = (grid, includetypes = [], excludeid = [], excludechar = [], n = -1) => {
    let players = grid.filter((p) => p.type !== "empty");

    // Filter by allowed types
    if (includetypes.length > 0) {
      const mappedTypes = includetypes.map((t) => typeMap[t]);
      players = players.filter((p) => mappedTypes.includes(p.regtype));
    }

    // Filter exclusions
    if (excludeid.length > 0) {
      players = players.filter((p) => !excludeid.includes(p.id));
    }
    if (excludechar.length > 0) {
      players = players.filter((p) => !excludechar.includes(p.char));
    }

    const shuffled = shuffle(players);
    if (n == 1) return shuffled[0];
    return n > 0 && n < shuffled.length ? shuffled.slice(0, n) : shuffled;
  };

  const getNotInPlay = (nottype, grid, includetypes = [], excludechar = [], n = -1) => {
    let charsInPlay;
    if (nottype == "c") {charsInPlay = grid.filter((p) => p.type !== "empty").map((p) => p.char);}
    if (nottype == "r") {charsInPlay = grid.filter((p) => p.type !== "empty").map((p) => p.reg);}
    
    let pool = [];
    
    // If no types specified, check all pools. Otherwise, merge specified pools.
    if (includetypes.length === 0) {
      pool = [...nbV.current, ...nbO.current, ...nbM.current];
    } else {
      if (includetypes.includes("v")) pool = [...pool, ...nbV.current];
      if (includetypes.includes("o")) pool = [...pool, ...nbO.current];
      if (includetypes.includes("m")) pool = [...pool, ...nbM.current];
    }

    if (excludechar.length > 0) {
      pool = pool.filter((p) => !excludechar.includes(p));
    }

    const available = pool.filter((char) => !charsInPlay.includes(char));
    const shuffled = shuffle(available);

    if (n == 1) return shuffled[0];
    return n > 0 && n < shuffled.length ? shuffled.slice(0, n) : shuffled;
  };

  const convert = (gridArray, targetid, newchar, newtype, source) => {
    //console.log(targetid, newchar, newtype, source);
    const target = gridArray.find(p => p.id === targetid);
    if (!target) return;
    target.type = newtype;
    target.regtype = newtype;
    target.char = newchar;
    target.app = newchar;
    target.deathapp = newchar;
    target.reg = newchar;
    target.convert = source;
  };

  function tiledist(grid, id, targetid) {
    const gridLength = Math.round(Math.sqrt(grid.length))
    if (id === targetid) return 0;
    const idx1 = grid.findIndex(c => c.id === id);
    const idx2 = grid.findIndex(c => c.id === targetid);
    if (idx1 === -1 || idx2 === -1) return Infinity;

    const r1 = Math.floor(idx1 / gridLength), c1 = idx1 % gridLength;
    const r2 = Math.floor(idx2 / gridLength), c2 = idx2 % gridLength;

    let dr = Math.abs(r1 - r2);
    let dc = Math.abs(c1 - c2);

    return dr + dc;
  }

  function nearest(grid, id, includetypes = ["v","o","m"]) {
    const rawTypes = Array.isArray(includetypes) ? includetypes : [includetypes];
    const mappedTypes = rawTypes.map((t) => typeMap[t] ?? t);

    // Filter for matching non-self cells
    const candidates = grid.filter(cell => cell.id !== id && mappedTypes.includes(cell.regtype));
    if (candidates.length === 0) return [];

    // Calculate distances
    const withDist = candidates.map(cell => ({
      cell,
      dist: tiledist(grid, id, cell.id)
    }));

    // Find minimum distance and collect ties
    const minDist = Math.min(...withDist.map(item => item.dist));
    const tiedNearest = withDist.filter(item => item.dist === minDist).map(item => item.cell);

    return shuffle(tiedNearest);
  }

  /**
   * Returns a scrambled list of cells that share the maximum tile distance to `id`.
   */
  function furthest(grid, id, includetypes = ["v","o","m"]) {
    const rawTypes = Array.isArray(includetypes) ? includetypes : [includetypes];
    const mappedTypes = rawTypes.map((t) => typeMap[t] ?? t);

    // Filter for matching non-self cells
    const candidates = grid.filter(cell => cell.id !== id && mappedTypes.includes(cell.regtype));
    if (candidates.length === 0) return [];

    // Calculate distances
    const withDist = candidates.map(cell => ({
      cell,
      dist: tiledist(grid, id, cell.id)
    }));

    // Find maximum distance and collect ties
    const maxDist = Math.max(...withDist.map(item => item.dist));
    const tiedFurthest = withDist.filter(item => item.dist === maxDist).map(item => item.cell);

    return shuffle(tiedFurthest);
  }

  const getRC = (grid, memberid, sides = "nsew", includetypes = []) => {
    const n = nextgridlength;
    const targetIndex = grid.findIndex((cell) => cell.id === memberid);
    if (targetIndex === -1) return [];
    const targetRow = Math.floor(targetIndex / n);
    const targetCol = targetIndex % n;

    const s = sides.toLowerCase();
    let results = [];

    // Helper to add player if not an empty tile
    const addIfMember = (r, c) => {
      const cell = grid[r * n + c];
      if (cell && cell.type !== "empty") {
        results.push(cell);
      }
    };

    // North: same column, rows above (from targetRow - 1 down to 0)
    if (s.includes("n")) {
      for (let r = targetRow - 1; r >= 0; r--) {
        addIfMember(r, targetCol);
      }
    }

    // South: same column, rows below (from targetRow + 1 up to n - 1)
    if (s.includes("s")) {
      for (let r = targetRow + 1; r < n; r++) {
        addIfMember(r, targetCol);
      }
    }

    // West: same row, columns to the left (from targetCol - 1 down to 0)
    if (s.includes("w")) {
      for (let c = targetCol - 1; c >= 0; c--) {
        addIfMember(targetRow, c);
      }
    }

    // East: same row, columns to the right (from targetCol + 1 up to n - 1)
    if (s.includes("e")) {
      for (let c = targetCol + 1; c < n; c++) {
        addIfMember(targetRow, c);
      }
    }

    // Filter by includetypes if specified
    if (includetypes.length > 0) {
      const mappedTypes = includetypes.map((t) => typeMap[t] || t);
      results = results.filter((m) => mappedTypes.includes(m.regtype));
    }

    return results;
  };

  const runphase = (grid, chars, memfunct) => {
    const targetChars = Array.isArray(chars) ? chars : [chars];
    const members = grid.filter((player) => 
      player.type !== "empty" && (targetChars.includes(player.app) || targetChars.includes(player.char))
    );
    const shuffledMembers = [...members].sort(() => Math.random() - 0.5);
    shuffledMembers.forEach((member) => {
      memfunct(member);
    });
  };

  function effone(effect, grid, target_id, source) {
    if (effect == "c") {grid.filter(c => c.id == target_id)[0].corrupt = source;}
    if (effect == "j") {grid.filter(c => c.id == target_id)[0].jammed = source;}
    if (effect == "b") {grid.filter(c => c.id == target_id)[0].blurred = source;}
    if (effect == "r") {
      grid.filter(c => c.id == target_id)[0].reg = source;
      if (villagerPool.includes(source)) {grid.filter(c => c.id == target_id)[0].regtype = "villager";}
      else if (outcastPool.includes(source)) {grid.filter(c => c.id == target_id)[0].regtype = "outcast";}
      else if (minionPool.includes(source)) {grid.filter(c => c.id == target_id)[0].regtype = "minion";}
    }
  }

  function eff(effect, grid, target_id, source, loverredirects) {
    console.log(source,effect,target_id);
    let effected_id = [];
    let executing_id = [];
    let next_id = [];
    function vdcheck(g, t) {
      if (g.filter(c => c.id == t)[0].app == "🧸VD" && !debuffStat(g.filter(c => c.id == t)[0].corrupt,'lf')) {return "vdn";}
      else if (g.filter(c => c.id == t)[0].app == "🧸VD" && debuffStat(g.filter(c => c.id == t)[0].corrupt,'lf')) {return "vdl";}
      else {return "n"}
    }
    if (vdcheck(grid, target_id)=="vdn") {
      next_id.push(grid.filter(c => c.id == target_id)[0].ramnote[0]);
      effone(effect, grid, target_id, '🧸');
      effone(effect, grid, grid.filter(c => c.id == target_id)[0].ramnote[0], source);
    }
    else if (vdcheck(grid, target_id)=="vdl") {
      effone(effect, grid, target_id, '🧸');
    }
    else {
      next_id.push(target_id);
      effone(effect, grid, target_id, source);
    }
    while (next_id.length!==0) {
      effected_id = [...effected_id, ...next_id];
      executing_id = next_id;
      next_id = [];
      executing_id.forEach((e_id) => {
        loverredirects.forEach((redir) => {
          if (e_id == redir[0]) {
            if (vdcheck(grid, redir[1])=="vdn") {
              if (!effected_id.includes(grid.filter(c => c.id == redir[1])[0].ramnote[0])) {
                next_id.push(grid.filter(c => c.id == redir[1])[0].ramnote[0]);
                effone(effect, grid, redir[1], '🧸');
                effone(effect, grid, grid.filter(c => c.id == redir[1])[0].ramnote[0], source);
              }
            }
            else if (vdcheck(grid, redir[1])=="vdl") {
              effone(effect, grid, redir[1], '🧸');
            }
            else {
              if (!effected_id.includes(redir[1])) {
                next_id.push(redir[1]);
                effone(effect, grid, redir[1], source);
              }
            }
          }
        })
      })
    }
  }

  const debuffStat = (emoji, stat="lc") => {
    let qual = []
    if (stat=="lf") {qual = ["🤥", "🦊"];}
    if (stat=="l") {qual = ["🤥"];}
    if (stat=="c") {qual = ["🤵🏻", "🍺", "🧪", "🐛", "🕹️", "🧟", "🛠️"];} 
    if (stat=="lcf") {qual = ["🤥", "🦊", "🤵🏻", "🍺", "🧪", "🐛", "🕹️", "🧟", "🛠️"];}
    if (stat=="lc") {qual = ["🤥", "🤵🏻", "🍺", "🧪", "🐛", "🕹️", "🧟", "🛠️"];}
    if (stat=="j") {qual = ["⚡","🤖","👽","✝️"];}
    if (stat=="b") {qual = ['🚨','🔌','🦑','👾']}
    return(qual.includes(emoji));
  }


  const initializeGrid = () => {
    setRoleCounts(nextroleCounts);
    setGridlength(nextgridlength);
    setnwarp(nextnwarp);
    localStorage.setItem('roleCounts',JSON.stringify(nextroleCounts));
    localStorage.setItem('gridlength',JSON.stringify(nextgridlength));
    localStorage.setItem('nwarp',JSON.stringify(nextnwarp));
    if (animatingIndices.size > 0) return;

    const pickRoles = (pool, targetCount) => {
      const forced = pool.filter(c => getStatus(c) === 1);
      const maybe = pool.filter(c => getStatus(c) === 0);
      const combined = [...shuffle(forced), ...shuffle(maybe)].filter(c => c!='🧛🏻‍♀️VP').slice(0, targetCount);
      return combined;
    };

    let sV = pickRoles(villagerPool, nextroleCounts.v);
    let sO = pickRoles(outcastPool, nextroleCounts.o);
    let sM = pickRoles(minionPool, nextroleCounts.m);

    nbV.current = villagerPool.filter(c => getStatus(c) != 2);
    nbO.current = outcastPool.filter(c => getStatus(c) != 2);
    nbM.current = minionPool.filter(c => getStatus(c) != 2);

    const pCount = sV.length + sO.length + sM.length;
    let p = shuffle([
      ...sV.map(v => ({ r: v, t: 'villager' })),
      ...sO.map(o => ({ r: o, t: 'outcast' })),
      ...sM.map(m => ({ r: m, t: 'minion' })),
      ...Array(nextgridlength*nextgridlength - pCount).fill({ t: 'empty', type: 'empty'})
    ]);

    let curId = 1;
    const nextG = p.map(x => x.t !== 'empty' ? createPlayer(x.r, x.t, curId++) : x);
    const grid = nextG.map((cell, i) => {
      if (cell.type === 'empty') return cell;

      const row = Math.floor(i / nextgridlength);
      const col = i % nextgridlength;
      const adjs = { N: null, S: null, W: null, E: null };

      // Helper to find neighbor with optional warping
      const getNeighbor = (rowDir, colDir) => {
        // We check up to nextgridlength - 1 cells away
        for (let step = 1; step < nextgridlength; step++) {
          let r = row + (rowDir * step);
          let c = col + (colDir * step);

          if (nextnwarp) {
            // Modulo wrapping: (index + length) % length handles negative numbers correctly
            r = (r + nextgridlength) % nextgridlength;
            c = (c + nextgridlength) % nextgridlength;
          } else {
            // Standard boundary check: stop if we hit the edge
            if (r < 0 || r >= nextgridlength || c < 0 || c >= nextgridlength) break;
          }

          //if (r < 0 || r >= nextgridlength || c < 0 || c >= nextgridlength) break;

          const target = nextG[r * nextgridlength + c];
          if (target.type !== 'empty') {
            return target.id;
          }
        }
        return null;
      };

      adjs.N = getNeighbor(-1, 0);
      adjs.S = getNeighbor(1, 0);
      adjs.W = getNeighbor(0, -1);
      adjs.E = getNeighbor(0, 1);
      return { ...cell, adjs };
    });

    //helper functions
    
    //night phase
    const converts = [];
    
    //convert 1:
    runphase(grid, '❓SS', (member) => {
        const neighbor = getRandNeighbor(grid, member.id, "", []);
        if (neighbor) {
          const newchar = neighbor.char;
          const newtype = neighbor.type;
          convert(grid, member.id, newchar, newtype, "❓");
          converts.push(neighbor.id);
          converts.push(member.id);
        }
        else {
          member.note = "❓⚠️"
        }
    });

    //convert 2:
    runphase(grid, ['💰BH', '🧬CL', '🃏JK',  '🐺MU', '🔔RC', '🧹WI'], (member) => {
        if (member.char == '💰BH') {
            const target = getInPlay(grid, ["v"], converts, ['💰BH', '🧬CL', '🃏JK',  '🐺MU', '🔔RC', '❓SS', '🧹WI'], 1);
            console.log(target);
            const into = getNotInPlay("c", grid, ["m"], ['🧬CL', '🃏JK',  '🐺MU', '🔔RC', '🧹WI'], 1);
            if (target) {
                convert(grid, target.id, into, "minion", "💰");
                converts.push(target.id);
                member.ramnote = target.id;
                member.note = "💰#"+target.id;
            }
            else {
                member.note = "💰⚠️"
            }
        }
        else if (member.char == '🧬CL') {
            const into = getAdjNeighbors(grid, member.id, "", ["v"]).filter(c => !converts.includes(c.id))[0];
            if (into) {
              const target = getInPlay(grid, ["v"], [...converts, ...[into.id]], ['💰BH', '🧬CL', '🃏JK',  '🐺MU', '🔔RC', '❓SS', '🧹WI'], 1);
              if (target && into) {
                  convert(grid, target.id, into.char, into.type, "🧬");
                  converts.push(target.id);
                  converts.push(into.id);
                  member.note = "🧬#"+into.id+"->#"+target.id;
              }
            }
            else {
                member.note = "🧬⚠️"
            }
        }
        else if (member.char == '🃏JK') {
            const target = getAdjNeighbors(grid, member.id, "", ["v"]).filter(c => !converts.includes(c.id))[0];
            const into = getNotInPlay("c", grid, ["o"], ['💰BH', '❓SS'], 1);
            if (target && into) {
                convert(grid, target.id, into, "outcast", "🃏");
                converts.push(target.id);
                member.note = "🃏#"+target.id;
            }
            else {
                member.note = "🃏⚠️"
            }
        }
        else if (member.char == '🐺MU') {
            const target = getAdjNeighbors(grid, member.id, "", []).filter(c => !converts.includes(c.id))[0];
            if (target) {
                convert(grid, target.id, "🐺MU", "minion", "🐺");
                converts.push(target.id);
                member.note = "🐺#"+target.id;
            }
            else {
                member.note = "🐺⚠️"
            }
        }
        else if (member.char == '🔔RC') {
            const target = getAdjNeighbors(grid, member.id, "", ["o"]).filter(c => !converts.includes(c.id))[0];
            const into = getNotInPlay("c", grid, ["m"], ['🧬CL', '🃏JK',  '🐺MU', '🔔RC', '🧹WI'], 1);
            if (target && into) {
                convert(grid, target.id, into, "minion", "🔔");
                converts.push(target.id);
                member.note = "🔔#"+target.id;
            }
            else {
                member.note = "🔔⚠️"
            }
        }
        else if (member.char == '🧹WI') {
            const target = getAdjNeighbors(grid, member.id, "", ["v"]).filter(c => !converts.includes(c.id))[0];
            if (target) {
                convert(grid, target.id, "🧛🏻‍♀️VP", "minion", "🧹");
                converts.push(target.id);
                member.note = "🧹#"+target.id;
            }
            else {
                member.note = "🧹⚠️"
            }
        }
    });

    //convert 3:
    runphase(grid, '🍷AC', (member) => {
        const inplay = getInPlay(grid, [], [member.id], [], 2).sort((a, b) => a.id - b.id);
        const x = inplay[0];
        const y = inplay[1];
        if (x && y) {
          member.note = "🍷#"+x.id+","+y.id;
          if (x.type == "minion" || y.type == "minion") {
            member.convert = "🍷";
            member.char = "🧛🏻‍♀️VP";
            member.reg = "🧛🏻‍♀️VP";
            member.type = "minion"
          }
        }
        else {
          member.note = "🍷⚠️";
        }
    });

    //lie
    runphase(grid, minionPool.filter(c => !['👮🏻‍♂️BC', '👥ET', '🎃MB', '🐛PS'].includes(c)), (member) => {
      if (member.char == '🦊TK') {
        member.corrupt = '🦊';
      }
      else {
        member.corrupt = '🤥';
      }
    })

    //disguise1
    let notinplays = getNotInPlay("c", grid, ["v","o"]).filter(c => disguises.includes(c));
    runphase(grid, ['🤖AI', '🍺DK', '😔DP', '🦴GR', '🤡JX', '🐙MI', '😝PD', '🍬SH', '🦇VB'], (member) => {
      member.app = notinplays[0];
      notinplays.shift();
    });

    runphase(grid, ['🐱CC'], (member) => {
      const copy = getInPlay(grid, ["v"], [member.id], [], 1);
      if (copy) {
        member.app = copy.char;
        member.note = '🐱#'+copy.id;
      }
      else {
        member.note = '🐱⚠️'
      }
    })

    runphase(grid, ['🤪PV'], (member) => {
      const copy = getInPlay(grid, ["m"], [member.id], [], 1);
      member.app = copy.char;
      member.note = '🤪⚠️';
      notinplays.unshift(member.id);
    })

    notinplays = notinplays.filter(item => item !== '👑KI');
    if (Math.random() < 0.5) {
      notinplays.unshift(getInPlay(grid, ["v", "o"]).filter(c => disguises.includes(c.char))[0]["char"]);
    }

    //disguise2
    runphase(grid, ['👮🏻‍♂️BC', '🧬CL', '🤬CR', '👹DE','👻GH', '👽HK', '🔫HM', '🃏JK', '🎩MG', '🐺MU', '🧪PN', '🔔RC',
      '🕹️SB', '👤SD', '🪓SK', '🚬SM', '🐍SN','🌀TP', '🦊TK', '🧛🏻‍♀️VP', '👾VR', '🧹WI', '🧟ZB'], (member) => {
      if (member.app == member.char) {
        if (!Number.isInteger(notinplays[0])) {
          if (member.char == '👮🏻‍♂️BC') {
            member.app = getRands(nbM.current, ['👮🏻‍♂️BC'], 1);
          } else {
            member.app = notinplays[0];
          }
        }
        else {
          grid.filter(c => c.id == notinplays[0])[0].note = "#🤪"+member.id;
        }
        notinplays.shift();
      }
    });

    //disguise3
    runphase(grid, ['👮🏻‍♂️BC', '👥ET', '👗FD', '🤝GT'], (member) => {
      if (member.char=='👮🏻‍♂️BC') {
        const dis = getInPlay(grid, ["v", "o"]).filter(c => c.char == c.app)[0];
        if (dis) {
          dis.app = getRands(nbM.current, [], 1);
          member.note="👮🏻‍♂️#"+dis.id;
        }
        else {member.note="👮🏻‍♂️⚠️";}
      }
      else if (member.char=='👥ET') {
        const dis = getInPlay(grid, ["v"]).filter(c => c.char == c.app)[0];
        if (dis) {
          dis.app = '👥ET';
          member.note="👥#"+dis.id;
        }
        else {member.note="👥⚠️";}
      }
      else if (member.char=='🤝GT') {
        const dis = getInPlay(grid, ["v"]).filter(c => c.char == c.app)[0];
        if (dis) {
          dis.app = '🤝GT';
          member.note="🤝#"+dis.id;
        }
        else {member.note="🤝⚠️";}
      }
      else if (member.char=='👗FD') {
        const dis = getAdjNeighbors(grid, member.id, "", ["v", "o"]).filter(c => c.char!="👑KI").filter(c => c.char == c.app);
        const pool = [...[member], ...dis];
        const target = getRands(pool);
        member.app = target.app;
        target.app = "👗FD";
        member.note = "👗#"+target.id;
      }
    })

    let loverredirects = [];

    runphase(grid, ['💕LV', '🧸VD'], (member) => {
      if (member.app == "💕LV") {
        if (!debuffStat(member.corrupt, "lf")) {
          const lover = getInPlay(grid, ["v"], [member.id], [], 1);
          if (lover) {
            member.ramnote = getInPlay(grid, ["v"], [member.id], [], 1);
            loverredirects.push([member.ramnote.id,member.id]);
            loverredirects.push([member.id,member.ramnote.id]);
          }
        } else {
          member.ramnote = getInPlay(grid, [], [member.id], [], 1);
        }
        member.highlight = [member.ramnote.id];
        member.announce = "💕#"+member.ramnote.id;
      }
      else if (member.app == "🧸VD") {
        if (!debuffStat(member.corrupt,"lf")) {
          member.ramnote = [getInPlay(grid, ["v"], [member.id], [], 1).id, 0];
        }
        else {
          member.ramnote = [getInPlay(grid, [], [member.id], [], 1).id, 0];
        }
        member.announce = '🧸#'+member.ramnote[0];
      }
    })

    //corrupt1
    runphase(grid, ['🧪PN',  '🐛PS', '🕹️SB', '🧟ZB'], (member) => {
      if (member.char=='🧪PN') {
        const target = getRandNeighbor(grid,member.id,"",["v"]);
        if (target) {
          eff("c", grid, target.id, "🧪", loverredirects);
          member.note = "🧪#"+target.id;
        }
        else {
          member.note = "🧪⚠️";
        }
      }
      else if (member.char=='🐛PS') {
        const target = getRandNeighbor(grid,member.id,"",["v"]);
        if (target) {
          eff("c", grid, target.id, "🐛", loverredirects);
          member.note = "🐛#"+target.id;
          member.ramnote = target.id;
        }
        else {
          member.note = "🐛⚠️";
        }
      }
      else if (member.char=='🕹️SB') {
        const target = furthest(grid, member.id, ["v"], true)[0];
        if (target) {
          eff("c", grid, target.id, "🕹️", loverredirects);
          member.note = "🕹️#"+target.id;
        }
        else {
          member.note = "🕹️⚠️";
        }

      }
      else if (member.char=='🧟ZB') {
        const target = getRandNeighbor(grid,member.id,"",["o"]);
        if (target) {
          eff("c", grid, target.id, "🧟", loverredirects);
          member.note = "🧟#"+target.id;
        }
        else {
          member.note = "🧟⚠️";
        }
      }
    })

    //corrupt2
    runphase(grid, ['🤵🏻BT', '🍺DK'], (member) => {
      if (member.app=='🤵🏻BT') {
        let x;
        if (!debuffStat(member.corrupt,"lcf")) {
          x = getInPlay(grid,["v"],[member.id],[])[0];
          if (x) {
            eff("c", grid, x.id, "🤵🏻", loverredirects);
            member.note="🤵🏻#"+x.id;
            const ids = [x, getInPlay(grid,[],[member.id, x.id],[],1)].sort((a, b) => a.id - b.id);
            member.highlight = ids;
            member.announce="🤵🏻#"+ids[0].id+"/#"+ids[1].id;
          }
          else {
            member.announce="🤵🏻⚠️";
            member.note="🤵🏻⚠️";
          }
        }
        else {
          x = getInPlay(grid,[],[member.id],[],1);
          const ids = [x, getInPlay(grid,[],[member.id, x.id],[],1)].sort((a, b) => a.id - b.id);
          member.highlight = ids;
          member.announce="🤵🏻#"+ids[0].id+"/#"+ids[1].id;
        }
      }
      else if (member.char=='🍺DK') {
        eff("c", grid, member.id, "🍺", loverredirects);
      }
    })

    //corrupt remove 1
    runphase(grid, ['😇AG', '💖HL'], (member)=> {
      if (member.app == '😇AG') {
        const ns=getRC(grid,member.id,"ns",[]).filter(c => debuffStat(c.corrupt,"c"));
        const ew=getRC(grid,member.id,"ew",[]).filter(c => debuffStat(c.corrupt,"c"));
        if (!debuffStat(member.corrupt,"lcf")) {
          if (ns.length == ew.length) {
            if (Math.random()<0.5) {
              ns.push(member);
            }
            else {
              ew.push(member);
            }
          }
          if (ns.length > ew.length) {
            getRC(grid,member.id,"ns",[]).forEach((c)=>member.highlight.push(c.id));
            ns.forEach(member2 => {
              if (member2.id != member.id) {eff("c", grid, member2.id, "😇", loverredirects);}
            });
            member.announce="😇↕️";
          }
          else {
            getRC(grid,member.id,"ew",[]).forEach((c)=>member.highlight.push(c.id));
            ew.forEach(member2 => {
              if (member2.id != member.id) {eff("c", grid, member2.id, "😇", loverredirects);}
            });
            member.announce="😇↔️";
          }
        }
      }
      else if (member.app == '💖HL') {
        const neighs = getAdjNeighbors(grid,member.id,"").filter(c => debuffStat(c.corrupt,"c"));
        let n=0;
        neighs.forEach(member2 => {
          if (member2.id != member.id) {
            n+=1
            if (!debuffStat(member.corrupt,"lcf")) {
              eff("c", grid, member2.id, "💖", loverredirects);
            }
          }
        });
        if (debuffStat(member.corrupt,"lcf")) {
          if (n==0) {n=1;}
          else if (n>=getAdjNeighbors(grid,member.id,"").length) {n-=1;}
          else if (Math.random()<0.5) {n+=1;}
          else {n-=1;}
        }
        getAdjNeighbors(grid,member.id,"").forEach((c) => {
          member.highlight.push(c.id);
        })
        member.announce="💖"+n;
      }
    })

    //jammed 1
    runphase(grid, ['⚡JM', '🤖AI', '👽HK', '✝️PR'], (member)=> {
      if (member.app == "⚡JM") {
        const dir = Math.random()>0.5 ? "ns" : "ew";
        getAdjNeighbors(grid,member.id,dir).forEach((neigh) => {
          member.highlight.push(neigh.id);
          if (debuffStat(member.corrupt,"lcf")) {
            if (debuffStat(neigh.corrupt,"lc")) {
              eff("j", grid, neigh.id, "⚡", loverredirects);
            }
          }
          else {
            if (!debuffStat(neigh.corrupt,"lc")) {
              eff("j", grid, neigh.id, "⚡", loverredirects);
            }
          }
        })
        member.announce = dir=="ns" ? "⚡↕️" : "⚡↔️";
      }
      else if (member.char == "🤖AI") {
        eff("j", grid, member.id, "🤖", loverredirects);
        let x;
        if (!debuffStat(member.corrupt,"lcf")) {
          x=getInPlay(grid,["v"],[member.id],[],1);
        }
        else {
          x=getInPlay(grid,["m"],[member.id],[],1);
        }
        eff("j", grid, x.id, "🤖", loverredirects);
        member.note = "🤖#"+x.id;
      }
      else if (member.app == "✝️PR") {
        const cors = getAdjNeighbors(grid,member.id).filter(c => debuffStat(c.corrupt,"c"));
        if (debuffStat(member.corrupt,"lcf")) {
          if (cors.length==0) {
            cors.push(getRandNeighbor(grid,member.id));
          }
          else if (cors.length==getAdjNeighbors(grid,member.id).length) {
            cors.pop();
          }
          else if (Math.random()<0.5) {
            cors.push(getAdjNeighbors(grid,member.id).filter(c => !cors.includes(c.id))[0]);
          }
          else {
            cors.pop();
          }
        }
        cors.forEach((neigh) => {
            eff("j", grid, neigh.id, "✝️", loverredirects);
        })
        getAdjNeighbors(grid,member.id,"").forEach((c) => {
          member.highlight.push(c.id);
        })
        member.note = "✝️"+cors.length;
      }
      else if (member.char == "👽HK") {
        const [x,y] = getInPlay(grid,[],[],[],2).sort((a, b) => a.id - b.id);
        eff("j", grid, x.id, "👽", loverredirects);
        eff("j", grid, y.id, "👽", loverredirects);
        member.note='👽#'+x.id+","+y.id;
      }
    })

    //jammed removal 2
    runphase(grid, ['🛠️EG'], (member)=> {
      if (member.app == "🛠️EG") {
        member.ramnote = [];
        const save = getAdjNeighbors(grid,member.id).filter(c => debuffStat(c.jammed,"j"));
        if (debuffStat(member.jammed,"j")) {save.push(member);}
        save.forEach((neigh) => {
          if (!member.ramnote.includes(neigh.id)) {
            member.ramnote.push(neigh.id);
          }
          eff("j", grid, neigh.id, "🛠️", loverredirects);
          if (debuffStat(member.corrupt,"lcf") && neigh.type!=="minion") {
            eff("c", grid, neigh.id, "🛠️", loverredirects);
          }
        })
      }
    })

    //blur
    runphase(grid, ['🚨AL', '🔌EE', '🦑SQ', '👾VR'], (member)=> {
      if (member.app == "🚨AL") {
        const b0=!debuffStat(member.corrupt,"lcf"); // not lying nor corrupted
        const b1=getAdjNeighbors(grid,member.id).filter(c => c.type=="minion").length > 0; //at least 1 minion
        if (b0 == b1) {
          eff("b", grid, member.id, "🚨", loverredirects);
        }
      }
      else if (member.app == "🔌EE") {
        let g = []
        if (!debuffStat(member.corrupt,"lcf")) {
          g = getInPlay(grid).filter(c => debuffStat(c.jammed,"j"))
        }
        else {
          g = getInPlay(grid).filter(c => !debuffStat(c.jammed,"j"))
        }
        if (g.length==0) {member.announce = "🔌⚠️"}
        else {
          eff("b", grid, g[0].id, "🔌", loverredirects);
          member.highlight = [g[0].id];
          member.announce="🔌#"+g[0].id;
        }
      }
      else if (member.app == "🦑SQ") {
        let g = []
        if (!debuffStat(member.corrupt,"lcf")) {
          g = getInPlay(grid,["v"]);
        }
        else {
          g = getInPlay(grid,["m"]);
        }
        if (g.length==0) {member.announce = "🦑⚠️";}
        else {
          eff("b", grid, g[0].id, "🦑", loverredirects);
          member.highlight = [g[0].id];
          member.announce="🦑#"+g[0].id;
        }
      }
      else if (member.char == "👾VR") {
        const x = getInPlay(grid,["v"])[0];
        eff("b", grid, x.id, "👾", loverredirects);
        member.note = "👾#"+x.id;
      }
    })

    //blur removal 2
    runphase(grid, ['🛠️EG'], (member)=> {
      if (member.app == "🛠️EG") {
        const save = getAdjNeighbors(grid,member.id).filter(c => debuffStat(c.blurred,"b"));
        if (debuffStat(member.blurred,"b")) {save.push(member);}
        save.forEach((neigh) => {
          if (!member.ramnote.includes(neigh.id)) {
            member.ramnote.push(neigh.id);
          }
          eff("b", grid, neigh.id, "🛠️", loverredirects);
          if (debuffStat(member.corrupt,"lcf") && neigh.type!=="minion") {
            eff("c", grid, neigh.id, "🛠️", loverredirects);
          }
        })
        getAdjNeighbors(grid,member.id,"").forEach((c) => {
          member.highlight.push(c.id);
        })
        member.announce = "🛠️"+member.ramnote.length;
      }
    })

    //register
    runphase(grid, ['🔊EC', '🔗FG', '👻GH', '👑KI', '💕LV', '🥼SC', '👤SD'], (member)=> {
      if (member.app == "🔊EC" && !debuffStat(member.corrupt,"lcf")) {
        const chars = [...nbV.current, ...nbO.current].filter(c => c!=='🔊EC');
        eff('r', grid, member.id, shuffle(chars)[0], loverredirects);
      }
      if (member.app == "🔗FG" && !debuffStat(member.corrupt,"lcf")) {
        eff('r', grid, member.id, shuffle(nbM.current)[0], loverredirects);
      }
      if (member.app == "👑KI" && debuffStat(member.corrupt,"lcf")) {
        eff('r', grid, member.id, getInPlay(grid, ["m"])[0].char, loverredirects);
      }
      if (member.app == '💕LV' && !debuffStat(member.corrupt,"lcf")) {
        eff('r', grid, member.id, member.ramnote.char, loverredirects);
      }
      if (member.char == "👤SD" && !['🔊EC', '🔗FG'].includes(member.app)) {
        const char = shuffle(disguises.filter(c => (getNotInPlay("c", grid, ["o"]).includes(c) && c!==member.app)))[0];
        if (char) {
          eff('r', grid, member.id, char, loverredirects);
        }
      }
      if (member.app == "🥼SC") {
        let n = Math.random() < 0.5 ? 1 : 2;
        const neighs = getAdjNeighbors(grid, member.id, "", ["v"]);
        if (neighs.length <= 1 && !debuffStat(member.corrupt, "lcf")) {
          n = 1;
        }
        if (!debuffStat(member.corrupt, "lcf")) {
          if (neighs.length >= 1) {
            eff('r', grid, neighs[0].id, "🥼SC", loverredirects);
            member.note = "🥼#"+neighs[0].id;
          }
          if (neighs.length >= 2 && n==2) {
            eff('r', grid, neighs[1].id, "🥼SC", loverredirects);
            const ids = [neighs[0].id, neighs[1].id].sort((a, b) => a - b);
            member.note = "🥼#"+ids[0]+","+ids[1];
          }
          if (neighs.length < 1) {
            member.note = "🥼⚠️";
          }
        }
        getAdjNeighbors(grid,member.id,"").forEach((c) => {
          member.highlight.push(c.id);
        })
        member.announce = "🥼"+n;
      }
      if (member.char == "👻GH") {
        const neighs = getAdjNeighbors(grid, member.id, "", ["v"]);
        if (neighs.length > 0) {
          eff('r', grid, neighs[0].id, "👻GH", loverredirects);
          member.note = "👻#"+neighs[0].id;
        }
        else {
          member.note = "👻⚠️";
        }
      }
    })

    runphase(grid, ['👹DE', '🎮GM'], (member)=> {
      if (member.char == '👹DE') {
        grid.forEach((c) => {
          if (c.char == c.reg && c.type == "minion") {
            eff("r", grid, c.id, '👹DE', loverredirects);
          }
        }) 
      }
      if (member.char == '🎮GM') {
        grid.forEach((c) => {
          if (c.char == c.reg && c.type == "villager" && debuffStat(member.corrupt,"lcf")==debuffStat(c.corrupt,"c")) {
            eff("r", grid, c.id, '🎮GM', loverredirects);
          }
        }) 
      }
    })

    //wake
    runphase(grid, ['📣PA'], (member)=> {
      if (member.app == '📣PA') {
        const dir = Math.random()>0.5 ? "ns" : "ew";
        let x;
        getAdjNeighbors(grid, member.id, dir).forEach(c => member.highlight.push(c.id));
        if (!debuffStat(member.emoji, "lcf")) {
          x = getAdjNeighbors(grid, member.id, dir, ["v"]);
        }
        else {
          x = getAdjNeighbors(grid, member.id, dir, ["m"]);
        }
        const y = getAdjNeighbors(grid, member.id, dir, ["o"]);
        if (x.length > 0) {
          member.announce = (dir=="ns" ? "📣↕️#"+x[0].id : "📣↔️#"+x[0].id);
          x[0].revealed = -1;
          x[0].announce = wakeAndInfo(grid, grid.findIndex(item => item.id === x[0].id));
        }
        else if (y.length > 0) {
          member.announce = (dir=="ns" ? "📣↕️#"+y[0].id : "📣↔️#"+y[0].id);
          y[0].revealed = -1;
          y[0].announce = wakeAndInfo(grid, grid.findIndex(item => item.id === y[0].id));
        }
        else {
          member.announce = '📣⚠️';
          member.highlight = [];
        }
      }
    })

    //end
    console.log('newboard');
    console.log(sV, sO, sM);
    console.log(grid);
    setGameMode('Default');
    setAbilityUserIdx(null); 
    setSelectedIndices([]);
    setShowSettings(false);
    triggerAnimation([...Array(nextgridlength*nextgridlength).keys()], 'flip', grid, -turns);
  };

  useEffect(() => { if(grid.length === 0) initializeGrid(); }, []);

  function wakeAndInfo(grid, grididx, newapp = null, newl = null) {
    const target = grid[grididx];
    const app = newapp ? newapp : target.app;
    const lc = newl==null ? debuffStat(target.corrupt,"lcf") : newl;
    const l = newl==null ? debuffStat(target.corrupt,"lf") : newl;
    function abilityannounce(app) {
      return (app.slice(0,-2)+"➤");
    }
    if (app=="👁️AB") {
      return abilityannounce(app);
    }
    else if (app=="😇AG") {
      if (lc) {
        if (target.announce == "") {
          const b = Math.random()<0.5;
          getRC(grid,target.id,(b ? "ns" : "ew"),[]).forEach((c)=>target.highlight.push(c.id));
          return(b ? "😇↕️" : "😇↔️")
        }
        else {
          const b = target.announce=="😇↔️";
          target.highlight = [];
          getRC(grid,target.id,(b ? "ns" : "ew"),[]).forEach((c)=>target.highlight.push(c.id));
          return(b ? "😇↕️" : "😇↔️")
        }
      }
      else {return(target.announce);}
    }
    else if (app=="📏AR") {
      const ns = getRC(grid, target.id, "ns", ["m"]).length;
      const ew = getRC(grid, target.id, "ew", ["m"]).length;
      let announce = "";
      if (ns>ew) {announce="📏:↔️<↕️";}
      else if (ns<ew) {announce="📏:↔️>↕️";}
      else {announce="📏:↔️=↕️";}
      if (lc) {
        announce = shuffle(["📏:↔️<↕️","📏:↔️>↕️","📏:↔️=↕️"].filter(c => c!=announce))[0];
      }
      getRC(grid, target.id, "nsew", []).forEach((c) => target.highlight.push(c.id));
      return announce;
    }
    else if (app=="🪕BA") {
      let n = getInPlay(grid).filter(c => debuffStat(c.corrupt,"c")).length;
      if (lc) {
        if (n==0) {n==1;}
        else if (n==getInPlay(grid).length) {n-=1;}
        else {n+=(Math.random()<0.5 ? -1 : 1);}
      }
      return("🪕:😵"+n)
    }
    else if (app=="⚜️BI") {
      const v = getInPlay(grid, ["v"], [target.id], [], 1);
      const o = getInPlay(grid, ["o"], [target.id], [], 1);
      let m;
      if (lc) {
        m = getInPlay(grid, ["v","o"], [target.id, v.id, o.id], [], 1);
      }
      else {
        m = getInPlay(grid, ["m"], [target.id], [], 1);
      }
      if (v && o && m) {
        const ids = [v,o,m].sort((a, b) => a.id - b.id);
        target.highlight = ids.map(c => c.id);
        return ("⚜️#"+ids[0].id+","+ids[1].id+","+ids[2].id)
      }
      else {
        return ("⚜️⚠️")
      }
    }
    else if (app=="🍞BK") {
      let announce;
      let n;
      if (target.ramnote=="") {
        announce = "🍞1:🍞";
        n=1;
      }
      else {
        announce = target.ramnote[0];
        n=target.ramnote[1];
      }
      let baked;
      if (!lc) {
        baked = getInPlay(grid, ["v"], [target.id]).filter(c => (c.app == c.char && c.revealed==-2))[0];
      }
      else {
        baked = getInPlay(grid, ["o", "m"], [target.id]).filter(c => (nbV.current.includes(c.app) && c.revealed==-2))[0];
      }
      if (baked) {
        const nplus = n+1;
        baked.ramnote = ["🍞"+nplus+":"+baked.app.slice(0,-2),nplus];
        baked.app = "🍞BK";
      }
      return announce;
    }
    else if (app=="🙏CF") {
      if (lc) {return("🙏👎");}
      else {return("🙏👍");}
    }
    else if (app=="🍖CB") {
      return abilityannounce(app);
    }
    else if (app=="🗺️CG") {
      let os = nearest(grid, target.id, ["o"]).map(c => c.reg);
      let ms = nearest(grid, target.id, ["m"]).map(c => c.reg);
      if (lc) {
        os = shuffle(nbO.current.filter(c => !os.includes(c)));
        ms = shuffle(nbM.current.filter(c => !ms.includes(c)));
      }
      if (os.length==0 || ms.length==0) {
        return("🗺️⚠️");
      }
      else {
        return("🗺️:"+os[0].slice(0,-2)+ms[0].slice(0,-2));
      }
    }
    else if (app=="📸CM") {
      return abilityannounce(app);
    }
    else if (app=="🎭CP") {
      let n = getInPlay(grid).filter(c => (c.char !== c.app)).length;
      if (lc) {
        if (n==0) {n==1;}
        else if (n==getInPlay(grid).length) {n-=1;}
        else {n+=(Math.random()<0.5 ? -1 : 1);}
      }
      return("🎭:"+n)
    }
    else if (app=="🎀CU") {
      return abilityannounce(app);
    }
    else if (app=="💭DM") {
      return abilityannounce(app);
    }
    else if (app=="🩺DR") {
      return abilityannounce(app);
    }
    else if (app=="📝DT") {
      return ("📝TBC")
    }
    else if (app=="🛠️EG") {
      return(target.announce);
    }
    else if (app=="🧠EL") {
      if (outcastPool.includes(target.reg)) {
        return(Math.random()<0.5 ? "🧠:👍" : "🧠:👎");
      }
      else if (villagerPool.includes(target.reg)) {
        return(debuffStat(target.corrupt,"c") ? "🧠:👎" : "🧠:👍");
      }
      else {
        return(debuffStat(target.corrupt,"c") ? "🧠:👍" : "🧠:👎");
      }
    }
    else if (app=="😎EV") {
      let v = getInPlay(grid, ["v"], [], [], 1);
      if (v) {v=v.char;}
      let o = getInPlay(grid, ["o"], [], [], 1);
      if (o) {o=o.char;}
      let m = getInPlay(grid, ["m"], [], [], 1);
      if (m) {m=m.char;}
      if (lc) {
        if (!v) {v = getNotInPlay("r", grid, ["v"])[0];}
        else if (!o) {o = getNotInPlay("r", grid, ["o"])[0];}
        else if (!m) {m = getNotInPlay("r", grid, ["m"])[0];}
        else {
          const change = shuffle(["v","o","m"])[0];
          if (change=="v") {v = getNotInPlay("r", grid, ["v"])[0];}
          else if (change=="o") {o = getNotInPlay("r", grid, ["o"])[0];}
          else if (change=="m") {m = getNotInPlay("r", grid, ["m"])[0];}
        }
      }
      if (v && o && m) {
        return("😎:"+v.slice(0,-2)+o.slice(0,-2)+m.slice(0,-2));
      }
      else {
        return("😎⚠️")
      }
    }
    else if (app=="🔮FT") {
      return abilityannounce(app);
    }
    else if (app=="🔨FX") {
      return abilityannounce(app);
    }
    else if (app=="💎GC") {
      let x;
      if (!lc) {
        x=getInPlay(grid, ["v", "o"]);
      }
      else {
        x=getInPlay(grid, ["m"]);
      }
      if (x.length==0) {
        return("💎⚠️");
      }
      else {
        target.hightlight = [x[0].id];
        return("💎👍#"+x[0].id);
      }
    }
    else if (app=="⚰️GK") {
      return abilityannounce(app);
    }
    else if (app=='🐐GO') {
      let n=nearest(grid, target.id);
      let f=furthest(grid, target.id);
      let nm=nearest(grid, target.id,["m"]);
      if (n.length==0 || f.length==0 || nm.length==0) {
        announce = "🐐⚠️";
      }
      n=tiledist(grid,target.id,n[0].id);
      f=tiledist(grid,target.id,f[0].id);
      nm=tiledist(grid,target.id,nm[0].id);
      let announce;
      if (lc) {
        let m = [];
        if (nm+1<=f) {m.push(nm+1);}
        else if (nm-1>=n) {m.push(nm-1);}
        nm = shuffle(m)[0];
        if (m.length==0) {announce = "🐐⚠️"}
        else {announce = "🐐:"+nm;}
      }
      else {
        announce = "🐐:"+nm;
      }
      getInPlay(grid).filter((c) => tiledist(grid, target.id, c.id)==nm)
        .forEach((c) => {target.highlight.push(c.id)});
      return(announce);
    }
    else if (app=='🛡️GU') {
      return abilityannounce(app);
    }
    else if (app=="💔HB") {
      let newapp = shuffle(['🙏CF'])[0];
      let newl = !lc;
      return(wakeAndInfo(grid, grididx, newapp, newl));
    }
    else if (app=="💖HL") {
      return(target.announce);
    }
    else if (app=="🔍IN") {
      if (!lc) {
        const vo = getInPlay(grid, ["v","o"], [target.id], [], 1);
        const m = getInPlay(grid, ["m"], [target.id], [], 1);
        if (vo && m) {
          const ids = [vo, m].sort((a, b) => a.id - b.id);
          target.hightlight = ids.map(c => c.id);
          return("🔍"+m.reg.slice(0,-2)+"#"+ids[0].id+","+ids[1].id);
        }
        else {return "🔍⚠️"}
      }
      else {
        const vos = getInPlay(grid, ["v","o"], [target.id], [], 2).sort((a, b) => a.id - b.id);
        if (vos.length==2) {
          target.hightlight = vos.map(c => c.id);
          return("🔍"+shuffle(nbM.current)[0].slice(0,-2)+"#"+vos[0].id+","+vos[1].id);
        }
        else {return "🔍⚠️"}
      }
    }
    else if (app=="🤐IV") {
      return "🤐";
    }
    else if (app=="🤹JE") {
      return abilityannounce(app);
    }
    else if (app=="⚖️JG") {
      return abilityannounce(app);
    }
    else if (app=="💍JS") {
      let x;
      if (!lc) {
        x=getInPlay(grid, [], [target.id]).filter(c => !debuffStat(c.emoji,"lc"));
      }
      else {
        x=getInPlay(grid, [], [target.id]).filter(c => debuffStat(c.emoji,"lc"));
      }
      if (x.length==0) {
        return("💍⚠️");
      }
      else {
        target.hightlight = [x[0].id];
        return("💍👍#"+x[0].id);
      }
    }
    else if (app=="👑KI") {}
    else if (app=="🗡️KN") {}
    else if (app=="🧵KT") {
      let c=0;
      getInPlay(grid, ["m"]).forEach((member) => {
        const mneighs = getAdjNeighbors(grid, member.id, "", ["m"]);
        c+=mneighs.length;
      })
      c=Math.floor(c/2);
      if (lc) {
        if (c==0) {c+=1;}
        else {c+=(Math.random()<0.5 ? 1 : -1);}
      }
      return("🧵:"+c);
    }
    else if (app=="🐑LB") {
      let n=nearest(grid, target.id);
      let f=furthest(grid, target.id);
      let no=nearest(grid, target.id,["o"]);
      if (n.length==0 || f.length==0 || no.length==0) {
        return("🐑⚠️");
      }
      n=tiledist(grid,target.id,n[0].id);
      f=tiledist(grid,target.id,f[0].id);
      no=tiledist(grid,target.id,no[0].id);
      let announce;
      if (lc) {
        let m = [];
        if (no+1<=f) {m.push(no+1);}
        if (no-1>=n) {m.push(no-1);}
        if (m.length==0) {announce = "🐑⚠️"}
        else {
          const newno = shuffle(m)[0];
          getInPlay(grid).filter((c) => tiledist(grid, target.id, c.id)==newno)
            .forEach((c) => {target.highlight.push(c.id)});
          announce = "🐑:"+newno;
        }
      }
      else {
        getInPlay(grid).filter((c) => tiledist(grid, target.id, c.id)==no)
          .forEach((c) => {target.highlight.push(c.id)});
        announce = "🐑:"+no;
      }
      return(announce);
    }
    else if (app=="🧭LC") {
      return abilityannounce(app);
    }
    else if (app=='📚LI') {
      return abilityannounce(app);
    }
    else if (app=='💼LW') {
      return abilityannounce(app);
    }
    else if (app=="🖌️MA") {
      let n = getInPlay(grid).filter(c => c.char!==c.app);
      if (lc) {
        n = getInPlay(grid).filter(c => c.char==c.app);
      }
      if (n.length == 0) {return "🖌️⚠️"}
      else {return ("🖌️:"+n[0].app.slice(0,-2));}
    }
    else if (app=="📬MM") {
      let y = getInPlay(grid);
      let n = getNotInPlay("r", grid);
      if (y.length>0 && n.length>0) {
        if (!lc) {return("📬:✅"+y[0].reg.slice(0,-2)+"❌"+n[0].slice(0,-2));}
        else {return("📬:✅"+n[0].slice(0,-2)+"❌"+y[0].reg.slice(0,-2));}
      }
    }
    else if (app=="🧮MT") {
      let s = getInPlay(grid,["m"]).reduce((sum, x) => sum + x.id, 0);
      if (lc) {
        const k = getInPlay(grid,["m"]).length+1;
        const r = Math.floor(Math.random() * (2*k)) - k;
        s+=r;
        if (r>=0) {s+=1;}
      }
      return("🧮:"+s);
    }
    else if (app=='🏛️MY') {
      let v = getInPlay(grid, ["v"]).length;
      let o = getInPlay(grid, ["o"]).length;
      let m = getInPlay(grid, ["m"]).length;
      if (lc) {
        const perm = shuffle([[1,0,-1],[1,-1,0],[0,1,-1],[0,-1,1],[-1,0,1],[-1,1,0]])
        for (let i=0; i<6; i++) {
          v+=perm[i][0];
          o+=perm[i][1];
          m+=perm[i][2];
          if (v<0 || o<0 || m<0) {
            v-=perm[i][0];
            o-=perm[i][1];
            m-=perm[i][2];
            continue;
          }
          else {
            break
          }
        }
      }
      return("🏛️:"+v+"/"+o+"/"+m);
    }
    else if (app=="☯️NJ") {
      let n = getAdjNeighbors(grid, target.id, "", ["m"]).length;
      if (lc) {
        if (n==0) {n+=1;}
        else if (n==getAdjNeighbors(grid, target.id, "").length) {n-=1;}
        else (n+=(Math.random()<0.5 ? -1 : 1));
      }
      getAdjNeighbors(grid,target.id,"").forEach((c) => {
        target.highlight.push(c.id);
      })
      return("☯️:"+n);
    }
    else if (app=="💊NR") {
      let p = debuffStat(target.corrupt,"c") ? target.corrupt : "👍";
      let q = debuffStat(target.jammed,"j") ? target.jammed : "👍";
      let r = debuffStat(target.blurred,"b") ? target.blurred : "👍";
      if (l) {
        const x = getRandNeighbor(grid, target.id);
        p = debuffStat(x.corrupt,"c") ? x.corrupt : "👍";
        q = debuffStat(x.jammed,"j") ? x.jammed : "👍";
        r = debuffStat(x.blurred,"b") ? x.blurred : "👍";
      }
      return ("💊:"+p+q+r);
    }
    else if (app=="📣PA") {
      return(target.announce);
    }
    else if (app=="🕊️PC") {}
    else if (app=="🎤PF") {
      let newapp = shuffle(['🙏CF'])[0];
      let newl = getAdjNeighbors(grid, target.id, "", ["m"]).length>0;
      return(wakeAndInfo(grid, grididx, newapp, newl));
    }
    else if (app=="📡RD") {
      const candidates = grid.filter(cell => cell.id !== target.id && cell.char != cell.app);
      const withDist = candidates.map(cell => ({cell: cell, dist: tiledist(grid, target.id, cell.id)}));
      const minDist = Math.min(...withDist.map(item => item.dist));
      const tiedNearest = withDist.filter(item => item.dist === minDist).map(item => item.cell);
      let p = shuffle(tiedNearest.filter(cell => cell.char != cell.app))[0].reg;
      if (lc) {p = shuffle(tiedNearest.filter(cell => cell.char != cell.app))[0].reg;}
      if (p) {return("📡:"+p.slice(0,-2));}
      else {return("📡⚠️");}
    }
    else if (app=="🕯️RI") {
      return abilityannounce(app);
    }
    else if (app=="🔭RG") {
      let x = tiledist(grid, target.id, furthest(grid, target.id, ["m"])[0].id);
      const mx = tiledist(grid, target.id, furthest(grid, target.id)[0].id);
      if (lc) {
        if (x==mx) {x-=1;}
        else if (x==1) {x=2;}
        else {x+=(Math.random()>0.5 ? -1 : 1)}
      }
      getInPlay(grid).filter((c) => tiledist(grid, target.id, c.id)==x)
        .forEach((c) => {target.highlight.push(c.id)});
      return("🔭:"+x);
    }
    else if (app=="🐦RK") {}
    else if (app=="🗿SE") {
      if (!lc) {
        const cor = getInPlay(grid).filter(c => debuffStat(c.corrupt,"c"));
        const nc = getInPlay(grid).filter(c => !debuffStat(c.corrupt,"c"));
        if (cor.length>0 && nc.length>0) {
          const ids = [cor[0], nc[0]].sort((a, b) => a.id - b.id);
          target.highlight = ids.map(c => c.id);
          return("🗿#"+ids[0].id+","+ids[1].id);
        }
        else {return "🗿⚠️"}
      }
      else {
        const nc = getInPlay(grid).filter(c => !debuffStat(c.corrupt,"c")).sort((a, b) => a.id - b.id);
        if (nc.length>=2) {
          target.highlight = nc.map(c => c.id);
          return("🗿#"+nc[0].id+","+nc[1].id);
        }
        else {
          return("🗿⚠️")
        }
      }
    }
    else if (app=="🎖️SH") {
      let pool = getInPlay(grid).filter(c => debuffStat(c.corrupt,"c"));
      if (lc) {
        pool = getInPlay(grid).filter(c => !debuffStat(c.corrupt,"c"));
      }
      if (pool.length>0) {
        return("🎖️:"+pool[0].reg);
      }
      else {return "🎖️⚠️"}
    }
    else if (app=="🏹SL") {
      return abilityannounce(app);
    }
    else if (app=="📊ST") {
      let n = Math.max(...getInPlay(grid,["m"]).map(c => c.id))-Math.min(...getInPlay(grid,["m"]).map(c => c.id));
      const mx = Math.max(...getInPlay(grid).map(c => c.id))-Math.min(...getInPlay(grid).map(c => c.id));
      if (lc) {
        if (n==0) {n=1;}
        else if (n==mx) {n-=1;}
        else {n+=(Math.random()<0.5 ? -1 : 1);}
      }
      return("📊:"+n);
    }
    else if (app=="📐SV") {
      const nn = Math.min(...getRC(grid, target.id, "n", ["m"]).map(c => tiledist(grid, target.id, c.id)));
      const ee = Math.min(...getRC(grid, target.id, "e", ["m"]).map(c => tiledist(grid, target.id, c.id)));
      const ss = Math.min(...getRC(grid, target.id, "s", ["m"]).map(c => tiledist(grid, target.id, c.id)));
      const ww = Math.min(...getRC(grid, target.id, "w", ["m"]).map(c => tiledist(grid, target.id, c.id)));
      const tgt = [nn, ee, ss, ww].sort((a, b) => a-b);
      let announce;
      if (tgt[0]==Math.min()) {announce = "📐:⚠️";}
      else if (tgt[0]==tgt[1]) {announce = "📐:🟰";}
      else if (tgt[0]==nn) {announce = "📐:⬆️";}
      else if (tgt[0]==ee) {announce = "📐:➡️";}
      else if (tgt[0]==ss) {announce = "📐:⬇️";}
      else if (tgt[0]==ww) {announce = "📐:⬅️";}
      if (lc) {
        announce = shuffle(["📐:⬆️", "📐:➡️", "📐:⬇️", "📐:⬅️", "📐:🟰", "📐:⚠️"].filter(c => !c==announce))[0];
      }
      return announce;
    }
    else if (app=="🎓TE") {
      let ipc = 0;
      const ip = [...new Set(getInPlay(grid).map(c => c.reg.slice(0,-2)))];
      const nip = [...new Set(getNotInPlay("r", grid).map(c => c.slice(0,-2)))];
      if ((ip.length + nip.length)<3) {return "🎓⚠️";}
      let cs = [];
      [Math.random()>0.5, Math.random()>0.5, Math.random()>0.5].forEach((b) => {
        if (ip.length==0) {
          cs.push(nip.shift());
        }
        else if (nip.length==0) {
          cs.push(ip.shift());
          ipc+=1;
        }
        else if (b) {
          cs.push(nip.shift());
        }
        else {
          cs.push(ip.shift());
          ipc+=1;
        }
      })
      if (lc) {
        if (ipc==0) {ipc=1;}
        else if (ipc==3) {ipc=2;}
        else {ipc+=(Math.random()<0.5 ? -1 : 1)}
      }
      return("🎓:"+cs[0]+cs[1]+cs[2]+"="+ipc)
    }
    else if (app=="☕TL") {
      target.ramnote = Math.random()<0.5 ? "↕️" : "↔️";
      return("☕:"+target.ramnote);
    }
    else if (app=="☂️WM") {
      return abilityannounce(app);
    }
    else if (app=="✏️WR") {
      let newapp = shuffle(['🙏CF'])[0];
      let newl = lc;
      return(wakeAndInfo(grid, grididx, newapp, newl));
    }
    else if (app=='🧙🏻WZ') {
      return abilityannounce(app);
    }
    else if (app=='🎞️XR') {
      return abilityannounce(app);
    }
    else if (app=='💰BH') {
      if (lc || target.ramnote=="") {
        const y = getInPlay(grid, ["v","o"], [target.id], [], 1);
        if (y) {
          target.highlight.push(y.id);
          return("💰#"+y.id);
        }
      }
      else {
        target.highlight.push(target.ramnote);
        return("💰#"+target.ramnote);
      }
    }
    else if (app=='🤝GT') {
      const twins = getInPlay(grid, [], [target.id]).filter(c => c.app=="🤝GT");
      if (twins.length==0) {
        return("🤝#"+target.id);
      }
      else {
        target.highlight.push(twins[0].id);
        return("🤝#"+twins[0].id);
      }
    }
    else if (app=='👥ET') {
      const twins = getInPlay(grid, [], [target.id]).filter(c => c.app=="👥ET");
      if (twins.length==0) {
        return("👥#"+target.id);
      }
      else {
        target.highlight.push(twins[0].id);
        return("👥#"+twins[0].id);
      }
    }
    return target.announce;
  }

  const getCellStateClass = (cell, gm) => {
    if (cell.type === 'empty') return 'cell-empty';
    
    const isRevealed = cell.revealed !== -2;
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
      if (cell.revealed !== -2 && cell.killed === -1 && selectcount[cell.app] >= 0) {
        setGameMode('Ability'); setAbilityUserIdx(idx); setSelectedIndices([]);
      } else if (cell.revealed === -2 && cell.killed === -1) {
        const info = wakeAndInfo(grid, idx);
        const nG = [...grid]; nG[idx] = { ...cell, revealed: turns, announce: info};
        triggerAnimation([idx], 'flip', nG, 1);
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
      if (type[0]!=='s' && otherRolesSum + newVal > nextgridlength**2) return prev;
      const newrole = { ...prev, [type]: newVal };
      localStorage.setItem('nextroleCounts', JSON.stringify(newrole));
      return newrole;
    });
  };

  return (
    <div className={`main-viewport ${darkMode ? 'dark-mode' : ''} ${gameMode === 'Kill' ? (darkMode ? 'dark-kill-mode' : 'kill-mode') : ''} ${animatingIndices.size > 0 ? 'input-locked' : ''}`}>
      <div className="game-container" style={{ '--gridlength': gridlength }}>
        <header className="branding">
          <h1 className="title">GridBluff</h1>
          <p className="subtitle">minimal solo social deduction game inspired by Demon Bluff & Dupery</p>
        </header>

        <div className="control-bar">
          <div className="control-left">
            <button className="square-btn" onClick={() => setShowSettings(true)}>☆</button>
            <span className="turns">🕒{turns}, {gridlength}x{gridlength} {nwarp ? 'NWarp' : ''}</span>
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
             const isTar = gameMode === 'Default' && hSource?.revealed !== -2 && hSource?.highlight?.includes(cell.id);
             const bCls = isSel || isTar ? 'b-lime' : (hoveredIdx === index ? 'b-yellow' : '');
             return (
               <div key={index} className={`cell ${getCellStateClass(cell, gameMode)} cell-${cell.type} ${cell.type !== 'empty' ? 'is-clickable' : ''} ${bCls} ${animatingIndices.has(index) ? `anim-${animType}` : ''}`}
                 onClick={() => handleCellClick(index)} onMouseEnter={() => cell.type !== 'empty' && setHoveredIdx(index)} onMouseLeave={() => setHoveredIdx(null)}>
                 <div className="cell-inner">
                   {cell.type !== 'empty' && <div className={`id-triangle ${cell.killed !== -1 ? 'id-triangle-dead' : ''}`}><span className={abilityUserIdx === index ? 'id-number-y-txt' : 'id-number'}>{cell.id}</span></div>}
                   {cell.type === 'empty' ? <span className="text-xl"></span> : (cell.revealed === -2 && cell.killed === -1 && gameMode!=="Ended") ? <span className="text-xl">?</span> : (
                     <><span className="text-xs-cellstat" style={{"fontSize": (gridlength == 6 ? "0.45" : "0.55")+"rem"}}>{cell.convert}{cell.corrupt}{cell.jammed}{cell.blurred}{cell.reg===cell.char ? '✅' : cell.reg.slice(0, -2)}</span>
                     <div className="c-info">
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}></span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.char!==cell.app ? cell.char+" ("+cell.app+")" : cell.char}</span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.announce}</span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.revealed !== -2 ? `🗝️${cell.revealed}` : ""}{cell.used > 0 ? `💡${cell.used}` : ""}{cell.killed !== -1 ? `🔪${cell.killed}` : ""}</span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.note}</span>
                     </div>
                     </>
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
                        <span className="turns">🕒{turns}, {gridlength}x{gridlength} {nwarp ? 'NWarp' : ''}</span>
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
                              {row.length < gridlength && Array(gridlength - row.length).fill(0).map((_, i) => (
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
                        <div className="counter-row"><span>Grid Length</span><div className="controls"><button onClick={() => setnextGridlength(prev => Math.max(4, prev - 1))}>-</button><span>{nextgridlength}</span><button onClick={() => setnextGridlength(prev => Math.min(6, prev + 1))}>+</button></div></div>
                        <div className="counter-row"><span>Neighbour Warpping</span><div className="controls"><button onClick={() => setnextnwarp(prev => !prev)}>-</button><span>{nextnwarp ? "T" : "F"}</span><button onClick={() => setnextnwarp(prev => !prev)}>+</button></div></div>
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
                                {(v !=='🧛🏻‍♀️VP') ?  <button 
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
                <>
                  <button className="back-btn" onClick={() => setDetailedChar(null)}>← Back</button>
                  <h2>{detailedChar}</h2>
                  <div className="tab-scroll-container">
                    <div className="detailp">{details(detailedChar)}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;