const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    nav.hidden = isOpen;

    // Icon is changed here, for now.

    if (!isOpen) {
        trapFocus();
    }
});

function trapFocus() {
    const focusable = nav.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])',
    );
    const last = focusable[focusable.length - 1];

    document.addEventListener('keydown', function loop(e) {
        if (menuBtn.getAttribute('aria-expanded') !== 'true') {
            document.removeEventListener('keydown', loop);
            return;
        }
        if (e.key === 'Tab') {
            if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                menuBtn.focus(); // jump back to hamburger
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
