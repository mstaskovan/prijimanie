/* Získanie a správa veľkosti písma z CSS premennej */
function getBaseFontSize() {
    const rootStyles = getComputedStyle(document.documentElement);
    const baseSize = rootStyles.getPropertyValue('--base-font-size').trim();
    return parseFloat(baseSize) || 18; // Ak premenná chýba, použije sa 18
}

// Inicializácia aktuálnej veľkosti podľa CSS
let currentFontSize = getBaseFontSize();

/* Zmena veľkosti písma (A+ / A-) */
function changeFontSize(delta) {
    currentFontSize += delta;
    if (currentFontSize < 12) currentFontSize = 12;
    if (currentFontSize > 36) currentFontSize = 36;
    
    // Nastavenie premennej priamo v :root pre dynamickú zmenu celej stránky
    document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
}

/* Reset na 100% (návrat k pôvodnej hodnote z CSS) */
function resetFontSize() {
    document.documentElement.style.removeProperty('--base-font-size');
    currentFontSize = getBaseFontSize();
}

/* Unifikovaná funkcia pre tlačidlo "✓ Skryť / Zobraziť pokyny / Použiť výber" */
function filterSelected() {
    // 1. Ak existujú rádiové bloky (hlavná stránka index.html)
    const blocks = document.querySelectorAll('.option-block');
    if (blocks.length > 0) {
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

    // 2. Prepínanie viditeľnosti celých rubrík/pokynov (podstránka odporucanie.html)
    document.body.classList.toggle('hide-rubriks');
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

/* Zavretie menu pri kliknutí mimo neho ALEBO pri kliknutí na akýkoľvek odkaz */
document.addEventListener('click', function(event) {
    const menu = document.getElementById('navMenu');
    const toggleBtn = document.querySelector('.menu-toggle');
    
    if (menu && menu.classList.contains('active')) {
        const isMenuClick = menu.contains(event.target);
        const isToggleClick = toggleBtn && toggleBtn.contains(event.target);
        const isLinkClick = event.target.tagName === 'A' || event.target.closest('a');

        if ((!isMenuClick && !isToggleClick) || isLinkClick) {
            menu.classList.remove('active');
        }
    }
});

/* Sledovanie skrolovania s otočenou logikou deadzóny */
let lastScrollTop = 0;
let scrollDistance = 0;
const SCROLL_DEADZONE = 40; // Počet pixelov pre prekročenie deadzóny (nastav podľa potreby)

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Ošetrenie pre iOS bounce efekt
    if (scrollTop < 0) scrollTop = 0;

    const headerWrapper = document.getElementById('headerControls');
    const controls = document.getElementById('controls');
    const menu = document.getElementById('navMenu');
    
    const targetElement = headerWrapper || controls;

    if (targetElement) {
        if (scrollTop > lastScrollTop) {
            // Smer 1: Okamžitá reakcia
            scrollDistance = 0;
            
            if (scrollTop > 50) {
                targetElement.classList.add('nav-hidden');
                targetElement.classList.add('controls-hidden');
                if (menu) menu.classList.remove('active');
            }
        } else {
            // Smer 2: Reakcia až po prekročení deadzóny
            scrollDistance += (lastScrollTop - scrollTop);

            if (scrollDistance >= SCROLL_DEADZONE || scrollTop <= 10) {
                targetElement.classList.remove('nav-hidden');
                targetElement.classList.remove('controls-hidden');
            }
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

/* Inicializácia po načítaní DOM */
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    // Aktualizácia premennej po načítaní DOM
    currentFontSize = getBaseFontSize();
});
