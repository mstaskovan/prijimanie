let currentSize = 18;

function changeFontSize(delta) {
    currentSize += delta;
    if (currentSize < 12) currentSize = 12;
    if (currentSize > 36) currentSize = 36;
    document.getElementById('content').style.fontSize = currentSize + 'px';
}

function resetFontSize() {
    currentSize = 18;
    document.getElementById('content').style.fontSize = currentSize + 'px';
}

/* Automatická detekcia a správa motívu */
function initTheme() {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const themeBtn = document.getElementById('themeBtn');

    if (prefersLight) {
        document.body.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '🌙 Tmavý motív';
    } else {
        document.body.removeAttribute('data-theme');
        if (themeBtn) themeBtn.innerHTML = '☀️ Svetlý motív';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');

    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeBtn.innerHTML = '☀️ Svetlý motív';
    } else {
        body.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '🌙 Tmavý motív';
    }
}

/* Ovládanie sendvičového menu */
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

/* Zavretie menu pri kliknutí mimo neho */
document.addEventListener('click', function(event) {
    const menu = document.getElementById('navMenu');
    const toggleBtn = document.querySelector('.menu-toggle');
    
    if (menu && toggleBtn && !menu.contains(event.target) && !toggleBtn.contains(event.target)) {
        menu.classList.remove('active');
    }
});

/* Filtrácia textov a skrytie číslovania rubrík / pokynov */
function filterSelected() {
    const blocks = document.querySelectorAll('.option-block');
    
    blocks.forEach(block => {
        const radio = block.querySelector('input[type="radio"]');
        const selectLabel = block.querySelector('.option-select');
        
        if (radio && radio.checked) {
            block.classList.remove('hidden');
            if (selectLabel) selectLabel.classList.add('hidden');
        } else {
            block.classList.add('hidden');
        }
    });

    const numRubriks = document.querySelectorAll('.num-rubrik');
    numRubriks.forEach(rubrik => rubrik.classList.add('hidden'));
}

/* Sledovanie skrolovania na skrytie/zobrazenie menu */
let lastScrollTop = 0;
const controls = document.getElementById('controls');

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        controls.classList.add('controls-hidden');
        const menu = document.getElementById('navMenu');
        if (menu) menu.classList.remove('active');
    } else {
        controls.classList.remove('controls-hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Inicializácia po načítaní
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});
