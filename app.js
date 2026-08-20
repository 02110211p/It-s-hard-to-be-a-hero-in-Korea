const $ = (s) => document.querySelector(s);

document.title = SITE_CONFIG.title;
$("#title").textContent = SITE_CONFIG.title;
$("#footer-text").textContent = SITE_CONFIG.footer;

const preferenceState = {};
const pairingState = {};

function makeKey(a, b) { return `${a}|||${b}`; }

function makeLegend(target, items) {
  target.innerHTML = items.map(x =>
    `<span class="legend-item">${x.symbol} ${x.name}</span>`
  ).join("");
}
makeLegend($("#preference-legend"), PREFERENCES);
makeLegend($("#pairing-legend"), PAIRING_PREFERENCES);

function preferenceTable() {
  const table = document.createElement("table");
  table.innerHTML = `<thead><tr><th class="corner">이름</th>${
    CHARACTERS.map(c => `<th>${c}</th>`).join("")
  }</tr></thead>`;
  const tbody = document.createElement("tbody");

  CHARACTERS.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th class="row-head">${row}</th>`;
    CHARACTERS.forEach(col => {
      const td = document.createElement("td");
      td.className = "pref-cell";
      const key = makeKey(row, col);
      const value = preferenceState[key] ?? -1;
      const p = value >= 0 ? PREFERENCES[value] : null;
      td.innerHTML = p
        ? `<div class="symbol">${p.symbol}</div><div class="label">${p.name}</div>`
        : `<div class="symbol">＋</div><div class="label">선택</div>`;
      if (p) td.classList.add(p.className);
      td.addEventListener("click", () => {
        preferenceState[key] = (value + 1) % (PREFERENCES.length + 1);
        if (preferenceState[key] === PREFERENCES.length) delete preferenceState[key];
        renderPreference();
      });
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

function renderPreference() {
  $("#preference-board").replaceChildren(preferenceTable());
}

function pairingTable() {
  const table = document.createElement("table");
  table.innerHTML = `<thead><tr><th class="corner">공 ＼ 수</th>${
    CHARACTERS.map(c => `<th>${c}</th>`).join("")
  }</tr></thead>`;
  const tbody = document.createElement("tbody");

  CHARACTERS.forEach(top => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th class="row-head">${top}</th>`;
    CHARACTERS.forEach(bottom => {
      const td = document.createElement("td");
      const key = makeKey(top, bottom);
      td.className = "pair-cell";
      if (top === bottom) {
        td.classList.add("self");
        td.textContent = "자공자수";
        tr.appendChild(td);
        return;
      }
      const value = pairingState[key] ?? -1;
      const p = value >= 0 ? PAIRING_PREFERENCES[value] : null;
      td.classList.toggle("empty", !p);
      td.innerHTML = p
        ? `${p.symbol}<br><small>${p.name}</small>`
        : "＋";
      if (p) td.classList.add(p.className);
      td.addEventListener("click", () => {
        pairingState[key] = (value + 1) % (PAIRING_PREFERENCES.length + 1);
        if (pairingState[key] === PAIRING_PREFERENCES.length) delete pairingState[key];
        renderPairing();
      });
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

function renderPairing() {
  $("#pairing-board").replaceChildren(pairingTable());
}

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".view").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    $(`#${btn.dataset.view}-view`).classList.add("active");
  });
});

$("#reset-preference").addEventListener("click", () => {
  if (confirm("취향표를 전부 초기화할까요?")) {
    Object.keys(preferenceState).forEach(k => delete preferenceState[k]);
    renderPreference();
  }
});
$("#reset-pairing").addEventListener("click", () => {
  if (confirm("공수표를 전부 초기화할까요?")) {
    Object.keys(pairingState).forEach(k => delete pairingState[k]);
    renderPairing();
  }
});

async function saveBoard(boardId, filename) {
  // 외부 라이브러리 없이 현재 표를 PNG로 저장하려면 html2canvas가 필요합니다.
  // 인터넷 연결이 가능한 환경에서만 아래 CDN을 동적으로 불러옵니다.
  if (!window.html2canvas) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    document.head.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }
  const canvas = await html2canvas($(boardId), {backgroundColor: "#ffffff", scale: 2});
  const a = document.createElement("a");
  a.download = filename;
  a.href = canvas.toDataURL("image/png");
  a.click();
}
$("#save-preference").addEventListener("click", () =>
  saveBoard("#preference-board", "합주-실패-기록-취향표.png")
);
$("#save-pairing").addEventListener("click", () =>
  saveBoard("#pairing-board", "합주-실패-기록-공수표.png")
);

renderPreference();
renderPairing();
