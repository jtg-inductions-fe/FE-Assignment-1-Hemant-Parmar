const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    nav.hidden = isOpen;

    if (!isOpen) {
        trapFocus();
    }
});

function trapFocus() {
    const focusable = nav.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])',
    );

    if (focusable.length === 0) return;

    const last = focusable[focusable.length - 1];
    const first = focusable[0];

    document.addEventListener('keydown', function loop(e) {
        if (menuBtn.getAttribute('aria-expanded') !== 'true') {
            document.removeEventListener('keydown', loop);
            return;
        }
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
            if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                menuBtn.focus(); // jump back to first cross button
            }
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.hidden = true;
    }
});

// To put the Login/Signup buttons in btnContainer for tablet view

const btnContainer = document.getElementById('tablet-btn-container');
const primaryBtn = document.querySelector('.header__nav__btn.btn-primary');
const secondaryBtn = document.querySelector('.header__nav__btn.btn-secondary');
const navList = document.querySelector('.header__nav__list');

// Validate required elements exist
if (!btnContainer || !primaryBtn || !secondaryBtn || !navList) {
    // eslint-disable-next-line no-console
    console.error('Required DOM elements for header functionality not found');
}

function moveNavBtn() {
    const width = window.innerWidth;

    // Tablet view
    if (width >= 1024 && width < 1440) {
        btnContainer.removeAttribute('hidden');

        if (!btnContainer.contains(secondaryBtn)) {
            btnContainer.appendChild(secondaryBtn);
        }
        if (!btnContainer.contains(primaryBtn)) {
            btnContainer.appendChild(primaryBtn);
        }
    }

    // Mobile or Desktop view
    else {
        btnContainer.setAttribute('hidden', '');
        if (!navList.contains(primaryBtn)) {
            navList.appendChild(primaryBtn);
        }
        if (!navList.contains(secondaryBtn)) {
            navList.appendChild(secondaryBtn);
        }
    }
}

window.addEventListener('resize', moveNavBtn);
window.addEventListener('DOMContentLoaded', moveNavBtn);
