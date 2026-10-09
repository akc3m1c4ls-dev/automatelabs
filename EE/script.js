/* =========================================================
   PRODUCT CATALOGUE
========================================================= */

const products = [
  {
    id: 'booking',
    name: 'Broneerimissüsteem',
    tag: 'AJAPÕHISELE TÖÖLE',
    price: 390,
    scopeShort: '1 broneerimissüsteem · kuni 5 teenust',
    desc: 'Kliendid valivad teenuse, näevad vabu aegu ja broneerivad veebis. Sina määrad teenused, graafiku ja reeglid.',
    benefits: ['Vähem ajakokkuleppimise sõnumeid','Selge broneerimiskogemus','Sina määrad teenused ja vabad ajad'],
    page: 'products/online-booking.html',
    visual: 'booking'
  },
  {
    id: 'chatbot',
    name: 'AI chatbot',
    tag: 'ABIVALMIS KLIENDIVESTLUSTELE',
    price: 900,
    scopeShort: '1 chatbot · 1 teadmistebaas',
    desc: 'AI chatbot vastab veebilehel levinud küsimustele, juhatab külastajaid ja kogub päringuid.',
    benefits: ['Vastab levinud küsimustele','Juhatab sobiva teenuseni','Sina valid, millist infot chatbot kasutab'],
    page: 'products/ai-chatbot.html',
    visual: 'chat'
  },
  {
    id: 'automation',
    name: 'Töövoogude automatiseerimine',
    tag: 'IGAPÄEVASTELE TÖÖVOOGUDELE',
    price: 480,
    scopeShort: '1 töövoog · kuni 5 tegevust · 2 ühendust',
    desc: 'Automatiseeritud töövoog edastab infot, saadab teavitusi ja teeb korduvad toimingud sinu eest.',
    benefits: ['Vähem korduvat tööd','Ühendatud infovoog','Iga töövoogu saab muuta või peatada'],
    page: 'products/routine-automation.html',
    visual: 'workflow'
  },
  {
    id: 'upgrade',
    name: 'Kodulehe uuendamine',
    tag: 'PAREMALE ESIMESELE MULJELE VEEBIS',
    price: 590,
    scopeShort: 'kuni 5 lehte · arvuti ja mobiil',
    desc: 'Muudame olemasoleva kodulehe selgemaks, kaasaegsemaks ja mobiilisõbralikuks.',
    benefits: ['Moodne ja selge disain','Mugav telefonis','Sujuvam kliendikogemus'],
    page: 'products/website-upgrade.html',
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
   SHARED BOOKING DEMO
========================================================= */

const bookingServices = [
  { id: 'free-consultation', name: 'Tasuta konsultatsioon', duration: '15 min', price: 0 },
  { id: 'custom-meeting', name: 'Kohtumine erilahenduse arutamiseks', duration: '60 min', price: 90 }
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
    const weekday = date.toLocaleDateString('et-EE', { weekday: 'short' }).toUpperCase();
    const day = date.getDate();
    const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return `<button type="button" data-date="${iso}" title="${date.toLocaleDateString('et-EE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}" class="${index === 0 ? 'date-active' : ''}"><span>${weekday}</span><br><b>${day}</b></button>`;
  }).join('');
}

function bookingServiceMarkup() {
  return bookingServices.map((service, index) => `
    <button type="button" class="service-choice booking-service-option ${index === 0 ? 'selected' : ''}" data-service="${service.id}" aria-pressed="${index === 0 ? 'true' : 'false'}">
      <span class="service-icon">✦</span>
      <span class="service-copy">
        <strong>${service.name}</strong>
        <small>${service.duration} · ${service.price === 0 ? 'Tasuta' : `€${service.price}`}</small>
      </span>
      <b class="booking-service-check">${index === 0 ? '✓' : ''}</b>
    </button>
  `).join('');
}

function bookingMarkup() {
  return `
    <div class="booking-body">
      <p class="mini-label">ONLINE-BRONEERIMINE · INTERAKTIIVNE NÄIDE</p>
      <h3>Leia sobiv aeg</h3>

      <div class="booking-steps">
        <span class="selected">1 Teenus</span><span>→</span><span>2 Aeg</span><span>→</span><span>3 Kinnitus</span>
      </div>

      <div class="booking-service-options">
        ${bookingServiceMarkup()}
      </div>

      <div class="booking-label">Vali kuupäev</div>
      <div class="mini-calendar booking-demo-dates">${bookingDateMarkup()}</div>

      <div class="booking-label">Vabad ajad</div>
      <div class="booking-demo-times">
        ${bookingTimes.map((time, index) => `<button type="button" class="${index === 0 ? 'selected' : ''}">${time}</button>`).join('')}
      </div>

      <button type="button" class="preview-cta booking-demo-confirm">Kinnita broneering →</button>
      <p class="booking-demo-status" aria-live="polite"></p>
    </div>
  `;
}

function bookingDateLabel(button) {
  if (!button) return '';
  const date = new Date(`${button.dataset.date}T12:00:00`);
  return date.toLocaleDateString('et-EE', { weekday: 'short', day: 'numeric', month: 'short' });
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
    status.textContent = `Valitud: ${selectedService.name} · ${bookingDateLabel(date)} kell ${time.textContent}`;
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
    confirm.textContent = 'Broneering valitud ✓';
    if (status) status.textContent = `Ainult näide · ${selectedService.name} · ${bookingDateLabel(widget.querySelector('.booking-demo-dates .date-active'))} kell ${widget.querySelector('.booking-demo-times .selected')?.textContent || ''}.`;
    window.setTimeout(() => {
      confirm.textContent = original;
      update();
    }, 2200);
  });

  update();
}

/* =========================================================
   PRODUCT VISUALS
========================================================= */

const visual = (type) => {

  /* =========================================================
     ONLINE BRONEERIMINE
  ========================================================= */

  if (type === 'booking') {
    return `
      <div class="booking-app">

        <div class="booking-topbar">
          <div>
            <strong>Studio North</strong>
            <small>Online broneerimine</small>
          </div>

          <span class="booking-avatar">S</span>
        </div>

        <div class="booking-heading">
          <small>ONLINE BRONEERIMINE</small>
          <h4>Leia endale sobiv aeg</h4>
        </div>

        <div class="booking-steps">
          <strong>1 Teenus</strong>
          <span>→</span>
          <span>2 Aeg</span>
          <span>→</span>
          <span>3 Kinnitus</span>
        </div>

        <div class="booking-service">

          <div class="booking-service-icon">
            ✦
          </div>

          <div>
            <strong>Konsultatsioon</strong>
            <small>45 min · €45</small>
          </div>

          <span class="booking-check">
            ✓
          </span>

        </div>

        <div class="booking-label">
          Vali kuupäev
        </div>

        <div class="booking-dates">

          <div>
            <small>ESM</small>
            <strong>12</strong>
          </div>

          <div class="selected">
            <small>TEI</small>
            <strong>13</strong>
          </div>

          <div>
            <small>KOL</small>
            <strong>14</strong>
          </div>

          <div>
            <small>NEL</small>
            <strong>15</strong>
          </div>

          <div>
            <small>REE</small>
            <strong>16</strong>
          </div>

        </div>

        <div class="booking-label">
          Vabad ajad
        </div>

        <div class="booking-times">
          <span>13:00</span>
          <span class="selected">14:30</span>
          <span>16:00</span>
        </div>

        <div class="booking-confirm">
          <strong>Vali 14:30</strong>
          <span>→</span>
        </div>

      </div>
    `;
  }


  /* =========================================================
     AI-CHATBOT
  ========================================================= */

  if (type === 'chat') {
    return `
      <div class="chat-preview">

        <div class="chat-header">
          <div class="chat-status"></div>

          <div>
            <strong>AutomateLabs Bot</strong>
            <small>Vastab kohe</small>
          </div>

          <span>•••</span>
        </div>

        <div class="chat-messages">

          <div class="chat-bubble">
            Tere! Kuidas saan täna aidata?
          </div>

          <div class="chat-bubble me">
            Kas teil on homme vaba aega?
          </div>

          <div class="chat-bubble">
            Jah. Vabad ajad on teisipäeval ja neljapäeval.
          </div>

        </div>

        <div class="chat-input">
          <span>Esita küsimus...</span>
          <b>↑</b>
        </div>

      </div>
    `;
  }


  /* =========================================================
     RUTIINSETE ÜLESANNETE AUTOMATISEERIMINE
  ========================================================= */

  if (type === 'workflow') {
    return `
      <div class="workflow-preview">

        <div class="workflow-header">
          <div>
            <strong>Uus päring</strong>
            <small>Töövoog töötab</small>
          </div>

          <span class="workflow-live">
            AKTIIVNE
          </span>
        </div>

        <div class="workflow-line"></div>

        <div class="workflow-card">
          <span class="workflow-icon">✦</span>

          <div>
            <strong>Uus päring</strong>
            <small>Veebilehe vorm on saadetud</small>
          </div>

          <b>✓</b>
        </div>

        <div class="workflow-connector"></div>

        <div class="workflow-card">
          <span class="workflow-icon">↗</span>

          <div>
            <strong>Lisa nimekirja</strong>
            <small>Kliendi andmed on salvestatud</small>
          </div>

          <b>✓</b>
        </div>

        <div class="workflow-connector"></div>

        <div class="workflow-card">
          <span class="workflow-icon">✓</span>

          <div>
            <strong>Saada uuendus</strong>
            <small>Klienti on teavitatud</small>
          </div>

          <b>✓</b>
        </div>

      </div>
    `;
  }


  /* =========================================================
     VEEBILEHE UUENDAMINE
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
              <span>Teenused</span>
              <span>Meist</span>
              <span>Kontakt</span>
            </div>

            <div class="upgrade-hero">

              <div>
                <small>ENNE</small>

                <strong>
                  Väike tekst.<br>
                  Ebamugav kasutada.
                </strong>

                <span class="fake-line short"></span>
                <span class="fake-line"></span>
              </div>

              <div class="upgrade-new">
                <small>PÄRAST</small>

                <strong>
                  Selge.<br>
                  Loodud telefonidele.
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
          ? 82
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
            <span>PAKETT SISALDAB</span>
            <strong>${p.scopeShort}</strong>
          </div>

          <div class="product-actions">

            <button
              class="button primary small-button order"
              data-id="${p.id}"
            >
              Telli · €${p.price}
            </button>

            <a
              class="button ghost small-button"
              href="${p.page}"
            >
              Loe lähemalt
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
              aria-label="Näita toodet: ${p.name}"
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
              aria-label="Eemalda ${x.name}"
            >
              Eemalda
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
    'nav.custom': 'Eritellimuslahendused',
    'nav.how': 'Kuidas see toimib',

    'hero.eyebrow':
      'PRAKTILISED DIGILAHENDUSED',

    'hero.title':
      'Ettevõtte automatiseerimine,<br><em>mis võtab rutiini enda kanda.</em>',

    'hero.text':
      'Lihtsusta broneerimist ja kliendiküsimustele vastamist ning automatiseeri ettevõtte igapäevased töövood.',

    'hero.cta':
      'Vaata tooteid',

    'hero.secondary':
      'Vaata, kuidas see toimib →',

    'hero.note':
      'Sina juhid, meie automatiseerime korduva töö.',

    'products.eyebrow':
      'VALMISTOOTED',

    'products.title':
      'Praktilised automatiseerimislahendused<br><em>igapäevatööks.</em>',

    'products.text':
      'Vali selgelt piiritletud töömahuga broneerimissüsteem, AI chatbot, töövoogude automatiseerimine või kodulehe uuendus.',

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
      'Rohkem aega olulisele tööle.<br><em>Vähem rutiinile.</em>',

    'closing.cta':
      'Leia oma toode',

    'cart.label':
      'Ostukorv',

    'cart.title':
      'Sinu ostukorv:',

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
    button.textContent = 'Avame kassalehte…';

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
                data.error || 'Kassalehe avamine ebaõnnestus.'
            );
        }

        if (!data.url) {
            throw new Error(
                'Stripe ei tagastanud kassalehe linki.'
            );
        }

        window.location.href = data.url;

    } catch (error) {

        console.error(
            '[CHECKOUT] Stripe error:',
            error
        );

        alert(
            'Kassalehte ei saanud avada. Proovi uuesti.'
        );

        button.disabled = false;

        button.textContent =
            'Kassasse';
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


language('et');


/* =========================================================
   PRODUCT LANDING PAGES
========================================================= */

(() => {

  const pageData = {
    'online-booking': {
      id: 'booking', title: 'Broneerimissüsteem sinu graafiku järgi.',
      lead: 'Kliendid valivad teenuse, näevad vabu aegu ja broneerivad veebis. Sina määrad teenused, graafiku ja broneerimisreeglid.',
      price: 390, tag: 'AJAPÕHISELE TÖÖLE',
      scopeTitle: 'Mida sisaldab €390 pakett',
      scopeIntro: 'Valmis broneerimisvoog, mis on seadistatud sinu teenuste ja graafiku järgi.',
      scope: ['Üks broneerimissüsteem','Kuni 5 teenust','Kestus, vabad ajad ja broneerimisreeglid','Mobiilisõbralik seadistus ja käivitamine'],
      scopeNote: 'Täiendavad broneerimisvood ja keerukad integratsioonid saab eraldi kokku leppida.',
      steps: ['Vali teenus','Vali vaba aeg','Kinnita broneering'],
      benefits: ['Vähem broneerimisega seotud sõnumeid','Selge ja professionaalne broneerimiskogemus','Teenused, tööajad ja broneerimisreeglid jäävad sinu kontrolli alla'],
      control: ['Teenused ja kestus','Saadavus','Broneerimisreeglid'], kind: 'booking'
    },
    'ai-chatbot': {
      id: 'chatbot', title: 'AI chatbot, mis vastab levinud kliendiküsimustele.',
      lead: 'AI chatbot annab veebilehe külastajatele selged vastused, juhatab nad sobiva järgmise sammuni ja edastab päringud sinu tiimile.',
      price: 900, tag: 'ABIVALMIS KLIENDIVESTLUSTELE',
      scopeTitle: 'Mida sisaldab €900 pakett',
      scopeIntro: 'Selge töömahuga veebichatbot, millele seadistame teadmistebaasi ja päringute edastamise.',
      scope: ['Üks veebichatbot','Ühe teadmistebaasi ja sisu seadistus','Päringute põhiline edastus','Testimine ja käivitamine'],
      scopeNote: 'Suurema teadmistebaasi, keerukad integratsioonid või mitu chatboti lepime eraldi kokku.',
      steps: ['Külastaja esitab küsimuse','Chatbot juhendab teda selgelt','Sina saad päringu'],
      benefits: ['Vastab korduvatele küsimustele','Juhatab õige teenuseni','Sina valid kasutatava info'],
      control: ['Vastused ja toon','Edastamise reeglid','Päringute teavitused'], kind: 'chat'
    },
    'routine-automation': {
      id: 'automation', title: 'Töövoogude automatiseerimine, mis vähendab käsitsitööd.',
      lead: 'Automatiseerime ühe selgelt piiritletud töövoo, mis ühendab teenused, edastab andmed ja teeb korduvad toimingud automaatselt.',
      price: 480, tag: 'IGAPÄEVASTELE TÖÖVOOGUDELE',
      scopeTitle: 'Mida sisaldab €480 pakett',
      scopeIntro: 'Üks selgelt piiritletud automatiseerimise töövoog.',
      scope: ['1 automatiseerimise töövoog','Kuni 5 tegevust töövoos','Kuni 2 välise teenuse ühendamine','Testimine, üleandmine ja väiksemad kohandused'],
      scopeNote: 'Täiendavad töövood, tegevused ja keerukad integratsioonid saab eraldi kokku leppida.',
      steps: ['Käivitaja alustab töövoogu','Info liigub sinna, kus seda vaja on','Saad iga tulemust üle vaadata'],
      benefits: ['Vähem kopeerimist ja kontrollimist','Selgem infovoog','Töövoogu saab alati muuta või peatada'],
      control: ['Käivitajad','Tegevused','Töövoo juhtimine'], kind: 'workflow'
    },
    'website-upgrade': {
      id: 'upgrade', title: 'Kodulehe uuendamine, mis lihtsustab kasutamist.',
      lead: 'Veebiarenduse ja ümberkujunduse pakett hõlmab kuni viit olemasolevat lehte ning muudab kodulehe selgemaks, kaasaegsemaks ja mobiilisõbralikuks.',
      price: 590, tag: 'PAREMALE ESIMESELE MULJELE',
      scopeTitle: 'Mida sisaldab €590 pakett',
      scopeIntro: 'Selgelt piiritletud kodulehe uuendus. Suuremad veebilehed ja keerukamad tööd hinnatakse eraldi.',
      scope: ['Kuni 5 olemasolevat lehte','Kohanduv kujundus arvutile ja mobiilile','Üks visuaalne suund ja komponendisüsteem','Sisu ja paigutuse korrastus ning avaldamine'],
      scopeNote: 'Ei sisalda mahukat sisuloomet, e-kaubandust, keerukaid integratsioone ega paketiväliseid lehti.',
      steps: ['Loome selge sisu','Disainime igale ekraanile','Avaldame viimistletud kogemuse'],
      benefits: ['Moodne ja selge esitlus','Mugav telefonis','Sujuvam tee kliendini'],
      control: ['Sisu','Visuaalne suund','Lehed ja üleskutsed'], kind: 'upgrade'
    },
    'custom': {
      id: 'custom', title: 'Sinu ettevõttele loodud AI-lahendused ja automatiseerimine.',
      lead: 'Kui valmistoode ei sobi, loome sinu tiimi, töövahendite ja klientide vajadustest lähtuva automatiseerimise või AI-lahenduse.',
      price: null, tag: 'SINU TÖÖLE KOHANDATUD',
      scopeTitle: 'Sinu vajadustele vastav töömaht',
      scopeIntro: 'Alustame soovitud tulemusest. Lepime lähenemise, töömahu ja hinna kokku enne töö algust.',
      scope: ['Sinu nõuded ja prioriteedid','Töövoo ja vajalike ühenduste ettepanek','Kokkulepitud töömaht ja hind','Ühine testimise ja üleandmise plaan'],
      scopeNote: 'Töömaht ja hind lepitakse kokku enne arenduse algust.',
      steps: ['Räägi, mida vajad','Paneme paika praktilise lähenemise','Ehitame sobiva lahenduse'],
      benefits: ['Loodud sinu tegeliku töövoo jaoks','Selge ulatus ja kasulik tulemus','Võimalus lahendust kasvatada ja muuta'],
      control: ['Kasutajakogemus','Ärireeglid','Ühendused'], kind: 'custom'
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
    const p = pageData[document.body.dataset.productPage];
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
