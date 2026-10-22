/* ===== Настройки ===== */
const CONFIG = {
  // URL веб-приложения Google Apps Script (см. README.md). Пока пусто — форма не отправится.
  rsvpEndpoint: '',
  weddingDate: '2026-11-15T15:00:00+06:00',
  calendar: { year: 2026, month: 11, mark: 15 },
  texts: {
    sending: 'Жөнөтүлүүдө…',
    done: 'Рахмат! Жообуңуз кабыл алынды.',
    error: 'Ката кетти. Кайра аракет кылыңыз.',
    needName: 'Аты-жөнүңүздү жазыңыз',
    needAnswer: 'Жоопту тандаңыз',
  },
};

const WEEKDAYS = {
  ky: ['Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш', 'Жк'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};

/* ===== Календарь: месяц тоя, день обведён сердечком ===== */
const HEART = '<svg class="cal-heart" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
  + '<path pathLength="1" d="M24 41C12 33 5 26 5 17.5 5 11.5 9.6 7 15 7c4 0 7.2 2.3 9 5.8C25.8 9.3 29 7 33 7c5.4 0 10 4.5 10 10.5C43 26 36 33 24 41Z"/></svg>';
function renderCalendar(lang) {
  const { year, month, mark } = CONFIG.calendar;
  const first = (new Date(year, month - 1, 1).getDay() + 6) % 7; // понедельник = 0
  const days = new Date(year, month, 0).getDate();
  let cells = WEEKDAYS[lang].map(d => `<span class="cal-wd">${d}</span>`).join('');
  for (let i = 0; i < first; i++) cells += '<span class="cal-day"></span>';
  for (let d = 1; d <= days; d++) {
    cells += d === mark ? `<span class="cal-day cal-day-mark">${HEART}${d}</span>` : `<span class="cal-day">${d}</span>`;
  }
  document.getElementById('cal').innerHTML = cells;
}

/* ===== Кыргызский орнамент «кочкор мүйүз»: раскрывается, как росток ===== */
(function ornaments() {
  const motif = [
    ['M60 58V30', 0],
    ['M60 46C54 40 44 42 44 50 44 55 50 56 52 52', .35], ['M60 46C66 40 76 42 76 50 76 55 70 56 68 52', .35],
    ['M60 30C60 14 46 6 34 10 22 14 20 30 30 36 38 41 46 34 42 27 39 22 32 24 33 29', .55],
    ['M60 30C60 14 74 6 86 10 98 14 100 30 90 36 82 41 74 34 78 27 81 22 88 24 87 29', .55],
    ['M60 30C56 24 56 18 60 12 64 18 64 24 60 30', 1],
  ];
  const paths = (list, sw) => list.map(([d, delay]) => `<path d="${d}" pathLength="1" stroke-width="${sw}" style="--d:${delay}s"/>`).join('');
  const horns = `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g class="orn-grow">${paths(motif, 1.6)}</g></svg>`;
  const band = `<svg viewBox="0 0 300 44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    ${paths([['M112 31H20', .2], ['M188 31H280', .2],
      ['M20 31c-7 0-10-7-5-9 4-1.5 6 3 3 4.5', 1.1], ['M280 31c7 0 10-7 5-9-4-1.5-6 3-3 4.5', 1.1],
      ['M70 31c-1-5 1-9 5-10 0 5-2 8-5 10', 1.25], ['M230 31c1-5-1-9-5-10 0 5 2 8 5 10', 1.25]], 1.1)}
    <g transform="translate(112.8 -5) scale(.62)"><g class="orn-grow">${paths(motif, 1.8)}</g></g>
  </svg>`;
  document.querySelectorAll('.orn-horns').forEach(el => { el.innerHTML = horns; });
  document.querySelectorAll('.orn-band').forEach(el => { el.innerHTML = band; });
})();

/* ===== Язык: кыргызский по умолчанию, русский по кнопке ===== */
const RU = {
  open: 'Нажмите, чтобы открыть',
  envKicker: 'Приглашение', envScript: 'на той',
  kicker: 'Приглашение',
  dearTitle: 'Дорогие гости!',
  dear: 'Разделите с нами радость создания новой семьи!',
  invite: 'С именем Всевышнего и благословением наших родителей приглашаем вас разделить с нами один из самых счастливых и важных дней нашей жизни — создание нашей семьи.',
  getting: 'создают семью',
  dateLine: '15 ноября 2026 года', weekday: 'Воскресенье',
  until: 'До торжества осталось', uD: 'дней', uH: 'часов', uM: 'минут', uS: 'секунд',
  timing: 'Программа дня',
  t1: 'Сбор гостей', t2: 'Начало торжества', t3: 'Праздничный ужин', t5: 'Завершение вечера',
  venue: 'Локация', venueName: 'Ресторан «Аяр»',
  address: 'г. Бишкек, Чуй, 1141, Новопавловка', map: 'Открыть карту',
  details: 'Детали',
  d1: 'Вместо цветов подарите молодым открытку с тёплыми пожеланиями — она останется на память навсегда.',
  d2: 'Подарки будем рады принять в конверте — так удобнее всего для молодой семьи.',
  dress: 'Дресс-код',
  dressText: 'Будем рады, если вы поддержите цвета нашего праздника. Ваши наряды и улыбки — лучшее украшение вечера!',
  c1: 'шампань', c2: 'пудра', c3: 'бордо', c4: 'чёрный', c5: 'коричневый', c6: 'золотистый',
  wish: 'Будем искренне рады видеть вас среди наших дорогих гостей и разделить с вами радость этого особенного дня.',
  regards: 'С уважением и теплом, родители молодожёнов',
  hosts: 'Турсунбек и Сайнап',
  rsvp: 'Анкета', rsvpSub: 'Пожалуйста, подтвердите своё присутствие',
  nameLabel: 'Ваше имя и фамилия', namePh: 'Например: Асель Мамбетова',
  question: 'Если придёте с супругом(ой), укажите имена обоих',
  a1: 'Обязательно приду', a2: 'Придём с супругом(ой)', a3: 'Не смогу прийти',
  submit: 'Отправить ответ',
};
const TEXTS_RU = {
  sending: 'Отправляем…',
  done: 'Спасибо! Ваш ответ принят.',
  error: 'Произошла ошибка. Попробуйте ещё раз.',
  needName: 'Укажите ваше имя',
  needAnswer: 'Выберите ответ',
};
let LANG = 'ky';
const texts = () => (LANG === 'ru' ? TEXTS_RU : CONFIG.texts);

function setLang(lang) {
  LANG = lang === 'ru' ? 'ru' : 'ky';
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.dataset.ky === undefined) el.dataset.ky = el.innerHTML; // кыргызский текст — из самой разметки
    el.innerHTML = LANG === 'ru' ? RU[el.dataset.i18n] ?? el.dataset.ky : el.dataset.ky;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      const store = 'ky' + attr.replace(/-/g, '');
      if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(attr);
      el.setAttribute(attr, LANG === 'ru' ? RU[key] ?? el.dataset[store] : el.dataset[store]);
    });
  });
  document.querySelectorAll('.lang [data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  renderCalendar(LANG);
  if (window.layoutSnake) layoutSnake();
  const note = document.querySelector('.form-note');
  if (note) note.textContent = '';
  try { localStorage.setItem('lang', LANG); } catch (e) { /* приватный режим — просто не запоминаем */ }
}
(function langSwitch() {
  const box = document.querySelector('.lang');
  ['pointerdown', 'touchstart'].forEach(ev => box.addEventListener(ev, e => e.stopPropagation(), { passive: true }));
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) { e.stopPropagation(); setLang(b.dataset.lang); }
  });
  let saved = 'ky';
  try { saved = localStorage.getItem('lang') || 'ky'; } catch (e) { /* нет доступа к хранилищу */ }
  setLang(saved);
  const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 80);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== Появление элементов по скроллу ===== */
function startReveal() {
  const items = document.querySelectorAll('[data-anim]:not(.is-in)');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
}

/* ===== Конверт ===== */
(function envelope() {
  const env = document.querySelector('.envelope');
  const block = e => { if (env.dataset.open === 'false') e.preventDefault(); };
  const keys = e => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key) && env.dataset.open === 'false') {
      e.preventDefault();
      if (e.key === ' ') open();
    }
  };
  function open() {
    if (env.dataset.open === 'true') return;
    env.dataset.open = 'true';
    env.setAttribute('aria-hidden', 'true');
    env.tabIndex = -1;
    document.body.classList.remove('locked');
    removeEventListener('wheel', block);
    removeEventListener('touchmove', block);
    removeEventListener('keydown', keys);
    scrollTo(0, 0);
    setTimeout(startReveal, 700); // пока расходятся половинки конверта
  }
  addEventListener('wheel', block, { passive: false });
  addEventListener('touchmove', block, { passive: false });
  addEventListener('keydown', keys);
  env.addEventListener('click', open);
  env.focus({ preventScroll: true });
})();

/* ===== Таймер ===== */
(function countdown() {
  const cells = {};
  document.querySelectorAll('#countdown [data-unit]').forEach(el => { cells[el.dataset.unit] = el; });
  const target = new Date(CONFIG.weddingDate).getTime();
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    cells.d.textContent = pad(d); cells.h.textContent = pad(h);
    cells.m.textContent = pad(m); cells.s.textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);
})();

/* ===== Анкета → Google Таблица ===== */
(function rsvp() {
  const box = document.getElementById('rsvp');
  const form = box.querySelector('form');
  const input = form.elements.name;
  const btn = form.querySelector('.form-submit');
  const note = form.querySelector('.form-note');

  input.addEventListener('input', () => input.classList.remove('invalid'));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = input.value.trim();
    const answer = (form.querySelector('input[name="answer"]:checked') || {}).value;
    if (!name) { input.classList.add('invalid'); note.textContent = texts().needName; input.focus(); return; }
    if (!answer) { note.textContent = texts().needAnswer; return; }
    if (!CONFIG.rsvpEndpoint) { note.textContent = texts().error; console.warn('Не задан rsvpEndpoint — см. README.md'); return; }

    btn.disabled = true;
    note.textContent = texts().sending;
    try {
      // text/plain — «простой» запрос без preflight, Apps Script его принимает
      const res = await fetch(CONFIG.rsvpEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, answer, page: location.href }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) throw new Error(data.error || res.status);
      box.innerHTML = `<p class="form-done">${texts().done}</p>`;
    } catch (err) {
      console.error(err);
      note.textContent = texts().error;
      btn.disabled = false;
    }
  });
})();

/* ===== Шёлк: складки красной ткани ===== */
(function silk() {
  const svg = `<svg viewBox="0 0 400 120" preserveAspectRatio="none">
    <defs>
      <linearGradient id="sA" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#5a0911"/><stop offset=".3" stop-color="#b8222d"/><stop offset=".55" stop-color="#6e0c14"/><stop offset=".8" stop-color="#c22a35"/><stop offset="1" stop-color="#5a0911"/>
      </linearGradient>
      <linearGradient id="sB" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8a1019"/><stop offset=".4" stop-color="#4e070d"/><stop offset=".7" stop-color="#a51b26"/><stop offset="1" stop-color="#5e0a12"/>
      </linearGradient>
      <linearGradient id="sH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffd9c0" stop-opacity="0"/><stop offset=".5" stop-color="#ffd9c0" stop-opacity=".55"/><stop offset="1" stop-color="#ffd9c0" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g class="fold-c"><path d="M0 70C60 40 110 95 180 62S300 30 400 66V120H0Z" fill="url(#sB)"/></g>
    <g class="fold-b"><path d="M0 84C70 60 130 110 210 80S330 52 400 82V120H0Z" fill="url(#sA)"/>
      <path d="M40 80C100 66 150 100 210 82" fill="none" stroke="url(#sH)" stroke-width="2"/></g>
    <g class="fold-a"><path d="M0 100C80 84 150 118 230 98S350 84 400 100V120H0Z" fill="#6e0c14"/>
      <path d="M200 99C260 90 320 86 380 98" fill="none" stroke="url(#sH)" stroke-width="1.5"/></g>
  </svg>`;
  // id градиентов должны быть уникальны на странице — у каждого шёлка свои
  document.querySelectorAll('.silk').forEach((el, i) => {
    el.innerHTML = svg.replace(/id="s([ABH])"/g, `id="s$1${i}"`).replace(/url\(#s([ABH])\)/g, `url(#s$1${i})`);
  });
})();

/* ===== Тайминг: змейка, по ней при прокрутке катится роза ===== */
const ICONS = {
  heart: '<path pathLength="1" d="M23 39C11 31 5 24.5 5 16.5 5 11 9.3 7 14.3 7c3.8 0 6.8 2.2 8.7 5.4C24.9 9.2 27.9 7 31.7 7 36.7 7 41 11 41 16.5 41 24.5 35 31 23 39Z"/>',
  rings: '<circle pathLength="1" cx="17" cy="28" r="10"/><circle pathLength="1" cx="29" cy="28" r="10"/><path pathLength="1" d="M13 12l4-5h6l4 5-7 6z"/>',
  plate: '<circle pathLength="1" cx="23" cy="24" r="13"/><circle pathLength="1" cx="23" cy="24" r="8.5"/><path pathLength="1" d="M5 10v8a2 2 0 0 0 2 2v18M3 10v7M7 10v7M41 10c-3 2-4 6-4 10h4v18"/>',
  cake: '<rect pathLength="1" x="9" y="30" width="28" height="10" rx="1.5"/><rect pathLength="1" x="13" y="21" width="20" height="9" rx="1.5"/><rect pathLength="1" x="17" y="13" width="12" height="8" rx="1.5"/><path pathLength="1" d="M23 13V8M23 5c1.5 1 1.5 2.5 0 3-1.5-.5-1.5-2 0-3zM6 40h34"/>',
  stars: '<path pathLength="1" d="M23 6l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/><path pathLength="1" d="M37 28l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5zM9 30l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>',
};
(function timing() {
  const snake = document.getElementById('snake');
  const items = [...snake.querySelectorAll('.snake-items li')];
  items.forEach(li => li.insertAdjacentHTML('afterbegin',
    `<svg class="si-icon" viewBox="0 0 46 46" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[li.dataset.icon] || ''}</svg>`));
  const base = snake.querySelector('.snake-base');
  const line = snake.querySelector('.snake-line');
  const svg = snake.querySelector('.snake-svg');
  const rose = snake.querySelector('.rose');
  const ROW = 190, TOP = 40;
  let len = 0;

  // волна: изгибы поочерёдно у левого и правого края, пункт — в свободной половине напротив
  window.layoutSnake = function layoutSnake() {
    const W = snake.clientWidth;
    const H = TOP + ROW * items.length + 40;
    snake.style.height = H + 'px';
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const pt = k => ({ x: k % 2 ? W * .82 : W * .18, y: TOP + ROW * k + ROW / 2 });
    let d = `M${W / 2} 0C${W / 2} ${TOP} ${pt(0).x} ${pt(0).y - ROW / 2} ${pt(0).x} ${pt(0).y}`;
    for (let k = 1; k < items.length; k++) {
      const a = pt(k - 1), b = pt(k);
      d += `C${a.x} ${a.y + ROW / 2} ${b.x} ${b.y - ROW / 2} ${b.x} ${b.y}`;
    }
    const last = pt(items.length - 1);
    d += `C${last.x} ${last.y + ROW / 2} ${W / 2} ${H - 30} ${W / 2} ${H}`;
    base.setAttribute('d', d);
    line.setAttribute('d', d);
    len = line.getTotalLength();
    items.forEach((li, k) => {
      const p = pt(k);
      li.style.top = p.y + 'px';
      li.style.left = (k % 2 ? W * .04 : W * .5) + 'px';
    });
    update();
  };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function update() {
    if (!len) return;
    const r = snake.getBoundingClientRect();
    // роза идёт за серединой экрана: верх змейки — 0, низ — 1
    const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * .55 - r.top) / r.height));
    const at = line.getPointAtLength(p * len);
    rose.style.transform = `translate(${at.x}px, ${at.y}px) rotate(${p * 720}deg)`;
    line.style.strokeDashoffset = String(1 - p);
    items.forEach(li => { if (parseFloat(li.style.top) <= at.y + 60) li.classList.add('is-in'); });
  }
  let raf = 0;
  const kick = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => layoutSnake());
  document.fonts && document.fonts.ready.then(() => layoutSnake());
  layoutSnake();
})();
