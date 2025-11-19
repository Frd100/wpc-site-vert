(function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    const cookieClose = document.getElementById('cookie-close');

    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.add('active');
    }

    function hideBanner() {
        if (cookieBanner) cookieBanner.classList.remove('active');
    }

    cookieAccept?.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        hideBanner();
    });

    cookieReject?.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        hideBanner();
    });

    cookieClose?.addEventListener('click', hideBanner);

    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const desktopMenu = document.getElementById('desktop-menu');

    mobileToggle?.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        desktopMenu?.classList.toggle('mobile-open');
    });
})();

