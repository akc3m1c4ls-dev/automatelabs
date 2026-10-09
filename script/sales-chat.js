/* One accessible assistant for desktop, mobile and all three languages. */
(() => {
  if (document.getElementById('al-chat-widget')) return;
  const language = ['ru', 'et'].includes(document.documentElement.lang) ? document.documentElement.lang : 'en';
  const prefix = language === 'ru' ? '/RU' : language === 'et' ? '/EE' : '';
  const product = document.body.dataset.productPage || null;
  const t = {
    en: { label: 'Find the right solution', title: 'Product advisor · AI', close: 'Close assistant', placeholder: 'What would you like to simplify?', send: 'Send message', welcome: 'Hi! What takes up too much time in your business? I can help you compare packages, understand the scope, or plan your next step.', productWelcome: 'Hi! Have a question about this package? Tell me what you need and I’ll help you check whether it fits.', fit: 'Is this right for me?', scope: 'What’s included?', compare: 'Help me choose', prices: 'Compare prices', fitPrompt: 'Help me work out whether this package fits my business. What do you need to know?', scopePrompt: 'What is included in this package, and what costs extra?', comparePrompt: 'Help me choose a product for my business. Ask me one question to start.', pricesPrompt: 'What are your product prices and package limits?', contact: 'Send an enquiry', view: 'View package', browse: 'Browse products', note: 'AI assistant · Please don’t share sensitive information.', error: 'The assistant could not connect. Try again, or use “Send an enquiry” to contact the team.', limited: 'Please wait a moment before sending another message.', retry: 'Try again', clear: 'Clear conversation' },
    ru: { label: 'Подберём решение', title: 'Помощник по продуктам · ИИ', close: 'Закрыть помощника', placeholder: 'Что вы хотите упростить?', send: 'Отправить', welcome: 'Здравствуйте! Что отнимает больше всего времени в вашем бизнесе? Помогу сравнить пакеты, разобраться в их составе и выбрать следующий шаг.', productWelcome: 'Здравствуйте! Есть вопрос об этом пакете? Расскажите о задаче — помогу оценить, подходит ли он вам.', fit: 'Подойдёт ли мне?', scope: 'Что входит?', compare: 'Помогите выбрать', prices: 'Сравнить цены', fitPrompt: 'Помогите понять, подходит ли этот пакет моему бизнесу. Что вам нужно знать?', scopePrompt: 'Что входит в этот пакет и что оплачивается отдельно?', comparePrompt: 'Помогите выбрать продукт для моего бизнеса. Начните с одного вопроса.', pricesPrompt: 'Какие у вас цены и ограничения пакетов?', contact: 'Отправить запрос', view: 'Открыть пакет', browse: 'Все продукты', note: 'ИИ-помощник · Не отправляйте конфиденциальные данные.', error: 'Не удалось связаться с помощником. Повторите попытку или нажмите «Отправить запрос», чтобы связаться с командой.', limited: 'Пожалуйста, немного подождите перед следующим сообщением.', retry: 'Повторить', clear: 'Очистить диалог' },
    et: { label: 'Leiame sobiva lahenduse', title: 'Tootenõustaja · AI', close: 'Sulge assistent', placeholder: 'Mida soovid lihtsamaks teha?', send: 'Saada sõnum', welcome: 'Tere! Mis võtab sinu ettevõttes liiga palju aega? Aitan võrrelda pakette, mõista töömahtu ja valida järgmise sammu.', productWelcome: 'Tere! Kas sul on selle paketi kohta küsimusi? Räägi oma vajadustest ja aitame selgitada, kas see sobib.', fit: 'Kas see sobib mulle?', scope: 'Mida pakett sisaldab?', compare: 'Aita valida', prices: 'Võrdle hindu', fitPrompt: 'Aita mõista, kas see pakett sobib minu ettevõttele. Mida pead teadma?', scopePrompt: 'Mida see pakett sisaldab ja mis maksab lisaks?', comparePrompt: 'Aita valida minu ettevõttele toode. Alusta ühest küsimusest.', pricesPrompt: 'Millised on teie toodete hinnad ja pakettide piirid?', contact: 'Saada päring', view: 'Vaata paketti', browse: 'Kõik tooted', note: 'AI-assistent · Ära jaga tundlikke andmeid.', error: 'Assistent ei saanud ühendust. Proovi uuesti või vali „Saada päring”, et tiimiga ühendust võtta.', limited: 'Palun oota enne järgmise sõnumi saatmist.', retry: 'Proovi uuesti', clear: 'Tühjenda vestlus' }
  }[language];

  const inlineChat = document.querySelector('[data-inline-chat]');
  if (inlineChat) {
    const messages = inlineChat.querySelector('[data-inline-chat-messages]');
    const form = inlineChat.querySelector('[data-inline-chat-form]');
    const input = form?.querySelector('textarea');
    const send = form?.querySelector('[type="submit"]');
    const reset = inlineChat.querySelector('[data-inline-chat-reset]');
    const quickButtons = [...inlineChat.querySelectorAll('[data-chat-prompt]')];
    const key = 'al-inline-chat-v1-' + language;
    let history = [];
    let busy = false;

    try {
      const stored = JSON.parse(sessionStorage.getItem(key) || '[]');
      if (Array.isArray(stored)) history = stored
        .filter(item => ['user', 'assistant'].includes(item?.role) && typeof item.content === 'string')
        .slice(-12)
        .map(item => ({ role: item.role, content: item.content.slice(0, 2000) }));
    } catch { /* Inline chat also works without storage. */ }

    const persist = () => {
      try { sessionStorage.setItem(key, JSON.stringify(history)); } catch { /* Optional continuity. */ }
    };

    const addMessage = (text, role = 'assistant') => {
      const item = document.createElement('div');
      item.className = 'product-inline-chat-message ' + role;
      const bubble = document.createElement('div');
      bubble.className = 'product-inline-chat-bubble';
      bubble.textContent = text;
      item.append(bubble);
      messages.append(item);
      messages.scrollTop = messages.scrollHeight;
      return item;
    };

    const showWelcome = () => addMessage(inlineChat.dataset.welcome || t.productWelcome);

    async function sendInlineMessage(value) {
      const message = value.trim();
      if (!message || busy || message.length > 2000) return;
      busy = true;
      inlineChat.setAttribute('aria-busy', 'true');
      send.disabled = true;
      reset.disabled = true;
      quickButtons.forEach(button => { button.disabled = true; });
      input.value = '';
      input.style.height = 'auto';
      addMessage(message, 'user');
      const typing = addMessage('…');
      typing.classList.add('typing');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history, language, product }),
          signal: controller.signal
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || typeof data.reply !== 'string' || !data.reply.trim()) {
          const error = new Error('Chat unavailable');
          error.status = response.status;
          throw error;
        }
        typing.remove();
        addMessage(data.reply);
        history = [...history, { role: 'user', content: message }, { role: 'assistant', content: data.reply }].slice(-12);
        persist();
      } catch (error) {
        typing.remove();
        addMessage(error.status === 429 ? t.limited : t.error, 'error');
      } finally {
        clearTimeout(timeout);
        busy = false;
        inlineChat.removeAttribute('aria-busy');
        send.disabled = false;
        reset.disabled = false;
        quickButtons.forEach(button => { button.disabled = false; });
        input.focus();
        messages.scrollTop = messages.scrollHeight;
      }
    }

    showWelcome();
    history.forEach(item => addMessage(item.content, item.role));
    quickButtons.forEach(button => button.addEventListener('click', () => sendInlineMessage(button.dataset.chatPrompt || '')));
    form?.addEventListener('submit', event => { event.preventDefault(); sendInlineMessage(input.value); });
    input?.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        sendInlineMessage(input.value);
      }
    });
    input?.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 110) + 'px';
    });
    reset?.addEventListener('click', () => {
      if (busy) return;
      history = [];
      persist();
      messages.replaceChildren();
      showWelcome();
      input.focus();
    });
    return;
  }

  const launcher = document.createElement('button');
  launcher.id = 'al-chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', t.label);
  launcher.setAttribute('aria-controls', 'al-chat-widget');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = `<span class="al-chat-order-hint">${t.label} <b>→</b></span><span class="al-chat-icon"><img src="/icons/favicon.png" alt=""></span>`;
  const widget = document.createElement('section');
  widget.id = 'al-chat-widget';
  widget.hidden = true;
  widget.setAttribute('role', 'dialog');
  widget.setAttribute('aria-label', t.title);
  widget.innerHTML = `<div class="al-chat-header"><div class="al-chat-brand"><img src="/icons/favicon.png" alt=""><div><strong>AutomateLabs</strong><span>${t.title}</span></div></div><button type="button" class="al-chat-close" aria-label="${t.close}">×</button></div><div class="al-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div><div class="al-chat-handoff"><a href="${product ? '#contact' : prefix + '/products.html#contact'}">${t.contact} ↗</a><a href="${product ? prefix + '/products/' + product + '.html#scope' : prefix + '/products.html'}">${product ? t.view : t.browse}</a></div><form class="al-chat-input-area"><label class="al-sr-only" for="al-chat-text">${t.placeholder}</label><textarea id="al-chat-text" class="al-chat-input" placeholder="${t.placeholder}" rows="1" maxlength="2000" required></textarea><button type="submit" class="al-chat-send" aria-label="${t.send}">↑</button><small class="al-chat-disclaimer">${t.note}</small><button type="button" class="al-chat-reset">${t.clear}</button></form>`;
  document.body.append(launcher, widget);
  const messages = widget.querySelector('.al-chat-messages');
  const input = widget.querySelector('textarea');
  const send = widget.querySelector('.al-chat-send');
  const reset = widget.querySelector('.al-chat-reset');
  const key = 'al-chat-v2-' + language;
  let history = [];
  let busy = false;
  let returnFocus = launcher;
  try {
    const stored = JSON.parse(sessionStorage.getItem(key) || '[]');
    if (Array.isArray(stored)) history = stored.filter(m => ['user', 'assistant'].includes(m?.role) && typeof m.content === 'string').slice(-12).map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));
  } catch { /* Chat also works without storage. */ }
  function persist() { try { sessionStorage.setItem(key, JSON.stringify(history)); } catch { /* Optional continuity. */ } }
  function addMessage(text, role = 'assistant') {
    const item = document.createElement('div'); item.className = 'al-chat-message ' + role;
    const bubble = document.createElement('div'); bubble.className = 'al-chat-bubble'; bubble.textContent = text;
    item.append(bubble); messages.append(item); messages.scrollTop = messages.scrollHeight; return item;
  }
  function welcome() {
    addMessage(product ? t.productWelcome : t.welcome);
    const actions = document.createElement('div'); actions.className = 'al-chat-actions';
    const options = product ? [[t.fit, t.fitPrompt], [t.scope, t.scopePrompt]] : [[t.compare, t.comparePrompt], [t.prices, t.pricesPrompt]];
    options.forEach(([label, prompt]) => { const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.addEventListener('click', () => sendMessage(prompt)); actions.append(button); });
    messages.append(actions);
  }
  function open() {
    returnFocus = document.activeElement;
    widget.hidden = false; launcher.hidden = true; launcher.setAttribute('aria-expanded', 'true');
    if (!messages.children.length) { welcome(); history.forEach(m => addMessage(m.content, m.role)); }
    input.focus(); messages.scrollTop = messages.scrollHeight;
  }
  function close() { widget.hidden = true; launcher.hidden = false; launcher.setAttribute('aria-expanded', 'false'); returnFocus?.focus(); }
  async function sendMessage(value) {
    const message = value.trim();
    if (!message || busy || message.length > 2000) return;
    busy = true; send.disabled = true; reset.disabled = true;
    widget.querySelectorAll('.al-chat-actions button').forEach(b => { b.disabled = true; });
    input.value = ''; input.style.height = 'auto'; addMessage(message, 'user');
    const typing = addMessage('…'); typing.classList.add('al-chat-typing');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, history, language, product }), signal: controller.signal });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== 'string' || !data.reply.trim()) { const error = new Error('Chat unavailable'); error.status = response.status; throw error; }
      typing.remove(); addMessage(data.reply);
      history = [...history, { role: 'user', content: message }, { role: 'assistant', content: data.reply }].slice(-12); persist();
    } catch (error) {
      typing.remove(); addMessage(error.status === 429 ? t.limited : t.error, 'error');
      const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'al-chat-retry'; retry.textContent = t.retry;
      retry.addEventListener('click', () => { if (!busy) { retry.remove(); sendMessage(message); } }); messages.append(retry);
    } finally {
      clearTimeout(timeout); busy = false; send.disabled = false; reset.disabled = false;
      widget.querySelectorAll('.al-chat-actions button').forEach(b => { b.disabled = false; });
      if (!widget.hidden) input.focus(); messages.scrollTop = messages.scrollHeight;
    }
  }
  launcher.addEventListener('click', open);
  window.addEventListener('al:open-chat', open);
  widget.querySelector('.al-chat-close').addEventListener('click', close);
  widget.querySelector('form').addEventListener('submit', event => { event.preventDefault(); sendMessage(input.value); });
  widget.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(); } });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); sendMessage(input.value); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; });
  reset.addEventListener('click', () => { if (!busy) { history = []; persist(); messages.replaceChildren(); welcome(); input.focus(); } });
  widget.querySelectorAll('.al-chat-handoff a').forEach(a => a.addEventListener('click', () => { if (a.getAttribute('href').startsWith('#')) close(); }));
})();
