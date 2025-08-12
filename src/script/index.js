const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const navList = document.querySelector('.header__list');
const navBtns = document.querySelector('.header__btn-container');
const largeMediaQuery = window.matchMedia('(min-width: 1440px)'); // To check whether the device has large width (desktop-view)
const mediumMediaQuery = window.matchMedia('(min-width: 1024px)'); // To check whether the device has medium width (tablet-view)

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

// To make nav elements inert according to the screen sizes
const addResponsiveInert = () => {
    if (largeMediaQuery.matches) return;
    else if (mediumMediaQuery.matches) navList.inert = true;
    else nav.inert = true;
};

// To remove inert from nav elements
const removeInert = () => {
    navList.inert = false;
    nav.inert = false;
};

const openMenu = () => {
    menuBtn.setAttribute('aria-expanded', 'true');
    nav.classList.add('header__nav--open');
    navList.classList.remove('header__list--hidden');
    navBtns.classList.remove('header__btn-container--hidden');
    document.addEventListener('keydown', trapFocus);
    document.querySelector('main').inert = true;
    removeInert();
};

const closeMenu = () => {
    addResponsiveInert();
    document.querySelector('main').inert = false;
    document.removeEventListener('keydown', trapFocus);
    navBtns.classList.add('header__btn-container--hidden');
    navList.classList.add('header__list--hidden');
    nav.classList.remove('header__nav--open');
    menuBtn.setAttribute('aria-expanded', 'false');
};

menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    if (!isOpen) {
        openMenu();
    } else {
        closeMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (
        e.key === 'Escape' &&
        menuBtn.getAttribute('aria-expanded') === 'true'
    ) {
        closeMenu();
    }
});

largeMediaQuery.addEventListener('change', closeMenu);
mediumMediaQuery.addEventListener('change', closeMenu);

closeMenu();
