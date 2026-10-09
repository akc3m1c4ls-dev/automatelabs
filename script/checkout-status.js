(() => {
  const params = new URLSearchParams(location.search);
  const lang = ['en', 'ru', 'et'].includes(params.get('lang')) ? params.get('lang') : 'en';
  document.documentElement.lang = lang;
  const t = {
    en: { checking: 'Checking your payment…', wait: 'Please wait while we check your checkout status.', paid: 'Payment confirmed. Thank you.', next: 'Send us your project details and order reference so we can agree the setup and next steps.', pending: 'Payment is not confirmed yet.', pendingText: 'Payment may still be processing or checkout may be incomplete. Check again shortly. Please avoid paying twice.', error: 'We couldn’t verify your payment.', errorText: 'Please check your Stripe receipt or contact us before attempting another payment.', retry: 'Check again', contact: 'Send project details →', back: 'Back to products' },
    ru: { checking: 'Проверяем оплату…', wait: 'Пожалуйста, подождите, пока мы проверим статус.', paid: 'Оплата подтверждена. Спасибо.', next: 'Пришлите детали проекта и номер заказа, чтобы согласовать настройку и следующие шаги.', pending: 'Оплата пока не подтверждена.', pendingText: 'Платёж может обрабатываться или оформление не завершено. Проверьте позже. Не оплачивайте повторно.', error: 'Не удалось проверить оплату.', errorText: 'Проверьте квитанцию Stripe или свяжитесь с нами перед повторной оплатой.', retry: 'Проверить снова', contact: 'Отправить детали проекта →', back: 'К продуктам' },
    et: { checking: 'Kontrollime makset…', wait: 'Palun oota, kuni kontrollime makse olekut.', paid: 'Makse kinnitatud. Aitäh.', next: 'Saada oma projekti andmed ja tellimuse viide, et saaksime seadistuse ja järgmised sammud kokku leppida.', pending: 'Makse pole veel kinnitatud.', pendingText: 'Makse võib olla töötlemisel või ost jäi pooleli. Kontrolli peagi uuesti. Palun ära maksa topelt.', error: 'Makse kontrollimine ebaõnnestus.', errorText: 'Kontrolli Stripe’i kviitungit või võta enne uut makset meiega ühendust.', retry: 'Kontrolli uuesti', contact: 'Saada projekti andmed →', back: 'Tagasi toodete juurde' }
  }[lang];
  const title = document.getElementById('payment-title');
  const message = document.getElementById('payment-message');
  const retry = document.getElementById('payment-retry');
  const contact = document.getElementById('payment-contact');
  const back = document.getElementById('payment-products');
  const id = params.get('session_id');
  contact.textContent = t.contact; back.textContent = t.back; retry.textContent = t.retry;
  back.href = (lang === 'ru' ? '/RU' : lang === 'et' ? '/EE' : '') + '/products.html';
  if (id && /^cs_(test_|live_)?[A-Za-z0-9]{10,200}$/.test(id)) contact.href = 'mailto:contact@automatelabs.me?subject=' + encodeURIComponent('Project details · ' + id);
  async function check() {
    title.textContent = t.checking; message.textContent = t.wait; retry.hidden = true;
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      if (!id) throw new Error('Missing session');
      const response = await fetch('/api/checkout-status?session_id=' + encodeURIComponent(id), { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('Unverified');
      const data = await response.json();
      title.textContent = data.paid === true ? t.paid : t.pending;
      message.textContent = data.paid === true ? t.next : t.pendingText;
      retry.hidden = data.paid === true;
      if (data.paid === true) { try { localStorage.removeItem('al-cart'); } catch { /* Optional storage. */ } }
    } catch { title.textContent = t.error; message.textContent = t.errorText; retry.hidden = !id; }
    finally { clearTimeout(timeout); }
  }
  retry.addEventListener('click', check); check();
})();
