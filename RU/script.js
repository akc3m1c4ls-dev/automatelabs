/* =========================================================
   PRODUCT CATALOGUE
========================================================= */

const products = [
  {
    id: 'booking',
    name: 'Система онлайн-бронирования',
    tag: 'ДЛЯ РАБОТЫ ПО ЗАПИСИ',
    price: 390,
    scopeShort: '1 система записи · до 5 услуг',
    desc: 'Клиенты выбирают услугу, видят свободное время и записываются онлайн. Вы настраиваете услуги, график и правила.',
    benefits: ['Меньше переписки о времени','Понятная онлайн-запись','Вы настраиваете услуги и график'],
    page: 'products/online-booking.html',
    visual: 'booking'
  },
  {
    id: 'chatbot',
    name: 'AI-чат-бот',
    tag: 'ДЛЯ ПОЛЕЗНЫХ ДИАЛОГОВ С КЛИЕНТАМИ',
    price: 900,
    scopeShort: '1 чат-бот · 1 база знаний',
    desc: 'AI-чат-бот отвечает на частые вопросы, помогает посетителям сориентироваться и передаёт обращения вашей команде.',
    benefits: ['Отвечает на частые вопросы','Помогает выбрать услугу','Вы определяете, какую информацию он использует'],
    page: 'products/ai-chatbot.html',
    visual: 'chat'
  },
  {
    id: 'automation',
    name: 'Автоматизация процессов',
    tag: 'ДЛЯ ЕЖЕДНЕВНЫХ ПРОЦЕССОВ',
    price: 480,
    scopeShort: '1 процесс · до 5 действий · 2 подключения',
    desc: 'Автоматизированный процесс передаёт данные, отправляет уведомления и выполняет повторяющиеся действия.',
    benefits: ['Меньше повторяющейся работы','Связанный поток информации','Любой процесс можно изменить или приостановить'],
    page: 'products/routine-automation.html',
    visual: 'workflow'
  },
  {
    id: 'upgrade',
    name: 'Обновление сайта',
    tag: 'ДЛЯ ЛУЧШЕГО ПЕРВОГО ВПЕЧАТЛЕНИЯ ОНЛАЙН',
    price: 590,
    scopeShort: 'до 5 страниц · компьютер и мобильные устройства',
    desc: 'Обновим существующий сайт, чтобы он стал понятнее, современнее и удобнее на мобильных устройствах.',
    benefits: ['Современный и понятный дизайн','Удобно на телефоне','Более плавный путь для клиента'],
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
  { id: 'free-consultation', name: 'Бесплатная консультация', duration: '15 мин', price: 0 },
  { id: 'custom-meeting', name: 'Встреча по индивидуальному решению', duration: '60 мин', price: 90 }
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
    const weekday = date.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase();
    const day = date.getDate();
    const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return `<button type="button" data-date="${iso}" title="${date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}" class="${index === 0 ? 'date-active' : ''}"><span>${weekday}</span><br><b>${day}</b></button>`;
  }).join('');
}

function bookingServiceMarkup() {
  return bookingServices.map((service, index) => `
    <button type="button" class="service-choice booking-service-option ${index === 0 ? 'selected' : ''}" data-service="${service.id}" aria-pressed="${index === 0 ? 'true' : 'false'}">
      <span class="service-icon">✦</span>
      <span class="service-copy">
        <strong>${service.name}</strong>
        <small>${service.duration} · ${service.price === 0 ? 'Бесплатно' : `€${service.price}`}</small>
      </span>
      <b class="booking-service-check">${index === 0 ? '✓' : ''}</b>
    </button>
  `).join('');
}

function bookingMarkup() {
  return `
    <div class="booking-body">
      <p class="mini-label">ОНЛАЙН-БРОНИРОВАНИЕ · ИНТЕРАКТИВНЫЙ ПРИМЕР</p>
      <h3>Выберите удобное время</h3>

      <div class="booking-steps">
        <span class="selected">1 Услуга</span><span>→</span><span>2 Время</span><span>→</span><span>3 Подтверждение</span>
      </div>

      <div class="booking-service-options">
        ${bookingServiceMarkup()}
      </div>

      <div class="booking-label">Выберите дату</div>
      <div class="mini-calendar booking-demo-dates">${bookingDateMarkup()}</div>

      <div class="booking-label">Доступное время</div>
      <div class="booking-demo-times">
        ${bookingTimes.map((time, index) => `<button type="button" class="${index === 0 ? 'selected' : ''}">${time}</button>`).join('')}
      </div>

      <button type="button" class="preview-cta booking-demo-confirm">Подтвердить запись →</button>
      <p class="booking-demo-status" aria-live="polite"></p>
    </div>
  `;
}

function bookingDateLabel(button) {
  if (!button) return '';
  const date = new Date(`${button.dataset.date}T12:00:00`);
  return date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
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
    status.textContent = `Выбрано: ${selectedService.name} · ${bookingDateLabel(date)} в ${time.textContent}`;
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
    confirm.textContent = 'Запись выбрана ✓';
    if (status) status.textContent = `Только пример · ${selectedService.name} · ${bookingDateLabel(widget.querySelector('.booking-demo-dates .date-active'))} в ${widget.querySelector('.booking-demo-times .selected')?.textContent || ''}.`;
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
     ОНЛАЙН-БРОНИРОВАНИЕ
  ========================================================= */

  if (type === 'booking') {
    return `
      <div class="booking-app">

        <div class="booking-topbar">
          <div>
            <strong>Studio North</strong>
            <small>Онлайн-бронирование</small>
          </div>

          <span class="booking-avatar">S</span>
        </div>

        <div class="booking-heading">
          <small>ОНЛАЙН-БРОНИРОВАНИЕ</small>
          <h4>Выберите удобное время</h4>
        </div>

        <div class="booking-steps">
          <strong>1 Услуга</strong>
          <span>→</span>
          <span>2 Время</span>
          <span>→</span>
          <span>3 Подтверждение</span>
        </div>

        <div class="booking-service">

          <div class="booking-service-icon">
            ✦
          </div>

          <div>
            <strong>Консультация</strong>
            <small>45 мин · €45</small>
          </div>

          <span class="booking-check">
            ✓
          </span>

        </div>

        <div class="booking-label">
          Выберите дату
        </div>

        <div class="booking-dates">

          <div>
            <small>ПН</small>
            <strong>12</strong>
          </div>

          <div class="selected">
            <small>ВТ</small>
            <strong>13</strong>
          </div>

          <div>
            <small>СР</small>
            <strong>14</strong>
          </div>

          <div>
            <small>ЧТ</small>
            <strong>15</strong>
          </div>

          <div>
            <small>ПТ</small>
            <strong>16</strong>
          </div>

        </div>

        <div class="booking-label">
          Доступное время
        </div>

        <div class="booking-times">
          <span>13:00</span>
          <span class="selected">14:30</span>
          <span>16:00</span>
        </div>

        <div class="booking-confirm">
          <strong>Выбрать 14:30</strong>
          <span>→</span>
        </div>

      </div>
    `;
  }


/* =========================================================
   AI ЧАТ-БОТ
========================================================= */

if (type === 'chat') {
  return `
    <div class="chat-preview">

      <div class="chat-header">
        <div class="chat-status"></div>

        <div>
          <strong>AI ЧАТ-БОТ</strong>
          <small>Отвечает мгновенно</small>
        </div>

        <span>•••</span>
      </div>

      <div class="chat-messages">

        <div class="chat-bubble">
          Здравствуйте! Чем могу помочь?
        </div>

        <div class="chat-bubble me">
          У вас есть свободное время?
        </div>

        <div class="chat-bubble">
          Да. Доступно во вторник или четверг.
        </div>

      </div>

      <div class="chat-input">
        <span>Задайте вопрос...</span>
        <b>↑</b>
      </div>

    </div>
  `;
}


  /* =========================================================
     АВТОМАТИЗАЦИЯ РУТИННЫХ ЗАДАЧ
  ========================================================= */

  if (type === 'workflow') {
    return `
      <div class="workflow-preview">

        <div class="workflow-header">
          <div>
            <strong>Новая заявка</strong>
            <small>Процесс выполняется</small>
          </div>

          <span class="workflow-live">
            АКТИВНО
          </span>
        </div>

        <div class="workflow-line"></div>

        <div class="workflow-card">
          <span class="workflow-icon">✦</span>

          <div>
            <strong>Новая заявка</strong>
            <small>Получена форма с сайта</small>
          </div>

          <b>✓</b>
        </div>

        <div class="workflow-connector"></div>

        <div class="workflow-card">
          <span class="workflow-icon">↗</span>

          <div>
            <strong>Добавить в список</strong>
            <small>Данные клиента сохранены</small>
          </div>

          <b>✓</b>
        </div>

        <div class="workflow-connector"></div>

        <div class="workflow-card">
          <span class="workflow-icon">✓</span>

          <div>
            <strong>Отправить обновление</strong>
            <small>Клиент уведомлён</small>
          </div>

          <b>✓</b>
        </div>

      </div>
    `;
  }


  /* =========================================================
     ОБНОВЛЕНИЕ САЙТА
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
              <span>Услуги</span>
              <span>О нас</span>
              <span>Контакты</span>
            </div>

            <div class="upgrade-hero">

              <div>
                <small>ДО</small>

                <strong>
                  Мелкий текст.<br>
                  Неудобно использовать.
                </strong>

                <span class="fake-line short"></span>
                <span class="fake-line"></span>
              </div>

              <div class="upgrade-new">
                <small>ПОСЛЕ</small>

                <strong>
                  Понятно.<br>
                  Создано для телефонов.
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
            <span>В ПАКЕТ ВХОДИТ</span>
            <strong>${p.scopeShort}</strong>
          </div>

          <div class="product-actions">

            <button
              class="button primary small-button order"
              data-id="${p.id}"
            >
              Заказать · €${p.price}
            </button>

            <a
              class="button ghost small-button"
              href="${p.page}"
            >
              Подробнее
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
              aria-label="Показать: ${p.name}"
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
              aria-label="Удалить ${x.name}"
            >
              Удалить
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
    'nav.custom': 'Индивидуальные решения',
    'nav.how': 'Как это работает',

    'hero.eyebrow':
      'ПРАКТИЧНЫЕ ЦИФРОВЫЕ РЕШЕНИЯ',

    'hero.title':
      'Автоматизация бизнеса,<br><em>которая берёт рутину на себя.</em>',

    'hero.text':
      'Упростите онлайн-запись и ответы на частые вопросы клиентов, автоматизируйте ежедневные процессы бизнеса в Эстонии.',

    'hero.cta':
      'Смотреть продукты',

    'hero.secondary':
      'Как это работает →',

    'hero.note':
      'Вы сохраняете контроль, а повторяющиеся задачи выполняются автоматически.',

    'products.eyebrow':
      'ГОТОВЫЕ ПРОДУКТЫ',

    'products.title':
      'Практичные решения для<br><em>автоматизации процессов.</em>',

    'products.text':
      'Выберите систему бронирования, чат-бот для бизнеса, автоматизацию процессов или обновление сайта с чётким объёмом работ.',

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
      'Больше времени на важную работу.<br><em>Меньше — на рутину.</em>',

    'closing.cta':
      'Найти продукт',

    'cart.label':
      'Корзина',

    'cart.title':
      'Ваша корзина:',

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
    button.textContent = 'Открываем оформление…';

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
                data.error || 'Не удалось открыть оформление.'
            );
        }

        if (!data.url) {
            throw new Error(
                'Stripe не вернул ссылку на оформление.'
            );
        }

        window.location.href = data.url;

    } catch (error) {

        console.error(
            '[CHECKOUT] Stripe error:',
            error
        );

        alert(
            'Не удалось открыть оформление. Попробуйте ещё раз.'
        );

        button.disabled = false;

        button.textContent =
            'Оформить';
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


language('ru');


/* =========================================================
   PRODUCT LANDING PAGES
========================================================= */

(() => {

  const pageData = {
    'online-booking': {
      id: 'booking', title: 'Система онлайн-бронирования под ваше расписание.',
      lead: 'Клиенты выбирают услугу, видят свободное время и записываются онлайн. Вы настраиваете услуги, график и правила бронирования.',
      price: 390, tag: 'ДЛЯ РАБОТЫ ПО ЗАПИСИ',
      scopeTitle: 'Что входит в пакет за €390',
      scopeIntro: 'Готовый процесс онлайн-записи, настроенный под ваши услуги и график.',
      scope: ['Одна система записи','До 5 услуг','Длительность, свободное время и правила записи','Адаптация для мобильных устройств и запуск'],
      scopeNote: 'Дополнительные сценарии записи и сложные интеграции рассчитываются отдельно.',
      steps: ['Выберите услугу','Выберите доступное время','Подтвердите запись'],
      benefits: ['Меньше сообщений о расписании','Понятный и профессиональный процесс бронирования','Услуги, часы работы и правила записи остаются под вашим контролем'],
      control: ['Услуги и длительность','Доступность','Правила записи'], kind: 'booking'
    },
    'ai-chatbot': {
      id: 'chatbot', title: 'Чат-бот для сайта отвечает клиентам в любое время.',
      lead: 'AI-чат-бот отвечает на частые вопросы, помогает посетителям сориентироваться и передаёт обращения вашей команде.',
      price: 900, tag: 'ДЛЯ ПОЛЕЗНЫХ ДИАЛОГОВ С КЛИЕНТАМИ',
      scopeTitle: 'Что входит в пакет за €900',
      scopeIntro: 'Чат-бот для сайта с согласованным объёмом базы знаний и передачей обращений.',
      scope: ['Один чат-бот на сайте','Настройка одной базы знаний и контента','Базовая передача обращений','Тестирование и запуск'],
      scopeNote: 'Большие базы знаний, сложные интеграции и несколько сценариев можно рассчитать отдельно.',
      steps: ['Посетитель задаёт вопрос','Чат-бот понятно направляет его','Вы получаете обращение'],
      benefits: ['Отвечает на типовые вопросы','Направляет к нужной услуге','Вы выбираете информацию, которую он использует'],
      control: ['Ответы и тон','Правила передачи обращения','Уведомления о лидах'], kind: 'chat'
    },
    'routine-automation': {
      id: 'automation', title: 'Автоматизация бизнес-процессов для повторяющихся задач.',
      lead: 'Создаём один чётко определённый рабочий процесс, который связывает сервисы, передаёт данные и автоматически выполняет рутинные действия.',
      price: 480, tag: 'ДЛЯ ЕЖЕДНЕВНЫХ ПРОЦЕССОВ',
      scopeTitle: 'Что входит в пакет за €480',
      scopeIntro: 'Один чётко определённый процесс автоматизации.',
      scope: ['1 сценарий автоматизации','До 5 действий в процессе','Подключение до 2 внешних сервисов','Тестирование, передача и базовые правки'],
      scopeNote: 'Дополнительные сценарии, действия и сложные интеграции можно рассчитать отдельно.',
      steps: ['Триггер запускает процесс','Информация перемещается туда, где нужна','Вы можете проверить каждый результат'],
      benefits: ['Меньше копирования и проверок','Более понятный поток информации','Любой процесс можно изменить или приостановить'],
      control: ['Триггеры','Действия','Управление процессом'], kind: 'workflow'
    },
    'website-upgrade': {
      id: 'upgrade', title: 'Обновление сайта: удобно на любом устройстве.',
      lead: 'В пакет входят разработка и редизайн до пяти существующих страниц, чтобы сайт стал понятнее, современнее и удобнее на мобильных устройствах.',
      price: 590, tag: 'ДЛЯ ЛУЧШЕГО ПЕРВОГО ВПЕЧАТЛЕНИЯ',
      scopeTitle: 'Что входит в пакет за €590',
      scopeIntro: 'Обновление сайта с чётким объёмом работ. Большие сайты и сложные задачи рассчитываются отдельно.',
      scope: ['До 5 существующих страниц','Адаптивный редизайн для компьютеров и мобильных устройств','Одно визуальное направление и система компонентов','Обновление структуры и запуск'],
      scopeNote: 'Не входят большой объём копирайтинга, интернет-магазины, сложные интеграции и дополнительные страницы.',
      steps: ['Создаём понятный контент','Проектируем для любого экрана','Публикуем аккуратный результат'],
      benefits: ['Современная и понятная подача','Удобно на телефоне','Более плавный путь для клиентов'],
      control: ['Контент','Визуальное направление','Страницы и призывы к действию'], kind: 'upgrade'
    },
    'custom': {
      id: 'custom', title: 'AI-решения и автоматизация под задачи вашего бизнеса.',
      lead: 'Если готовый продукт не подходит, создадим автоматизацию или AI-решение с учётом ваших процессов, инструментов и клиентов.',
      price: null, tag: 'ПОД ВАШУ РАБОТУ',
      scopeTitle: 'Объём работ под ваши задачи',
      scopeIntro: 'Расскажите о желаемом результате. Подход, объём и стоимость согласуем до начала работ.',
      scope: ['Ваши требования и приоритеты','Предложение по процессу и интеграциям','Согласованный объём и стоимость','Совместный план тестирования и передачи'],
      scopeNote: 'Объём и стоимость согласуются до начала разработки.',
      steps: ['Расскажите, что вам нужно','Мы выстроим практичный подход','Создадим решение, которое подходит'], 
      benefits: ['Создано под ваш реальный процесс','Понятный объём и полезный результат','Возможность развивать и менять решение'],
      control: ['Пользовательский опыт','Правила бизнеса','Интеграции'], kind: 'custom'
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
