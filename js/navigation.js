(function () {
    'use strict';

    var mobileNavigation = window.matchMedia('(max-width: 1024px)');

    document.querySelectorAll('.navbar').forEach(function (navbar) {
        var toggle = navbar.querySelector('.menu-toggle');
        var controlsId = toggle && toggle.getAttribute('aria-controls');
        var navigation = controlsId ? document.getElementById(controlsId) : null;

        if (!toggle || !navigation) {
            return;
        }

        function isOpen() {
            return toggle.getAttribute('aria-expanded') === 'true';
        }

        function setOpen(open, returnFocus) {
            navbar.classList.toggle('menu-open', open);
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');

            if (mobileNavigation.matches) {
                navigation.setAttribute('aria-hidden', open ? 'false' : 'true');
            } else {
                navigation.removeAttribute('aria-hidden');
            }

            if (!open && returnFocus) {
                toggle.focus();
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(!isOpen(), false);
        });

        navbar.querySelectorAll('.nav-links a, .logo').forEach(function (link) {
            link.addEventListener('click', function () {
                if (mobileNavigation.matches && isOpen()) {
                    setOpen(false, false);
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (isOpen() && !navigation.contains(event.target) && !toggle.contains(event.target)) {
                setOpen(false, false);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isOpen()) {
                setOpen(false, true);
            }
        });

        function handleViewportChange() {
            setOpen(false, false);
        }

        if (typeof mobileNavigation.addEventListener === 'function') {
            mobileNavigation.addEventListener('change', handleViewportChange);
        } else {
            mobileNavigation.addListener(handleViewportChange);
        }

        setOpen(false, false);
    });
}());
