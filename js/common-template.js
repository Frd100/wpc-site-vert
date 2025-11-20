(function() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const desktopMenu = document.getElementById('desktop-menu');

    mobileToggle?.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        desktopMenu?.classList.toggle('mobile-open');
    });
})();

