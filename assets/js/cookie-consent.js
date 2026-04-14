(function () {
    'use strict';

    var storageKey = 'infia_cookie_notice_accepted';

    function hasAccepted() {
        try {
            return window.localStorage.getItem(storageKey) === 'true';
        } catch (error) {
            return false;
        }
    }

    function rememberChoice() {
        try {
            window.localStorage.setItem(storageKey, 'true');
        } catch (error) {
            // If localStorage is unavailable, the banner can still be dismissed for this page view.
        }
    }

    function createBanner() {
        if (hasAccepted()) {
            return;
        }

        var banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie-Hinweis');

        banner.innerHTML = [
            '<div class="cookie-consent__text">',
            '<strong>Cookie-Hinweis</strong>',
            '<p>Wir verwenden keine Analyse- oder Marketing-Cookies. Für diesen Hinweis speichern wir nur Ihre Bestätigung lokal im Browser.</p>',
            '</div>',
            '<div class="cookie-consent__actions">',
            '<a href="datenschutz.html">Datenschutz</a>',
            '<button type="button">OK</button>',
            '</div>'
        ].join('');

        banner.querySelector('button').addEventListener('click', function () {
            rememberChoice();
            banner.remove();
        });

        document.body.appendChild(banner);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBanner);
    } else {
        createBanner();
    }
}());
