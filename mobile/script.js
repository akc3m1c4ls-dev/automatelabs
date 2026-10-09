/* =========================================================
   PRODUCT CATALOGUE
========================================================= */

const products = [
  {
    id: 'booking',
    name: 'Online Booking',
    tag: 'FOR APPOINTMENT-BASED WORK',
    price: 390,
    desc: 'Give customers a simple way to choose a service, a time and confirm—while you keep your schedule in hand.',
    benefits: [
      'Fewer scheduling messages',
      'Clear, professional booking',
      'You control services and availability'
    ],
    page: '../products/online-booking.html',
    visual: 'booking'
  },

  {
    id: 'chatbot',
    name: 'AI Chatbot',
    tag: 'FOR HELPFUL CUSTOMER CONVERSATIONS',
    price: 900,
    desc: 'A practical welcome on your website that answers routine questions, guides visitors and captures enquiries.',
    benefits: [
      'Answers common questions',
      'Helps visitors find their way',
      'You control the information'
    ],
    page: '../products/ai-chatbot.html',
    visual: 'chat'
  },

  {
    id: 'automation',
    name: 'Routine Task Automation',
    tag: 'FOR EVERYDAY WORKFLOWS',
    price: 480,
    desc: 'Let reliable workflows move information, send updates and handle repeatable actions while people focus on people.',
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
    desc: 'Refresh an older website into a clear, mobile-friendly place that feels as professional as your work.',
    benefits: [
      'Modern, clear design',
      'Made for phones',
      'A smoother customer experience'
    ],
    page: '../products/website-upgrade.html',
    visual: 'upgrade'
  }
];


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


  const lang =
    e.target.closest('[data-lang]');

  if (lang) {
    language(lang.dataset.lang);
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


renderCarousel();


carouselTimer = setInterval(
  () => setCurrent(current + 1),
  8000
);


addEventListener(
  'resize',
  updateCarousel
);


save();


language('en');


/* =========================================================
   PRODUCT LANDING PAGES
========================================================= */

(() => {

  const pageData = {

    'online-booking': {
      id: 'booking',
      title: 'Online booking that respects your time.',
      lead: 'Let customers choose a service, a time and confirm their visit while you keep your day moving.',
      price: 390,
      tag: 'FOR APPOINTMENT-BASED WORK',

      steps: [
        'Choose a service',
        'Pick an available time',
        'Confirm the appointment'
      ],

      benefits: [
        'Fewer scheduling messages',
        'A clear, professional booking experience',
        'Services, hours and booking rules stay under your control'
      ],

      control: [
        'Services & duration',
        'Availability',
        'Booking rules'
      ],

      kind: 'booking'
    },


    'ai-chatbot': {
      id: 'chatbot',
      title: 'A helpful first reply, around the clock.',
      lead: 'Give visitors clear answers, useful guidance and a simple way to get in touch—without losing your voice.',
      price: 900,
      tag: 'FOR HELPFUL CUSTOMER CONVERSATIONS',

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
      ],

      kind: 'chat'
    },


    'routine-automation': {
      id: 'automation',
      title: 'Keep work moving without the repeat work.',
      lead: 'Reliable workflows can send updates, move information and handle everyday actions so people can focus on people.',
      price: 480,
      tag: 'FOR EVERYDAY WORKFLOWS',

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
      ],

      kind: 'workflow'
    },


    'website-upgrade': {
      id: 'upgrade',
      title: 'A website that feels good to use.',
      lead: 'Refresh your online presence into a clear, mobile-friendly experience that represents your work well.',
      price: 590,
      tag: 'FOR A BETTER FIRST IMPRESSION',

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
      ],

      kind: 'upgrade'
    },


    'custom': {
      id: 'custom',
      title: 'A useful solution built around your work.',
      lead: 'For needs that do not fit a ready-made product, we create a clear digital workflow around your people and customers.',
      price: null,
      tag: 'TAILORED TO YOUR WORK',

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
      ],

      kind: 'custom'
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


  const page =
    document.querySelector('.product-page');


  if (page) {

    const p =
      pageData[
        document.body.dataset.productPage
      ];


    if (!p) return;


    const action =
      p.price

        ? `
          <button
            class="button primary order"
            data-id="${p.id}"
          >
            Order · €${p.price}
          </button>
        `

        : `
          <a
            class="button primary"
            href="mailto:contact@automatelabs.me?subject=Custom%20solution"
          >
            Tell us what you need
          </a>
        `;


    const visual =
      p.kind === 'chat'

        ? `
          <div class="chat-screen">
            <b>AutomateLabs assistant</b>
            <span class="chat-bubble">
              Hi! How can I help today?
            </span>
            <span class="chat-bubble me">
              Do you have availability this week?
            </span>
            <span class="chat-bubble">
              Yes—would Tuesday or Thursday suit you?
            </span>
          </div>
        `

        : p.kind === 'workflow'

          ? `
            <div class="flow-screen">
              <b>New enquiry received</b>
              <span>✓ Add customer details</span>
              <span>✓ Send a helpful update</span>
              <span>✓ Notify the right person</span>
            </div>
          `

          : p.kind === 'upgrade'

            ? `
              <div class="upgrade-screen">
                <div>
                  <small>BEFORE</small>
                  <b>
                    Small text<br>
                    Hard to use
                  </b>
                </div>

                <div>
                  <small>AFTER</small>
                  <b>
                    Clear, calm<br>
                    Made for phones
                  </b>
                </div>
              </div>
            `

            : `
              <div class="booking-screen">
                <small>SELECT A TIME</small>
                <b>Consultation</b>

                <div>
                  <span>Tue 13</span>
                  <strong>14:30</strong>
                  <span>15:30</span>
                </div>

                <button>
                  Confirm booking
                </button>
              </div>
            `;


    page.innerHTML = `
      <section class="product-hero">

        <div>

          <p class="eyebrow">
            ${p.tag}
          </p>

          <h1>
            ${p.title}
          </h1>

          <p class="lead">
            ${p.lead}
          </p>

          <div class="button-row">
            ${action}

            <a
              class="text-link"
              href="#experience"
            >
              See the experience ↓
            </a>
          </div>

        </div>

        <div class="product-hero-visual">
          ${visual}
        </div>

      </section>


      <section class="product-detail">

        <div>

          <p class="eyebrow">
            WHAT YOU GET
          </p>

          <h2>
            Useful without getting in the way.
          </h2>

        </div>

        <ul>
          ${p.benefits
            .map(
              x => `<li>✓ ${escape(x)}</li>`
            )
            .join('')}
        </ul>

      </section>


      <section
        id="experience"
        class="experience"
      >

        <p class="eyebrow">
          HOW IT FITS
        </p>

        <h2>
          Simple for your customers.<br>
          <em>Clear for you.</em>
        </h2>

        <div class="experience-grid">

          ${p.steps
            .map(
              (x, i) => `
                <article>

                  <span>
                    0${i + 1}
                  </span>

                  <b>
                    ${escape(x)}
                  </b>

                  <p>
                    The product becomes a calm, useful part of your everyday work.
                  </p>

                </article>
              `
            )
            .join('')}

        </div>

      </section>


      <section class="controls">

        <div>

          <p class="eyebrow">
            YOU STAY IN CONTROL
          </p>

          <h2>
            The product adapts to your business.
          </h2>

          <p>
            Adjust the parts that matter as your work changes.
            Automation supports your decisions; it never replaces them.
          </p>

        </div>


        <div>

          ${p.control
            .map(
              (x, i) => `
                <div>

                  <span>
                    0${i + 1}
                  </span>

                  <b>
                    ${escape(x)}
                  </b>

                  <i>✓</i>

                </div>
              `
            )
            .join('')}

        </div>

      </section>


      <section class="product-purchase">

        <p class="eyebrow">
          READY WHEN YOU ARE
        </p>

        <h2>
          ${
            p.price
              ? `Start with ${p.title.toLowerCase()}`
              : 'Let’s make it fit.'
          }
        </h2>

        <p>
          ${
            p.price
              ? `One clear product from €${p.price}. Add it to your cart whenever you’re ready.`
              : 'Share the outcome you want, and we’ll find a practical way forward.'
          }
        </p>

        ${action}

      </section>
    `;
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
