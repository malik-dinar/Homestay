(function () {
    'use strict';

    var categoryLabelAliases = {
        'room-deluxe-double-ac': 'Deluxe Double Room (AC)',
        'room-superior-single-ac': 'Superior Single Room (AC)',
        'room-cozy-single-non-ac': 'Cozy Single Room (Non-AC)',
        exterior: 'Exterior',
        bathrooms: 'Bathrooms',
        'common-areas': 'Common Areas',
        dining: 'Dining',
        kitchen: 'Kitchen',
        'outdoor-spaces': 'Outdoor Spaces',
        views: 'Views & Surroundings',
        details: 'Decor & Details'
    };

    var categoryPriority = [
        'room-deluxe-double-ac',
        'room-superior-single-ac',
        'room-cozy-single-non-ac',
        'exterior',
        'bathrooms',
        'common-areas',
        'dining',
        'kitchen',
        'outdoor-spaces',
        'views',
        'details'
    ];

    var galleryImages = [
        {
            src: 'front view.jpeg',
            category: 'exterior',
            title: 'Welcome to Guestland',
            alt: 'Daytime exterior of Guestland Homestay with white balconies, solar panels and patio greenery.',
            width: 1024,
            height: 1536
        },
        {
            src: 'front night view.jpeg',
            category: 'exterior',
            title: 'Guestland at Dusk',
            alt: 'Guestland Homestay multi-level facade and illuminated balconies at dusk.',
            width: 1616,
            height: 2560
        },
        {
            src: 'front night view 4.jpeg',
            category: 'exterior',
            title: 'An Evening Welcome',
            alt: 'Warmly lit entrance patio and balconies of Guestland Homestay at night.',
            width: 1707,
            height: 2560
        },
        {
            src: 'single non ac room (4).jpg.jpeg',
            category: 'rooms',
            title: 'Teal Door Room',
            alt: 'Bright guest room with white linens, red accents and a teal door.',
            width: 2560,
            height: 1707
        },
        {
            src: 'single non ac room (3).jpg.jpeg',
            category: 'rooms',
            title: 'Guest Room Details',
            alt: 'Guest room dressing desk, mirror and wooden wardrobe beside the bed.',
            width: 2162,
            height: 2560
        },
        {
            src: 'DSC08455 (1).jpg.jpeg',
            category: 'rooms',
            title: 'Double Room',
            alt: 'Double guest room with crisp white bedding, blue curtains and a ceiling fan.',
            width: 1707,
            height: 2560
        },
        {
            src: 'DSC08440 (1).jpg.jpeg',
            category: 'rooms',
            title: 'Room Seating',
            alt: 'Air-conditioned guest room seating area with wooden armchairs, mirror and blue curtains.',
            width: 1707,
            height: 2560
        },
        {
            src: 'DSC08421 (1).jpg.jpeg',
            category: 'rooms',
            title: 'Bright Double Room',
            alt: 'Spacious double guest room with white bedding, blue curtains, ceiling fan and wardrobe.',
            width: 1707,
            height: 2560
        },
        {
            src: 'DSC08359 (1).jpg.jpeg',
            category: 'rooms',
            title: 'Dressing Corner',
            alt: 'Guest room dressing desk with cane chair, mirror, water bottle and blue curtains.',
            width: 1682,
            height: 2560
        },
        {
            src: 'DSC08302 (1).jpg.jpeg',
            category: 'rooms',
            title: 'Bedside Calm',
            alt: 'Warm bedside lamp beside white pillows and a red accent cushion.',
            width: 2560,
            height: 1707
        },
        {
            src: 'ChatGPT Image Jul 12, 2026, 09_25_20 PM.jpg',
            category: 'rooms',
            title: 'Classic Double Room',
            alt: 'Bright double guest room with white linens, red accents, blue curtains and a teal door.',
            width: 1024,
            height: 1536
        },
        {
            src: 'WhatsApp Image 2026-07-12 at 9.37.56 PM.jpeg',
            category: 'bathrooms',
            title: 'Guest Bathroom',
            alt: 'Tiled guest bathroom with toilet, shower fittings and ventilation window.',
            width: 1023,
            height: 1536
        },
        {
            src: 'WhatsApp Image 2026-07-12 at 9.29.46 PM.jpeg',
            category: 'bathrooms',
            title: 'Guest Vanity',
            alt: 'Guest bathroom vanity with mirror, basin and complimentary toiletries.',
            width: 1733,
            height: 2560
        },
        {
            src: 'toilet ac single room (3).jpg.jpeg',
            category: 'bathrooms',
            title: 'Ensuite Vanity',
            alt: 'Marble-tiled guest bathroom vanity with round mirror, basin and toiletries.',
            width: 1885,
            height: 2560
        },
        {
            src: 'toilet ac single room (1).jpg.jpeg',
            category: 'bathrooms',
            title: 'Rainfall Shower Ensuite',
            alt: 'Marble-tiled ensuite bathroom with rainfall shower and toilet.',
            width: 1707,
            height: 2560
        },
        {
            src: 'power room (2).jpg.jpeg',
            category: 'bathrooms',
            title: 'Powder Room',
            alt: 'Powder room vanity with a stone basin, oval mirror and potted snake plant.',
            width: 1707,
            height: 2560
        },
        {
            src: 'power room (1).jpg.jpeg',
            category: 'bathrooms',
            title: 'Stone Basin Detail',
            alt: 'Close view of a stone basin and oval mirror against marble-effect powder room tiles.',
            width: 1706,
            height: 2560
        },
        {
            src: 'IMG20230811001153.jpg.jpeg',
            category: 'bathrooms',
            title: 'Marble Guest Bathroom',
            alt: 'Guest bathroom with black-and-white marble-effect tiles, toilet and shower fittings.',
            width: 2560,
            height: 2047
        },
        {
            src: 'Reading corner.jpg.jpeg',
            category: 'common-areas',
            title: 'Reading Corner',
            alt: 'Cozy reading corner with floor seating, flower cushions, books and framed artwork.',
            width: 1707,
            height: 2560
        },
        {
            src: 'office space.jpg.jpeg',
            category: 'common-areas',
            title: 'Welcome Desk',
            alt: 'Reception workspace with printer, desk accessories and a framed Guestland Homestay award.',
            width: 2560,
            height: 1707
        },
        {
            src: 'DSC08410 (1).jpg.jpeg',
            category: 'common-areas',
            title: 'Quiet Sitting Nook',
            alt: 'Intimate indoor sitting nook with an upholstered wooden sofa, coffee table and wall art.',
            width: 2560,
            height: 1707
        },
        {
            src: 'communal lounge.jpg.jpeg',
            category: 'common-areas',
            title: 'Communal Lounge',
            alt: 'Guest relaxing with a phone on the spacious brown sofa in the communal lounge.',
            width: 2560,
            height: 1707
        },
        {
            src: 'communal lounge (3).jpg.jpeg',
            category: 'common-areas',
            title: 'Shared Lounge',
            alt: 'Welcoming communal lounge with brown sectional sofa, reception desk and warm wall lights.',
            width: 2560,
            height: 1898
        },
        {
            src: 'communal lounge (2).jpg.jpeg',
            category: 'common-areas',
            title: 'Conversation Corner',
            alt: 'Brown sectional sofa and black coffee table in the warmly lit communal lounge.',
            width: 1707,
            height: 2560
        },
        {
            src: 'communal lounge (1).jpg.jpeg',
            category: 'common-areas',
            title: 'Lounge Perspective',
            alt: 'Low-angle view of the communal lounge with brown sofas, coffee table and ceiling fan.',
            width: 1857,
            height: 2560
        },
        {
            src: 'asthetic reading area  (1).jpg',
            category: 'common-areas',
            title: 'Reading and Refreshment',
            alt: 'Reading corner with flower cushions and books beside the marble powder-room vanity.',
            width: 1706,
            height: 2560
        },
        {
            src: 'Dining area (3).jpg.jpeg',
            category: 'dining',
            title: 'Dining by the Kitchen',
            alt: 'Set four-place dining table beneath patterned pendant lights beside the communal kitchen.',
            width: 1707,
            height: 2560
        },
        {
            src: 'Dining area (1).jpg.jpeg',
            category: 'dining',
            title: 'Table Set for Four',
            alt: 'Dining table set for four with dark plates, cutlery and a glass water carafe.',
            width: 1707,
            height: 2560
        },
        {
            src: 'communal kitchen (4).jpg.jpeg',
            category: 'kitchen',
            title: 'Communal Kitchen',
            alt: 'Fully equipped communal kitchen with teal cabinets, patterned tiles, stove, sink and microwave.',
            width: 2560,
            height: 1707
        },
        {
            src: 'communal kitchen (3).jpg.jpeg',
            category: 'kitchen',
            title: 'Kitchen Essentials',
            alt: 'Communal kitchen counter with microwave, kettle, mugs and tea-and-coffee canisters.',
            width: 1706,
            height: 2560
        },
        {
            src: 'communal kitchen (2).jpg.jpeg',
            category: 'kitchen',
            title: 'Tea and Spice Station',
            alt: 'Kitchen spice and tea station with decorative signs, jars and framed artwork.',
            width: 1708,
            height: 2560
        },
        {
            src: 'communal kitchen (1).jpg.jpeg',
            category: 'kitchen',
            title: 'A Colorful Kitchen',
            alt: 'Colorful communal kitchen spice racks, mugs and tea accessories.',
            width: 2560,
            height: 1707
        },
        {
            src: 'plants.jpeg',
            category: 'outdoor-spaces',
            title: 'Patio Details',
            alt: 'Miniature planters and figurines arranged on the patio table.',
            width: 1707,
            height: 2560
        },
        {
            src: 'Patio.jpg.jpeg',
            category: 'outdoor-spaces',
            title: 'Garden Patio',
            alt: 'Plant-filled patio with white chairs and a blue-and-white striped umbrella.',
            width: 1529,
            height: 2560
        },
        {
            src: 'patio plants.jpeg',
            category: 'outdoor-spaces',
            title: 'Patio Table',
            alt: 'White patio table and chairs decorated with tiny potted plants and figurines.',
            width: 1707,
            height: 2560
        },
        {
            src: 'front night view 2.jpeg',
            category: 'outdoor-spaces',
            title: 'Plant-Filled Entrance',
            alt: 'Illuminated Guestland Homestay entrance sign beside a tiered display of potted plants.',
            width: 1680,
            height: 2560
        },
        {
            src: 'ChatGPT Image Jul 8, 2026, 12_00_56 AM.jpg',
            category: 'outdoor-spaces',
            title: 'Rooftop Terrace',
            alt: 'Rooftop terrace with white seating, artificial grass and a large shade umbrella.',
            width: 1537,
            height: 1023
        },
        {
            src: 'ChatGPT Image Jul 8, 2026, 12_00_40 AM.jpg',
            category: 'outdoor-spaces',
            title: 'Tea on the Terrace',
            alt: 'Four guests sharing tea beneath the shade umbrella on the rooftop terrace.',
            width: 1537,
            height: 1023
        },
        {
            src: 'ChatGPT Image Jul 7, 2026, 10_58_38 PM.jpg',
            category: 'outdoor-spaces',
            title: 'Open-Air Rooftop',
            alt: 'Rooftop terrace seating under a large white umbrella with neighborhood and palm-tree views.',
            width: 1537,
            height: 1023
        },
        {
            src: 'Balcony.jpg.jpeg',
            category: 'outdoor-spaces',
            title: 'Private Balcony',
            alt: 'Private balcony with teal doors, red chair, small table and neighborhood view.',
            width: 2560,
            height: 1707
        },
        {
            src: 'balcony (4).jpg.jpeg',
            category: 'outdoor-spaces',
            title: 'Balcony After Dark',
            alt: 'Flower-trimmed private balcony with a red chair and small table at night.',
            width: 1706,
            height: 2560
        },
        {
            src: 'balcony (3).jpg.jpeg',
            category: 'outdoor-spaces',
            title: 'A Sunny Reading Spot',
            alt: 'Guest reading on a flower-lined private balcony in daylight.',
            width: 1707,
            height: 2560
        },
        {
            src: 'balcony (2).jpg.jpeg',
            category: 'outdoor-spaces',
            title: 'Flowers on the Balcony',
            alt: 'Guest reading beside colorful flower boxes on a sunny private balcony.',
            width: 1707,
            height: 2560
        },
        {
            src: 'view from roof top.jpg.jpeg',
            category: 'views',
            title: 'Fort Kochi Rooftops',
            alt: 'Rooftop view across Fort Kochi homes and coconut palms in warm evening light.',
            width: 2560,
            height: 1707
        },
        {
            src: 'view from roof top evening.jpg.jpeg',
            category: 'views',
            title: 'Sunset from the Rooftop',
            alt: 'Colorful sunset sky above the surrounding Fort Kochi rooftops and palms.',
            width: 1920,
            height: 2560
        },
        {
            src: 'WhatsApp Image 2026-07-12 at 8.37.49 PM.jpeg',
            category: 'details',
            title: 'Guestland Accolades',
            alt: 'Guestland Homestay award certificates and guest-photo collages displayed on a warm yellow wall.',
            width: 1448,
            height: 1086
        },
        {
            src: 'DSC08465 (1).jpg.jpeg',
            category: 'details',
            title: 'Bedside Still Life',
            alt: 'Bedside lamp, glass water bottle and sculptural white vase arranged on a glossy table.',
            width: 1707,
            height: 2560
        },
        {
            src: 'Decor.jpg.jpeg',
            category: 'details',
            title: 'Relax and Unwind',
            alt: 'Four warm-toned wall panels reading Relax, Soak, Unwind and Breathe.',
            width: 2560,
            height: 2000
        },
        {
            src: 'Decor and awards (2).jpg.jpeg',
            category: 'details',
            title: 'World-Time Clock',
            alt: 'Vintage world-time wall clock above Guestland Homestay award frames.',
            width: 1707,
            height: 2560
        },
        {
            src: 'decor 4.jpg.jpeg',
            category: 'details',
            title: 'Botanical Corner',
            alt: 'Framed botanical print and tall potted bamboo by a teal-trimmed window.',
            width: 1829,
            height: 2560
        },
        {
            src: 'decor 3.jpg.jpeg',
            category: 'details',
            title: 'Lavender and Green',
            alt: 'Framed leaf artwork and potted palm against a soft lavender wall.',
            width: 1707,
            height: 2560
        },
        {
            src: 'decor (2).jpg.jpeg',
            category: 'details',
            title: 'Choose Happy',
            alt: 'Choose Happy ornament, woven succulent planter and warm-toned framed artwork.',
            width: 2560,
            height: 1706
        },
        {
            src: 'asthetic clock.jpg.jpeg',
            category: 'details',
            title: 'Vintage Clock',
            alt: 'Vintage world-time wall clock above Guestland Homestay award frames.',
            width: 1707,
            height: 2560
        }
    ];

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
    var imageSources = {};
    var categoryLookup = {};
    var allFilterButton = null;
    var lastCategoryTrigger = null;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function naturalCompare(left, right) {
        return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });
    }

    function slugify(value) {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function formatRoomLabel(value) {
        var label = value
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });

        return label
            .replace(/\bAc\b/g, 'AC')
            .replace(/\bNon AC\b/g, 'Non-AC');
    }

    function removeImageExtensions(value) {
        var stem = value;

        while (/\.(?:avif|gif|jpe?g|png|webp)$/i.test(stem)) {
            stem = stem.replace(/\.(?:avif|gif|jpe?g|png|webp)$/i, '');
        }

        return stem;
    }

    function getRoomCategory(path) {
        var relativePath = path.replace(/^images\/rooms\//i, '');
        var pathParts = relativePath.split('/');
        var fileName = pathParts.pop();
        var categoryName;

        if (pathParts.length) {
            categoryName = pathParts[0];
        } else {
            categoryName = removeImageExtensions(fileName)
                .replace(/\s*(?:\(\s*\d+\s*\)|[-_ ]+\d+)\s*$/, '');
        }

        categoryName = categoryName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
        var normalizedName = categoryName.toLowerCase();

        if (/^deluxe double (?:ac room|room ac)$/.test(normalizedName)) {
            return { id: 'room-deluxe-double-ac', label: categoryLabelAliases['room-deluxe-double-ac'] };
        }

        if (/^(?:superior )?single (?:ac room|room ac)$/.test(normalizedName)) {
            return { id: 'room-superior-single-ac', label: categoryLabelAliases['room-superior-single-ac'] };
        }

        if (/^(?:cozy )?single (?:non ac room|room non ac)$/.test(normalizedName)) {
            return { id: 'room-cozy-single-non-ac', label: categoryLabelAliases['room-cozy-single-non-ac'] };
        }

        var categoryId = 'room-' + slugify(normalizedName || 'uncategorized');
        var categoryLabel = formatRoomLabel(categoryName || 'Room');
        categoryLabelAliases[categoryId] = categoryLabel;

        return { id: categoryId, label: categoryLabel };
    }

    var roomPhotoPaths = Array.isArray(window.GuestlandRoomPhotos)
        ? window.GuestlandRoomPhotos.slice().sort(naturalCompare)
        : [];

    // The generated room collection is authoritative; legacy room records remain a no-manifest fallback.
    if (roomPhotoPaths.length) {
        galleryImages = galleryImages.filter(function (image) {
            return image.category !== 'rooms';
        });
    }

    galleryImages.forEach(function (image, index) {
        image.src = 'images/gallery/' + image.src;
        image.sourceType = 'legacy';
        image.sourceIndex = index;

        if (image.category === 'rooms') {
            image.category = /single\s+non\s+ac\s+room/i.test(image.src)
                ? 'room-cozy-single-non-ac'
                : 'room-deluxe-double-ac';
        }
    });

    roomPhotoPaths.forEach(function (path, index) {
        var roomCategory = getRoomCategory(path);

        galleryImages.push({
            src: path,
            category: roomCategory.id,
            alt: roomCategory.label + ' at Guestland Homestay.',
            sourceType: 'room',
            sourceIndex: index
        });
    });

    galleryImages.forEach(function (image) {
        if (!categoryLabelAliases[image.category]) {
            categoryLabelAliases[image.category] = formatRoomLabel(image.category);
        }

        if (imageSources[image.src]) {
            throw new Error('Gallery image listed more than once: ' + image.src);
        }

        imageSources[image.src] = true;

        if (!categoryLookup[image.category]) {
            categoryLookup[image.category] = {
                id: image.category,
                label: categoryLabelAliases[image.category],
                images: []
            };
        }

        categoryLookup[image.category].images.push(image);
    });

    var categories = Object.keys(categoryLookup).map(function (categoryId) {
        var category = categoryLookup[categoryId];

        category.images.sort(function (left, right) {
            if (left.sourceType !== right.sourceType) {
                return left.sourceType === 'room' ? -1 : 1;
            }

            if (left.sourceType === 'room') {
                return naturalCompare(left.src, right.src);
            }

            return left.sourceIndex - right.sourceIndex;
        });

        category.cover = category.images[0];

        category.images.forEach(function (image, index) {
            if (image.sourceType === 'room') {
                image.alt = 'View of the ' + category.label + ' at Guestland Homestay, photo ' + (index + 1) + ' of ' + category.images.length + '.';
            }
        });

        return category;
    }).sort(function (left, right) {
        var leftPriority = categoryPriority.indexOf(left.id);
        var rightPriority = categoryPriority.indexOf(right.id);

        leftPriority = leftPriority === -1
            ? (left.id.indexOf('room-') === 0 ? 2.5 : categoryPriority.length)
            : leftPriority;
        rightPriority = rightPriority === -1
            ? (right.id.indexOf('room-') === 0 ? 2.5 : categoryPriority.length)
            : rightPriority;

        return leftPriority === rightPriority
            ? naturalCompare(left.label, right.label)
            : leftPriority - rightPriority;
    });

    categories.forEach(function (category) {
        categoryLookup[category.id] = category;
    });

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
