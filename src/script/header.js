const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const navList = document.getElementById('nav-list');
const navBtns = document.getElementById('nav-buttons');

const trapFocus = () => {
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
                menuBtn.focus(); // jump back to the cross button
            }
        }
    });
};

menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    if (!isOpen) {
        trapFocus();
        navList.classList.add('header__list--visible');
        navBtns.classList.add('header__btn-container--visible');
        nav.classList.add('header__nav--visible');
        document.querySelector('main').setAttribute('inert', '');
    } else {
        nav.classList.remove('header__nav--visible');
        navList.classList.remove('header__list--visible');
        navBtns.classList.remove('header__btn-container--visible');
        document.querySelector('main').removeAttribute('inert');
    }

    menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuBtn.setAttribute('aria-expanded', 'false');
        navList.hidden = true;
    }
});
