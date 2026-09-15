let currentSize = 18;

/* Zmena veľkosti písma */
function changeFontSize(delta) {
    currentSize += delta;
    if (currentSize < 12) currentSize = 12;
    if (currentSize > 36) currentSize = 36;
    
    // Ak 'content' neexistuje, zmení písmo v '.container'
    const target = document.getElementById('content') || document.querySelector('.container');
    if (target) {
        target.style.fontSize = currentSize + 'px';
    }
}

function resetFontSize() {
    currentSize = 18;
    const target = document.getElementById('content') || document.querySelector('.container');
    if (target) {
        target.style.fontSize = currentSize + 'px';
    }
}

/* Automatická detekcia a správa motívu (iOS/Android kompatibilné) */
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
        if (themeBtn) themeBtn.innerHTML = '☀️ Svetlý motív';
    } else {
        body.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '🌙 Tmavý motív';
    }
}

/* Ovládanie sendvičového menu */
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

/* Zavretie menu pri kliknutí mimo neho ALEBO pri kliknutí na odkaz */
document.addEventListener('click', function(event) {
    const menu = document.getElementById('navMenu');
    const toggleBtn = document.querySelector('.menu-toggle');
    
    if (menu && menu.classList.contains('active')) {
        // Ak klikneš mimo menu a tlačidla, alebo priamo na odkaz <a> v menu
        if ((!menu.contains(event.target) && !toggleBtn.contains(event.target)) || event.target.tagName === 'A') {
            menu.classList.remove('active');
        }
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

/* Sledovanie skrolovania (skrytie/zobrazenie lišty + cross-platform iOS scroll fix) */
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    // Cross-platform podpora pre iOS Safari aj Android Chrome
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    const controls = document.getElementById('controls');
    const menu = document.getElementById('navMenu');
    
    if (controls) {
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Skrolovanie nadol -> skryť lištu aj menu
            controls.classList.add('controls-hidden');
            if (menu) menu.classList.remove('active');
        } else {
            // Skrolovanie nahor -> zobraziť lištu
            controls.classList.remove('controls-hidden');
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

/* Inicializácia po načítaní DOM */
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});
