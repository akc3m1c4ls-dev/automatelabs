/* Shared form delivery through the site's existing FormSubmit integration. */
(() => {
  const locale = document.documentElement.lang;
  const t = {
    en: { sending: 'Sending…', sent: 'Request sent ✓', success: 'Thanks. Your enquiry was submitted. We’ll reply using the email you provided.', error: 'We could not send your enquiry. Your details are still here. Try again or email contact@automatelabs.me.', email: 'Email your enquiry instead' },
    ru: { sending: 'Отправляем…', sent: 'Запрос отправлен ✓', success: 'Спасибо. Запрос отправлен. Ответим на указанный адрес электронной почты.', error: 'Не удалось отправить запрос. Данные сохранены в форме. Попробуйте снова или напишите на contact@automatelabs.me.', email: 'Отправить запрос по почте' },
    et: { sending: 'Saadame…', sent: 'Päring saadetud ✓', success: 'Aitäh. Päring on saadetud. Vastame sinu antud e-posti aadressile.', error: 'Päringu saatmine ebaõnnestus. Andmed on vormis alles. Proovi uuesti või kirjuta contact@automatelabs.me.', email: 'Saada päring e-postiga' }
  }[locale] || { sending: 'Sending…', sent: 'Request sent ✓', success: 'Thanks. Your enquiry was submitted. We’ll reply using the email you provided.', error: 'We could not send your enquiry. Try again or email contact@automatelabs.me.', email: 'Email your enquiry instead' };
  function setup(form) {
    if (form.dataset.contactReady === 'true') return;
    form.dataset.contactReady = 'true';
    form.noValidate = false;
    if (!form.querySelector('[name="_honey"]')) {
      const honeypot = document.createElement('input');
      honeypot.type = 'text'; honeypot.name = '_honey'; honeypot.tabIndex = -1; honeypot.autocomplete = 'off'; honeypot.hidden = true;
      form.append(honeypot);
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (form.dataset.sending === 'true' || !form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form));
      if (data._honey) return;
      const button = form.querySelector('[type="submit"]');
      const original = button?.innerHTML;
      let status = form.querySelector('.contact-form-message');
      if (!status) { status = document.createElement('p'); status.className = 'contact-form-message'; status.setAttribute('role', 'status'); form.append(status); }
      status.replaceChildren();
      form.dataset.sending = 'true'; form.setAttribute('aria-busy', 'true');
      if (button) { button.disabled = true; button.textContent = t.sending; }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch('https://formsubmit.co/ajax/contact@automatelabs.me', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, _subject: 'AutomateLabs enquiry: ' + (data.product || 'Website'), _template: 'table', _url: location.href }), signal: controller.signal
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || ![true, 'true'].includes(result.success)) throw new Error('Submission not confirmed');
        status.dataset.error = 'false'; status.textContent = t.success; form.reset();
        if (button) button.textContent = t.sent;
      } catch {
        status.dataset.error = 'true'; status.textContent = t.error + ' ';
        const email = document.createElement('a'); email.textContent = t.email; email.href = 'mailto:contact@automatelabs.me?subject=' + encodeURIComponent('Enquiry: ' + (data.product || 'AutomateLabs')) + '&body=' + encodeURIComponent([data.name, data.email, data.company, data.message].filter(Boolean).join('\n\n')); status.append(email);
        if (button) button.innerHTML = original;
      } finally {
        clearTimeout(timeout); form.dataset.sending = 'false'; form.removeAttribute('aria-busy');
        if (button) button.disabled = false;
      }
    });
  }
  function init() { document.querySelectorAll('form.contact-form').forEach(setup); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
