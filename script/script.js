/* =========================================================
   PRODUCT CATALOGUE
========================================================= */

const products = [
  {
    id: 'booking',
    name: 'Online Booking System',
    tag: 'FOR APPOINTMENT-BASED WORK',
    price: 390,
    scopeShort: '1 booking system · up to 5 services',
    desc: 'Customers choose a service, see available times and book online while you stay in control of the schedule.',
    benefits: [
      'Fewer scheduling messages',
      'A clear booking experience',
      'You control services and available times'
    ],
    page: '../products/online-booking.html',
    visual: 'booking'
  },

  {
    id: 'chatbot',
    name: 'AI Chatbot',
    tag: 'FOR HELPFUL CUSTOMER CONVERSATIONS',
    price: 900,
    scopeShort: '1 chatbot · 1 knowledge setup',
    desc: 'A website chatbot answers common questions, guides visitors and passes enquiries to your team.',
    benefits: [
      'Answers common questions',
      'Guides visitors to the right service',
      'You control the information'
    ],
    page: '../products/ai-chatbot.html',
    visual: 'chat'
  },

  {
    id: 'automation',
    name: 'Workflow Automation',
    tag: 'FOR EVERYDAY WORKFLOWS',
    price: 480,
    scopeShort: '1 workflow · up to 5 actions · 2 connections',
    desc: 'Connect services, move information and handle repetitive steps automatically.',
    benefits: [
      'Less repetitive work',
      'Connected information flow',
      'Adjust or pause any workflow'
    ],
    page: '../products/routine-automation.html',
    visual: 'workflow'
  },

  {
    id: 'upgrade',
    name: 'Website Upgrade',
    tag: 'FOR A BETTER ONLINE FIRST IMPRESSION',
    price: 590,
    scopeShort: 'Up to 5 pages · desktop + mobile',
    desc: 'Make an existing website clearer, more modern and easier to use on mobile.',
    benefits: [
      'Modern, clear design',
      'Made for phones',
      'A clearer path for customers'
    ],
    page: '../products/website-upgrade.html',
    visual: 'upgrade'
  }
];


/* =========================================================
   SHARED BOOKING DEMO
========================================================= */

const bookingServices = [
  { id: 'free-consultation', name: 'Free consultation', duration: '15 min', price: 0 },
  { id: 'custom-meeting', name: 'Custom solution meeting', duration: '60 min', price: 90 }
];

const bookingTimes = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];

function getNextBookingDates(count = 5) {
  const dates = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function bookingDateMarkup() {
  return getNextBookingDates().map((date, index) => {
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'short' });
    const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return `<button type="button" data-date="${iso}" title="${date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}" class="${index === 0 ? 'date-active' : ''}"><span>${weekday}</span><br><b>${day}</b></button>`;
  }).join('');
}

function bookingServiceMarkup() {
  return bookingServices.map((service, index) => `
    <button type="button" class="service-choice booking-service-option ${index === 0 ? 'selected' : ''}" data-service="${service.id}" aria-pressed="${index === 0 ? 'true' : 'false'}">
      <span class="service-icon">✦</span>
      <span class="service-copy">
        <strong>${service.name}</strong>
        <small>${service.duration} · ${service.price === 0 ? 'Free' : `€${service.price}`}</small>
      </span>
      <b class="booking-service-check">${index === 0 ? '✓' : ''}</b>
    </button>
  `).join('');
}

function bookingMarkup() {
  return `
    <div class="booking-body">
      <p class="mini-label">ONLINE BOOKING · LIVE PREVIEW</p>
      <h3>Find a time that works</h3>

      <div class="booking-steps">
        <span class="selected">1 Service</span><span>→</span><span>2 Time</span><span>→</span><span>3 Confirm</span>
      </div>

      <div class="booking-service-options">
        ${bookingServiceMarkup()}
      </div>

      <div class="booking-label">Choose a date</div>
      <div class="mini-calendar booking-demo-dates">${bookingDateMarkup()}</div>

      <div class="booking-label">Available times</div>
      <div class="booking-demo-times">
        ${bookingTimes.map((time, index) => `<button type="button" class="${index === 0 ? 'selected' : ''}">${time}</button>`).join('')}
      </div>

      <button type="button" class="preview-cta booking-demo-confirm">Confirm booking →</button>
      <p class="booking-demo-status" aria-live="polite"></p>
    </div>
  `;
}

function bookingDateLabel(button) {
  if (!button) return '';
  const date = new Date(`${button.dataset.date}T12:00:00`);
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function initBookingWidget(widget) {
  if (!widget) return;

  const services = [...widget.querySelectorAll('.booking-service-option')];
  const dates = [...widget.querySelectorAll('.booking-demo-dates button')];
  const times = [...widget.querySelectorAll('.booking-demo-times button')];
  const status = widget.querySelector('.booking-demo-status');
  const confirm = widget.querySelector('.booking-demo-confirm');

  let selectedService = bookingServices[0];

  const update = () => {
    const date = widget.querySelector('.booking-demo-dates .date-active');
    const time = widget.querySelector('.booking-demo-times .selected');
    if (!status || !date || !time) return;
    status.textContent = `Selected: ${selectedService.name} · ${bookingDateLabel(date)} at ${time.textContent}`;
  };

  services.forEach(option => {
    const selectService = () => {
      selectedService = bookingServices.find(item => item.id === option.dataset.service) || bookingServices[0];
      services.forEach(item => {
        const selected = item === option;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
        const check = item.querySelector('.booking-service-check');
        if (check) check.textContent = selected ? '✓' : '';
      });
      update();
    };
    option.addEventListener('click', selectService);
    option.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectService();
      }
    });
  });

  dates.forEach(button => {
    button.addEventListener('click', () => {
      dates.forEach(item => item.classList.remove('date-active'));
      button.classList.add('date-active');
      update();
    });
  });

  times.forEach(button => {
    button.addEventListener('click', () => {
      times.forEach(item => item.classList.remove('selected'));
      button.classList.add('selected');
      update();
    });
  });

  confirm?.addEventListener('click', () => {
    const original = confirm.textContent;
    confirm.textContent = 'Booking selected ✓';
    if (status) status.textContent = `Demo only · ${selectedService.name} selected for ${bookingDateLabel(widget.querySelector('.booking-demo-dates .date-active'))} at ${widget.querySelector('.booking-demo-times .selected')?.textContent || ''}.`;
    window.setTimeout(() => {
      confirm.textContent = original;
      update();
    }, 2200);
  });

  update();
}


/* =========================================================
   CAROUSEL STATE
========================================================= */

let current = 0;

let cart = [];
try {
  const stored = JSON.parse(localStorage.getItem('al-cart') || '[]');
  if (Array.isArray(stored)) cart = products.filter(p => stored.some(item => item?.id === p.id));
} catch { /* The catalogue remains usable when storage is unavailable. */ }


/* =========================================================
   PRODUCT VISUALS
========================================================= */

const visual = (type) => {

  /* =========================================================
     ONLINE BOOKING
  ========================================================= */

  if (type === 'booking') {
    return `
      <div class="booking-app">

        <div class="booking-topbar">
          <div>
            <strong>Studio North</strong>
            <small>Online booking</small>
          </div>

          <span class="booking-avatar">S</span>
        </div>

        <div class="booking-heading">
          <small>ONLINE BOOKING</small>
          <h4>Find a time that works</h4>
        </div>

        <div class="booking-steps">
          <strong>1 Service</strong>
          <span>→</span>
          <span>2 Time</span>
          <span>→</span>
          <span>3 Confirm</span>
        </div>

        <div class="booking-service">

          <div class="booking-service-icon">
            ✦
          </div>

          <div>
            <strong>Consultation</strong>
            <small>45 min · €45</small>
          </div>

          <span class="booking-check">
            ✓
          </span>

        </div>

        <div class="booking-label">
          Choose a date
        </div>

        <div class="booking-dates">

          <div>
            <small>MON</small>
            <strong>12</strong>
          </div>

          <div class="selected">
            <small>TUE</small>
            <strong>13</strong>
          </div>

          <div>
            <small>WED</small>
            <strong>14</strong>
          </div>

          <div>
            <small>THU</small>
            <strong>15</strong>
          </div>

          <div>
            <small>FRI</small>
            <strong>16</strong>
          </div>

        </div>

        <div class="booking-label">
          Available times
        </div>

        <div class="booking-times">
          <span>13:00</span>
          <span class="selected">14:30</span>
          <span>16:00</span>
        </div>

        <div class="booking-confirm">
          <strong>Choose 14:30</strong>
          <span>→</span>
        </div>

      </div>
    `;
  }


  /* =========================================================
     AI CHATBOT
  ========================================================= */

  if (type === 'chat') {
    return `
      <div class="chat-preview">

        <div class="chat-header">
          <div class="chat-status"></div>

          <div>
            <strong>AutomateLabs Bot</strong>
            <small>Replies instantly</small>
          </div>

          <span>•••</span>
        </div>

        <div class="chat-messages">

          <div class="chat-bubble">
            Hi! How can I help today?
          </div>

          <div class="chat-bubble me">
            Do you have a free time tomorrow?
          </div>

          <div class="chat-bubble">
            Yes. Tuesday or Thursday are available.
          </div>

        </div>

        <div class="chat-input">
          <span>Ask a question...</span>
          <b>↑</b>
        </div>

      </div>
    `;
  }


  /* =========================================================
     ROUTINE AUTOMATION
  ========================================================= */

  if (type === 'workflow') {
    return `
      <div class="workflow-preview">

        <div class="workflow-header">
          <div>
            <strong>New enquiry</strong>
            <small>Workflow running</small>
          </div>

          <span class="workflow-live">
            LIVE
          </span>
        </div>

        <div class="workflow-line"></div>

        <div class="workflow-card">
          <span class="workflow-icon">✦</span>

          <div>
            <strong>New enquiry</strong>
            <small>Website form received</small>
          </div>

          <b>✓</b>
        </div>

        <div class="workflow-connector"></div>

        <div class="workflow-card">
          <span class="workflow-icon">↗</span>

          <div>
            <strong>Add to list</strong>
            <small>Customer details saved</small>
          </div>

          <b>✓</b>
        </div>

        <div class="workflow-connector"></div>

        <div class="workflow-card">
          <span class="workflow-icon">✓</span>

          <div>
            <strong>Send update</strong>
            <small>Customer notified</small>
          </div>

          <b>✓</b>
        </div>

      </div>
    `;
  }


  /* =========================================================
     WEBSITE UPGRADE
  ========================================================= */

  if (type === 'upgrade') {
    return `
      <div class="upgrade-preview">

        <div class="upgrade-browser">

          <div class="browser-top">
            <span></span>
            <span></span>
            <span></span>

            <div class="browser-address">
              example.com
            </div>
          </div>

          <div class="browser-body">

            <div class="browser-nav">
              <strong>Studio</strong>
              <span>Services</span>
              <span>About</span>
              <span>Contact</span>
            </div>

            <div class="upgrade-hero">

              <div>
                <small>BEFORE</small>

                <strong>
                  Small text.<br>
                  Hard to use.
                </strong>

                <span class="fake-line short"></span>
                <span class="fake-line"></span>
              </div>

              <div class="upgrade-new">
                <small>AFTER</small>

                <strong>
                  Clear.<br>
                  Made for phones.
                </strong>

                <span class="fake-line short"></span>
                <span class="fake-line"></span>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  }


  /* =========================================================
     FALLBACK
  ========================================================= */

  return `
    <div class="visual-placeholder">
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;
};

/* =========================================================
   CAROUSEL
========================================================= */

let carouselTimer;
let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;


function carouselOffset(index) {

  let offset = index - current;

  if (offset > products.length / 2) {
    offset -= products.length;
  }

  if (offset < -products.length / 2) {
    offset += products.length;
  }

  return offset;
}


function updateCarousel() {

  const stage = document.querySelector('.product-stage');
  const dots = document.querySelector('.carousel-dots');
  const progress = document.querySelector('.carousel-progress span');

  if (!stage) return;


  stage
    .querySelectorAll('.product-card')
    .forEach((card, index) => {

      const offset = carouselOffset(index);

      const active = offset === 0;
      const adjacent = Math.abs(offset) === 1;

      card.classList.toggle('current', active);
      card.classList.toggle('adjacent', adjacent);
      card.classList.toggle(
        'distant',
        !active && !adjacent
      );

      const distance =
        matchMedia('(max-width:760px)').matches
          ? 0
          : 73;

      card.style.setProperty(
        '--card-translate',
        String(offset * distance) + '%'
      );

      card.style.zIndex =
        active
          ? '3'
          : adjacent
            ? '2'
            : '1';

      card.setAttribute(
        'aria-hidden',
        String(!active)
      );

      if ('inert' in card) {
        card.inert = !active;
      }
    });


  dots
    ?.querySelectorAll('button')
    .forEach((dot, index) => {

      dot.classList.toggle(
        'active',
        index === current
      );

    });


  if (progress) {

    progress.classList.remove('running');

    void progress.offsetWidth;

    progress.classList.add('running');
  }
}


function renderCarousel() {

  const stage = document.querySelector('.product-stage');
  const dots = document.querySelector('.carousel-dots');

  if (!stage) return;


  if (!stage.children.length) {

    products.forEach(p => {

      const card =
        document.createElement('article');

      card.className = 'product-card';


      card.innerHTML = `
        <div class="product-content">

          <span class="product-tag">
            ${p.tag}
          </span>

          <h3>
            ${p.name}
          </h3>

          <p>
            ${p.desc}
          </p>

          <ul class="product-benefits">
            ${p.benefits
              .map(x => `<li>${x}</li>`)
              .join('')}
          </ul>

          <div class="product-scope-short">
            <span>PACKAGE INCLUDES</span>
            <strong>${p.scopeShort || ''}</strong>
          </div>

          <div class="product-actions">

            <button
              class="button primary small-button order"
              data-id="${p.id}"
            >
              Order · €${p.price}
            </button>

            <a
              class="button ghost small-button"
              href="${p.page}"
            >
              Learn more
            </a>

          </div>

        </div>

        <div class="product-visual">
          ${visual(p.visual)}
        </div>
      `;

      stage.append(card);
    });


    dots.innerHTML =
      products
        .map(
          (p, i) => `
            <button
              aria-label="Show ${p.name}"
              data-index="${i}"
            ></button>
          `
        )
        .join('');
  }


  updateCarousel();
}


function setCurrent(index) {

  current =
    (index + products.length) %
    products.length;

  renderCarousel();

  clearInterval(carouselTimer);

  carouselTimer = setInterval(
    () => setCurrent(current + 1),
    8000
  );
}


/* =========================================================
   MOBILE SWIPE
========================================================= */

function setupProductSwipe() {
  const stage = document.querySelector('.product-stage');
  if (!stage || stage.dataset.swipeReady === 'true') return;

  stage.dataset.swipeReady = 'true';

  stage.addEventListener('touchstart', (event) => {
    if (!matchMedia('(max-width:760px)').matches) return;

    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchTracking = true;
  }, { passive: true });

  stage.addEventListener('touchend', (event) => {
    if (!touchTracking || !matchMedia('(max-width:760px)').matches) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    touchTracking = false;

    if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return;

    if (dx < 0) {
      setCurrent(current + 1);
    } else {
      setCurrent(current - 1);
    }
  }, { passive: true });
}

/* =========================================================
   CART
========================================================= */

function save() {

  try { localStorage.setItem('al-cart', JSON.stringify(cart)); } catch { /* Keep the cart in memory. */ }


  document
    .querySelectorAll('.cart-count')
    .forEach(e => {
      e.textContent = cart.length;
    });


  const items =
    document.querySelector('.cart-items');

  const empty =
    document.querySelector('.cart-empty');

  const total =
    document.querySelector('.cart-total');


  if (!items) return;


  items.innerHTML =
    cart
      .map(
        (x, i) => `
          <div class="cart-item">

            <div>
              <b>${x.name}</b>
              <span>€${x.price}</span>
            </div>

            <button
              data-remove="${i}"
              aria-label="Remove ${x.name}"
            >
              Remove
            </button>

          </div>
        `
      )
      .join('');


  empty.hidden = !!cart.length;


  total.textContent =
    '€' +
    cart.reduce(
      (n, x) => n + x.price,
      0
    );
}


function openCart() {

  document
    .querySelector('.cart-drawer')
    ?.classList.add('open');

  document
    .querySelector('.drawer-backdrop')
    ?.classList.add('open');
}


function closeCart() {

  document
    .querySelector('.cart-drawer')
    ?.classList.remove('open');

  document
    .querySelector('.drawer-backdrop')
    ?.classList.remove('open');
}


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  en: {},

  ru: {
    'nav.products': 'Продукты',
    'nav.custom': 'Индивидуально',
    'nav.how': 'Как это работает',

    'hero.eyebrow':
      'ЦИФРОВЫЕ ПРОДУКТЫ, КОТОРЫЕ ПОМОГАЮТ',

    'hero.title':
      'Пусть сайт делает<br><em>рутинную работу.</em>',

    'hero.text':
      'Упростите запись, вопросы клиентов и ежедневные задачи — чтобы больше времени оставалось на важное.',

    'hero.cta':
      'Смотреть продукты',

    'hero.secondary':
      'Как это работает →',

    'hero.note':
      'Вы всё контролируете. Мы берём на себя повторяемое.',

    'products.eyebrow':
      'ГОТОВЫЕ ПРОДУКТЫ',

    'products.title':
      'Полезно с первого дня.<br><em>Создано для вас.</em>',

    'products.text':
      'Начните с понятного продукта и настройте его под себя.',

    'custom.eyebrow':
      'НУЖНО ЧТО-ТО ДРУГОЕ?',

    'custom.title':
      'У вашей работы свой ритм.<br><em>Построим вокруг него.</em>',

    'custom.text':
      'Создадим практичное цифровое решение для ваших людей, процесса и клиентов.',

    'custom.cta':
      'Индивидуальное решение',

    'how.eyebrow':
      'ПРОСТО ПО УМОЛЧАНИЮ',

    'how.title':
      'Понятный путь к<br><em>лёгкой работе.</em>',

    'how.oneTitle':
      'Выберите продукт',

    'how.oneText':
      'Выберите понятную отправную точку для нужного улучшения.',

    'how.twoTitle':
      'Настройте под себя',

    'how.twoText':
      'Задайте услуги, правила, контент и связи для вашего бизнеса.',

    'how.threeTitle':
      'Пользуйтесь уверенно',

    'how.threeText':
      'Продукт берёт рутину, а финальное слово за вами.',

    'closing.eyebrow':
      'КОГДА БУДЕТЕ ГОТОВЫ',

    'closing.title':
      'Больше места для людей.<br><em>Меньше — для рутины.</em>',

    'closing.cta':
      'Найти продукт',

    'cart.label':
      'Корзина',

    'cart.title':
      'Ваша корзина',

    'cart.empty':
      'Ваша корзина готова, когда будете вы.',

    'cart.total':
      'Итого',

    'cart.checkout':
      'Оформить',

    'footer':
      'Полезные цифровые продукты для ежедневной работы.'
  },

  et: {
    'nav.products': 'Tooted',
    'nav.custom': 'Eritöö',
    'nav.how': 'Kuidas see toimib',

    'hero.eyebrow':
      'DIGITOOTED, MIS AITAVAD',

    'hero.title':
      'Las veebileht teeb ära<br><em>kiire töö.</em>',

    'hero.text':
      'Muuda broneerimine, kliendiküsimused ja igapäevased rutiinid lihtsamaks.',

    'hero.cta':
      'Vaata tooteid',

    'hero.secondary':
      'Vaata, kuidas see toimib →',

    'hero.note':
      'Sina juhid. Meie aitame korduva tööga.',

    'products.eyebrow':
      'VALMISTOOTED',

    'products.title':
      'Kasulik esimesest päevast.<br><em>Loodud sulle sobima.</em>',

    'products.text':
      'Alusta selge tootega ja tee see enda omaks.',

    'custom.eyebrow':
      'VAJAD MIDAGI MUUD?',

    'custom.title':
      'Sinu tööl on oma rütm.<br><em>Ehitame selle ümber.</em>',

    'custom.text':
      'Loome praktilise digilahenduse sinu inimeste, protsessi ja klientide ümber.',

    'custom.cta':
      'Eritellimuslahendus',

    'how.eyebrow':
      'LIHTNE DISAINILT',

    'how.title':
      'Selge tee<br><em>lihtsama tööni.</em>',

    'how.oneTitle':
      'Vali toode',

    'how.oneText':
      'Vali praktiline lähtekoht sellele, mida soovid parandada.',

    'how.twoTitle':
      'Tee enda omaks',

    'how.twoText':
      'Seadista teenused, reeglid, sisu ja ühendused.',

    'how.threeTitle':
      'Kasuta kindlalt',

    'how.threeText':
      'Toode hoolitseb rutiini eest, lõppsõna jääb sulle.',

    'closing.eyebrow':
      'KUI OLED VALMIS',

    'closing.title':
      'Rohkem ruumi inimestele.<br><em>Vähem rutiinile.</em>',

    'closing.cta':
      'Leia oma toode',

    'cart.label':
      'Ostukorv',

    'cart.title':
      'Sinu ostukorv',

    'cart.empty':
      'Ostukorv ootab sind.',

    'cart.total':
      'Kokku',

    'cart.checkout':
      'Kassasse',

    'footer':
      'Kasulikud digitooted igapäevatööks.'
  }
};


/* =========================================================
   LANGUAGE
========================================================= */

function language(lang) {

  try { localStorage.setItem('al-lang', lang); } catch { /* Optional preference. */ }

  document.documentElement.lang =
    lang;


  document
    .querySelectorAll('[data-i18n]')
    .forEach(el => {

      const value =
        translations[lang]?.[
          el.dataset.i18n
        ];

      if (value) {
        el.textContent = value;
      }
    });


  document
    .querySelectorAll('[data-i18n-html]')
    .forEach(el => {

      const value =
        translations[lang]?.[
          el.dataset.i18nHtml
        ];

      if (value) {
        el.innerHTML = value;
      }
    });


  document
    .querySelectorAll('[data-lang]')
    .forEach(button => {

      button.classList.toggle(
        'active',
        button.dataset.lang === lang
      );
    });
}


/* =========================================================
   GLOBAL CLICK HANDLER
========================================================= */

document.addEventListener('click', async e => {

  if (e.target.closest('.next')) {
    setCurrent(current + 1);
  }


  if (e.target.closest('.previous')) {
    setCurrent(current - 1);
  }


  const dot =
    e.target.closest('[data-index]');

  if (dot) {
    setCurrent(+dot.dataset.index);
  }


  const order =
    e.target.closest('.order');

  if (order) {

    const product =
      products.find(
        p => p.id === order.dataset.id
      );

    if (product) {
      if (!cart.some(item => item.id === product.id)) cart.push(product);
      save();
      openCart();
    }
  }


  if (e.target.closest('.cart-button')) {
    openCart();
  }


  if (
    e.target.closest(
      '.drawer-close, .drawer-backdrop'
    )
  ) {
    closeCart();
  }


  const remove =
    e.target.closest('[data-remove]');

  if (remove) {

    cart.splice(
      +remove.dataset.remove,
      1
    );

    save();
  }


  if (e.target.closest('.checkout')) {

    if (!cart.length) {
        return;
    }

    const button = e.target.closest('.checkout');

    button.disabled = true;
    button.textContent = 'Opening checkout...';

    try {

        const response = await fetch(
            '/api/create-checkout-session',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    language: document.documentElement.lang,
                    cart: cart.map(item => ({
                        id: item.id
                    }))
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || 'Checkout failed.'
            );
        }

        if (!data.url) {
            throw new Error(
                'Stripe did not return a checkout URL.'
            );
        }

        window.location.href = data.url;

    } catch (error) {

        console.error(
            '[CHECKOUT] Stripe error:',
            error
        );

        alert(
            'Unable to open checkout. Please try again.'
        );

        button.disabled = false;

        button.textContent =
            'Checkout';
    }
}


});


/* =========================================================
   INITIALISE
========================================================= */

document.querySelector('.copyright') &&
  (
    document.querySelector('.copyright').textContent =
      `© ${new Date().getFullYear()} AutomateLabs`
  );


if (document.querySelector('.product-stage')) {
  renderCarousel();
  setupProductSwipe();
  carouselTimer = setInterval(
    () => setCurrent(current + 1),
    8000
  );
  addEventListener('resize', updateCarousel);
}


save();


const initialPageLanguage = document.documentElement.lang;
language('en');


/* =========================================================
   PRODUCT LANDING PAGES
========================================================= */

(() => {

  const productPageLocale = ['ru', 'et'].includes(initialPageLanguage)
    ? initialPageLanguage
    : 'en';

  const pageData = {

    'online-booking': {
      id: 'booking',
      price: 390,
      kind: 'booking',
      content: {
        en: {
          title: 'An online booking system built around your schedule.',
          lead: 'Customers choose a service, see available times and book online without waiting for a reply. You stay in control of the services, schedule and booking rules.',
          tag: 'FOR APPOINTMENT-BASED WORK',
          scopeTitle: 'What the €390 package covers',
          scopeIntro: 'A ready-to-use booking experience configured around your services, working hours and booking rules.',
          scope: [
            'One embedded booking system',
            'Up to 5 services',
            'Availability, duration and booking rules',
            'Mobile-friendly setup and launch'
          ],
          scopeNote: 'Additional booking flows, payments, calendar connections or complex integrations can be scoped separately.',
          steps: [
            'Choose a service',
            'Pick an available time',
            'Confirm the appointment'
          ],
          benefits: [
            'Customers can book without waiting for a reply',
            'Fewer back-and-forth scheduling messages',
            'Availability and booking rules stay under your control'
          ],
          control: [
            'Services & duration',
            'Working hours & availability',
            'Booking rules & customer flow'
          ]
        },
        et: {
          title: 'Broneerimissüsteem sinu graafiku järgi.',
          lead: 'Kliendid valivad teenuse, näevad vabu aegu ja broneerivad veebis. Sina määrad teenused, graafiku ja broneerimisreeglid.',
          tag: 'AJAPÕHISELE TÖÖLE',
          scopeTitle: 'Mida sisaldab €390 pakett',
          scopeIntro: 'Valmis broneerimisvoog, mis on seadistatud sinu teenuste ja graafiku järgi.',
          scope: [
            'Üks broneerimissüsteem',
            'Kuni 5 teenust',
            'Kestus, vabad ajad ja broneerimisreeglid',
            'Mobiilisõbralik seadistus ja käivitamine'
          ],
          scopeNote: 'Täiendavad broneerimisvood ja keerukad integratsioonid saab eraldi kokku leppida.',
          steps: [
            'Vali teenus',
            'Vali vaba aeg',
            'Kinnita broneering'
          ],
          benefits: [
            'Kliendid saavad broneerida vastust ootamata',
            'Vähem sõnumeid sobiva aja leidmiseks',
            'Saadavus ja broneerimisreeglid jäävad sinu kontrolli alla'
          ],
          control: [
            'Teenused ja kestus',
            'Tööaeg ja saadavus',
            'Broneerimisreeglid ja klienditeekond'
          ]
        },
        ru: {
          title: 'Система онлайн-бронирования под ваше расписание.',
          lead: 'Клиенты выбирают услугу, видят свободное время и записываются онлайн. Вы настраиваете услуги, график и правила бронирования.',
          tag: 'ДЛЯ РАБОТЫ ПО ЗАПИСИ',
          scopeTitle: 'Что входит в пакет за €390',
          scopeIntro: 'Готовый процесс онлайн-записи, настроенный под ваши услуги и график.',
          scope: [
            'Одна система записи',
            'До 5 услуг',
            'Длительность, свободное время и правила записи',
            'Адаптация для мобильных устройств и запуск'
          ],
          scopeNote: 'Дополнительные сценарии записи и сложные интеграции рассчитываются отдельно.',
          steps: [
            'Выберите услугу',
            'Выберите свободное время',
            'Подтвердите запись'
          ],
          benefits: [
            'Клиенты записываются, не ожидая ответа',
            'Меньше переписки для согласования времени',
            'Доступность и правила записи остаются под вашим контролем'
          ],
          control: [
            'Услуги и длительность',
            'Рабочие часы и доступность',
            'Правила записи и путь клиента'
          ]
        }
      }
    },


    'ai-chatbot': {
      id: 'chatbot',
      price: 900,
      kind: 'chat',
      content: {
        en: {
          title: 'An AI chatbot that answers common customer questions.',
          lead: 'A website chatbot gives visitors clear answers, guides them to the right next step and passes enquiries to your team using content you approve.',
          tag: 'FOR HELPFUL CUSTOMER CONVERSATIONS',
          scopeTitle: 'What the €900 package covers',
          scopeIntro: 'A website chatbot with a clearly defined knowledge base and enquiry handover.',
          scope: [
            'One website chatbot',
            'One knowledge base/content setup',
            'Basic enquiry handover',
            'Testing and launch'
          ],
          scopeNote: 'Larger knowledge bases, advanced integrations or additional chatbots are scoped separately.',
          steps: [
            'Visitor asks a question',
            'Chatbot guides them clearly',
            'You receive the enquiry'
          ],
          benefits: [
            'Answers routine questions',
            'Guides people to the right service',
            'You choose the information it uses'
          ],
          control: [
            'Answers & tone',
            'Escalation rules',
            'Lead notifications'
          ]
        },
        et: {
          title: 'AI chatbot, mis vastab levinud kliendiküsimustele.',
          lead: 'AI chatbot annab veebilehe külastajatele selged vastused, juhatab nad sobiva järgmise sammuni ja edastab päringud sinu tiimile.',
          tag: 'ABIVALMIS KLIENDIVESTLUSTELE',
          scopeTitle: 'Mida sisaldab €900 pakett',
          scopeIntro: 'Selge töömahuga veebichatbot, millele seadistame teadmistebaasi ja päringute edastamise.',
          scope: [
            'Üks veebichatbot',
            'Ühe teadmistebaasi ja sisu seadistus',
            'Päringute põhiline edastus',
            'Testimine ja käivitamine'
          ],
          scopeNote: 'Suurema teadmistebaasi, keerukad integratsioonid või mitu chatboti lepime eraldi kokku.',
          steps: [
            'Külastaja esitab küsimuse',
            'Chatbot juhendab teda selgelt',
            'Sina saad päringu kätte'
          ],
          benefits: [
            'Vastab korduvatele küsimustele',
            'Juhatab inimesed sobiva teenuseni',
            'Sina valid, millist infot chatbot kasutab'
          ],
          control: [
            'Vastused ja suhtlusstiil',
            'Päringute edastamise reeglid',
            'Teavitused päringutest'
          ]
        },
        ru: {
          title: 'Чат-бот для сайта отвечает клиентам в любое время.',
          lead: 'AI-чат-бот отвечает на частые вопросы, помогает посетителям сориентироваться и передаёт обращения вашей команде.',
          tag: 'ДЛЯ ПОЛЕЗНЫХ ДИАЛОГОВ С КЛИЕНТАМИ',
          scopeTitle: 'Что входит в пакет за €900',
          scopeIntro: 'Чат-бот для сайта с согласованным объёмом базы знаний и передачей обращений.',
          scope: [
            'Один чат-бот на сайте',
            'Настройка одной базы знаний и контента',
            'Базовая передача обращений',
            'Тестирование и запуск'
          ],
          scopeNote: 'Большие базы знаний, сложные интеграции и несколько сценариев можно рассчитать отдельно.',
          steps: [
            'Посетитель задаёт вопрос',
            'Чат-бот даёт понятный ответ',
            'Вы получаете обращение'
          ],
          benefits: [
            'Отвечает на типовые вопросы',
            'Помогает выбрать подходящую услугу',
            'Вы определяете, какую информацию он использует'
          ],
          control: [
            'Ответы и стиль общения',
            'Правила передачи обращений',
            'Уведомления о заявках'
          ]
        }
      }
    },


    'routine-automation': {
      id: 'automation',
      price: 480,
      kind: 'workflow',
      content: {
        en: {
          title: 'Business automation for repetitive tasks.',
          lead: 'We build one clearly defined workflow that connects up to two services, moves information and handles routine actions automatically.',
          tag: 'FOR EVERYDAY WORKFLOWS',
          scopeTitle: 'What the €480 package covers',
          scopeIntro: 'One clearly defined automation workflow.',
          scope: [
            '1 automation workflow',
            'Up to 5 workflow actions',
            'Up to 2 external service connections',
            'Testing, handover and basic adjustments'
          ],
          scopeNote: 'Additional workflows, actions or complex custom integrations can be scoped separately.',
          steps: [
            'A trigger starts the flow',
            'Information moves where needed',
            'You can review every result'
          ],
          benefits: [
            'Less copying and checking',
            'Clearer information flow',
            'Pause or adjust a workflow anytime'
          ],
          control: [
            'Triggers',
            'Actions',
            'Workflow controls'
          ]
        },
        et: {
          title: 'Töövoogude automatiseerimine, mis vähendab käsitsitööd.',
          lead: 'Automatiseerime ühe selgelt piiritletud töövoo, mis ühendab teenused, edastab andmed ja teeb korduvad toimingud automaatselt.',
          tag: 'IGAPÄEVASTELE TÖÖVOOGUDELE',
          scopeTitle: 'Mida sisaldab €480 pakett',
          scopeIntro: 'Üks selgelt piiritletud automatiseerimise töövoog.',
          scope: [
            '1 automatiseerimise töövoog',
            'Kuni 5 tegevust töövoos',
            'Kuni 2 välise teenuse ühendamine',
            'Testimine, üleandmine ja väiksemad kohandused'
          ],
          scopeNote: 'Täiendavad töövood, tegevused ja keerukad integratsioonid saab eraldi kokku leppida.',
          steps: [
            'Käivitaja alustab töövoogu',
            'Info liigub õigesse kohta',
            'Saad iga tulemuse üle vaadata'
          ],
          benefits: [
            'Vähem kopeerimist ja kontrollimist',
            'Selgem infovoog',
            'Töövoogu saab igal ajal peatada või muuta'
          ],
          control: [
            'Käivitajad',
            'Tegevused',
            'Töövoo juhtimine'
          ]
        },
        ru: {
          title: 'Автоматизация бизнес-процессов для повторяющихся задач.',
          lead: 'Создаём один чётко определённый рабочий процесс, который связывает сервисы, передаёт данные и автоматически выполняет рутинные действия.',
          tag: 'ДЛЯ ЕЖЕДНЕВНЫХ ПРОЦЕССОВ',
          scopeTitle: 'Что входит в пакет за €480',
          scopeIntro: 'Один чётко определённый процесс автоматизации.',
          scope: [
            '1 сценарий автоматизации',
            'До 5 действий в процессе',
            'Подключение до 2 внешних сервисов',
            'Тестирование, передача и базовые правки'
          ],
          scopeNote: 'Дополнительные сценарии, действия и сложные интеграции можно рассчитать отдельно.',
          steps: [
            'Триггер запускает процесс',
            'Информация передаётся куда нужно',
            'Вы можете проверить каждый результат'
          ],
          benefits: [
            'Меньше копирования и проверок',
            'Более понятный поток информации',
            'Процесс можно остановить или изменить в любой момент'
          ],
          control: [
            'Триггеры',
            'Действия',
            'Управление процессом'
          ]
        }
      }
    },


    'website-upgrade': {
      id: 'upgrade',
      price: 590,
      kind: 'upgrade',
      content: {
        en: {
          title: 'A practical website upgrade for a clearer online presence.',
          lead: 'This website development and redesign package improves up to five existing pages, making the site clearer, more modern and easier to use on mobile.',
          tag: 'FOR A BETTER FIRST IMPRESSION',
          scopeTitle: 'What the €590 package covers',
          scopeIntro: 'A defined upgrade package. Larger sites or more complex work are quoted separately.',
          scope: [
            'Up to 5 existing pages',
            'Responsive redesign for desktop and mobile',
            'One visual direction and component system',
            'Content/layout cleanup and launch'
          ],
          scopeNote: 'Large-scale copywriting, e-commerce, complex integrations and additional pages are not included.',
          steps: [
            'We shape clear content',
            'Design for every screen',
            'Publish a polished experience'
          ],
          benefits: [
            'Modern, clear presentation',
            'Comfortable on phones',
            'A smoother path for customers'
          ],
          control: [
            'Content',
            'Visual direction',
            'Pages & calls to action'
          ]
        },
        et: {
          title: 'Kodulehe uuendamine, mis lihtsustab kasutamist.',
          lead: 'Veebiarenduse ja ümberkujunduse pakett hõlmab kuni viit olemasolevat lehte ning muudab kodulehe selgemaks, kaasaegsemaks ja mobiilisõbralikuks.',
          tag: 'PAREMALE ESIMESELE MULJELE',
          scopeTitle: 'Mida sisaldab €590 pakett',
          scopeIntro: 'Selgelt piiritletud kodulehe uuendus. Suuremad veebilehed ja keerukamad tööd hinnatakse eraldi.',
          scope: [
            'Kuni 5 olemasolevat lehte',
            'Kohanduv kujundus arvutile ja mobiilile',
            'Üks visuaalne suund ja komponendisüsteem',
            'Sisu ja paigutuse korrastus ning avaldamine'
          ],
          scopeNote: 'Ei sisalda mahukat sisuloomet, e-kaubandust, keerukaid integratsioone ega paketiväliseid lehti.',
          steps: [
            'Muudame sisu selgeks',
            'Kujundame iga ekraani jaoks',
            'Avaldame viimistletud veebilehe'
          ],
          benefits: [
            'Kaasaegne ja selge esitlus',
            'Mugav kasutada telefonis',
            'Sujuvam teekond klientidele'
          ],
          control: [
            'Sisu',
            'Visuaalne suund',
            'Lehed ja tegevuskutsed'
          ]
        },
        ru: {
          title: 'Обновление сайта: удобно на любом устройстве.',
          lead: 'В пакет входят разработка и редизайн до пяти существующих страниц, чтобы сайт стал понятнее, современнее и удобнее на мобильных устройствах.',
          tag: 'ДЛЯ ЛУЧШЕГО ПЕРВОГО ВПЕЧАТЛЕНИЯ',
          scopeTitle: 'Что входит в пакет за €590',
          scopeIntro: 'Обновление сайта с чётким объёмом работ. Большие сайты и сложные задачи рассчитываются отдельно.',
          scope: [
            'До 5 существующих страниц',
            'Адаптивный редизайн для компьютеров и мобильных устройств',
            'Одно визуальное направление и система компонентов',
            'Обновление структуры и запуск'
          ],
          scopeNote: 'Не входят большой объём копирайтинга, интернет-магазины, сложные интеграции и дополнительные страницы.',
          steps: [
            'Делаем содержание понятным',
            'Проектируем для каждого экрана',
            'Публикуем готовый сайт'
          ],
          benefits: [
            'Современная и понятная подача',
            'Удобство на мобильных устройствах',
            'Более простой путь для клиентов'
          ],
          control: [
            'Содержание',
            'Визуальное направление',
            'Страницы и призывы к действию'
          ]
        }
      }
    },


    'custom': {
      id: 'custom',
      price: null,
      kind: 'custom',
      content: {
        en: {
          title: 'Custom AI automation that fits the way you work.',
          lead: 'When a ready-made product does not fit, we scope an automation or AI solution around your team, tools and customer journey.',
          tag: 'TAILORED TO YOUR WORK',
          scopeTitle: 'A scope built around your needs',
          scopeIntro: 'Start with the outcome you want. We agree the approach, scope and quote before work begins.',
          scope: ['Your requirements and priorities', 'A proposed workflow and connections', 'An agreed scope and quote', 'Testing and handover planned together'],
          scopeNote: 'The scope and price are agreed before development begins.',
          steps: [
            'Tell us what you need',
            'We map a practical approach',
            'Build a solution that fits'
          ],
          benefits: [
            'Built for your actual workflow',
            'Clear scope and useful outcomes',
            'Room to grow and adjust'
          ],
          control: [
            'The experience',
            'Business rules',
            'Connections'
          ]
        },
        et: {
          title: 'Sinu ettevõttele loodud AI-lahendused ja automatiseerimine.',
          lead: 'Kui valmistoode ei sobi, loome sinu tiimi, töövahendite ja klientide vajadustest lähtuva automatiseerimise või AI-lahenduse.',
          tag: 'SINU TÖÖLE KOHANDATUD',
          scopeTitle: 'Sinu vajadustele vastav töömaht',
          scopeIntro: 'Alustame soovitud tulemusest. Lepime lähenemise, töömahu ja hinna kokku enne töö algust.',
          scope: ['Sinu nõuded ja prioriteedid', 'Töövoo ja vajalike ühenduste ettepanek', 'Kokkulepitud töömaht ja hind', 'Ühine testimise ja üleandmise plaan'],
          scopeNote: 'Töömaht ja hind lepitakse kokku enne arenduse algust.',
          steps: [
            'Räägi, mida vajad',
            'Kaardistame praktilise lähenemise',
            'Loome sobiva lahenduse'
          ],
          benefits: [
            'Loodud sinu tegeliku töövoo järgi',
            'Selge töömaht ja kasulik tulemus',
            'Ruumi kasvada ja lahendust kohandada'
          ],
          control: [
            'Kasutuskogemus',
            'Ärireeglid',
            'Ühendused'
          ]
        },
        ru: {
          title: 'AI-решения и автоматизация под задачи вашего бизнеса.',
          lead: 'Если готовый продукт не подходит, создадим автоматизацию или AI-решение с учётом ваших процессов, инструментов и клиентов.',
          tag: 'ПОД ВАШУ РАБОТУ',
          scopeTitle: 'Объём работ под ваши задачи',
          scopeIntro: 'Расскажите о желаемом результате. Подход, объём и стоимость согласуем до начала работ.',
          scope: ['Ваши требования и приоритеты', 'Предложение по процессу и интеграциям', 'Согласованный объём и стоимость', 'Совместный план тестирования и передачи'],
          scopeNote: 'Объём и стоимость согласуются до начала разработки.',
          steps: [
            'Расскажите о задаче',
            'Мы предложим практичный подход',
            'Создадим подходящее решение'
          ],
          benefits: [
            'Создано под ваш рабочий процесс',
            'Понятный объём и полезный результат',
            'Возможность развивать и изменять решение'
          ],
          control: [
            'Пользовательский опыт',
            'Бизнес-правила',
            'Интеграции'
          ]
        }
      }
    }

  };


  const escape = s =>
    s.replace(
      /[&<>]/g,
      c =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;'
        }[c])
    );


  const page = document.querySelector('.product-page');
  if (page) {
    const product = pageData[document.body.dataset.productPage];
    const content = product?.content[productPageLocale];
    const p = product && content
      ? { id: product.id, price: product.price, kind: product.kind, ...content }
      : null;
    if (p) window.ALProductPages.render(p, bookingMarkup);
  }


  /* Shared interactive booking demo on the landing page and Online Booking page. */
  const landingBooking = document.querySelector('[data-booking-widget="landing"]');
  if (landingBooking) {
    landingBooking.innerHTML = `
      <div class="preview-top">
        <span>AutomateLabs</span>
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="preview-avatar">A</span>
      </div>
      ${bookingMarkup()}
    `;
    initBookingWidget(landingBooking);
  }

  if (document.body.dataset.productPage === 'online-booking') {
    initBookingWidget(document.querySelector('.product-booking-preview'));
  }


  /*
   * Capture the original English DOM once.
   * The pre-existing localisation object omitted it.
   */

  if (
    typeof translations !== 'undefined' &&
    (
      !translations.en ||
      !Object.keys(translations.en).length
    )
  ) {

    translations.en = {};


    document
      .querySelectorAll('[data-i18n]')
      .forEach(el => {

        translations.en[
          el.dataset.i18n
        ] = el.textContent;

      });


    document
      .querySelectorAll('[data-i18n-html]')
      .forEach(el => {

        translations.en[
          el.dataset.i18nHtml
        ] = el.innerHTML;

      });
  }

})();
