/* Shared product experience. Product copy comes from each localized catalogue. */
(() => {
  const lang = document.documentElement.lang;
  const locale = ['ru', 'et'].includes(lang) ? lang : 'en';
  const copy = {
    en: {
      products: 'All products', order: 'Add to cart', quote: 'Discuss your project', ask: 'Ask about this package',
      scope: 'PACKAGE SCOPE', benefits: 'WHAT CHANGES', benefitTitle: 'Less friction. More time for your work.',
      how: 'HOW IT WORKS', howTitle: 'A clear path from idea to everyday use.', preview: 'INTERACTIVE EXAMPLE',
      demoNote: 'Example only — no live bookings, messages or changes are made.',
      included: 'A clearly scoped setup', priceNote: 'Package price · additional work quoted separately',
      customScope: 'A scope built around your needs', customIntro: 'Start with the outcome you want. We agree the approach, scope and quote before work begins.',
      customItems: ['Your requirements and priorities', 'A proposed workflow and connections', 'An agreed scope and quote', 'Testing and handover planned together'],
      ready: 'LET’S MAKE IT USEFUL', contactTitle: 'Tell us what you need.',
      contactIntro: 'A few details help us check the fit and suggest a practical next step.',
      name: 'Name', email: 'Email', company: 'Company (optional)', message: 'What would you like to improve?',
      send: 'Send enquiry', privacy: 'We’ll use these details to respond to your enquiry. Please don’t include passwords or sensitive customer data.',
      next: 'What happens next?', nextSteps: ['We review your requirements.', 'We clarify the scope and any additional costs.', 'We agree the next step with you.'],
      direct: 'Prefer a direct conversation?', address: 'Tallinn, Estonia', faq: 'Before you get started',
      questions: ['What is included in the price?', 'Will this work with my existing tools?', 'How long will setup take?'],
      answers: ['The package includes the scope listed above. Extra features and third-party service costs are discussed separately.', 'Tell us which tools and website you use. We’ll confirm compatibility and any integration work before agreeing the scope.', 'Timing depends on your content, access and requirements. We confirm the schedule once we understand your setup.'],
      sampleQuestion: 'What can you help my customers with?', sampleAnswer: 'I can answer questions using your approved content and guide visitors to the right service. For anything outside that scope, I can point them to your team.',
      tryChat: 'Talk to our AI assistant', run: 'Run example workflow', reset: 'Run again', done: 'Example complete. Your own workflow follows the rules you agree with us.',
      before: 'Before', after: 'After', oldSite: 'A lot to find. Little direction.', newSite: 'Your next step, made simple.', sampleCta: 'Get in touch',
      customDemo: 'Your work, connected.', customDemoText: 'Start with a task that takes too much time. We build the next step around the tools and people you already have.',
      sample: 'View example', sampleDone: 'Example interaction only. Use the enquiry form below to discuss your own website.',
      liveAssistant: 'LIVE AI ASSISTANT', chatTitle: 'AutomateLabs product advisor', chatOnline: 'Online · ask a real question', chatWelcome: 'Hi! Ask me anything about the AI Chatbot package or tell me what your visitors need help with.', chatPlaceholder: 'Ask about the chatbot package…', chatSend: 'Send message', chatClear: 'Clear', chatNote: 'Live AI assistant · Please don’t share passwords or sensitive customer data.', chatQuick: [['What is included?', 'What is included in the AI Chatbot package, and what costs extra?'], ['Will it fit my website?', 'Help me understand whether the AI Chatbot package fits my website. What do you need to know?']], chooseFocus: 'Choose an area to explore', customResult: 'We can map this area into a clear solution and agree the scope before development.',
      stepNotes: ['Start with the information and rules that matter to your business.', 'Shape a clear experience around your tools, customers and team.', 'Review the result together before putting it into everyday use.']
    },
    ru: {
      products: 'Все продукты', order: 'В корзину', quote: 'Обсудить проект', ask: 'Задать вопрос',
      scope: 'СОСТАВ ПАКЕТА', benefits: 'ЧТО ИЗМЕНИТСЯ', benefitTitle: 'Меньше рутины. Больше времени на работу.',
      how: 'КАК ЭТО РАБОТАЕТ', howTitle: 'Понятный путь от задачи к рабочему решению.', preview: 'ИНТЕРАКТИВНЫЙ ПРИМЕР',
      demoNote: 'Это только пример: реальные записи, сообщения и изменения не создаются.', included: 'Понятный объём работ', priceNote: 'Стоимость пакета · дополнительные работы оцениваются отдельно',
      customScope: 'Объём работ под ваши задачи', customIntro: 'Расскажите о желаемом результате. Подход, объём и стоимость согласуем до начала работ.',
      customItems: ['Ваши требования и приоритеты', 'Предложение по процессу и интеграциям', 'Согласованный объём и стоимость', 'План тестирования и передачи результата'],
      ready: 'ДАВАЙТЕ УПРОСТИМ РАБОТУ', contactTitle: 'Расскажите о вашей задаче.', contactIntro: 'Кратко опишите задачу — это поможет оценить её и предложить следующий шаг.',
      name: 'Имя', email: 'Эл. почта', company: 'Компания (необязательно)', message: 'Что вы хотите улучшить?', send: 'Отправить запрос',
      privacy: 'Используем эти данные для ответа на ваш запрос. Не указывайте пароли и конфиденциальные данные клиентов.',
      next: 'Что дальше?', nextSteps: ['Изучим вашу задачу.', 'Уточним объём работ и возможные дополнительные расходы.', 'Согласуем дальнейшие действия.'], direct: 'Хотите связаться напрямую?', address: 'Таллинн, Эстония', faq: 'Перед началом работы',
      questions: ['Что входит в стоимость?', 'Будет ли решение работать с моими инструментами?', 'Сколько времени займёт настройка?'],
      answers: ['В пакет входит объём работ, указанный выше. Дополнительные функции и стоимость сторонних сервисов обсуждаются отдельно.', 'Расскажите, какие инструменты и сайт вы используете. Совместимость и интеграции проверим до согласования объёма работ.', 'Срок зависит от материалов, доступов и требований. График подтвердим после обсуждения вашей задачи.'],
      sampleQuestion: 'Как вы можете помочь моим клиентам?', sampleAnswer: 'Могу отвечать на вопросы по утверждённым материалам и помогать выбрать услугу. Другие вопросы направлю вашей команде.',
      tryChat: 'Задать вопрос AI-помощнику', run: 'Запустить пример процесса', reset: 'Повторить', done: 'Пример завершён. Реальный процесс будет работать по согласованным правилам.',
      before: 'До', after: 'После', oldSite: 'Много информации. Мало ясности.', newSite: 'Понятный следующий шаг.', sampleCta: 'Связаться',
      customDemo: 'Все этапы работают как единый процесс.', customDemoText: 'Начните с задачи, которая отнимает много времени. Решение учтёт ваши инструменты и работу команды.', sample: 'Посмотреть пример', sampleDone: 'Это только пример. Обсудите свой сайт через форму ниже.',
      liveAssistant: 'ИИ-ПОМОЩНИК ОНЛАЙН', chatTitle: 'Помощник AutomateLabs', chatOnline: 'Онлайн · задайте вопрос', chatWelcome: 'Здравствуйте! Спросите о пакете AI-чат-бота или расскажите, на какие вопросы посетителей он должен отвечать.', chatPlaceholder: 'Спросите о пакете чат-бота…', chatSend: 'Отправить сообщение', chatClear: 'Очистить', chatNote: 'AI-помощник онлайн · Не отправляйте пароли и конфиденциальные данные клиентов.', chatQuick: [['Что входит?', 'Что входит в пакет AI-чат-бота и что оплачивается отдельно?'], ['Подойдёт ли моему сайту?', 'Помогите понять, подойдёт ли пакет AI-чат-бота моему сайту. Что вам нужно знать?']], chooseFocus: 'Выберите область для обсуждения', customResult: 'Мы предложим понятное решение и согласуем объём работ до начала разработки.',
      stepNotes: ['Определяем важные для бизнеса данные и правила.', 'Учитываем ваши инструменты, клиентов и работу команды.', 'Вместе проверяем результат перед запуском.']
    },
    et: {
      products: 'Kõik tooted', order: 'Lisa ostukorvi', quote: 'Arutame sinu projekti', ask: 'Küsi paketi kohta',
      scope: 'PAKETI SISU', benefits: 'MIS MUUTUB', benefitTitle: 'Vähem rutiini. Rohkem aega oluliseks tööks.',
      how: 'KUIDAS SEE TOIMIB', howTitle: 'Selge tee vajadusest toimiva lahenduseni.', preview: 'INTERAKTIIVNE NÄIDE',
      demoNote: 'Ainult näide — päris broneeringuid, sõnumeid ega muudatusi ei tehta.', included: 'Selgelt piiritletud seadistus', priceNote: 'Paketi hind · täiendavad tööd hinnatakse eraldi',
      customScope: 'Sinu vajadustele vastav töömaht', customIntro: 'Alustame soovitud tulemusest. Lepime lähenemise, töömahu ja hinna kokku enne töö algust.',
      customItems: ['Sinu nõuded ja prioriteedid', 'Töövoo ja vajalike ühenduste ettepanek', 'Kokkulepitud töömaht ja hind', 'Ühine testimise ja üleandmise plaan'],
      ready: 'TEEME TÖÖ LIHTSAMAKS', contactTitle: 'Räägi, mida vajad.', contactIntro: 'Kirjelda lühidalt oma vajadust, et saaksime hinnata sobivust ja pakkuda järgmist sammu.',
      name: 'Nimi', email: 'E-post', company: 'Ettevõte (valikuline)', message: 'Mida soovid parandada?', send: 'Saada päring',
      privacy: 'Kasutame andmeid sinu päringule vastamiseks. Palun ära lisa paroole ega tundlikke kliendiandmeid.',
      next: 'Mis saab edasi?', nextSteps: ['Vaatame sinu vajaduse üle.', 'Täpsustame töömahu ja võimalikud lisakulud.', 'Lepime kokku järgmise sammu.'], direct: 'Soovid otse ühendust võtta?', address: 'Tallinn, Eesti', faq: 'Enne alustamist',
      questions: ['Mida hind sisaldab?', 'Kas see sobib minu tööriistadega?', 'Kui kaua seadistamine aega võtab?'],
      answers: ['Pakett sisaldab eespool kirjeldatud töömahtu. Lisafunktsioone ja kolmandate osapoolte teenuste tasusid arutame eraldi.', 'Räägi, milliseid tööriistu ja veebilehte kasutad. Kinnitame sobivuse ja vajaliku integratsioonitöö enne töömahu kokkuleppimist.', 'Ajakava sõltub sisust, ligipääsudest ja nõuetest. Kinnitame tähtajad pärast sinu vajaduste mõistmist.'],
      sampleQuestion: 'Kuidas saad minu kliente aidata?', sampleAnswer: 'Saan vastata küsimustele kinnitatud sisu põhjal ja juhatada külastaja sobiva teenuseni. Muud küsimused suunan sinu tiimile.',
      tryChat: 'Räägi meie AI-assistendiga', run: 'Käivita näidistöövoog', reset: 'Käivita uuesti', done: 'Näide on lõpetatud. Sinu töövoog järgib kokkulepitud reegleid.',
      before: 'Enne', after: 'Pärast', oldSite: 'Palju infot. Vähe selgust.', newSite: 'Järgmine samm on selge.', sampleCta: 'Võta ühendust',
      customDemo: 'Sinu töövood on ühendatud.', customDemoText: 'Alusta ülesandest, mis võtab liiga palju aega. Lahendus arvestab sinu praeguste tööriistade ja inimestega.', sample: 'Vaata näidet', sampleDone: 'Ainult näidis. Oma veebilehe arutamiseks kasuta allolevat vormi.',
      liveAssistant: 'AI-ASSISTENT ON VEEBIS', chatTitle: 'AutomateLabsi tootenõustaja', chatOnline: 'Veebis · küsi küsimus', chatWelcome: 'Tere! Küsi AI chatboti paketi kohta või räägi, millistele külastajate küsimustele peaks see vastama.', chatPlaceholder: 'Küsi AI chatboti paketi kohta…', chatSend: 'Saada sõnum', chatClear: 'Tühjenda', chatNote: 'AI-assistent on veebis · Ära jaga paroole ega tundlikke kliendiandmeid.', chatQuick: [['Mida pakett sisaldab?', 'Mida AI-chatboti pakett sisaldab ja mis maksab lisaks?'], ['Kas see sobib mu veebilehele?', 'Aita mõista, kas AI-chatboti pakett sobib minu veebilehele. Mida pead teadma?']], chooseFocus: 'Vali valdkond, mida uurida', customResult: 'Pakume selge lahenduse ja lepime töömahu kokku enne arenduse algust.',
      stepNotes: ['Alustame sinu ettevõttele olulistest andmetest ja reeglitest.', 'Arvestame sinu tööriistade, klientide ja tiimiga.', 'Kontrollime tulemust koos enne igapäevast kasutamist.']
    }
  }[locale];
  const impactCopy = {
    en: {
      eyebrow: 'MEASURABLE IMPACT',
      title: 'Built around outcomes, not just features.',
      source: 'View source',
      capability: 'Product capability',
      process: 'Our process',
      products: {
        booking: [
          { value: '24/7', text: 'Customers can book when it suits them—not only while you are answering messages.', note: 'capability' },
          { value: '0', text: 'manual replies needed for a straightforward customer booking.', note: 'capability' },
          { value: '3', text: 'clear steps take a customer from service selection to confirmation.', note: 'capability' }
        ],
        chatbot: [
          { value: '24/7', text: 'Routine questions can get an immediate first response at any hour.', note: 'capability' },
          { value: '55%', text: 'of service professionals say customers prefer self-service channels such as chatbots.', source: 'chatbot' },
          { value: '92%', text: 'of service teams using AI report improved response times.', source: 'chatbot' }
        ],
        automation: [
          { value: '30–70%', text: 'reported time reduction on targeted tasks when automation is applied.', source: 'automation' },
          { value: '24/7', text: 'workflows can respond whenever an agreed trigger occurs.', note: 'capability' },
          { value: '45%', text: 'of employee time is spent on activities that could be automated with demonstrated technology.', source: 'automation-potential' }
        ],
        upgrade: [
          { value: '53%', text: 'of mobile visits are abandoned when a page takes more than three seconds to load.', source: 'website' },
          { value: '113%', text: 'higher bounce probability as mobile load time rises from one to seven seconds.', source: 'website-speed' },
          { value: '100%', text: 'of the package’s key pages are designed to work on both desktop and mobile.', note: 'capability' }
        ],
        custom: [
          { value: '1', text: 'clear business outcome anchors the solution from the start.', note: 'process' },
          { value: '100%', text: 'of the scope and price is agreed before development begins.', note: 'process' },
          { value: '3', text: 'practical stages: map the need, build the solution and hand it over.', note: 'process' }
        ]
      }
    },
    ru: {
      eyebrow: 'ИЗМЕРИМЫЙ ЭФФЕКТ',
      title: 'Результаты важнее списка функций.',
      source: 'Источник',
      capability: 'Возможность продукта',
      process: 'Наш процесс',
      products: {
        booking: [
          { value: '24/7', text: 'Клиенты могут записаться в удобный момент, а не только когда вы отвечаете на сообщения.', note: 'capability' },
          { value: '0', text: 'ручных ответов нужно для простой онлайн-записи.', note: 'capability' },
          { value: '3', text: 'понятных шага ведут клиента от выбора услуги до подтверждения записи.', note: 'capability' }
        ],
        chatbot: [
          { value: '24/7', text: 'На типовые вопросы можно отвечать в любое время суток.', note: 'capability' },
          { value: '55%', text: 'специалистов по сервису отмечают, что клиенты предпочитают каналы самообслуживания, например чат-боты.', source: 'chatbot' },
          { value: '92%', text: 'сервисных команд, использующих AI, отмечают сокращение времени ответа.', source: 'chatbot' }
        ],
        automation: [
          { value: '30–70%', text: 'сокращение времени на целевые задачи после внедрения автоматизации.', source: 'automation' },
          { value: '24/7', text: 'процессы могут запускаться при наступлении согласованного события.', note: 'capability' },
          { value: '45%', text: 'рабочего времени приходится на действия, которые можно автоматизировать существующими технологиями.', source: 'automation-potential' }
        ],
        upgrade: [
          { value: '53%', text: 'мобильных посещений прекращаются, если страница загружается дольше трёх секунд.', source: 'website' },
          { value: '113%', text: 'выше вероятность отказа, когда загрузка мобильной страницы увеличивается с 1 до 7 секунд.', source: 'website-speed' },
          { value: '100%', text: 'ключевых страниц в пакете проектируются для компьютеров и мобильных устройств.', note: 'capability' }
        ],
        custom: [
          { value: '1', text: 'понятный бизнес-результат задаёт направление решению с самого начала.', note: 'process' },
          { value: '100%', text: 'работ начинается только после согласования объёма и стоимости.', note: 'process' },
          { value: '3', text: 'практических этапа: определить задачу, создать решение и передать его вам.', note: 'process' }
        ]
      }
    },
    et: {
      eyebrow: 'MÕÕDETAV MÕJU',
      title: 'Tähtsad on tulemused, mitte ainult funktsioonid.',
      source: 'Vaata allikat',
      capability: 'Toote võimalus',
      process: 'Meie protsess',
      products: {
        booking: [
          { value: '24/7', text: 'Kliendid saavad broneerida endale sobival ajal, mitte ainult siis, kui vastad sõnumitele.', note: 'capability' },
          { value: '0', text: 'käsitsi vastust lihtsa veebibroneeringu tegemiseks.', note: 'capability' },
          { value: '3', text: 'selget sammu viivad kliendi teenuse valikust broneeringu kinnitamiseni.', note: 'capability' }
        ],
        chatbot: [
          { value: '24/7', text: 'Tüüpküsimustele saab vastata kohe ja igal kellaajal.', note: 'capability' },
          { value: '55%', text: 'teenindusspetsialistidest ütleb, et kliendid eelistavad iseteeninduskanaleid, näiteks chatbote.', source: 'chatbot' },
          { value: '92%', text: 'AI-d kasutavatest teenindustiimidest teatab kiiremast reageerimisajast.', source: 'chatbot' }
        ],
        automation: [
          { value: '30–70%', text: 'väiksem ajakulu sihitud ülesannetele pärast automatiseerimise rakendamist.', source: 'automation' },
          { value: '24/7', text: 'töövood saavad reageerida kohe, kui kokkulepitud käivitaja rakendub.', note: 'capability' },
          { value: '45%', text: 'töötajate ajast kulub tegevustele, mida saaks olemasoleva tehnoloogiaga automatiseerida.', source: 'automation-potential' }
        ],
        upgrade: [
          { value: '53%', text: 'mobiilikülastustest lõpeb, kui lehe laadimine võtab üle kolme sekundi.', source: 'website' },
          { value: '113%', text: 'suurem põrkemäär, kui mobiililehe laadimisaeg kasvab ühelt sekundilt seitsmele.', source: 'website-speed' },
          { value: '100%', text: 'paketi põhilehtedest kujundatakse toimima nii arvutis kui ka mobiilis.', note: 'capability' }
        ],
        custom: [
          { value: '1', text: 'selge äritulemus annab lahendusele algusest peale suuna.', note: 'process' },
          { value: '100%', text: 'töömahust ja hinnast lepitakse kokku enne arenduse algust.', note: 'process' },
          { value: '3', text: 'praktilist etappi: vajaduse kaardistamine, lahenduse loomine ja üleandmine.', note: 'process' }
        ]
      }
    }
  }[locale];
  const impactSources = {
    chatbot: 'https://blog.hubspot.com/service/state-of-service-report',
    automation: 'https://www.mckinsey.com/industries/industrials/our-insights/cutting-the-coordination-tax-how-agentic-ai-can-reshape-workflows',
        'automation-potential': 'https://www.mckinsey.com/mgi/media-center/how-many-of-your-daily-tasks-could-be-automated',
    website: 'https://www.thinkwithgoogle.com/_qs/documents/1964/1008-Progressive-Web-Apps.pdf',
    'website-speed': 'https://www.thinkwithgoogle.com/_qs/documents/57/mobile-page-speed-new-industry-benchmarks.pdf'
  };
  const prefix = locale === 'en' ? '' : locale === 'ru' ? '/RU' : '/EE';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function impactCards(productId) {
    const stats = impactCopy.products[productId] || impactCopy.products.custom;
    return stats.map((stat, index) => {
      const footer = stat.source
        ? `<a class="impact-source" href="${impactSources[stat.source]}" target="_blank" rel="noopener noreferrer">${impactCopy.source} <span aria-hidden="true">↗</span></a>`
        : `<span class="impact-source impact-source-note">${impactCopy[stat.note] || impactCopy.process}</span>`;
      return `<article class="impact-card" data-impact-order="0${index + 1}"><span class="impact-number">${esc(stat.value)}</span><p>${esc(stat.text)}</p>${footer}</article>`;
    }).join('');
  }

  function preview(p, bookingMarkup) {
    let content;
    if (p.id === 'booking') content = `<div class="booking-preview product-booking-preview">${bookingMarkup()}</div>`;
    else if (p.id === 'chatbot') content = `<div class="product-inline-chat" data-inline-chat data-welcome="${esc(copy.chatWelcome)}"><div class="product-inline-chat-header"><div class="demo-identity"><span class="demo-avatar">A</span><div><b>${copy.chatTitle}</b><small><span aria-hidden="true">●</span> ${copy.chatOnline}</small></div></div><button type="button" class="product-inline-chat-reset" data-inline-chat-reset>${copy.chatClear}</button></div><div class="product-inline-chat-messages" data-inline-chat-messages role="log" aria-live="polite" aria-relevant="additions"></div><div class="product-inline-chat-quick">${copy.chatQuick.map(([label, prompt]) => `<button type="button" data-chat-prompt="${esc(prompt)}">${esc(label)}</button>`).join('')}</div><form class="product-inline-chat-form" data-inline-chat-form><label class="al-sr-only" for="product-chat-input">${copy.chatPlaceholder}</label><textarea id="product-chat-input" rows="1" maxlength="2000" placeholder="${copy.chatPlaceholder}" required></textarea><button type="submit" aria-label="${copy.chatSend}">↑</button></form><p class="product-inline-chat-note">${copy.chatNote}</p></div>`;
    else if (p.id === 'automation') content = `<div class="product-demo-flow">${p.steps.map((s, i) => `<div class="demo-flow-step"><span>${i + 1}</span><b>${esc(s)}</b><i aria-hidden="true">○</i></div>`).join('')}<button type="button" class="button primary" data-run-workflow>${copy.run} →</button><p class="demo-status" role="status"></p></div>`;
    else if (p.id === 'upgrade') content = `<div class="demo-switch" role="group" aria-label="${copy.preview}"><button type="button" data-site-mode="before" aria-pressed="false">${copy.before}</button><button type="button" data-site-mode="after" aria-pressed="true">${copy.after}</button></div><div class="demo-website" data-mode="after"><div class="demo-site-nav"><b>Studio North</b><span>○ ○ ○</span></div><span class="demo-site-art" aria-hidden="true">✳</span><h3>${copy.newSite}</h3><button type="button" class="button primary" data-site-example>${copy.sampleCta} →</button><p class="demo-status" role="status"></p></div>`;
    else content = `<div class="product-demo-custom"><span class="demo-site-art" aria-hidden="true">✳</span><h3>${copy.customDemo}</h3><p>${copy.customDemoText}</p><p class="custom-focus-label">${copy.chooseFocus}</p><div class="custom-focus-options" role="group" aria-label="${copy.chooseFocus}">${p.control.map((item, index) => `<button type="button" data-custom-focus aria-pressed="${index === 0 ? 'true' : 'false'}">${esc(item)}</button>`).join('')}</div><div class="custom-focus-result" role="status"><b>${esc(p.control[0])}</b><span>${copy.customResult}</span></div></div>`;
    const label = p.id === 'chatbot' ? copy.liveAssistant : copy.preview;
    const caption = p.id === 'chatbot' ? '' : `<p class="demo-caption">${copy.demoNote}</p>`;
    return `<div class="demo-frame demo-frame-${p.id}"><div class="demo-topline"><span class="demo-live-dot"></span>${label}<span aria-hidden="true">↗</span></div>${content}${caption}</div>`;
  }

  window.ALProductPages = {
    render(p, bookingMarkup) {
      const page = document.querySelector('.product-page');
      const name = document.title.split('|')[0].trim();
      const action = p.price ? `<button class="button primary order" data-id="${p.id}">${copy.order} · €${p.price} <span>→</span></button>` : `<a class="button primary" href="#contact">${copy.quote} →</a>`;
      page.innerHTML = `
        <nav class="product-breadcrumb" aria-label="Breadcrumb"><a href="${prefix}/products.html">← ${copy.products}</a><span>/</span><span>${esc(name)}</span></nav>
        <section class="product-hero"><div><p class="eyebrow">${esc(p.tag)}</p><h1>${esc(p.title)}</h1><p class="lead">${esc(p.lead)}</p><div class="button-row">${action}<a class="text-link" href="#contact">${copy.ask} ↓</a></div><p class="package-price-note">${p.price ? copy.priceNote : copy.customIntro}</p></div><div class="product-hero-visual">${preview(p, bookingMarkup)}</div></section>
        <section class="product-impact" aria-labelledby="product-impact-title"><div class="product-impact-heading"><p class="eyebrow">${impactCopy.eyebrow}</p><h2 id="product-impact-title">${impactCopy.title}</h2></div><div class="impact-grid">${impactCards(p.id)}</div></section>
        <section class="product-scope" id="scope"><div><p class="eyebrow">${copy.scope}</p><h2>${esc(p.scopeTitle || copy.customScope)}</h2><p>${esc(p.scopeIntro || copy.customIntro)}</p></div><div><ul>${(p.scope || copy.customItems).map(s => `<li>${esc(s)}</li>`).join('')}</ul><p>${esc(p.scopeNote || copy.customIntro)}</p><a class="text-link" href="#contact">${copy.ask} →</a></div></section>
        <section class="experience" id="experience"><p class="eyebrow">${copy.how}</p><h2>${copy.howTitle}</h2><div class="experience-grid">${p.steps.map((s,i) => `<article><span>0${i+1}</span><b>${esc(s)}</b><p>${copy.stepNotes[i]}</p></article>`).join('')}</div></section>
        <section class="product-faq"><h2>${copy.faq}</h2><div>${copy.questions.map((q,i) => `<details><summary>${q}</summary><p>${copy.answers[i]}</p></details>`).join('')}</div></section>
        <section id="contact" class="contact-section product-contact-section"><div class="contact-request product-contact-heading"><p class="eyebrow">${copy.ready}</p><h2>${copy.contactTitle}</h2><p class="contact-intro">${copy.contactIntro}</p><p class="enquiry-product">${esc(name)}${p.price ? ` · €${p.price}` : ''}</p></div>
        <form class="contact-form" method="post" action="https://formsubmit.co/contact@automatelabs.me"><div class="form-row"><div class="form-field"><label for="product-name">${copy.name}</label><input id="product-name" name="name" autocomplete="name" maxlength="120" required></div><div class="form-field"><label for="product-email">${copy.email}</label><input id="product-email" type="email" name="email" autocomplete="email" maxlength="254" required></div></div><div class="form-field"><label for="product-company">${copy.company}</label><input id="product-company" name="company" autocomplete="organization" maxlength="160"></div><div class="form-field"><label for="product-message">${copy.message}</label><textarea id="product-message" name="message" rows="4" maxlength="4000" required></textarea></div><input type="hidden" name="product" value="${esc(name)}"><input type="text" name="_honey" tabindex="-1" autocomplete="off" hidden><p class="form-privacy">${copy.privacy}</p><button type="submit" class="button primary contact-submit">${copy.send} <span>→</span></button></form>
        <aside class="contact-side"><p class="eyebrow">AUTOMATELABS</p><h3>${copy.next}</h3><ol class="contact-next-steps">${copy.nextSteps.map(s => `<li>${s}</li>`).join('')}</ol><div class="contact-side-line"></div><h3>${copy.direct}</h3><div class="product-contact-details"><a class="product-contact-detail" href="mailto:contact@automatelabs.me"><span class="product-contact-icon" aria-hidden="true">✉</span><span>contact@automatelabs.me</span></a><a class="product-contact-detail" href="tel:+37258578858"><span class="product-contact-icon" aria-hidden="true">☎</span><span>+372 5857 8858</span></a><p class="product-contact-detail"><span class="product-contact-icon" aria-hidden="true">⌖</span><span>${copy.address}</span></p></div></aside></section>`;

      page.querySelectorAll('[data-custom-focus]').forEach(button => button.addEventListener('click', () => {
        const buttons = [...page.querySelectorAll('[data-custom-focus]')];
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        const result = page.querySelector('.custom-focus-result');
        if (result) {
          result.querySelector('b').textContent = button.textContent;
          result.querySelector('span').textContent = copy.customResult;
        }
      }));
      page.querySelector('[data-run-workflow]')?.addEventListener('click', async event => {
        const button = event.currentTarget;
        if (button.disabled) return;
        button.disabled = true;
        const steps = [...page.querySelectorAll('.demo-flow-step')];
        steps.forEach(s => { s.classList.remove('complete'); s.querySelector('i').textContent = '○'; });
        page.querySelector('.demo-status').textContent = '';
        for (const step of steps) {
          await new Promise(resolve => setTimeout(resolve, 450));
          step.classList.add('complete'); step.querySelector('i').textContent = '✓';
        }
        page.querySelector('.demo-status').textContent = copy.done;
        button.textContent = copy.reset + ' ↻'; button.disabled = false;
      });
      page.querySelectorAll('[data-site-mode]').forEach(button => button.addEventListener('click', () => {
        const before = button.dataset.siteMode === 'before';
        page.querySelector('.demo-website').dataset.mode = button.dataset.siteMode;
        page.querySelector('.demo-website h3').textContent = before ? copy.oldSite : copy.newSite;
        page.querySelectorAll('[data-site-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      }));
      page.querySelector('[data-site-example]')?.addEventListener('click', () => { page.querySelector('.demo-status').textContent = copy.sampleDone; });
    }
  };
})();
