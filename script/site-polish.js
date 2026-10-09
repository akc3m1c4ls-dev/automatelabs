(() => {
  const lang = document.documentElement.lang;
  const labels = lang === 'ru'
    ? { close: 'Закрыть корзину', open: 'Открыть корзину', cart: 'Корзина', skip: 'К содержанию', menu: 'Открыть меню' }
    : lang === 'et'
      ? { close: 'Sulge ostukorv', open: 'Ava ostukorv', cart: 'Ostukorv', skip: 'Sisu juurde', menu: 'Ava menüü' }
      : { close: 'Close cart', open: 'Open cart', cart: 'Shopping cart', skip: 'Skip to content', menu: 'Open menu' };
  const currentLanguage = ['ru', 'et'].includes(lang) ? lang : 'en';
  document.querySelectorAll('[data-lang]').forEach(button => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.removeAttribute('onclick');
    button.addEventListener('click', event => {
      event.stopPropagation();
      const prefix = button.dataset.lang === 'ru' ? '/RU' : button.dataset.lang === 'et' ? '/EE' : '';
      let path = location.pathname.replace(/^\/mobile(?=\/|$)/, '').replace(/^\/(RU|EE)(?=\/|$)/, '');
      if (path === '/' || path === '/index.html') path = '/index.html';
      location.assign(prefix + path + location.search + location.hash);
    });
  });
  document.querySelectorAll('.logo-mark').forEach(mark => {
    if (mark.tagName === 'IMG') return;
    const image = document.createElement('img'); image.className = 'logo-mark'; image.src = '/icons/favicon.png'; image.alt = ''; mark.replaceWith(image);
  });
  const main = document.querySelector('main');
  if (main) {
    if (!main.id) main.id = 'main-content';
    const skip = document.createElement('a'); skip.href = '#' + main.id; skip.textContent = labels.skip; skip.className = 'al-skip-link'; document.body.prepend(skip);
  }
  const header = document.querySelector('.navbar');
  const desktopNavigation = header?.querySelector('.nav-links');
  if (header && desktopNavigation && !document.querySelector('.mobile-menu')) {
    const menuId = 'mobile-navigation';
    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'menu-button';
    menuButton.setAttribute('aria-label', labels.menu);
    menuButton.setAttribute('aria-controls', menuId);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
    const menu = document.createElement('nav');
    menu.id = menuId;
    menu.className = 'mobile-menu';
    menu.setAttribute('aria-label', labels.menu);
    menu.innerHTML = desktopNavigation.innerHTML;
    header.append(menuButton);
    header.insertAdjacentElement('afterend', menu);
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
      if (restoreFocus) menuButton.focus();
    };
    menuButton.addEventListener('click', event => {
      event.stopPropagation();
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });
    menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  }
  const drawer = document.querySelector('.cart-drawer');
  if (drawer) {
    drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-label', labels.cart);
    drawer.querySelector('.drawer-close')?.setAttribute('aria-label', labels.close);
    let previousFocus;
    const update = () => {
      const opened = drawer.classList.contains('open');
      drawer.inert = !opened; drawer.setAttribute('aria-hidden', String(!opened));
      document.querySelectorAll('.cart-button').forEach(b => {
        b.setAttribute('aria-expanded', String(opened));
        b.setAttribute('aria-haspopup', 'dialog');
        b.setAttribute('aria-label', labels.open);
      });
      if (opened) { previousFocus = document.activeElement; drawer.querySelector('.drawer-close')?.focus(); }
      else if (previousFocus) { previousFocus.focus(); previousFocus = null; }
    };
    new MutationObserver(update).observe(drawer, { attributes: true, attributeFilter: ['class'] }); update();
    drawer.addEventListener('keydown', event => {
      if (event.key === 'Escape') { document.querySelector('.drawer-close')?.click(); }
      if (event.key === 'Tab') {
        const buttons = [...drawer.querySelectorAll('button:not(:disabled), a[href], input')];
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
  }
  const updateCheckout = () => {
    const empty = !document.querySelector('.cart-item');
    document.querySelectorAll('.checkout').forEach(b => { b.disabled = empty; });
  };
  const items = document.querySelector('.cart-items');
  if (items) { new MutationObserver(updateCheckout).observe(items, { childList: true }); updateCheckout(); }
  document.querySelectorAll('form.contact-form').forEach(form => {
    form.method = 'post';
    form.action = 'https://formsubmit.co/contact@automatelabs.me';
    form.querySelector('[name="name"]')?.setAttribute('autocomplete', 'name');
    form.querySelector('[name="email"]')?.setAttribute('autocomplete', 'email');
    form.querySelector('[name="company"]')?.setAttribute('autocomplete', 'organization');
    if (!form.querySelector('[name="_honey"]')) {
      const honeypot = document.createElement('input');
      honeypot.type = 'text'; honeypot.name = '_honey'; honeypot.tabIndex = -1; honeypot.autocomplete = 'off'; honeypot.hidden = true;
      form.append(honeypot);
    }
  });
})();
