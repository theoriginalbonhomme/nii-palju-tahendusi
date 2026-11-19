"use strict";
// Nii palju tähendusi! – base version game logic.
// WORDS comes from data/words.js: [{w: "word", m: ["meaning 1", "meaning 2"]}, ...]

const ROUND = 10;
let state = {mode:"w2m", i:0, score:0, streak:0, best:0, deck:[], answered:false};

const $ = id => document.getElementById(id);
$("total").textContent = WORDS.length;

function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const meaningText = w => w.m.join(" · ");
const plural = n => n===1 ? "1 tähendus" : n+" tähendust";

function newDeck(){
  state.deck = shuffle(WORDS.map((_,k)=>k)).slice(0,ROUND);
  state.i=0; state.score=0; state.streak=0; state.answered=false;
}

function distractors(idx){
  const target = WORDS[idx];
  const same = shuffle(WORDS.map((_,k)=>k).filter(k=>k!==idx && WORDS[k].m.length===target.m.length && WORDS[k].w.toLowerCase()!==target.w.toLowerCase()));
  const pool = same.length>=3 ? same : shuffle(WORDS.map((_,k)=>k).filter(k=>k!==idx));
  return pool.slice(0,3);
}

function render(){
  const idx = state.deck[state.i], w = WORDS[idx];
  $("qn").textContent = state.i+1; $("qt").textContent = ROUND;
  $("sc").textContent = state.score; $("st").textContent = state.streak;
  $("fb").textContent = ""; $("fb").className="feedback"; $("next").hidden = true;
  const card = $("card"); card.classList.remove("flip"); void card.offsetWidth; card.classList.add("flip");
  const options = shuffle([idx, ...distractors(idx)]);
  const opts = $("opts"); opts.innerHTML = "";
  if(state.mode==="w2m"){
    $("prompt").textContent = "Mis on selle sõna tähendused?";
    $("face").innerHTML = `<div class="word"></div><div style="display:flex;justify-content:center"><span class="count"></span></div>`;
    $("face").querySelector(".word").textContent = w.w;
    $("face").querySelector(".count").textContent = plural(w.m.length);
    options.forEach((k,n)=>opts.appendChild(optButton(n, meaningText(WORDS[k]), k===idx, false)));
  } else {
    $("prompt").textContent = "Mis sõnal on need tähendused?";
    const ol = document.createElement("ol"); ol.className="meanings";
    w.m.forEach((m,n)=>{const li=document.createElement("li"); li.innerHTML=`<span class="n">${n+1})</span><span></span>`; li.lastChild.textContent=m; ol.appendChild(li);});
    $("face").innerHTML=""; $("face").appendChild(ol);
    options.forEach((k,n)=>opts.appendChild(optButton(n, WORDS[k].w, k===idx, true)));
  }
  $("ctl").textContent = $("cbr").textContent = String(state.i+1).padStart(2,"0");
}

function optButton(n, text, correct, big){
  const b = document.createElement("button");
  b.className = "opt"+(big?" big":""); b.id = "opt-"+n;
  b.innerHTML = `<span class="k">${n+1}</span><span></span>`; b.lastChild.textContent = text;
  b.dataset.correct = correct ? "1" : "0";
  b.addEventListener("click", ()=>answer(b));
  return b;
}

function answer(b){
  if(state.answered) return; state.answered = true;
  const right = b.dataset.correct==="1";
  document.querySelectorAll(".opt").forEach(o=>{o.disabled=true; if(o.dataset.correct==="1") o.classList.add("right");});
  const w = WORDS[state.deck[state.i]];
  if(right){ state.score++; state.streak++; state.best=Math.max(state.best,state.streak);
    $("fb").textContent = state.streak>=3 ? `Õige! ${state.streak} järjest.` : "Õige!"; $("fb").className="feedback good";
  } else { b.classList.add("wrong"); state.streak=0;
    $("fb").textContent = `Õige vastus: ${w.w} – ${w.m.map((m,n)=>(n+1)+") "+m).join(" ")}`; $("fb").className="feedback bad"; }
  $("sc").textContent = state.score; $("st").textContent = state.streak;
  $("next").textContent = state.i+1<ROUND ? "Järgmine" : "Vaata tulemust";
  $("next").hidden = false; $("next").focus();
}

function next(){
  if(state.i+1>=ROUND){ showEnd(); return; }
  state.i++; state.answered=false; render();
}

function showEnd(){
  $("game").hidden = true; $("end").hidden = false;
  $("final").textContent = `${state.score}/${ROUND}`;
  const s = state.score;
  $("verdict").textContent = s===ROUND ? "Täiuslik! Sõnameister." : s>=7 ? "Väga hea. Veel üks voor?" : s>=4 ? "Hea algus. Harjuta edasi." : "Iga sõna on mitu sõna. Proovi uuesti!";
  $("again").focus();
}

function setMode(mode){
  state.mode = mode;
  ["w2m","m2w","list"].forEach(m=>$("tab-"+m).setAttribute("aria-selected", m===mode ? "true":"false"));
  $("browse").hidden = mode!=="list";
  $("end").hidden = true;
  $("game").hidden = mode==="list";
  if(mode==="list"){ renderList(); }
  else { newDeck(); render(); }
  try{ localStorage.setItem("npt-mode", mode); }catch(e){}
}

function renderList(){
  const q = $("q").value.trim().toLowerCase();
  const hits = WORDS.filter(w => !q || w.w.toLowerCase().includes(q) || w.m.some(m=>m.toLowerCase().includes(q)));
  const list = $("list"); list.innerHTML = "";
  if(!hits.length){ list.innerHTML = `<div class="empty">Ei leidnud. Proovi teist sõna.</div>`; return; }
  hits.slice(0,300).forEach(w=>{
    const d=document.createElement("div"); d.className="item";
    d.innerHTML = `<div class="w"></div><div class="m"></div>`;
    d.firstChild.textContent = w.w;
    d.lastChild.innerHTML = w.m.map((m,n)=>`<b>${n+1})</b> ${m.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}`).join("&nbsp;&nbsp;");
    list.appendChild(d);
  });
  if(hits.length>300){ const d=document.createElement("div"); d.className="empty"; d.textContent=`Näitan 300 / ${hits.length}. Täpsusta otsingut.`; list.appendChild(d); }
}

$("tab-w2m").onclick = ()=>setMode("w2m");
$("tab-m2w").onclick = ()=>setMode("m2w");
$("tab-list").onclick = ()=>setMode("list");
$("next").onclick = next;
$("again").onclick = ()=>{ $("end").hidden=true; $("game").hidden=false; newDeck(); render(); };
$("switch").onclick = ()=>setMode(state.mode==="w2m" ? "m2w" : "w2m");
$("q").addEventListener("input", renderList);
document.addEventListener("keydown", e=>{
  if($("game").hidden || e.target.tagName==="INPUT") return;
  if(/^[1-4]$/.test(e.key)){ const b=$("opt-"+(+e.key-1)); if(b && !b.disabled) b.click(); }
  else if(e.key==="Enter" && !$("next").hidden){ e.preventDefault(); next(); }
});

// Start in the mode the player used last time.
(function start(){
  let mode = "w2m";
  try{ mode = localStorage.getItem("npt-mode") || "w2m"; }catch(e){}
  setMode(mode);
})();
