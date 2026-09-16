let currentSize = 18;

/* Zmena veľkosti písma */
function changeFontSize(delta) {
    currentSize += delta;
    if (currentSize < 12) currentSize = 12;
    if (currentSize > 36) currentSize = 36;
    
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
        // Zavrieť ak sa klikne mimo menu a tlačidla, ALEBO ak sa klikne na odkaz v menu/submenu
        const isMenuClick = menu.contains(event.target);
        const isToggleClick = toggleBtn && toggleBtn.contains(event.target);
        const isLinkClick = event.target.tagName === 'A' || event.target.closest('a');

        if ((!isMenuClick && !isToggleClick) || isLinkClick) {
            menu.classList.remove('active');
        }
    }
});

/* Sledovanie skrolovania (skrytie/zobrazenie lišty + cross-platform iOS scroll fix) */
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Podpora pre nový obal headerControls aj starý controls
    const headerWrapper = document.getElementById('headerControls');
    const controls = document.getElementById('controls');
    const menu = document.getElementById('navMenu');
    
    const targetElement = headerWrapper || controls;

    if (targetElement) {
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Skrolovanie nadol -> skryť lištu aj otvorenú ponuku
            targetElement.classList.add('nav-hidden');
            targetElement.classList.add('controls-hidden');
            if (menu) menu.classList.remove('active');
        } else {
            // Skrolovanie nahor -> zobraziť lištu
            targetElement.classList.remove('nav-hidden');
            targetElement.classList.remove('controls-hidden');
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

/* Inicializácia po načítaní DOM */
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});
