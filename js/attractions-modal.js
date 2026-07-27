(function () {
    'use strict';

    var grid = document.querySelector('.attractions-grid');
    var modal = document.getElementById('attraction-modal');

    if (!grid || !modal || typeof modal.showModal !== 'function') {
        return;
    }

    var closeButton = modal.querySelector('.attraction-modal-close');
    var modalImageBackdrop = modal.querySelector('.attraction-modal-image-backdrop');
    var modalImage = modal.querySelector('.attraction-modal-image');
    var modalTitle = modal.querySelector('#attraction-modal-title');
    var modalContent = modal.querySelector('.attraction-modal-content');
    var modalDescription = modal.querySelector('.attraction-modal-description');
    var buttons = grid.querySelectorAll('.attraction-read-more');
    var lastTrigger = null;
    var lockedScrollPosition = 0;
    var originalBodyPaddingRight = '';
    var closeTimer = null;
    var isClosing = false;

    buttons.forEach(function (button) {
        var cardTitle = button.closest('.attraction-card').querySelector('h2').textContent.trim();

        button.removeAttribute('aria-expanded');
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', modal.id);
        button.setAttribute('aria-label', 'Read more about ' + cardTitle);
    });

    function lockPageScroll() {
        var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        var currentPaddingRight = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;

        lockedScrollPosition = window.scrollY;
        originalBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.setProperty('--attraction-modal-scroll-offset', '-' + lockedScrollPosition + 'px');

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = currentPaddingRight + scrollbarWidth + 'px';
        }

        document.body.classList.add('attraction-modal-open');
    }

    function unlockPageScroll() {
        var originalScrollBehavior = document.documentElement.style.scrollBehavior;

        document.body.classList.remove('attraction-modal-open');
        document.body.style.removeProperty('--attraction-modal-scroll-offset');
        document.body.style.paddingRight = originalBodyPaddingRight;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, lockedScrollPosition);
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }

    function populateModal(card, trigger) {
        var sourceImage = card.querySelector('.attraction-card-image img');
        var sourceContent = card.querySelector('.attraction-card-content');
        var sourceTitle = sourceContent.querySelector('h2');
        var placeName = sourceTitle.textContent.trim();
        var modalImageSource = sourceImage.getAttribute('data-modal-src') ||
            sourceImage.currentSrc ||
            sourceImage.getAttribute('src');

        modalImage.src = modalImageSource;
        modalImage.alt = sourceImage.alt;

        if (modalImageBackdrop) {
            modalImageBackdrop.src = modalImageSource;
        }

        modalTitle.textContent = placeName;
        modal.setAttribute('aria-label', placeName + ' details');
        modalDescription.replaceChildren();

        Array.prototype.forEach.call(sourceContent.children, function (child) {
            if (child !== sourceTitle && child !== trigger) {
                modalDescription.appendChild(child.cloneNode(true));
            }
        });

        modalContent.scrollTop = 0;
    }

    function openModal(trigger) {
        var card = trigger.closest('.attraction-card');

        if (!card || modal.open || isClosing) {
            return;
        }

        lastTrigger = trigger;
        populateModal(card, trigger);
        lockPageScroll();
        modal.showModal();
        closeButton.focus({ preventScroll: true });
    }

    function finishClose() {
        var triggerToRestore = lastTrigger;

        if (!isClosing) {
            return;
        }

        window.clearTimeout(closeTimer);
        closeTimer = null;
        modal.classList.remove('is-closing');
        modal.close();
        isClosing = false;
        unlockPageScroll();
        lastTrigger = null;

        if (triggerToRestore && document.contains(triggerToRestore)) {
            triggerToRestore.focus({ preventScroll: true });
        }
    }

    function closeModal() {
        function handleAnimationEnd(event) {
            if (event.target === modal && event.animationName === 'attraction-modal-exit') {
                modal.removeEventListener('animationend', handleAnimationEnd);
                finishClose();
            }
        }

        if (!modal.open || isClosing) {
            return;
        }

        isClosing = true;
        modal.classList.add('is-closing');
        modal.addEventListener('animationend', handleAnimationEnd);
        closeTimer = window.setTimeout(function () {
            modal.removeEventListener('animationend', handleAnimationEnd);
            finishClose();
        }, 350);
    }

    grid.addEventListener('click', function (event) {
        var trigger = event.target.closest('.attraction-read-more');

        if (trigger && grid.contains(trigger)) {
            openModal(trigger);
        }
    });

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('cancel', function (event) {
        event.preventDefault();
        closeModal();
    });

    modal.addEventListener('click', function (event) {
        var bounds = modal.getBoundingClientRect();
        var clickedOutside = event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom;

        if (event.target === modal && clickedOutside) {
            closeModal();
        }
    });
}());
