/* Gallery content is supplied by js/gallery-manifest.js. */
(function () {
    'use strict';

    var filterContainer = document.getElementById('gallery-filters');
    var galleryGrid = document.getElementById('gallery-grid');
    var galleryCount = document.getElementById('gallery-count');
    var galleryBack = document.getElementById('gallery-back');
    var galleryViewTitle = document.getElementById('gallery-view-title');
    var galleryToolbar = document.querySelector('.gallery-toolbar');

    if (!filterContainer || !galleryGrid || !galleryCount || !galleryBack || !galleryViewTitle || !galleryToolbar) {
        return;
    }

    var activeCategory = 'all';
    var filterTimer = null;
    var filterSequence = 0;
    var categoryLookup = Object.create(null);
    var usedCategoryIds = Object.create(null);
    var allFilterButton = null;
    var lastCategoryTrigger = null;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function slugify(value) {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function formatDisplayLabel(value, fallbackIndex) {
        var normalized = String(value || '')
            .replace(/\s+/g, ' ')
            .trim();

        if (!normalized) {
            return 'Collection ' + (fallbackIndex + 1);
        }

        return normalized
            .toLowerCase()
            .replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            })
            .replace(/\bAc\b/g, 'AC')
            .replace(/\bNon[-\s]+AC\b/g, 'Non-AC');
    }

    function createCategoryId(label) {
        var baseId = slugify(label) || 'collection';

        // Retain the room prefix used by the existing cover-image positioning rule.
        if (/\broom\b/i.test(label)) {
            baseId = 'room-' + baseId;
        } else if (baseId === 'all') {
            baseId = 'collection-all';
        }

        var categoryId = baseId;
        var suffix = 2;

        while (usedCategoryIds[categoryId]) {
            categoryId = baseId + '-' + suffix;
            suffix += 1;
        }

        usedCategoryIds[categoryId] = true;
        return categoryId;
    }

    function removeImageExtensions(value) {
        var stem = value;

        while (/\.(?:avif|gif|jpe?g|png|webp)$/i.test(stem)) {
            stem = stem.replace(/\.(?:avif|gif|jpe?g|png|webp)$/i, '');
        }

        return stem;
    }

    function getPhotoDescriptor(path) {
        var fileName = path.split('/').pop() || '';

        try {
            fileName = decodeURIComponent(fileName);
        } catch (error) {
            // Keep the original filename when it is not URI encoded.
        }

        var descriptor = removeImageExtensions(fileName)
            .replace(/[_-]+/g, ' ')
            .replace(/\s*(?:\(\s*\d+\s*\)|\d+)\s*$/, '')
            .replace(/\s+/g, ' ')
            .trim();

        if (!descriptor || /^(?:chatgpt image|whatsapp image|dsc\d*|img\d*|hbd)(?:\b|$)/i.test(descriptor)) {
            return '';
        }

        return formatDisplayLabel(descriptor, 0)
            .replace(/\bAsthetic\b/g, 'Aesthetic');
    }

    function createPhotoAlt(path, categoryLabel, index, total) {
        var descriptor = getPhotoDescriptor(path);
        var position = 'Photo ' + (index + 1) + ' of ' + total + '.';

        if (descriptor && descriptor.toLowerCase() !== categoryLabel.toLowerCase()) {
            return descriptor + ' at Guestland Homestay, part of the ' + categoryLabel + ' collection. ' + position;
        }

        return 'View of the ' + categoryLabel + ' at Guestland Homestay. ' + position;
    }

    function getImagePath(imageEntry) {
        if (typeof imageEntry === 'string') {
            return imageEntry.trim();
        }

        if (imageEntry && typeof imageEntry.src === 'string') {
            return imageEntry.src.trim();
        }

        return '';
    }

    function buildCategories(collections) {
        var builtCategories = [];

        collections.forEach(function (collection, collectionIndex) {
            if (!collection || !Array.isArray(collection.images)) {
                return;
            }

            var sourceTitle = typeof collection.title === 'string' ? collection.title : '';
            var label = formatDisplayLabel(sourceTitle, collectionIndex);
            var category = {
                id: createCategoryId(label),
                label: label,
                sourceTitle: sourceTitle,
                images: []
            };

            collection.images.forEach(function (imageEntry) {
                var path = getImagePath(imageEntry);

                if (!path) {
                    return;
                }

                var image = {
                    src: path,
                    alt: imageEntry && typeof imageEntry.alt === 'string' && imageEntry.alt.trim()
                        ? imageEntry.alt.trim()
                        : ''
                };

                if (imageEntry && Number.isFinite(imageEntry.width) && Number.isFinite(imageEntry.height)) {
                    image.width = imageEntry.width;
                    image.height = imageEntry.height;
                }

                category.images.push(image);
            });

            if (!category.images.length) {
                return;
            }

            category.images.forEach(function (image, imageIndex) {
                if (!image.alt) {
                    image.alt = createPhotoAlt(image.src, category.label, imageIndex, category.images.length);
                }
            });

            category.cover = category.images[0];
            categoryLookup[category.id] = category;
            builtCategories.push(category);
        });

        return builtCategories;
    }

    function renderUnavailableMessage() {
        var message = document.createElement('p');

        filterContainer.hidden = true;
        galleryToolbar.hidden = true;
        galleryBack.hidden = true;
        galleryCount.textContent = '';
        galleryViewTitle.textContent = 'Gallery currently unavailable';

        message.className = 'gallery-noscript';
        message.setAttribute('role', 'status');
        message.textContent = 'Our gallery could not be loaded right now. Please try again shortly.';
        message.style.gridColumn = '1 / -1';

        galleryGrid.appendChild(message);
        galleryGrid.classList.add('is-ready');
        galleryGrid.setAttribute('aria-busy', 'false');
    }

    var manifestCollections = Array.isArray(window.GuestlandGalleryCollections)
        ? window.GuestlandGalleryCollections
        : [];
    var categories = buildCategories(manifestCollections);

    if (!categories.length) {
        renderUnavailableMessage();
        return;
    }

    function createFilterButton(category, label) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-filter';
        button.dataset.category = category;
        button.textContent = label;
        button.setAttribute('aria-controls', 'gallery-grid');
        button.setAttribute('aria-pressed', category === activeCategory ? 'true' : 'false');

        if (category === activeCategory) {
            button.classList.add('active');
        }

        button.addEventListener('click', function () {
            lastCategoryTrigger = null;
            filterGallery(category, false);
        });

        return button;
    }

    function renderFilters() {
        var fragment = document.createDocumentFragment();
        allFilterButton = createFilterButton('all', 'All');
        fragment.appendChild(allFilterButton);

        categories.forEach(function (category) {
            fragment.appendChild(createFilterButton(category.id, category.label));
        });

        filterContainer.appendChild(fragment);
    }

    function hydrateCard(card, visibleIndex, loadEagerly) {
        var photo = card.querySelector('img');

        if (!photo || photo.getAttribute('src')) {
            return;
        }

        photo.loading = loadEagerly && visibleIndex < 4 ? 'eager' : 'lazy';
        photo.src = photo.dataset.src;
    }

    function createCategoryAction(category) {
        var action = document.createElement('button');
        var photoCount = document.createElement('span');
        var name = document.createElement('span');
        var callToAction = document.createElement('span');
        var arrow = document.createElement('span');

        action.type = 'button';
        action.className = 'gallery-category-action';

        photoCount.className = 'gallery-category-count';
        photoCount.textContent = category.images.length + (category.images.length === 1 ? ' photo' : ' photos');

        name.className = 'gallery-category-name';
        name.textContent = category.label;

        callToAction.className = 'gallery-category-cta';
        callToAction.textContent = 'See More';

        arrow.className = 'gallery-category-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '\u2192';
        callToAction.appendChild(arrow);

        action.appendChild(photoCount);
        action.appendChild(name);
        action.appendChild(callToAction);

        action.addEventListener('click', function () {
            lastCategoryTrigger = action;
            filterGallery(category.id, true);

            if (typeof galleryBack.focus === 'function') {
                galleryBack.focus({ preventScroll: true });
            }
        });

        return action;
    }

    function createGalleryCard(image, category, coverIndex) {
        var card = document.createElement('figure');
        var media = document.createElement('div');
        var photo = document.createElement('img');
        var isCover = image === category.cover;

        card.className = 'gallery-card';
        card.dataset.category = category.id;
        card.dataset.cover = isCover ? 'true' : 'false';
        card.hidden = !isCover;

        media.className = 'gallery-card-media';

        photo.alt = image.alt;
        photo.decoding = 'async';
        photo.dataset.src = image.src;

        if (image.width && image.height) {
            photo.width = image.width;
            photo.height = image.height;
        }

        media.appendChild(photo);

        if (isCover) {
            media.appendChild(createCategoryAction(category));
        }

        card.appendChild(media);

        if (isCover) {
            hydrateCard(card, coverIndex, false);
        }

        return card;
    }

    function renderGallery() {
        var fragment = document.createDocumentFragment();
        var coverIndex = 0;

        categories.forEach(function (category) {
            category.images.forEach(function (image) {
                var isCover = image === category.cover;
                fragment.appendChild(createGalleryCard(image, category, coverIndex));

                if (isCover) {
                    coverIndex += 1;
                }
            });
        });

        galleryGrid.appendChild(fragment);
        updateCount('all');

        window.requestAnimationFrame(function () {
            galleryGrid.classList.add('is-ready');
            galleryGrid.setAttribute('aria-busy', 'false');
        });
    }

    function updateFilterButtons(category) {
        Array.prototype.forEach.call(filterContainer.children, function (button) {
            var isActive = button.dataset.category === category;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

            if (isActive && filterContainer.scrollWidth > filterContainer.clientWidth) {
                button.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    }

    function updateCount(category) {
        if (category === 'all') {
            galleryCount.textContent = categories.length + (categories.length === 1 ? ' collection' : ' collections');
            return;
        }

        var photoCount = categoryLookup[category].images.length;
        galleryCount.textContent = photoCount + (photoCount === 1 ? ' photograph' : ' photographs');
    }

    function updateView(category) {
        var isOverview = category === 'all';
        galleryGrid.dataset.view = isOverview ? 'overview' : 'category';
        galleryBack.hidden = isOverview;
        galleryViewTitle.textContent = isOverview ? 'Browse by space' : categoryLookup[category].label;

        Array.prototype.forEach.call(galleryGrid.querySelectorAll('.gallery-category-action'), function (action) {
            action.hidden = !isOverview;
        });
    }

    function scrollToGallery() {
        window.requestAnimationFrame(function () {
            galleryToolbar.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    }

    function finishFilter(cardsToHide, cardsToShow, sequence, onComplete) {
        cardsToHide.forEach(function (card) {
            card.hidden = true;
            card.classList.remove('is-leaving');
        });

        cardsToShow.forEach(function (card) {
            card.hidden = false;
            card.classList.add('is-entering');
        });

        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                cardsToShow.forEach(function (card) {
                    card.classList.remove('is-entering');
                });

                if (sequence === filterSequence) {
                    galleryGrid.setAttribute('aria-busy', 'false');

                    if (typeof onComplete === 'function') {
                        onComplete();
                    }
                }
            });
        });
    }

    function filterGallery(category, shouldScroll, onComplete) {
        if (category === activeCategory || (category !== 'all' && !categoryLookup[category])) {
            if (shouldScroll) {
                scrollToGallery();
            }

            if (typeof onComplete === 'function') {
                window.requestAnimationFrame(onComplete);
            }

            return;
        }

        window.clearTimeout(filterTimer);
        activeCategory = category;
        filterSequence += 1;
        var sequence = filterSequence;
        galleryGrid.setAttribute('aria-busy', 'true');
        updateFilterButtons(category);
        updateCount(category);
        updateView(category);

        var cardsToHide = [];
        var cardsToShow = [];

        Array.prototype.forEach.call(galleryGrid.children, function (card) {
            card.classList.remove('is-leaving', 'is-entering');
            var shouldShow = category === 'all'
                ? card.dataset.cover === 'true'
                : card.dataset.category === category;

            if (shouldShow && card.hidden) {
                cardsToShow.push(card);
            } else if (!shouldShow && !card.hidden) {
                cardsToHide.push(card);
            }
        });

        cardsToShow.forEach(function (card, index) {
            hydrateCard(card, index, category !== 'all');
        });

        if (shouldScroll) {
            scrollToGallery();
        }

        if (reduceMotion || cardsToHide.length === 0) {
            finishFilter(cardsToHide, cardsToShow, sequence, onComplete);
            return;
        }

        cardsToHide.forEach(function (card) {
            card.classList.add('is-leaving');
        });

        filterTimer = window.setTimeout(function () {
            finishFilter(cardsToHide, cardsToShow, sequence, onComplete);
        }, 220);
    }

    galleryBack.addEventListener('click', function () {
        var returnTarget = lastCategoryTrigger;

        if (returnTarget && typeof returnTarget.focus === 'function') {
            filterGallery('all', false, function () {
                returnTarget.focus({ preventScroll: true });
                returnTarget.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'center'
                });
            });
        } else {
            filterGallery('all', true);

            if (allFilterButton && typeof allFilterButton.focus === 'function') {
                allFilterButton.focus({ preventScroll: true });
            }
        }

        lastCategoryTrigger = null;
    });

    renderFilters();
    renderGallery();
}());
