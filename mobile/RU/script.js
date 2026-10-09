/* =========================================================
   PRODUCT CATALOGUE
========================================================= */

const products = [
  {
    id: 'booking',
    name: 'Онлайн-бронирование',
    tag: 'ДЛЯ РАБОТЫ ПО ЗАПИСИ',
    price: 390,
    desc: 'Дайте клиентам простой способ выбрать услугу и время, а затем подтвердить визит, сохраняя полный контроль над расписанием.',
    benefits: ['Меньше сообщений о записи','Понятный и профессиональный процесс бронирования','Вы контролируете услуги и доступность'],
    page: '../../products/online-booking.html',
    visual: 'booking'
  },
  {
    id: 'chatbot',
    name: 'AI-чат-бот',
    tag: 'ДЛЯ ПОЛЕЗНЫХ ДИАЛОГОВ С КЛИЕНТАМИ',
    price: 900,
    desc: 'Практичный помощник на вашем сайте, который отвечает на типовые вопросы, направляет посетителей и собирает обращения.',
    benefits: ['Отвечает на частые вопросы','Помогает посетителям найти нужное','Вы контролируете используемую информацию'],
    page: '../../products/ai-chatbot.html',
    visual: 'chat'
  },
  {
    id: 'automation',
    name: 'Автоматизация рутинных задач',
    tag: 'ДЛЯ ЕЖЕДНЕВНЫХ ПРОЦЕССОВ',
    price: 480,
    desc: 'Надёжные процессы могут передавать информацию, отправлять обновления и выполнять повторяющиеся действия, пока люди занимаются людьми.',
    benefits: ['Меньше повторяющейся работы','Связанный поток информации','Любой процесс можно изменить или приостановить'],
    page: '../../products/routine-automation.html',
    visual: 'workflow'
  },
  {
    id: 'upgrade',
    name: 'Обновление сайта',
    tag: 'ДЛЯ ЛУЧШЕГО ПЕРВОГО ВПЕЧАТЛЕНИЯ ОНЛАЙН',
    price: 590,
    desc: 'Обновите старый сайт до понятного, удобного для мобильных устройств пространства, которое достойно представляет вашу работу.',
    benefits: ['Современный и понятный дизайн','Удобно на телефоне','Более плавный путь для клиента'],
    page: '../../products/website-upgrade.html',
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


language('ru');


/* =========================================================
   PRODUCT LANDING PAGES
========================================================= */

(() => {

  const pageData = {
    'online-booking': {
      id: 'booking', title: 'Онлайн-бронирование, которое уважает ваше время.',
      lead: 'Позвольте клиентам выбрать услугу и время и подтвердить визит, пока ваш рабочий день продолжает двигаться.',
      price: 390, tag: 'ДЛЯ РАБОТЫ ПО ЗАПИСИ',
      steps: ['Выберите услугу','Выберите доступное время','Подтвердите запись'],
      benefits: ['Меньше сообщений о расписании','Понятный и профессиональный процесс бронирования','Услуги, часы работы и правила записи остаются под вашим контролем'],
      control: ['Услуги и длительность','Доступность','Правила записи'], kind: 'booking'
    },
    'ai-chatbot': {
      id: 'chatbot', title: 'Полезный первый ответ в любое время.',
      lead: 'Дайте посетителям понятные ответы, полезные подсказки и простой способ связаться с вами, сохраняя свой стиль общения.',
      price: 900, tag: 'ДЛЯ ПОЛЕЗНЫХ ДИАЛОГОВ С КЛИЕНТАМИ',
      steps: ['Посетитель задаёт вопрос','Чат-бот понятно направляет его','Вы получаете обращение'],
      benefits: ['Отвечает на типовые вопросы','Направляет к нужной услуге','Вы выбираете информацию, которую он использует'],
      control: ['Ответы и тон','Правила передачи обращения','Уведомления о лидах'], kind: 'chat'
    },
    'routine-automation': {
      id: 'automation', title: 'Держите работу в движении без повторяющейся работы.',
      lead: 'Надёжные процессы отправляют обновления, перемещают информацию и выполняют повседневные действия, чтобы люди могли сосредоточиться на людях.',
      price: 480, tag: 'ДЛЯ ЕЖЕДНЕВНЫХ ПРОЦЕССОВ',
      steps: ['Триггер запускает процесс','Информация перемещается туда, где нужна','Вы можете проверить каждый результат'],
      benefits: ['Меньше копирования и проверок','Более понятный поток информации','Любой процесс можно изменить или приостановить'],
      control: ['Триггеры','Действия','Управление процессом'], kind: 'workflow'
    },
    'website-upgrade': {
      id: 'upgrade', title: 'Сайт, которым приятно пользоваться.',
      lead: 'Обновите своё присутствие в интернете до понятного, удобного на мобильных устройствах опыта, который хорошо представляет вашу работу.',
      price: 590, tag: 'ДЛЯ ЛУЧШЕГО ПЕРВОГО ВПЕЧАТЛЕНИЯ',
      steps: ['Создаём понятный контент','Проектируем для любого экрана','Публикуем аккуратный результат'],
      benefits: ['Современная и понятная подача','Удобно на телефоне','Более плавный путь для клиентов'],
      control: ['Контент','Визуальное направление','Страницы и призывы к действию'], kind: 'upgrade'
    },
    'custom': {
      id: 'custom', title: 'Полезное решение, созданное вокруг вашей работы.',
      lead: 'Если готовый продукт не подходит, мы создадим понятный цифровой процесс вокруг ваших людей и клиентов.',
      price: null, tag: 'ПОД ВАШУ РАБОТУ',
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
            Заказать · €${p.price}
          </button>
        `

        : `
          <a
            class="button primary"
            href="mailto:contact@automatelabs.me?subject=Custom%20solution"
          >
            Расскажите, что вам нужно
          </a>
        `;


    const visual =
      p.kind === 'chat'

        ? `
          <div class="chat-screen">
            <b>Помощник AutomateLabs</b>
            <span class="chat-bubble">
              Здравствуйте! Чем могу помочь?
            </span>
            <span class="chat-bubble me">
              Есть ли свободное время на этой неделе?
            </span>
            <span class="chat-bubble">
              Да. Вам подойдёт вторник или четверг?
            </span>
          </div>
        `

        : p.kind === 'workflow'

          ? `
            <div class="flow-screen">
              <b>Получено новое обращение</b>
              <span>✓ Добавить данные клиента</span>
              <span>✓ Отправить полезное обновление</span>
              <span>✓ Уведомить нужного человека</span>
            </div>
          `

          : p.kind === 'upgrade'

            ? `
              <div class="upgrade-screen">
                <div>
                  <small>ДО</small>
                  <b>
                    Small text<br>
                    Hard to use
                  </b>
                </div>

                <div>
                  <small>ПОСЛЕ</small>
                  <b>
                    Clear, calm<br>
                    Made for phones
                  </b>
                </div>
              </div>
            `

            : `
              <div class="booking-screen">
                <small>ВЫБЕРИТЕ ВРЕМЯ</small>
                <b>Консультация</b>

                <div>
                  <span>Tue 13</span>
                  <strong>14:30</strong>
                  <span>15:30</span>
                </div>

                <button>
                  Подтвердить запись
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
              Посмотреть, как это работает ↓
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
            ЧТО ВЫ ПОЛУЧИТЕ
          </p>

          <h2>
            Полезно и ненавязчиво.
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
          КАК ЭТО ВПИСЫВАЕТСЯ
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
                    Продукт становится спокойной и полезной частью вашей ежедневной работы.
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
            ВЫ ОСТАЁТЕСЬ ЗА РУЛЁМ
          </p>

          <h2>
            Продукт адаптируется под ваш бизнес.
          </h2>

          <p>
            Меняйте важные части по мере изменения вашей работы.
            Автоматизация поддерживает ваши решения, но не заменяет их.
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
          КОГДА БУДЕТЕ ГОТОВЫ
        </p>

        <h2>
          ${
            p.price
              ? `Начните с ${p.title.toLowerCase()}`
              : 'Let’s make it fit.'
          }
        </h2>

        <p>
          ${
            p.price
              ? `Один понятный продукт от €${p.price}. Добавьте его в корзину, когда будете готовы.`
              : 'Расскажите, какой результат вам нужен, и мы найдём практичный путь.'
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
