const APPS = [
    { id: 'visa', name: 'VISA', img: 'visa.png', url: 'https://johncris226655-ai.github.io/Gane/' },
    { id: 'game', name: 'GAME', img: 'game.png', url: 'internal' },
    { id: 'cards', name: 'The Cards', img: 'cards.png', url: 'https://johncris226655-ai.github.io/Operation-BlackJackver7/' },
    { id: 'mm', name: 'Murder Mystery', img: 'mm.png', url: 'https://johncris226655-ai.github.io/Operation-BlackJackver3/' }
];

window.onload = () => {
    // Fill Time Wheels
    const hw = document.getElementById('h-wheel');
    const mw = document.getElementById('m-wheel');
    for(let i=1; i<=12; i++) hw.innerHTML += `<option>${i}</option>`;
    for(let i=0; i<60; i++) mw.innerHTML += `<option>${i < 10 ? '0'+i : i}</option>`;

    const grid = document.getElementById('main-grid');
    const list = document.getElementById('app-ctrl-list');
    
    APPS.forEach(app => {
        grid.innerHTML += `
            <div class="app-icon" id="icon-${app.id}" onclick="openApp('${app.id}')">
                <div class="icon-box"><img src="${app.img}"></div>
                <span class="label">${app.name}</span>
            </div>
        `;
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <span>${app.name}</span>
                <div style="display:flex; gap:8px;">
                    <button onclick="setAnim('${app.id}', 'show')" style="color:lime; background:none; border:1px solid lime; padding:4px 8px; border-radius:5px;">SHOW</button>
                    <button onclick="setAnim('${app.id}', 'hide')" style="color:red; background:none; border:1px solid red; padding:4px 8px; border-radius:5px;">HIDE</button>
                    <input type="number" id="del-${app.id}" value="2" style="width:35px; background:#333; color:#fff; border:none; text-align:center;">
                </div>
            </div>
        `;
    });
};

function openTimeModal() { document.getElementById('modal-backdrop').style.display='block'; document.getElementById('time-modal').classList.add('active'); }
function openManagerModal() { document.getElementById('modal-backdrop').style.display='block'; document.getElementById('manager-modal').classList.add('active'); }
function closeModals() { document.querySelectorAll('.bottom-modal').forEach(m => m.classList.remove('active')); document.getElementById('modal-backdrop').style.display='none'; }

function applySystem() {
    const h = document.getElementById('h-wheel').value;
    const m = document.getElementById('m-wheel').value;
    const p = document.getElementById('p-wheel').value;
    const b = document.getElementById('batt-range').value;

    document.getElementById('display-time').innerText = `${h}:${m} ${p}`;
    document.getElementById('display-batt').innerText = b + '%';
    document.getElementById('batt-level').style.width = b + '%';
    document.getElementById('batt-level').style.background = b < 20 ? 'red' : '#34c759';
    closeModals();
}

function setAnim(id, act) {
    const delay = document.getElementById(`del-${id}`).value * 1000;
    const el = document.getElementById(`icon-${id}`);
    setTimeout(() => {
        if(act === 'show') { el.style.display = 'flex'; setTimeout(() => el.classList.add('show'), 50); }
        else { el.classList.remove('show'); setTimeout(() => el.style.display = 'none', 800); }
    }, delay);
}

function openApp(id) {
    const app = APPS.find(a => a.id === id);
    const win = document.getElementById('app-window');
    const iframe = document.getElementById('app-frame');
    const internal = document.getElementById('game-internal');
    win.style.display = 'block';
    if(app.url !== 'internal') { iframe.style.display = 'block'; internal.style.display = 'none'; iframe.src = app.url; }
    else { iframe.style.display = 'none'; internal.style.display = 'flex'; }
}

function closeApp() { document.getElementById('app-window').style.display = 'none'; document.getElementById('app-frame').src = ''; }

function startInternalGame() {
    if(document.getElementById('p-code').value.length === 5) {
        alert("AUTHORIZATION GRANTED"); // Pwede mong palitan ng actual timer animation
    }
}
