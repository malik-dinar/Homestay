(function () {
    'use strict';

    document.querySelectorAll('.room-slider').forEach(function (slider) {
        var slides = Array.prototype.slice.call(slider.querySelectorAll('.room-slide'));
        var previousButton = slider.querySelector('.room-slider-prev');
        var nextButton = slider.querySelector('.room-slider-next');
        var dotsContainer = slider.querySelector('.room-slider-dots');
        var count = slider.querySelector('.room-slider-count');
        var currentIndex = 0;
        var touchStartX = 0;

        if (slides.length < 2 || !previousButton || !nextButton || !dotsContainer) {
            return;
        }

        var dots = slides.map(function (_, index) {
            var dot = document.createElement('button');
            dot.className = 'room-slider-dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Show photo ' + (index + 1) + ' of ' + slides.length);
            dot.addEventListener('click', function () {
                showSlide(index);
            });
            dotsContainer.appendChild(dot);
            return dot;
        });

        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;

            if (!slides[currentIndex].getAttribute('src')) {
                slides[currentIndex].setAttribute('src', slides[currentIndex].getAttribute('data-src'));
            }

            slides.forEach(function (slide, slideIndex) {
                var isActive = slideIndex === currentIndex;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });

            dots.forEach(function (dot, dotIndex) {
                var isActive = dotIndex === currentIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });

            if (count) {
                count.textContent = (currentIndex + 1) + ' / ' + slides.length;
            }
        }

        previousButton.addEventListener('click', function () {
            showSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', function () {
            showSlide(currentIndex + 1);
        });

        slider.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                showSlide(currentIndex - 1);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                showSlide(currentIndex + 1);
            }
        });

        slider.addEventListener('touchstart', function (event) {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        slider.addEventListener('touchend', function (event) {
            var distance = event.changedTouches[0].clientX - touchStartX;

            if (Math.abs(distance) > 50) {
                showSlide(currentIndex + (distance < 0 ? 1 : -1));
            }
        }, { passive: true });

        showSlide(0);
    });
}());
