(function () {
    'use strict';

    var photos = window.GuestlandGuestPhotos || [];
    var shell = document.getElementById('guest-carousel-shell');
    var carousel = document.getElementById('guest-carousel');
    var previousButton = document.getElementById('guest-carousel-prev');
    var nextButton = document.getElementById('guest-carousel-next');
    var pauseButton = document.getElementById('guest-carousel-pause');
    var count = document.getElementById('guest-carousel-count');

    if (!shell || !carousel || !previousButton || !nextButton || !pauseButton || !count || !photos.length) {
        if (carousel) {
            carousel.setAttribute('aria-busy', 'false');
        }
        return;
    }

    var cards = [];
    var activeIndex = 0;
    var autoPlayTimer = null;
    var scrollFrame = null;
    var reduceMotionQuery = window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : { matches: false };
    var userPaused = reduceMotionQuery.matches;
    var sectionVisible = !('IntersectionObserver' in window);

    function createCard(photo, index) {
        var card = document.createElement('figure');
        var media = document.createElement('div');
        var image = document.createElement('img');
        var caption = document.createElement('figcaption');
        var label = document.createElement('span');
        var number = document.createElement('span');

        card.className = 'guest-memory-card';
        card.setAttribute('role', 'group');
        card.setAttribute('aria-roledescription', 'slide');
        card.setAttribute('aria-label', 'Guest memory ' + (index + 1) + ' of ' + photos.length);
        card.style.setProperty('--guest-photo-ratio', photo.width / photo.height);

        media.className = 'guest-memory-media';

        image.alt = 'A guest memory from Guestland Homestay in Fort Kochi, photo ' + (index + 1) + '.';
        image.width = photo.width;
        image.height = photo.height;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.dataset.src = photo.src;

        caption.className = 'guest-memory-caption';
        label.className = 'guest-memory-label';
        label.textContent = 'Guestland memories';
        number.className = 'guest-memory-number';
        number.textContent = String(index + 1).padStart(2, '0');

        caption.appendChild(label);
        caption.appendChild(number);
        media.appendChild(image);
        media.appendChild(caption);
        card.appendChild(media);

        return card;
    }

    function renderPhotos() {
        var fragment = document.createDocumentFragment();

        photos.forEach(function (photo, index) {
            var card = createCard(photo, index);
            cards.push(card);
            fragment.appendChild(card);
        });

        carousel.appendChild(fragment);
        carousel.setAttribute('aria-busy', 'false');
        updateCount();
        observeImages();

        window.requestAnimationFrame(function () {
            carousel.classList.add('is-ready');
        });
    }

    function loadImage(image) {
        if (!image || !image.dataset.src) {
            return;
        }

        image.addEventListener('load', function () {
            image.closest('.guest-memory-card').classList.add('is-loaded');
        }, { once: true });
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
    }

    function observeImages() {
        var images = carousel.querySelectorAll('img[data-src]');

        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(images, loadImage);
            return;
        }

        var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: carousel,
            rootMargin: '80% 100%',
            threshold: 0.01
        });

        Array.prototype.forEach.call(images, function (image) {
            imageObserver.observe(image);
        });
    }

    function getClosestCardIndex() {
        var carouselCenter = carousel.scrollLeft + (carousel.clientWidth / 2);
        var closestIndex = 0;
        var closestDistance = Infinity;

        cards.forEach(function (card, index) {
            var cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            var distance = Math.abs(carouselCenter - cardCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    function updateCount() {
        count.textContent = String(activeIndex + 1).padStart(2, '0') + ' / ' + String(photos.length).padStart(2, '0') + ' guest moments';
    }

    function updateActiveCard() {
        var nextIndex = getClosestCardIndex();

        if (nextIndex === activeIndex) {
            return;
        }

        activeIndex = nextIndex;
        updateCount();
    }

    function scrollToCard(index, behavior) {
        if (!cards.length) {
            return;
        }

        activeIndex = (index + cards.length) % cards.length;
        var card = cards[activeIndex];
        var left = card.offsetLeft - ((carousel.clientWidth - card.offsetWidth) / 2);

        carousel.scrollTo({
            left: Math.max(0, left),
            behavior: behavior || 'smooth'
        });
        updateCount();
    }

    function step(direction, initiatedByUser) {
        if (initiatedByUser) {
            resetAutoPlay();
        }

        var nextIndex = activeIndex + direction;

        if (nextIndex >= cards.length) {
            scrollToCard(0, 'auto');
            return;
        }

        if (nextIndex < 0) {
            scrollToCard(cards.length - 1, 'auto');
            return;
        }

        scrollToCard(nextIndex, reduceMotionQuery.matches ? 'auto' : 'smooth');
    }

    function canAutoPlay() {
        return !userPaused && sectionVisible && !document.hidden;
    }

    function clearAutoPlay() {
        window.clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }

    function startAutoPlay() {
        clearAutoPlay();

        if (!canAutoPlay()) {
            return;
        }

        autoPlayTimer = window.setInterval(function () {
            step(1, false);
        }, 1000);
    }

    function resetAutoPlay() {
        clearAutoPlay();
        startAutoPlay();
    }

    function updatePauseButton() {
        var label = pauseButton.querySelector('.guest-carousel-pause-label');
        pauseButton.classList.toggle('is-paused', userPaused);
        pauseButton.setAttribute('aria-label', userPaused
            ? 'Resume automatic guest gallery'
            : 'Pause automatic guest gallery');
        label.textContent = userPaused ? 'Play' : 'Pause';
    }

    previousButton.addEventListener('click', function () {
        step(-1, true);
    });

    nextButton.addEventListener('click', function () {
        step(1, true);
    });

    pauseButton.addEventListener('click', function () {
        userPaused = !userPaused;
        updatePauseButton();
        startAutoPlay();
    });

    carousel.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            step(-1, true);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            step(1, true);
        } else if (event.key === 'Home') {
            event.preventDefault();
            scrollToCard(0, reduceMotionQuery.matches ? 'auto' : 'smooth');
            resetAutoPlay();
        } else if (event.key === 'End') {
            event.preventDefault();
            scrollToCard(cards.length - 1, reduceMotionQuery.matches ? 'auto' : 'smooth');
            resetAutoPlay();
        }
    });

    carousel.addEventListener('scroll', function () {
        if (scrollFrame) {
            return;
        }

        scrollFrame = window.requestAnimationFrame(function () {
            scrollFrame = null;
            updateActiveCard();
        });
    }, { passive: true });

    document.addEventListener('visibilitychange', startAutoPlay);

    if (reduceMotionQuery.addEventListener) {
        reduceMotionQuery.addEventListener('change', function (event) {
            if (event.matches) {
                userPaused = true;
                updatePauseButton();
            }

            startAutoPlay();
        });
    }

    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            sectionVisible = entries[0].isIntersecting;
            startAutoPlay();
        }, { threshold: 0.18 });

        sectionObserver.observe(shell);
    }

    renderPhotos();
    updatePauseButton();
    startAutoPlay();
}());
