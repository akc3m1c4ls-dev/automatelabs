/* =========================================================
   PRODUCT CATALOGUE
========================================================= */

const products = [
  {
    id: 'booking',
    name: 'Online-broneerimine',
    tag: 'AJAPÕHISELE TÖÖLE',
    price: 390,
    desc: 'Anna klientidele lihtne võimalus valida teenus ja aeg ning kinnitada külastus, hoides samal ajal oma graafiku enda kontrolli all.',
    benefits: ['Vähem broneerimisega seotud sõnumeid','Selge ja professionaalne broneerimine','Sina kontrollid teenuseid ja saadavust'],
    page: '../../products/online-booking.html',
    visual: 'booking'
  },
  {
    id: 'chatbot',
    name: 'AI-chatbot',
    tag: 'ABIVALMIS KLIENDIVESTLUSTELE',
    price: 900,
    desc: 'Praktiline tervitus sinu veebilehel, mis vastab korduvatele küsimustele, juhendab külastajaid ja kogub päringuid.',
    benefits: ['Vastab levinud küsimustele','Aitab leida õige teenuse','Sina valid, millist infot see kasutab'],
    page: '../../products/ai-chatbot.html',
    visual: 'chat'
  },
  {
    id: 'automation',
    name: 'Ülesannete automatiseerimine',
    tag: 'IGAPÄEVASTELE TÖÖVOOGUDELE',
    price: 480,
    desc: 'Usaldusväärsed töövood saavad liigutada infot, saata uuendusi ja teha korduvaid tegevusi, et inimesed saaksid keskenduda inimestele.',
    benefits: ['Vähem korduvat tööd','Ühendatud infovoog','Iga töövoogu saab muuta või peatada'],
    page: '../../products/routine-automation.html',
    visual: 'workflow'
  },
  {
    id: 'upgrade',
    name: 'Veebilehe uuendus',
    tag: 'PAREMALE ESIMESELE MULJELE VEEBIS',
    price: 590,
    desc: 'Uuenda vanem veebileht selgeks ja mobiilisõbralikuks kogemuseks, mis esindab sinu tööd hästi.',
    benefits: ['Moodne ja selge disain','Mugav telefonis','Sujuvam kliendikogemus'],
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
          Saadaval olevad ajad
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


language('et');


/* =========================================================
   PRODUCT LANDING PAGES
========================================================= */

(() => {

  const pageData = {
    'online-booking': {
      id: 'booking', title: 'Online-broneerimine, mis austab sinu aega.',
      lead: 'Lase klientidel valida teenus ja aeg ning külastus kinnitada, samal ajal kui sina hoiad oma päeva kontrolli all.',
      price: 390, tag: 'AJAPÕHISELE TÖÖLE',
      steps: ['Vali teenus','Vali vaba aeg','Kinnita broneering'],
      benefits: ['Vähem broneerimisega seotud sõnumeid','Selge ja professionaalne broneerimiskogemus','Teenused, tööajad ja broneerimisreeglid jäävad sinu kontrolli alla'],
      control: ['Teenused ja kestus','Saadavus','Broneerimisreeglid'], kind: 'booking'
    },
    'ai-chatbot': {
      id: 'chatbot', title: 'Abivalmis esimene vastus ööpäevaringselt.',
      lead: 'Anna külastajatele selged vastused, kasulikud juhised ja lihtne võimalus ühendust võtta, säilitades oma hääle.',
      price: 900, tag: 'ABIVALMIS KLIENDIVESTLUSTELE',
      steps: ['Külastaja esitab küsimuse','Chatbot juhendab teda selgelt','Sina saad päringu'],
      benefits: ['Vastab korduvatele küsimustele','Juhatab õige teenuseni','Sina valid kasutatava info'],
      control: ['Vastused ja toon','Edastamise reeglid','Päringute teavitused'], kind: 'chat'
    },
    'routine-automation': {
      id: 'automation', title: 'Hoia töö liikumas ilma korduva tööta.',
      lead: 'Usaldusväärsed töövood saavad saata uuendusi, liigutada infot ja teha igapäevaseid tegevusi, et inimesed saaksid keskenduda inimestele.',
      price: 480, tag: 'IGAPÄEVASTELE TÖÖVOOGUDELE',
      steps: ['Käivitaja alustab töövoogu','Info liigub sinna, kus seda vaja on','Saad iga tulemust üle vaadata'],
      benefits: ['Vähem kopeerimist ja kontrollimist','Selgem infovoog','Töövoogu saab alati muuta või peatada'],
      control: ['Käivitajad','Tegevused','Töövoo juhtimine'], kind: 'workflow'
    },
    'website-upgrade': {
      id: 'upgrade', title: 'Veebileht, mida on hea kasutada.',
      lead: 'Värskenda oma veebikohalolu selgeks ja mobiilisõbralikuks kogemuseks, mis esindab sinu tööd hästi.',
      price: 590, tag: 'PAREMALE ESIMESELE MULJELE',
      steps: ['Loome selge sisu','Disainime igale ekraanile','Avaldame viimistletud kogemuse'],
      benefits: ['Moodne ja selge esitlus','Mugav telefonis','Sujuvam tee kliendini'],
      control: ['Sisu','Visuaalne suund','Lehed ja üleskutsed'], kind: 'upgrade'
    },
    'custom': {
      id: 'custom', title: 'Kasulik lahendus, mis on ehitatud sinu töö ümber.',
      lead: 'Kui valmis toode ei sobi, loome sinu inimestele ja klientidele selge digitaalse töövoo.',
      price: null, tag: 'SINU TÖÖLE KOHANDATUD',
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
            Telli · €${p.price}
          </button>
        `

        : `
          <a
            class="button primary"
            href="mailto:contact@automatelabs.me?subject=Custom%20solution"
          >
            Räägi meile, mida vajad
          </a>
        `;


    const visual =
      p.kind === 'chat'

        ? `
          <div class="chat-screen">
            <b>AutomateLabsi assistent</b>
            <span class="chat-bubble">
              Tere! Kuidas saan täna aidata?
            </span>
            <span class="chat-bubble me">
              Kas sel nädalal on vabu aegu?
            </span>
            <span class="chat-bubble">
              Jah. Kas teisipäev või neljapäev sobiks?
            </span>
          </div>
        `

        : p.kind === 'workflow'

          ? `
            <div class="flow-screen">
              <b>Uus päring</b>
              <span>✓ Lisa kliendi andmed</span>
              <span>✓ Saada kasulik uuendus</span>
              <span>✓ Teavita õiget inimest</span>
            </div>
          `

          : p.kind === 'upgrade'

            ? `
              <div class="upgrade-screen">
                <div>
                  <small>ENNE</small>
                  <b>
                    Small text<br>
                    Hard to use
                  </b>
                </div>

                <div>
                  <small>PÄRAST</small>
                  <b>
                    Clear, calm<br>
                    Made for phones
                  </b>
                </div>
              </div>
            `

            : `
              <div class="booking-screen">
                <small>VALI AEG</small>
                <b>Konsultatsioon</b>

                <div>
                  <span>Tue 13</span>
                  <strong>14:30</strong>
                  <span>15:30</span>
                </div>

                <button>
                  Kinnita broneering
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
              Vaata, kuidas see töötab ↓
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
            MIDA SAAD
          </p>

          <h2>
            Kasulik, ilma et see segaks.
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
          KUIDAS SEE SOBITUB
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
                    Toode muutub rahulikuks ja kasulikuks osaks sinu igapäevatööst.
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
            SINA JÄÄD JUHTIMA
          </p>

          <h2>
            Toode kohandub sinu tööga.
          </h2>

          <p>
            Muuda olulisi osi vastavalt sellele, kuidas sinu töö muutub.
            Automatiseerimine toetab sinu otsuseid, mitte ei asenda neid.
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
          KUI OLED VALMIS
        </p>

        <h2>
          ${
            p.price
              ? `Alusta tootega ${p.title.toLowerCase()}`
              : 'Let’s make it fit.'
          }
        </h2>

        <p>
          ${
            p.price
              ? `Üks selge toode alates €${p.price}. Lisa see ostukorvi, kui oled valmis.`
              : 'Räägi meile soovitud tulemusest ja leiame praktilise lahenduse.'
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
