const $ = (s) => document.querySelector(s);
document.title = SITE_CONFIG.title;
$("#title").textContent = SITE_CONFIG.title;
$("#footer-text").textContent = SITE_CONFIG.footer;
const preferenceState = {}, pairingState = {};
const makeKey = (a,b) => `${a}|||${b}`;
function makeLegend(target, items){ target.innerHTML=items.map(x=>`<span class="legend-item">${x.symbol} ${x.name}</span>`).join(""); }
makeLegend($("#preference-legend"),PREFERENCES); makeLegend($("#pairing-legend"),PAIRING_PREFERENCES);
function showChoiceMenu(cell,items,current,onSelect){
 document.querySelectorAll('.choice-menu').forEach(m=>m.remove());
 const menu=document.createElement('div'); menu.className='choice-menu open';
 items.forEach((item,i)=>{const b=document.createElement('button'); b.className='choice-button'+(i===current?' selected':''); b.innerHTML=`${item.symbol} <span>${item.name}</span>`; b.onclick=e=>{e.stopPropagation();onSelect(i);menu.remove()}; menu.appendChild(b)});
 const clear=document.createElement('button'); clear.className='choice-button clear'; clear.textContent='＋ 선택 해제'; clear.onclick=e=>{e.stopPropagation();onSelect(-1);menu.remove()}; menu.appendChild(clear);
 cell.appendChild(menu);
 setTimeout(()=>document.addEventListener('click',function close(e){if(!menu.contains(e.target)&&e.target!==cell){menu.remove();document.removeEventListener('click',close)}},{once:true}),0);
}
function preferenceTable(){
 const table=document.createElement('table'); table.innerHTML=`<thead><tr><th class="corner">이름</th>${CHARACTERS.map(c=>`<th>${c}</th>`).join('')}</tr></thead>`; const tbody=document.createElement('tbody');
 CHARACTERS.forEach(row=>{const tr=document.createElement('tr'); tr.innerHTML=`<th class="row-head">${row}</th>`; CHARACTERS.forEach(col=>{const td=document.createElement('td'); td.className='pref-cell'; const key=makeKey(row,col), value=preferenceState[key]??-1, p=value>=0?PREFERENCES[value]:null; td.innerHTML=p?`<div class="symbol">${p.symbol}</div><div class="label">${p.name}</div>`:`<div class="symbol">＋</div><div class="label">선택</div>`; if(p)td.classList.add(p.className); td.onclick=e=>{e.stopPropagation();showChoiceMenu(td,PREFERENCES,value,s=>{if(s<0)delete preferenceState[key];else preferenceState[key]=s;renderPreference()})}; tr.appendChild(td)}); tbody.appendChild(tr)}); table.appendChild(tbody); return table;
}
function renderPreference(){$('#preference-board').replaceChildren(preferenceTable())}
function pairingTable(){
 const table=document.createElement('table'); table.innerHTML=`<thead><tr><th class="corner">공 ＼ 수</th>${CHARACTERS.map(c=>`<th>${c}</th>`).join('')}</tr></thead>`; const tbody=document.createElement('tbody');
 CHARACTERS.forEach(top=>{const tr=document.createElement('tr'); tr.innerHTML=`<th class="row-head">${top}</th>`; CHARACTERS.forEach(bottom=>{const td=document.createElement('td'); td.className='pair-cell'; const key=makeKey(top,bottom); if(top===bottom){td.classList.add('self');td.textContent='자공자수';tr.appendChild(td);return} const value=pairingState[key]??-1,p=value>=0?PAIRING_PREFERENCES[value]:null; td.classList.toggle('empty',!p); td.innerHTML=p?`${p.symbol}<br><small>${p.name}</small>`:'＋'; if(p)td.classList.add(p.className); td.onclick=e=>{e.stopPropagation();showChoiceMenu(td,PAIRING_PREFERENCES,value,s=>{if(s<0)delete pairingState[key];else pairingState[key]=s;renderPairing()})}; tr.appendChild(td)}); tbody.appendChild(tr)}); table.appendChild(tbody); return table;
}
function renderPairing(){$('#pairing-board').replaceChildren(pairingTable())}
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$(`#${btn.dataset.view}-view`).classList.add('active')});
$('#reset-preference').onclick=()=>{if(confirm('취향표를 전부 초기화할까요?')){Object.keys(preferenceState).forEach(k=>delete preferenceState[k]);renderPreference()}};
$('#reset-pairing').onclick=()=>{if(confirm('공수표를 전부 초기화할까요?')){Object.keys(pairingState).forEach(k=>delete pairingState[k]);renderPairing()}};
async function saveBoard(boardId,filename){if(!window.html2canvas){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';document.head.appendChild(s);await new Promise((r,j)=>{s.onload=r;s.onerror=j})}const canvas=await html2canvas($(boardId),{backgroundColor:'#fff',scale:2});const a=document.createElement('a');a.download=filename;a.href=canvas.toDataURL('image/png');a.click()}
$('#save-preference').onclick=()=>saveBoard('#preference-board','한히힘-취향표.png');
$('#save-pairing').onclick=()=>saveBoard('#pairing-board','한히힘-공수표.png');
renderPreference();renderPairing();
