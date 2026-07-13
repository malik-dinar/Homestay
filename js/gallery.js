(function () {
    'use strict';

    var categories = [
        { id: 'exterior', label: 'Exterior' },
        { id: 'rooms', label: 'Rooms' },
        { id: 'bathrooms', label: 'Bathrooms' },
        { id: 'common-areas', label: 'Common Areas' },
        { id: 'dining', label: 'Dining' },
        { id: 'kitchen', label: 'Kitchen' },
        { id: 'outdoor-spaces', label: 'Outdoor Spaces' },
        { id: 'views', label: 'Views & Surroundings' },
        { id: 'details', label: 'Decor & Details' }
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

    if (!filterContainer || !galleryGrid || !galleryCount) {
        return;
    }

    var categoryLabels = {};
    var imageSources = {};
    var activeCategory = 'all';
    var filterTimer = null;
    var filterSequence = 0;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    categories.forEach(function (category) {
        categoryLabels[category.id] = category.label;
    });

    galleryImages.forEach(function (image) {
        if (!categoryLabels[image.category]) {
            throw new Error('Unknown gallery category: ' + image.category);
        }

        if (imageSources[image.src]) {
            throw new Error('Gallery image listed more than once: ' + image.src);
        }

        imageSources[image.src] = true;
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
            filterGallery(category);
        });

        return button;
    }

    function renderFilters() {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(createFilterButton('all', 'All'));

        categories.forEach(function (category) {
            fragment.appendChild(createFilterButton(category.id, category.label));
        });

        filterContainer.appendChild(fragment);
    }

    function createGalleryCard(image, index) {
        var card = document.createElement('figure');
        var media = document.createElement('div');
        var photo = document.createElement('img');
        var caption = document.createElement('figcaption');
        var category = document.createElement('span');
        var title = document.createElement('h3');

        card.className = 'gallery-card';
        card.dataset.category = image.category;
        card.dataset.ratio = image.height / image.width;

        media.className = 'gallery-card-media';

        photo.alt = image.alt;
        photo.width = image.width;
        photo.height = image.height;
        photo.decoding = 'async';
        photo.loading = index < 4 ? 'eager' : 'lazy';

        if (index === 0) {
            photo.setAttribute('fetchpriority', 'high');
        }

        photo.src = 'images/gallery/' + image.src;

        caption.className = 'gallery-caption';
        category.className = 'gallery-caption-category';
        category.textContent = categoryLabels[image.category];
        title.className = 'gallery-caption-title';
        title.textContent = image.title;

        caption.appendChild(category);
        caption.appendChild(title);
        media.appendChild(photo);
        media.appendChild(caption);
        card.appendChild(media);

        return card;
    }

    function renderGallery() {
        var fragment = document.createDocumentFragment();

        galleryImages.forEach(function (image, index) {
            fragment.appendChild(createGalleryCard(image, index));
        });

        galleryGrid.appendChild(fragment);
        updateCount('all');

        window.requestAnimationFrame(function () {
            sizeGalleryCards();
            galleryGrid.classList.add('is-ready');
            galleryGrid.setAttribute('aria-busy', 'false');
        });
    }

    function sizeGalleryCards() {
        var styles = window.getComputedStyle(galleryGrid);
        var rowHeight = parseFloat(styles.gridAutoRows);
        var rowGap = parseFloat(styles.rowGap);

        if (!rowHeight || Number.isNaN(rowHeight)) {
            return;
        }

        Array.prototype.forEach.call(galleryGrid.children, function (card) {
            if (card.hidden) {
                return;
            }

            var width = card.getBoundingClientRect().width;

            if (!width) {
                return;
            }

            var height = Math.round(width * parseFloat(card.dataset.ratio));
            var rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
            card.style.height = height + 'px';
            card.style.gridRowEnd = 'span ' + rowSpan;
        });
    }

    function updateFilterButtons(category) {
        Array.prototype.forEach.call(filterContainer.children, function (button) {
            var isActive = button.dataset.category === category;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    function updateCount(category) {
        var count = category === 'all'
            ? galleryImages.length
            : galleryImages.filter(function (image) { return image.category === category; }).length;

        galleryCount.textContent = category === 'all'
            ? count + ' photographs'
            : count + ' of ' + galleryImages.length + ' photographs';
    }

    function finishFilter(cardsToHide, cardsToShow, sequence) {
        cardsToHide.forEach(function (card) {
            card.hidden = true;
            card.classList.remove('is-leaving');
        });

        cardsToShow.forEach(function (card) {
            card.hidden = false;
            card.classList.add('is-entering');
        });

        sizeGalleryCards();

        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                cardsToShow.forEach(function (card) {
                    card.classList.remove('is-entering');
                });

                if (sequence === filterSequence) {
                    galleryGrid.setAttribute('aria-busy', 'false');
                }
            });
        });
    }

    function filterGallery(category) {
        if (category === activeCategory || (category !== 'all' && !categoryLabels[category])) {
            return;
        }

        window.clearTimeout(filterTimer);
        activeCategory = category;
        filterSequence += 1;
        var sequence = filterSequence;
        galleryGrid.setAttribute('aria-busy', 'true');
        updateFilterButtons(category);
        updateCount(category);

        var cardsToHide = [];
        var cardsToShow = [];

        Array.prototype.forEach.call(galleryGrid.children, function (card) {
            card.classList.remove('is-leaving', 'is-entering');
            var shouldShow = category === 'all' || card.dataset.category === category;

            if (shouldShow && card.hidden) {
                cardsToShow.push(card);
            } else if (!shouldShow && !card.hidden) {
                cardsToHide.push(card);
            }
        });

        if (reduceMotion || cardsToHide.length === 0) {
            finishFilter(cardsToHide, cardsToShow, sequence);
            return;
        }

        cardsToHide.forEach(function (card) {
            card.classList.add('is-leaving');
        });

        filterTimer = window.setTimeout(function () {
            finishFilter(cardsToHide, cardsToShow, sequence);
        }, 220);
    }

    function observeGalleryWidth() {
        var previousWidth = 0;

        if ('ResizeObserver' in window) {
            var observer = new ResizeObserver(function (entries) {
                var width = entries[0].contentRect.width;

                if (Math.abs(width - previousWidth) > 1) {
                    previousWidth = width;
                    window.requestAnimationFrame(sizeGalleryCards);
                }
            });

            observer.observe(galleryGrid);
            return;
        }

        var resizeTimer = null;
        window.addEventListener('resize', function () {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(sizeGalleryCards, 100);
        });
    }

    renderFilters();
    renderGallery();
    observeGalleryWidth();
}());
