const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const navList = document.querySelector('.header__list');
const navBtns = document.querySelector('.header__btn-container');

// Early exit if required elements are missing
if (!menuBtn || !nav || !navList || !navBtns) {
    // eslint-disable-next-line no-console
    console.warn('Required navigation elements not found');
}

const focusable = nav.querySelectorAll(
    'a, button, [tabindex]:not([tabindex="-1"])',
);

const trapFocus = (e) => {
    if (focusable.length === 0) return;

    const last = focusable[focusable.length - 1];
    const first = focusable[0];

    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            menuBtn.focus(); // jump back to the cross button
        }
    }
};

const openMenu = () => {
    nav.classList.add('header__nav--open');
    navList.classList.remove('header__list--hidden');
    navBtns.classList.remove('header__btn-container--hidden');
    document.addEventListener('keydown', trapFocus);
    document.querySelector('main').setAttribute('inert', '');
};

const closeMenu = () => {
    document.removeEventListener('keydown', trapFocus);
    navList.classList.add('header__list--hidden');
    navBtns.classList.add('header__btn-container--hidden');
    nav.classList.remove('header__nav--open');
    document.querySelector('main').removeAttribute('inert');
};

menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    if (!isOpen) {
        openMenu();
    } else {
        closeMenu();
    }

    menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('keydown', (e) => {
    if (
        e.key === 'Escape' &&
        menuBtn.getAttribute('aria-expanded') === 'true'
    ) {
        closeMenu();
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

closeMenu();
