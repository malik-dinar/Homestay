(() => {
    const form = document.getElementById('contact-form');

    if (!form) {
        return;
    }

    const submitButton = document.getElementById('contact-submit');
    const status = document.getElementById('contact-form-status');
    const defaultButtonText = submitButton.textContent;

    const showStatus = (message, type) => {
        status.textContent = message;
        status.className = `form-status is-visible is-${type}`;
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const checkIn = form.elements.checkIn.value;
        const checkOut = form.elements.checkOut.value;

        if (checkIn && checkOut && checkOut <= checkIn) {
            showStatus('Please choose a check-out date after the check-in date.', 'error');
            form.elements.checkOut.focus();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        status.className = 'form-status';
        status.textContent = '';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'The message could not be sent.');
            }

            form.reset();
            showStatus('Thank you! Your message has been sent. We will get back to you soon.', 'success');
        } catch (error) {
            showStatus('Sorry, we could not send your message. Please try again or contact us by phone or email.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = defaultButtonText;
        }
    });
})();
