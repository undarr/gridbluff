import React, { useState, useEffect } from 'react';
import './App.css';

const villagerPool = 
['👁️AB', '😇AG', '📏AR', '🪕BA', '⚜️BI',
'🍞BK', '🍖CB', '🙏CF', '🗺️CG', '📸CM',
'🎭CP', '🎀CU', '💭DM', '📝DT', '🩺DR',
'🛠️EG', '🧠EL', '🔮FT', '🔨FX', '💎GC',
'⚰️GK', '🐐GO', '🛡️GU', '💔HB', '💖HL',
'🔍IN', '🤐IV', '🤹JE', '⚖️JG', '💍JS',
'👑KI', '🗡️KN', '🧵KT', '🐑LB', '🧭LC',
'📚LI', '💼LW', '🖌️MA', '📬MM',
'🧮MT', '🏛️MY', '☯️NJ', '💊NR', '📣PA',
'🕊️PC', '🎤PF', '📡RD', '🕯️RI', '🔭RG',
'🐦RK', '🗿SE', '🎖️SH', '🏹SL', '📊ST',
'📐SV', '🎓TE', '☕TL', '☂️WM', '✏️WR',
'🧙🏻WZ', '🎞️XR'];

const outcastPool = 
['🍷AC', '🤖AI', '🚨AL', '💰BH', '💣BM', '🤵🏻BT', 
'🐱CC', '🍺DK', '😔DP', '🔊EC', '🔌ET', 
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
'🛠️EG', '🧠EL', '🔮FT', '🔨FX', '💎GC',
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
'🔌ET', '🔗FG', '🎲GB', '🎮GM', 
'🤝GT', '⚡JM', '🤡JX', '💕LV',
'🌙MC', '🎵NM', '✝️PR', 
'🥼SC', '💉SG', '🦑SQ',
'🧸VD', '👦🏻YS'];


const selectcount = {"🙏CF":0,"🏹SL":1,"🎀CP":2,"🐐GT":0,"💖HL":0,"🔮FT":0,"🩺DC":0,"🧙🏻WZ":3,"⚖️JG":1,"🧵KT":0,"☯️NJ":0,"🕵UC":0,"🔍IN":2,"📡RD":0,"📌LC":0,"📬MM":0,"☂️WM":0,"🧮MT":0,"⚜️BI":0,"👁️XR":1,"📚LI":3,"🎭MA":0,"✏️PT":0};

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
            <b>When neither lying nor corrupted,</b> if there are more minions in its row than its column, announce "↔️{'>'}↕️", 
            if there are more minions in its column than its row, announce "↔️{'<'}↕️", 
            if there are equal amount of minions in its row and its column, announce "↔️=↕️".<br/>
            <b>When lying or corrupted,</b> announce one of the options different from that above.
            </>)
  }
  else if (p=="🪕BA") {
    return (<>The <b>Bard (🪕BA)</b> counts the number of corrupted members.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🪕😵n", where n is the total number of corrupted members.<br/>
            <b>When lying or corrupted,</b> announce "🪕😵n", where n is 1 off the total number of corrupted members.
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
            Announces "🍞n,p", where p is my original appearance and n is the baker count of the baker.<br/>
            <b>When neither lying nor corrupted,</b> if possible, a random unrevealed villager, will be baked and now disguise as a baker.<br/>
            <b>When lying or corrupted,</b> if possible, a random unrevealed non-villager who was disguising as a villager, will be baked and now disguise as a baker.<br/><br/>
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
            <b>When neither lying nor corrupted,</b> if possible, announces "🗺️:pq", where p is the character of the nearest non-self Outcast and q is the character of the nearest non-self Minion.<br/>
            <b>When lying or corrupted,</b> announces "🗺️:pq", where p is an Outcast different from that above and q is a Minion different from that above. Note that p and q can both independently be either in play or not in-play.
            </>)
  }
  else if (p=="📸CM") {
    return (<>The <b>Cameraman (📸CM)</b> counts the number of revealed minions.<br/><br/>
            <b>Ability:</b> When activated,<br/>
            <b>When neither lying nor corrupted,</b> announces "📸n", where n is the total number of revealed minions.<br/>
            <b>When lying or corrupted,</b> announces "📸n", where n is a reasonable random number different from above.
            </>)
  }
  else if (p=="🎭CP") {
    return (<>The <b>Cosplayer (🎭CP)</b> counts the number of disguised members.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🎭n", where n is the total number of disguised members.<br/>
            <b>When lying or corrupted,</b> announces "🎭n", where n is 1 off the total number of disguised members.
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
            <b>When neither lying nor corrupted,</b> announces "🐐n", where n is the tile-distance between it and the nearest minion.<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
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
            <b>When neither lying nor corrupted,</b> announces whatever p would announce were it lying and corrupted.
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
            <b>When lying or corrupted,</b> announces "💖k" where k is 1 off from m and between 0 and 4.
            </>) 
  }
  else if (p=="🔍IN") {
    return (<>The <b>Investigator (🔍IN)</b> finds a minion.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> announces "🔍p#x,y", where x and y are the ids of a minion and a non-minion in random order and p is the character of the minion.<br/>
            <b>When lying or corrupted,</b> announces "🔍p#x,y", where x and y are the ids of 2 non-minions in random order and p is a in-play minion character.
            </>)
  }
  else if (p=="🤐IV") {
    return (<>The <b>Introvert (🤐IV)</b> befriends one of its neighbours.<br/><br/>
            <b>Ability:</b> When woken,<br/>
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
            <b>When neither lying nor corrupted,</b> if possible, announce "💍👍#x", where x is not lying nor corrupted
            <b>When lying or corrupted,</b> if possible, announce "💍👍#x", where x is a random member that is lying or corrupted
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
            <b>When neither lying nor corrupted,</b> announces "🧵n".<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
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
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
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
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="💊NR") {
    return (<>The <b>Nurse (💊NR)</b> performs self diagnosis on herself.<br/><br/>
            <b>When woken,</b><br/>
            <b>When not lying,</b> announce "💊:pqr", where p is "👍" if it is not corrupted, else p is the source of its corruption, 
            q is "👍" if it is not jammed, else q is the source of its jamming, r is "👍" if it is not blurred, else r is the source of its blurness.<br/>
            <b>When lying,</b> choose an adjacent member with id x, announce "💊:pqr", where p is "👍" if x is not corrupted, else p is the source of x's corruption, 
            q is "👍" if it is not jammed, else q is the source of x's jamming, r is "👍" if it is not blurred, else r is the source of x's blurness.<br/>
            </>) 
  }
  else if (p=="📣PA") {
    return (<>The <b>Patrol (📣PA)</b> wakes up a truthful member.<br/><br/>
            <b>Ability:</b> In the beginning,<br/>
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
            <b>When lying or corrupted or at least one of its neighbours is a minion,</b> announces whatever p would announce were it lying and corrupted.
            </>) 
  }
  else if (p=="📡RD") {
    return (<>The <b>Radar (📡RD)</b> detects a disguised member.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            <b>When neither lying nor corrupted,</b> "📡:p", where p is the role of the nearest member in disguise.<br/>
            <b>When lying or corrupted,</b> "📡:p", where p is the role of the nearest member in disguise.
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
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
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
            <b>When neither lying nor corrupted,</b> if possible, announces "🎖️:p", where p is the character of a member who was corrupted by a different member.<br/>
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
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
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
            <b>When lying or corrupted,</b> announces whatever p would announce were it lying and corrupted.
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
            <b>When neither lying nor corrupted,</b> choose a random non-minion member with member id y, announce "💰#x,y" if x{"<"}y, else announce "💰#y,x".<br/>
            <b>When lying or corrupted,</b> choose 2 random non-minion members with member ids y and z, announce "💰#y,z" if y{"<"}z, else announce "💰#z,y".<br/>
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
            <b>When neither lying nor corrupted,</b> Choose a villager member and a different random member with member ids x and y respectively.<br/>
            <b>When lying nor corrupted,</b> Choose 2 random members with member ids x and y.<br/>
            Corrupt: <br/>
            <b>When neither lying nor corrupted,</b>  corrupt x.<br/><br/>
            <b>Ability:</b> When woken,<br/>
            Announce "🤵🏻#x/#y" if x{"<"}y, else announce "🤵🏻#y/#x".
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
  else if (p=='🔌ET') {
    return (<>The <b>Electrian (🔌ET)</b> blurs a jammed member.<br/><br/>
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
            <b>When not corrupted,</b> register as a random minion, not-necessarily in-play. <br/>
            <b>When corrupted,</b> register as a Fallguy (🔗FG).
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
            <b>When neither lying nor corrupted,</b> all truthful villagers who register as themselves now registers as a Gamemaster (🎮GM). <br/>
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
            If possible, announce "🤝#x", where x is the member id of a member who is not me, and disguising as a Good Twin (🤝GT).
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
            Corrupt: When not lying, if I am corrupted, I corrupt x, if x is corrupted, x corrupts me.<br/>
            Jam: When not lying, if I am jammed, I jam x, if x is jammed, x jams me.<br/>
            Blur: When not lying, if I am blurred, I blur x, if x is blurred, x blurs me.<br/><br/>

            <b>When I am dead:</b> <br/> When not lying, I execute x.<br/>
            <b>When x is dead:</b> <br/> When not lying, x executes me.<br/><br/>

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
    return (<>The <b>Noisemaker (🎵NM)</b> annoys its neighbours with noise.<br/><br/>
            <b>Initial Phase:</b><br/>
            Choose n as 2 or 3 randomly.<br/><br/>
            <b>Ability:</b> In the beginning,<br/>
            Wake myself,<br/>
            <b>When neither lying nor corrupted,</b> n of my neighbours take 1 more round to wake up. <br/>
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
            <b>When neither lying nor corrupted,</b> if possible, 2 non-minion neighbours register as a Scientist (🥼SC).<br/>
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
            Corrupt: Add 1 to n. When not lying, if someone corrupts me, have that someone corrupt member x as well.<br/>
            CorruptRemove1: Remove any corruption on me.<br/>
            Jam: Add 1 to n. When not lying, if someone jams me, have that someone jam x as well.<br/>
            JamRemove: Remove any jamming from myself.<br/>
            Blur: Add 1 to n. When not lying, if someone blurs me, have that someone blur x as well.<br/>
            BlurRemove: Remove any blurness from myself.<br/><br/>
            Register: Add 1 to n. When not lying, if someone changes my register, have that someone register x as well.<br/>
            Register5: Register as my true character.<br/><br/>
            
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
            If possible, announce "👥#x", where x is the member id of a member who is not me, and disguising as an Evil Twin (👥ET).<br/>
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
            <b>Ability:</b> When woken,<br/>
            If possible, announce "👥#x", where x is the member id of a member who is not me, and disguising as an Evil Twin (👥ET).<br/>
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
    return (<>The <b>Magician (🎩MG)</b> hides all minions.<br/><br/>
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
            Corrupt: If possible, choose an adjacent villager will member id x, x gets corrupted.

            <b>Right before x or me dies:</b><br/>
            SoulConvert: If x exists, I soulconvert into x's character and x soulconverts into a Parasite (🐛PS).
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
            Register: <b>When announcing something,</b> registers as my appearance.<br/><br/>
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
    return (<>The <b>Smoker (🚬SM)</b> hides all neighbours.<br/><br/>
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
    revealed: 0, used: 0, killed: -1,
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

    let nbV = villagerPool.filter(c => getStatus(c) != 2);
    let nbO = outcastPool.filter(c => getStatus(c) != 2);
    let nbM = minionPool.filter(c => getStatus(c) != 2);

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

          /*
          if (nextnwarp) {
            // Modulo wrapping: (index + length) % length handles negative numbers correctly
            r = (r + nextgridlength) % nextgridlength;
            c = (c + nextgridlength) % nextgridlength;
          } else {
            // Standard boundary check: stop if we hit the edge
            if (r < 0 || r >= nextgridlength || c < 0 || c >= nextgridlength) break;
          }
            */
          if (r < 0 || r >= nextgridlength || c < 0 || c >= nextgridlength) break;

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
        neighbors = neighbors.filter((n) => mappedTypes.includes(n.type));
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
        players = players.filter((p) => mappedTypes.includes(p.type));
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

    const getNotInPlay = (grid, includetypes = [], excludechar = [], n = -1) => {
      const charsInPlay = grid
        .filter((p) => p.type !== "empty")
        .map((p) => p.char);
      let pool = [];
      
      // If no types specified, check all pools. Otherwise, merge specified pools.
      if (includetypes.length === 0) {
        pool = [...nbV, ...nbO, ...nbM];
      } else {
        if (includetypes.includes("v")) pool = [...pool, ...nbV];
        if (includetypes.includes("o")) pool = [...pool, ...nbO];
        if (includetypes.includes("m")) pool = [...pool, ...nbM];
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

    function nearest(grid, id, includetypes = []) {
      const rawTypes = Array.isArray(includetypes) ? includetypes : [includetypes];
      const mappedTypes = rawTypes.map((t) => typeMap[t] ?? t);

      // Filter for matching non-self cells
      const candidates = grid.filter(cell => cell.id !== id && mappedTypes.includes(cell.type));
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
    function furthest(grid, id, includetypes = []) {
      const rawTypes = Array.isArray(includetypes) ? includetypes : [includetypes];
      const mappedTypes = rawTypes.map((t) => typeMap[t] ?? t);

      // Filter for matching non-self cells
      const candidates = grid.filter(cell => cell.id !== id && mappedTypes.includes(cell.type));
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
        results = results.filter((m) => mappedTypes.includes(m.type));
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

    function corrupt(grid, target, source) {
      getInPlay(grid).filter(c => c.app=="💕LV");
    }

    const debuffStat = (emoji, stat="lc") => {
      let qual = []
      if (stat=="lf") {qual = ["🤥", "🦊"];}
      if (stat=="l") {qual = ["🤥"];}
      if (stat=="c") {qual = ["🤵🏻", "🍺", "🧪", "🐛", "🕹️", "🧟", "💕", "🛠️"];} 
      if (stat=="lcf") {qual = ["🤥", "🦊", "🤵🏻", "🍺", "🧪", "🐛", "🕹️", "🧟", "💕", "🛠️"];}
      if (stat=="lc") {qual = ["🤥", "🤵🏻", "🍺", "🧪", "🐛", "🕹️", "🧟", "💕", "🛠️"];}
      if (stat=="j") {qual = ["⚡","🤖","👽","✝️","💕"];}
      if (stat=="b") {qual = ['🚨','🔌','🦑','👾',"💕"]}
      return(qual.includes(emoji));
    }

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
            const into = getNotInPlay(grid, ["m"], ['🧬CL', '🃏JK',  '🐺MU', '🔔RC', '🧹WI'], 1);
            if (target) {
                convert(grid, target.id, into, "minion", "💰");
                converts.push(target.id);
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
            const into = getNotInPlay(grid, ["o"], ['💰BH', '❓SS'], 1);
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
            const into = getNotInPlay(grid, ["m"], ['🧬CL', '🃏JK',  '🐺MU', '🔔RC', '🧹WI'], 1);
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
    let notinplays = getNotInPlay(grid, ["v","o"]).filter(c => disguises.includes(c));
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
            member.app = getRands(nbM, ['👮🏻‍♂️BC'], 1);
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
          dis.app = getRands(nbM, [], 1);
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

    runphase(grid, ['💕LV', '🧸VD'], (member) => {
      if (member.app == "💕LV") {
        if (!debuffStat(member.corrupt, "lf")) {
          member.ramnote = getInPlay(grid, ["v"], [member.id], [], 1);
        } else {
          member.ramnote = getInPlay(grid, [], [member.id], [], 1);
        }
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
        const target = getAdjNeighbors(grid,member.id,"",["v"]).filter(c => c.corrupt=="✅")[0];
        if (target) {
          target.corrupt="🧪";
          member.note = "🧪#"+target.id;
        }
        else {
          member.note = "🧪⚠️";
        }
      }
      else if (member.char=='🐛PS') {
        const target = getAdjNeighbors(grid,member.id,"",["v"]).filter(c => c.corrupt=="✅")[0];
        if (target) {
          target.corrupt="🐛";
          member.note = "🐛#"+target.id;
          member.ramnote = target.id;
        }
        else {
          member.note = "🐛⚠️";
          if (member.app == "🐛PS") {
            member.announce = "🐛⚠️";
          }
        }
      }
      else if (member.char=='🕹️SB') {
        const target = furthest(grid, member.id, ["v"], true).filter(c => c.corrupt=="✅")[0];
        if (target) {
          target.corrupt="🕹️";
          member.note = "🕹️#"+target.id;
        }
        else {
          member.note = "🕹️⚠️";
        }

      }
      else if (member.char=='🧟ZB') {
        const target = getAdjNeighbors(grid,member.id,"",["o"]).filter(c => c.corrupt=="✅")[0];
        if (target) {
          target.corrupt="🧟";
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
        if (member.corrupt=="✅") {
          x = getInPlay(grid,["v"],[member.id],[]).filter(c => c.corrupt=="✅")[0];
          if (x) {
            x.corrupt = '🤵🏻';
            member.note="🤵🏻#"+x.id;
            const ids = [x, getInPlay(grid,[],[member.id, x.id],[],1)].sort((a, b) => a.id - b.id);
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
          member.announce="🤵🏻#"+ids[0].id+"/#"+ids[1].id;
        }
      }
      else if (member.char=='🍺DK') {
        member.corrupt = "🍺";
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
            ns.forEach(member2 => {
              if (member2.id != member.id) {member2.corrupt="😇";}
            });
            member.announce="😇↕️";
          }
          else {
            ew.forEach(member2 => {
              if (member2.id != member.id) {member2.corrupt="😇";}
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
              member2.corrupt="💖";
            }
          }
        });
        if (debuffStat(member.corrupt,"lcf")) {
          if (n==0) {n=1;}
          else if (n==4) {n=3;}
          else if (Math.random()<0.5) {n+=1}
          else {n-=1}
        }
        member.announce="💖"+n;
      }
    })

    //jammed 1
    runphase(grid, ['⚡JM', '🤖AI', '👽HK', '✝️PR'], (member)=> {
      if (member.app == "⚡JM") {
        const dir = Math.random()>0.5 ? "ns" : "ew";
        getAdjNeighbors(grid,member.id,dir).forEach((neigh) => {
            if (debuffStat(member.corrupt,"lcf")) {
              if (debuffStat(neigh.corrupt,"lc")) {
                neigh.jammed = '⚡';
              }
            }
            else {
              if (!debuffStat(neigh.corrupt,"lc")) {
                neigh.jammed = '⚡';
              }
            }
        })
        member.note = dir=="ns" ? "⚡↕️" : "⚡↔️";
      }
      else if (member.char == "🤖AI") {
        member.jammed = "🤖";
        let x;
        if (!debuffStat(member.corrupt,"lcf")) {
          x=getInPlay(grid,["v"],[member.id],[],1);
        }
        else {
          x=getInPlay(grid,["m"],[member.id],[],1);
        }
        x.jammed = "🤖";
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
            neigh.jammed="✝️";
        })
        member.note = "✝️"+cors.length;
      }
      else if (member.char == "👽HK") {
        const [x,y] = getInPlay(grid,[],[],[],2).sort((a, b) => a.id - b.id);
        x.jammed='👽';
        y.jammed='👽';
        member.note='👽#'+x.id+","+y.id;
      }
    })

    //jammed 2
    runphase(grid, ['🧸VD'], (member) => {
      if (member.app == "🧸VD") {
        if (!debuffStat(member.corrupt,"lf")) {
          if (debuffStat(member.jammed,"j")) {
            grid.filter(c => c.id == member.ramnote[0])[0].jammed = member.jammed;
            member.ramnote[1]+=1;
          }
        }
        else {
          if (debuffStat(member.jammed,"j")) {
            member.ramnote[1]+=1;
          }
        }
      }
    })

    //jammed 3
    runphase(grid, ['💕LV'], (member) => {
      if (member.app == "💕LV") {
        if (!debuffStat(member.corrupt, "lf")) {
          if (debuffStat(member.jammed,"j") && !debuffStat(member.ramnote.jammed,"j")) {
            member.ramnote.jammed = "💕";
          }
          else if (!debuffStat(member.jammed,"j") && debuffStat(member.ramnote.jammed,"j")) {
            member.jammed = "💕";
          }
        }
      }
    })

    //jammed remove1
    runphase(grid, ['🧸VD'], (member)=> {
      if (member.app == "🧸VD" && debuffStat(member.jammed,"j")) {
        member.jammed = '🧸';
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
          neigh.jammed = '🛠️';
          if (debuffStat(member.corrupt,"lcf")) {
            neigh.corrupt='🛠️';
          }
        })
      }
    })

    //blur
    runphase(grid, ['🚨AL', '🔌ET', '🦑SQ', '👾VR'], (member)=> {
      if (member.app == "🚨AL") {
        const b0=!debuffStat(member.corrupt,"lcf"); // not lying nor corrupted
        const b1=getAdjNeighbors(grid,member.id).filter(c => c.type=="minion").length > 0; //at least 1 minion
        if (b0 == b1) {
          member.blurred = "🚨";
        }
      }
      else if (member.app == "🔌ET") {
        let g = []
        if (!debuffStat(member.corrupt,"lcf")) {
          g = getInPlay(grid).filter(c => debuffStat(c.jammed,"j"))
        }
        else {
          g = getInPlay(grid).filter(c => !debuffStat(c.jammed,"j"))
        }
        if (g.length==0) {member.announce = "🔌⚠️"}
        else {
          g[0].blurred = "🔌";
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
          g[0].blurred = "🦑";
          member.announce="🦑#"+g[0].id;
        }
      }
      else if (member.char == "👾VR") {
        const x = getInPlay(grid,["v"])[0]
        x.blurred = "👾";
        member.note = "👾#"+x.id;
      }
    })

    //blur 2
    runphase(grid, ['🧸VD'], (member) => {
      if (member.app == "🧸VD") {
        if (!debuffStat(member.corrupt,"lf")) {
          if (debuffStat(member.blurred,"b")) {
            grid.filter(c => c.id == member.ramnote[0])[0].blurred = member.blurred;
            member.ramnote[1]+=1;
          }
        }
        else {
          if (debuffStat(member.blurred,"b")) {
            member.ramnote[1]+=1;
          }
        }
      }
    })

    //blur 3
    runphase(grid, ['💕LV'], (member) => {
      if (member.app == "💕LV") {
        if (!debuffStat(member.corrupt, "lf")) {
          if (debuffStat(member.blurred,"b") && !debuffStat(member.ramnote.blurred,"b")) {
            member.ramnote.blurred = "💕";
          }
          else if (!debuffStat(member.blurred,"b") && debuffStat(member.ramnote.blurred,"b")) {
            member.blurred = "💕";
          }
        }
      }
    })

    //blur remove1
    runphase(grid, ['🧸VD'], (member)=> {
      if (member.app == "🧸VD" && debuffStat(member.blurred,"b")) {
        member.blurred = '🧸';
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
          neigh.blurred = '🛠️';
          if (debuffStat(member.corrupt,"lcf")) {
            neigh.corrupt='🛠️';
          }
        })
        member.announce = "🛠️"+member.ramnote.length;
      }
    })

    //register
    runphase(grid, ['🧸VD'], (member)=> {
      if (member.app == "🧸VD" && debuffStat(member.blurred,"b")) {
        member.blurred = '🧸';
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
             const isTar = gameMode === 'Default' && hSource?.revealed !== -1 && hSource?.highlight?.includes(cell.id);
             const bCls = isSel || isTar ? 'b-lime' : (hoveredIdx === index ? 'b-yellow' : '');
             return (
               <div key={index} className={`cell ${getCellStateClass(cell, gameMode)} cell-${cell.type} ${cell.type !== 'empty' ? 'is-clickable' : ''} ${bCls} ${animatingIndices.has(index) ? `anim-${animType}` : ''}`}
                 onClick={() => handleCellClick(index)} onMouseEnter={() => cell.type !== 'empty' && setHoveredIdx(index)} onMouseLeave={() => setHoveredIdx(null)}>
                 <div className="cell-inner">
                   {cell.type !== 'empty' && <div className={`id-triangle ${cell.killed !== -1 ? 'id-triangle-dead' : ''}`}><span className={abilityUserIdx === index ? 'id-number-y-txt' : 'id-number'}>{cell.id}</span></div>}
                   {cell.type === 'empty' ? <span className="text-xl"></span> : (cell.revealed === -1 && cell.killed === -1 && gameMode!=="Ended") ? <span className="text-xl">?</span> : (
                     <><span className="text-xs-cellstat" style={{"fontSize": (gridlength == 6 ? "0.45" : "0.55")+"rem"}}>{cell.convert}{cell.corrupt}{cell.jammed}{cell.blurred}{cell.reg===cell.char ? '✅' : cell.reg.slice(0, -2)}</span>
                     <div className="c-info">
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}></span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.char!==cell.app ? cell.char+" ("+cell.app+")" : cell.char}</span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.announce}</span>
                      <span className="text-xs" style={{"fontSize": (gridlength == 6 ? "0.5" : "0.65")+"rem"}}>{cell.revealed !== -1 ? `🗝️${cell.revealed}` : ""}{cell.used > 0 ? `💡${cell.used}` : ""}{cell.killed !== -1 ? `🔪${cell.killed}` : ""}</span>
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