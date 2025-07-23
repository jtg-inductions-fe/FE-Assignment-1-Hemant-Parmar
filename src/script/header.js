const breakpoints = {
    medium: 1024,
    large: 1440,
};

const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const media = window.matchMedia(`(min-width: ${breakpoints.large}px)`);
const navMenu = document.querySelector('.nav__menu');
const main = document.querySelector('main');
// const body = document.querySelector('body');

function setupNav(e) {
    if (e.matches) {
        // is desktop
        closeNavMenu();
        navMenu.removeAttribute('inert');
    } else {
        // is mobile or tablet
        navMenu.setAttribute('inert', '');
        navMenu.style.transition = 'none';
    }
}

function openNavMenu() {
    openBtn.setAttribute('aria-expanded', 'true');
    navMenu.removeAttribute('inert');
    navMenu.removeAttribute('style');
    main.setAttribute('inert', '');
    closeBtn.focus();
}

function closeNavMenu() {
    openBtn.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('inert', '');
    main.removeAttribute('inert');
    openBtn.focus();

    setTimeout(() => {
        navMenu.style.transition = 'none';
    }, 500);
}

media.addEventListener('change', function (e) {
    setupNav(e);
});

setupNav(media);

openBtn.addEventListener('click', openNavMenu);
closeBtn.addEventListener('click', closeNavMenu);
