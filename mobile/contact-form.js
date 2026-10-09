/* =========================================================
   AUTOMATELABS CONTACT FORM
   Static-site delivery via FormSubmit.
   Submissions are delivered to contact@automatelabs.me.
========================================================= */
(function () {
  'use strict';

  const ENDPOINT = 'https://formsubmit.co/ajax/contact@automatelabs.me';

  function setupContactForm(form) {
    if (!form || form.dataset.contactReady === 'true') return;
    form.dataset.contactReady = 'true';

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const submit = form.querySelector('.contact-submit[type="submit"]');
      const originalHTML = submit ? submit.innerHTML : '';

      if (submit) {
        submit.disabled = true;
        submit.innerHTML = 'Sending… <span>→</span>';
      }

      const data = {};
      new FormData(form).forEach((value, key) => {
        data[key] = value;
      });

      data._subject = 'New AutomateLabs website enquiry';
      data._captcha = 'true';
      data._template = 'table';
      data._url = window.location.href;

      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) {
          throw new Error(result.message || 'Submission failed');
        }

        form.reset();

        if (submit) {
          submit.innerHTML = 'Request sent ✓';
        }

        showFormMessage(
          form,
          'Thanks. Your request has been sent to AutomateLabs. We’ll get back to you shortly.',
          false
        );
      } catch (error) {
        console.error('Contact form submission failed:', error);

        if (submit) {
          submit.disabled = false;
          submit.innerHTML = originalHTML;
        }

        showFormMessage(
          form,
          'We could not send the request. Please email contact@automatelabs.me directly.',
          true
        );
      }
    });
  }

  function showFormMessage(form, message, isError) {
    let box = form.querySelector('.contact-form-message');

    if (!box) {
      box = document.createElement('p');
      box.className = 'contact-form-message';
      box.setAttribute('role', 'status');
      form.appendChild(box);
    }

    box.textContent = message;
    box.dataset.error = isError ? 'true' : 'false';
  }

  function init() {
    document.querySelectorAll('form.contact-form').forEach(setupContactForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
