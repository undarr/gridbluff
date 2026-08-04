import React, { useState, useEffect } from 'react';
import './App.css';

const villagerPool = 
['👁️AB', '😇AG', '📏AR', '🪕BA', '⚜️BI',
'🍞BK', '🍖CB', '🙏CF', '🗺️CG', '📸CM',
'🎭CP', '🎀CU', '💭DM', '📝DT', //'🩺DR', 
'🛠️EG', '🧠EL', '🔮FT', '🔨FX', '💎GC', '⚰️GK', 
'🐐GO', '🛡️GU', '💔HB', '💖HL', '🔍IN', 
'🤐IV', '🤹JE', '⚖️JG', '💍JS', '👑KI', 
'🗡️KN', '🧵KT', '🐑LB', '📌LC', '📚LI', 
'💼LW', '🖌️MA', '📬MM', '🧮MT', '☯️NJ', 
'📣PA', '🕊️PC', '🎤PF', '📡RD', //'💊NR', 
'🕯️RI', '🔭RG', '🐦RK', '🗿SE', //, '🥼SC'
'🎖️SH', '🏹SL', '📊ST', '📐SV', '🎓TE',
'☕TL', '☂️WM', '✏️WR', '🧙🏻WZ', '🎞️XR'];

const outcastPool = 
['🍷AC', '🤖AI', '🚨AL', '💰BH', '💣BM',
'🤵🏻BT', '🐱CC', '🍺DK', '😔DP', '🔊EC',
'🔌ET', '🔗FG', '🤢FP', '😣FR', '🎲GB',
'🎮GM', '🤝GT', '⚡JM', '🤡JX', '💕LV',
'🌙MC', '🎵NM', '😝PD', '✝️PR', '🤪PV',
'✨PX', '💉SG', '🍬SH', '🦑SQ', '❓SS',
'🦇VB', '👦🏻YS'];

const minionPool = 
['🧬CL', '🤬CR', '👥ET', '👗FD', '👻GH',
'🦴GR', '👽HK', '🔫HM', '🃏JK', '🎃MB', 
'🎩MG', '🐺MU', '🧪PN', '🐛PS', '🔔RC', 
'🕹️SB', '👤SD', '🪓SK', '🐍SN', '🧸VD',
'🧛🏻‍♀️VP', '👾VR', '🧹WI', '🧟ZB']

const disguises = villagerPool;

const disguiseMins = 
['🧬CL', '🗣️CR', '🔒CT', '👻GH', '🦴GR',
 '👽HK', '🔫HM', '🤡JK', '🧪PN', '🔔RC',
 '🐀RT', '👤SD', '🧛🏻‍♀️VP', '👾VR', '🧹WI'];

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
            <b>CorruptRemove: When neither lying nor corrupted,</b> if there are more corrupted members in its row than its column, remove corruption from all members in its row,
            if there are more corrupted members in its column than its row, remove corruption from all members in its column,
            if there are equal amount of corrupted members in its row and its column, remove corruption from all members in either its row or its column randomly.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> if it removed corruption from all members in its row, announce "😇↔️", if it removed corruption from all members in its column, announce "😇↕️".<br/>
            <b>When lying or corrupted,</b> if it removed corruption from any member, announce the opposite of that above, else announce one of the option above randomly.
            </>)
  }
  else if (p=="📏AR") {
    return (<>The <b>Architect (📏AR)</b> checks if there are more or less corruption in its row or column.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> if there are more corrupted members in its row than its column, announce "↔️{'>'}↕️", 
            if there are more corrupted members in its column than its row, announce "↔️{'<'}↕️", 
            if there are equal amount of corrupted members in its row and its column, announce "↔️=↕️".<br/>
            <b>When lying or corrupted,</b> announce one of the options different from that above.
            </>)
  }
  else if (p=="🪕BA") {
    return (<>The <b>Bard (🪕BA)</b> counts the number of corrupted members.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announces "🪕😵n", where n is the total number of corrupted members.<br/>
            <b>When lying or corrupted,</b> announce "🪕😵n", where n is 1 off the total number of corrupted members.
            </>)
  }
  else if (p=="⚜️BI") {
    return (<>The <b>Bishop (⚜️BI)</b> finds 3 members of different roles.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "⚜️#x,y,z", where x, y and z are the member ids 
            of a random villager, a random outcast and a random minion, in random order.<br/>
            <b>When lying or corrupted,</b> if possible, announces "⚜️#x,y,z", where x, y and z are the member ids 
            of a random villager, a random outcast and a different random non-minion, in random order.
            </>)
  }
  else if (p=="🍞BK") {
    return (<>The <b>Baker (🍞BK)</b> keep baking unrevealed villagers into itself.<br/><br/>
            A member who was not baked by any baker is defined as an original baker. Let the baker count of an original baker be 1, and the baker count of a non-original baker be 1 more than the baker count of the baker that baked it.<br/>
            <b>Ability:</b> When revealed,<br/>
            Announces "🍞n,p", where p is my original appearance and n is the baker count of the baker.<br/>
            <b>When neither lying nor corrupted,</b> if possible, a random unrevealed villager, will be baked and now disguise as a baker.<br/>
            <b>When lying or corrupted,</b> if possible, a random unrevealed non-villager who was disguising as a villager, will be baked and now disguise as a baker.<br/><br/>
            Note: An original baker can be baked by another baker.
            </>)
  }
  else if (p=="🙏CF") {
    return (<>The <b>Confesser (🙏CF)</b> confesses if it's a liar or not.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
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
    return (<>The <b>Dreamer (💭DM)</b> checks a member's character among 2 selected roles.<br/><br/>
            <b>Ability:</b> Select 2 members with member ids x,y,<br/>
            <b>When neither lying nor corrupted,</b> announces "💭#x,y=p", where p is a character of either x or y.<br/>
            <b>When lying or corrupted,</b> announces "💭#x,y=p", where if at least 1 of x or y is in disguise, p is the diguise of either x or y, else
            if possible, p is a character that can disguise, and is preferably in-play.
            </>)
  }
  /*
  else if (p=="🩺DR") {
    return (<>The <b>Doctor (🩺DR)</b> checks for the debuff of a random role.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x,<br/>
            <b>When neither lying nor corrupted,</b> announces "🩺#x,n", where n is the number of debuff x has.<br/>
            <b>When lying or corrupted,</b> announces "🩺#x,n", where n is between 0 and 2, and 1 off the number of debuffs x has.
            </>)
  }
  */
  else if (p=="📝DT") {
    return (<>The <b>Detective (📝DT)</b> finds an unrevealed liar at halftime.<br/><br/>
            <b>Ability:</b> When revealed, and after halftime, whichever latter,<br/>
            <b>When neither lying nor corrupted,</b> if there is at least 1 unrevealed member that is lying or corrupted, announces "📝#x",
            where x is the id of a random unrevealed member that is lying or corrupted, else, announce "📝👍"<br/>
            <b>When lying or corrupted,</b> if there is at least 1 unrevealed member that is neither lying nor corrupted, announces "📝#x",
            where x is the id of a random unrevealed member that is neither lying nor corrupted, else, announce "📝👍"
            </>)
  }
  else if (p=="🛠️EG") {
    return (<>The <b>Engineer (🛠️EG)</b> fixs nearby jamming and blurness.<br/><br/>
            <b>Initial Phase:</b><br/>
            Jamblur removal: Removes jamming and blurness from all adjacent members.<br/>
            <b>When lying or corrupted,</b> corrupts all adjacent non-minion members who has jamming and blurness removed by it.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            Announce "🛠️n", where n is the number of members who had their jamming or blur or both, removed by it.<br/>
            </>)
  }
  else if (p=="🧠EL") {
    return (<>The <b>Enlightened (🧠EL)</b> focuses to learn its own morality.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When not corrupted,</b> Announce "🧠:t", where t is "👍" if I am a villager, "👎" if I am a minion and "👍" or "👎" randomly if I am an outcast.<br/>
            <b>When corrupted,</b> Announce "🧠:t", where t is "👎" if I am a villager, "👍" if I am a minion and "👍" or "👎" randomly if I am an outcast.<br/>
            Note: lying does not affect my ability.
            </>)
  }
  else if (p=="😎EV") {
    return (<>The <b>Extrovert (😎EV)</b> finds friends of different types across the grid.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
            If possible, choses an information gaining villager character p, preferably not-in-play.<br/>
            <b>When neither lying nor corrupted,</b> announces whatever p would announce were it lying and corrupted.
            <b>When lying or corrupted,</b> announces whatever p would announce were it truthful and uncorrupted.
            </>) 
  }
  else if (p=="💖HL") {
    return (<>The <b>Healer (💖HL)</b> heals nearby corruptions.<br/><br/>
            <b>Initial Phase:</b><br/>
            CorruptRemove: <b>When neither lying nor corrupted,</b> removes corruption from adjacent neighbours.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            Let m be the number of members who had corruption removed by it.<br/>
            Let n be the number of adjacent members who had corruption.<br/>
            <b>When neither lying nor corrupted,</b> announces "💖m"
            <b>When lying or corrupted,</b> if m is non-zero, announces "💖k" where k is 1 off from m, else if n is non-zero, 
            announce "💖n", else announce "💖k" where k is either 1 or 2 randomly.
            </>) 
  }
  else if (p=="🔍IN") {
    return (<>The <b>Investigator (🔍IN)</b> finds a minion.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announces "🔍p#x,y", where x and y are the ids of a minion and a non-minion in random order and p is the character of the minion.<br/>
            <b>When lying or corrupted,</b> announces "🔍p#x,y", where x and y are the ids of 2 non-minions in random order and p is a in-play minion character.
            </>)
  }
  else if (p=="🤐IV") {
    return (<>The <b>Introvert (🤐IV)</b> befriends one of its neighbours.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
            <b>When neither lying nor corrupted,</b> announces "⚖️#x✅🤥" if the selected member is a liar 
            and announce "⚖️#x❌🤥" if the selected member is not a liar.<br/>
            <b>When lying or corrupted,</b> announces the opposite of that above.
            </>) 
  }
  else if (p=="💍JS") {
    return (<>The <b>Jewelsmith (💍JS)</b> finds a honest member.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announce "💍👍#x", where x is a random non-liar.
            <b>When lying or corrupted,</b> if possible, announce "💍👍#x", where x is a random liar.
            </>) 
  }
  else if (p=="👑KI") {
    return (<>The <b>King (👑KI)</b> is always good.<br/><br/>
            <b>Initial Phase:</b><br/>
            Disguise: Minions cannot disguise as the King.<br/>
            <b>When corrupted,</b> registers as a random in-play minion.
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
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announces "🧵n".<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
            </>)
  }
  else if (p=="🐑LB") {
    return (<>The <b>Lamb (🐑LB)</b> locates an outcast.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announces "🐑n", where n is the tile-distance between it and the nearest outcast.<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
            </>)
  }
  else if (p=="🧭LC") {
    return (<>The <b>Locator (🧭LC)</b> helps a member locate someone similar.<br/><br/>
            <b>Ability:</b> Select 1 member with member id x<br/>
            <b>When neither lying nor corrupted,</b> announces "🧭#x:n", where n is the tile-distance between it and y, where y the nearest member from x that has the same character type as x.<br/>
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
            <b>When neither lying nor corrupted,</b> announces "💼#x,y,z=🤥n", where n is the number of liars among x, y and z.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>)
  }
  else if (p=="🖌️MA") {
    return (<>The <b>Make-up artist (🖌️MA)</b> finds a disguise used by minions.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "🖌️:p", where p is the appearance of a disguising minion.<br/>
            <b>When lying or corrupted,</b> announce "🖌️:p", where p is the appearance of a good in-play member.
            </>) 
  }
  else if (p=="📬MM") {
    return (<>The <b>Mailman (📬MM)</b> finds people in town.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "📬:✅p❌q", where p is an in-play character and q is a not in-play character.<br/>
            <b>When lying or corrupted,</b> announce "📬:✅p❌q", where p is a not in-play character and q is an in-play character.
            </>) 
  }
  else if (p=="🧮MT") {
    return (<>The <b>Mathematician (🧮MT)</b> sums up the minions.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "🧮:n", where n is the sum of all minions member ids.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="☯️NJ") {
    return (<>The <b>Ninja (☯️NJ)</b> counts adjacent minions.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "☯️:n", where n is the number of adjacent minions.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
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
    return (<>The <b>Pacifist (🕊️PC)</b> protects its neighbours.<br/><br/>
            <b>Ability:</b> When any neighbour with member id x is killed for the first time,<br/>
            Member x keeps its original appearance. Announces "🕊️#x:p", where p is the source of x's death. Use up this ability.<br/>
            <b>When neither lying nor corrupted,</b> and x is not corrupted, x does not die.<br/>
            Note: A Pacifist's ability is activated even when not woken up.
            </>) 
  }
  else if (p=="🎤PF") {
    return (<>The <b>Performer (🎤PF)</b> gives a speech, but is trembled by evil.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            If possible, choses an information gaining villager character p, preferably not-in-play.<br/>
            <b>When neither lying nor corrupted and all its neighbours are non-minions,</b> announces whatever p would announce were it truthful and uncorrupted.
            <b>When lying or corrupted or at least one of its neighbours is a minion,</b> announces whatever p would announce were it lying and corrupted.
            </>) 
  }
  else if (p=="📡RD") {
    return (<>The <b>Radar (📡RD)</b> detects a disguised member.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announces "🔭n", where n is the tile-distance between it and the furthest.<br/>
            <b>When lying or corrupted,</b> announce a reasonable output different from that above.
            </>)
  }
  else if (p=="🐦RK") {
    return (<>The <b>Ravenkeeper (🐦RK)</b> finds a minion after death.<br/><br/>
            <b>Ability:</b> When dead,<br/>
            Keep my original appearance,
            <b>When neither lying nor corrupted,</b> announces "🐦#x", where x is the member id of an alive minion.<br/>
            <b>When lying or corrupted,</b> announces "🐦#x", where x is the member id of an alive non-minion.
            </>)
  }
  else if (p=="🗿SE") {
    return (<>The <b>Sentinel (🗿SE)</b> finds corrupted members.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> if possible, announces "🗿#x,y", where x and y are the ids of a corrupted member and a non-corrupted member in random order.<br/>
            <b>When lying or corrupted,</b> if possible, announces "🗿#x,y", where x and y are the ids of 2 non-corrupted members.
            </>) 
  }
  else if (p=="🎖️SH") {
    return (<>The <b>Sheriff (🎖️SH)</b> finds corrupted characters.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "📊:n", where n is the range of all minions member ids. (max id - min id)<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="📐SV") {
    return (<>The <b>Surveyor (📐SV)</b> measures the nearest minions in its range and column<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "📐:⬆️", "📐:⬇️", "📐:⬅️" and "📐:➡️" to indicate the direction of the nearest minion (tile-distance wise) in my row or column. 
            If the closest minions are of the same distance, announce "📐:🟰", if there are no minions in my row or column, announce "📐:⚠️".<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="🎓TE") {
    return (<>The <b>Teacher (🎓TE)</b> checks who is in the villager.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
            <b>When neither lying nor corrupted,</b> announce "🎓:pqr=n", where p, q and r are 3 characters and n is the number of in-play characters among p, q and r.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="☕TL") {
    return (<>The <b>Tea Lady (☕TL)</b> protects its neightbours if they are good.<br/><br/>
            Choose d as "↕️" or "↔️" randomly and announce "☕:d",<br/>
            <b>Ability:</b> When any neighbour with member id x in the corresponding direction of d is killed for the first time,<br/>
            <b>When neither lying nor corrupted,</b> announce "🎓:pqr=n", where p, q and r are 3 characters and n is the number of in-play characters among p, q and r.<br/>
            <b>When lying or corrupted,</b> announces a reasonable output different from that above.
            </>) 
  }
  else if (p=="☂️WM") {
    return (<>The <b>Weatherman (☂️WM)</b> forecasts which side of the village is more evil.<br/><br/>
            Choose ↕️ or ↔️ randomly,<br/>
            <b>Ability:</b> When revealed,<br/>
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
            <b>Ability:</b> When revealed,<br/>
            If possible, choses an information gaining villager character p, preferably not-in-play.<br/>
            <b>When neither lying nor corrupted,</b> announces whatever p would announce were it truthful and uncorrupted.
            <b>When lying or corrupted,</b> announces whatever p would announce were it lying and corrupted.
            </>)
  }
  else if (p=='🧙🏻WZ') {
    return (<>The <b>Wizard (🧙🏻WZ)</b> finds hidden members.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
  //Outcast
  else if (p=='🔗FG') {
    return (<>The <b>Fallguy (🔗FG)</b> is always seen as evil.<br/><br/>
            <b>Initial Phase:</b><br/>
            Register: <br/>
            <b>When neither lying nor corrupted,</b> register as a random minion, not-necessarily in-play. <br/>
            <b>When lying or corrupted,</b> register as a Fallguy (🔗FG).
            </>) 
  }
  else if (p=='🎲GB') {
    return (<>The <b>Gambler (🎲GB)</b> gambles on an unwoken minion.<br/><br/>
            <b>Ability:</b> When revealed,<br/>
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
  //Minion
  else if (p=='👗FD') {
    return (<>The <b>Fashion Designer (👗FD)</b> dresses up a nearby Outcast and Minion.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/>
            Disguise2: Choose two Villager characters p and q, preferably different and both preferably not to be chosen as a disguise,
            if possible, one of the nearest non-disguised Outcast now disguises as p and, 
            if possible, one of the nearest non-disguised Minions now disguises as q.<br/>
            </>) 
  }
  else if (p=='🎩MG') {
    return (<>The <b>Magician (🎩MG)</b> registers as its disguise.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie.<br/>
            Disguise: Performs general diguise.<br/>
            Register: <br/>
            <b>When lying,</b> registers as my appearance.
            </>) 
  }
  else if (p=='🧪PN') {
    return (<>The <b>Poisoner (🧪PN)</b> poisons an adjacent neighbour.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie, unless targetted by the Rat (🐀RT)<br/>
            Disguise: Performs general diguise.<br/>
            Corrupt: If possible, choose an adjacent villager will member id x, x gets corrupted.
            </>) 
  }
  else if (p=='🐛PS') {
    return (<>The <b>Parasite (🐛PS)</b> lives within an adjacent villager.<br/><br/>
            <b>Initial Phase:</b><br/>
            Lie: Makes myself lie, unless targetted by the Rat (🐀RT)<br/>
            Corrupt: If possible, choose an adjacent villager will member id x, x gets corrupted.

            <b>Execution:</b>
            If I am alive, when I am executed, the execution target is transferred to another random good member.
            If x exists and I am alive, when x is executed, the execution target is transferred to me, this cannot be affected by other execution transfers.
            </>) 
  }
  else if (p=='🐀RT') {
    return (<>The <b>Witch (🐀RT)</b> betrays an ally.<br/><br/>
            <b>Initial Phase:</b><br/>
            Convert: If possible, an adjacent villager converts into a truthful Vampire (🧛🏻‍♀️VP).
            Lie: Makes myself lie, an adjacent lying non-Magician (🎩MG) minion is selected and does not lie.<br/>
            Disguise: Performs general diguise.<br/>
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
            const jvs = shuffle(vills);
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
                     <><span className="text-xs-cellstat">{cell.convert}{cell.corrupt}{cell.reg===cell.char ? '✅' : cell.reg.slice(0, -2)}{cell.jammed}{cell.blurred}</span>
                     <div className="c-info">
                      <span className="text-xs"></span>
                      <span className="text-xs">{cell.char!==cell.app ? cell.char+" ("+cell.app+")" : cell.char}</span>
                      <span className="text-xs">{cell.announce}</span>
                      <span className="text-xs">{cell.revealed !== -1 ? `🗝️${cell.revealed}` : ""}{cell.used > 0 ? `💡${cell.used}` : ""}{cell.killed !== -1 ? `🔪${cell.killed}` : ""}</span>
                      <span className="text-xs">{cell.note}</span>
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