// ============================================
// CORTISOL.EXE — script.js
// ============================================

// ---- State ----
const state = {
  sleep:     6,
  coffee:    0,
  tiktok:    0,
  monday:    3,
  gym:       0,
  deadlines: 0,
  sigma:     30,
  earnings:  0,
  musicMod:  0,
  country:   0,
};

let currentScreen = 'boot';
const SCREENS = ['boot', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'result'];
const TOTAL_Q = 8;

// ============================================
// NAVIGATION
// ============================================
function goTo(screenId) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById('screen-' + screenId);
  if (!next) return;

  if (current) {
    current.classList.add('slide-out-left');
    setTimeout(() => {
      current.classList.remove('active', 'slide-out-left');
    }, 300);
  }

  next.classList.add('active', 'slide-in-right');
  setTimeout(() => next.classList.remove('slide-in-right'), 300);

  currentScreen = screenId;
  updateProgress();
}

function updateProgress() {
  const idx = SCREENS.indexOf(currentScreen);
  const qIdx = idx - 1;
  const pct = qIdx <= 0 ? 0 : qIdx >= TOTAL_Q ? 100 : (qIdx / TOTAL_Q) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  const bar = document.getElementById('progress-container');
  bar.style.display = (currentScreen === 'boot') ? 'none' : 'block';
}

function goNext() {
  const idx = SCREENS.indexOf(currentScreen);
  if (idx < SCREENS.length - 1) {
    goTo(SCREENS[idx + 1]);
  }
}
window.goNext = goNext;

// ============================================
// BOOT SEQUENCE
// ============================================
const bootLines = [
  'C:\\> CORTISOL.EXE --INIT',
  '> LOADING BRAIN MODULES... OK',
  '> SCANNING MENTAL HEALTH... ',
  '> ERROR: CORTISOL_OVERLOAD.SYS',
  '> STARTING DIAGNOSTIC SEQUENCE...',
];

function runBoot() {
  const terminal = document.getElementById('boot-terminal');
  const popup = document.getElementById('win98-popup');
  let lineIdx = 0;
  let charIdx = 0;
  let text = '';

  const interval = setInterval(() => {
    if (lineIdx >= bootLines.length) {
      clearInterval(interval);
      setTimeout(() => popup.classList.add('show'), 400);
      return;
    }
    const line = bootLines[lineIdx];
    if (charIdx < line.length) {
      text += line[charIdx];
      terminal.textContent = text;
      charIdx++;
    } else {
      text += '\n';
      terminal.textContent = text;
      lineIdx++;
      charIdx = 0;
    }
  }, 28);
}

function startQuiz() {
  document.getElementById('win98-popup').classList.remove('show');
  goTo('q1');
}
window.startQuiz = startQuiz;

// ============================================
// Q1: SLEEP — Nokia Battery
// ============================================
const SLEEP_MIN = 0;
const SLEEP_MAX = 12;
const SLEEP_BARS = 12;

function renderNokia() {
  const bars = document.getElementById('nokia-bars');
  bars.innerHTML = '';
  const filled = Math.round((state.sleep / SLEEP_MAX) * SLEEP_BARS);
  const isLow = filled <= 3;
  for (let i = 0; i < SLEEP_BARS; i++) {
    const bar = document.createElement('div');
    bar.className = 'nokia-bar' + (i < filled ? (isLow ? ' low' : ' filled') : '');
    bars.appendChild(bar);
  }
  document.getElementById('nokia-hours').textContent = state.sleep + ' Ч';

  let desc;
  if (state.sleep <= 3)       desc = 'РЕЖИМ ЗОМБИ-АПОКАЛИПСИСА 💀';
  else if (state.sleep <= 6)  desc = 'СПЛЮ ЧИСТО ЧТОБЫ НЕ УМЕРЕТЬ';
  else if (state.sleep <= 9)  desc = 'НОРМАЛЬНО, ПОЧТИ КАК ЧЕЛОВЕК';
  else                        desc = 'HIBERNATE MODE ACTIVATED 😴';
  document.getElementById('sleep-desc').textContent = desc;
}

function adjustSleep(delta) {
  state.sleep = Math.max(SLEEP_MIN, Math.min(SLEEP_MAX, state.sleep + delta));
  renderNokia();
}
window.adjustSleep = adjustSleep;

// ============================================
// Q2: COFFEE — Cup Fill
// ============================================
const COFFEE_VIBES = [
  'АБСТИНЕНТ 🙂',
  'ОСТОРОЖНО НАЧИНАЮ',
  '2 ЧАШКИ. НОРМ.',
  'УЖЕ СЛЫШУ ЦВЕТА',
  'ВИЖУ ЗВУКИ 😵',
  'ВИЖУ ЗВУКИ, СЛЫШУ ЦВЕТА!!!',
  'ТАХИКАРДИЯ АКТИВИРОВАНА ⚡',
  'СЕРДЦЕ ИГРАЕТ DRUM&BASS',
  'СТАЛ ДРУГИМ ЧЕЛОВЕКОМ',
  '999 REASONS TO GO TO HOSPITAL',
  '💀 GG EZ',
];

function addCoffee() {
  if (state.coffee >= 10) return;
  state.coffee++;

  const fillPct = Math.min((state.coffee / 10) * 100, 100);
  document.getElementById('mug-fill').style.height = fillPct + '%';
  document.getElementById('coffee-count').textContent =
    state.coffee + (state.coffee === 1 ? ' ЧАШКА' : state.coffee < 5 ? ' ЧАШКИ' : ' ЧАШЕК');
  document.getElementById('coffee-vibe').textContent =
    COFFEE_VIBES[state.coffee] || COFFEE_VIBES[COFFEE_VIBES.length - 1];

  if (state.coffee > 5) {
    const wrap = document.getElementById('coffee-wrap');
    wrap.classList.remove('shaking');
    void wrap.offsetWidth;
    wrap.classList.add('shaking');
  }
  if (state.coffee >= 10) {
    document.getElementById('coffee-btn').textContent = '💀 ХВАТИТ';
    document.getElementById('coffee-btn').style.opacity = '0.5';
  }
}
window.addCoffee = addCoffee;

// ============================================
// Q3: TIKTOK — Emoji Slider
// ============================================
const TIKTOK_EMOJIS = [
  { max: 1,  emoji: '🤡', desc: 'ЖИВЁТ В РЕАЛЬНОСТИ' },
  { max: 2,  emoji: '📱', desc: 'ПРОВЕРЯЕТ НОТИФЫ' },
  { max: 3,  emoji: '😵', desc: 'ЗАЛИПАЕТ ПЕРИОДИЧЕСКИ' },
  { max: 4,  emoji: '🤯', desc: 'АЛГОРИТМ УЖЕ ЗНАЕТ ВСЁ О НЕМ' },
  { max: 6,  emoji: '🫠', desc: 'РАСТВОРЯЕТСЯ В КОНТЕНТЕ' },
  { max: 9,  emoji: '👻', desc: 'СУЩЕСТВУЕТ ТОЛЬКО В ТЕЛЕФОНЕ' },
];

function updateTiktok(value) {
  state.tiktok = parseFloat(value);
  const v = state.tiktok;
  const entry = TIKTOK_EMOJIS.find(e => v < e.max) || TIKTOK_EMOJIS[TIKTOK_EMOJIS.length - 1];
  document.getElementById('tiktok-emoji').textContent = entry.emoji;
  document.getElementById('tiktok-val').textContent = v + ' ЧАСОВ';
  document.getElementById('tiktok-desc').textContent = entry.desc;
}
window.updateTiktok = updateTiktok;

// ============================================
// Q4: DEADLINES — Tinder Swipe
// ============================================
const SWIPE_CARDS = [
  { emoji: '🏃', text: 'Мой единственный кардио — бег от дедлайнов' },
  { emoji: '📅', text: 'Начну новую жизнь с понедельника. В следующий.' },
  { emoji: '🪞', text: 'Купил абонемент в зал ради селфи в зеркале' },
  { emoji: '🌙', text: 'Дедлайн завтра? Сегодня я отдыхаю. Завтра — точно.' },
  { emoji: '🎯', text: 'Работаю лучше всего в 3 ночи. Неслучайно.' },
];

let swipeState = {
  cards: [],
  current: 0,
  jizaCount: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  currentX: 0,
};

function initSwipe() {
  swipeState = { cards: [], current: 0, jizaCount: 0, dragging: false, startX: 0, startY: 0, currentX: 0 };
  const stack = document.getElementById('cards-stack');
  stack.innerHTML = '';

  SWIPE_CARDS.forEach((data, i) => {
    const card = document.createElement('div');
    card.className = 'swipe-card' + (i === 0 ? ' top' : '');
    card.innerHTML = `
      <div>
        <span class="card-emoji">${data.emoji}</span>
        ${data.text}
      </div>
      <div class="vote-overlay vote-yes">ЖИЗА ♥</div>
      <div class="vote-overlay vote-no">СКИП ✕</div>
    `;
    attachSwipeListeners(card, i);
    stack.appendChild(card);
    swipeState.cards.push(card);
  });

  updateCardsLeft();
}

function attachSwipeListeners(card, idx) {
  card.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY, card, idx));
  card.addEventListener('touchstart', e => startDrag(e.touches[0].clientX, e.touches[0].clientY, card, idx), { passive: true });

  document.addEventListener('mousemove', e => onDrag(e.clientX, card, idx));
  document.addEventListener('touchmove', e => onDrag(e.touches[0].clientX, card, idx), { passive: true });

  document.addEventListener('mouseup',  () => endDrag(card, idx));
  document.addEventListener('touchend', () => endDrag(card, idx));
}

function startDrag(x, y, card, idx) {
  if (idx !== swipeState.current) return;
  swipeState.dragging = true;
  swipeState.startX = x;
  swipeState.currentX = 0;
}

function onDrag(x, card, idx) {
  if (!swipeState.dragging || idx !== swipeState.current) return;
  const dx = x - swipeState.startX;
  swipeState.currentX = dx;
  card.style.transform = `translateX(${dx}px) rotate(${dx * 0.08}deg)`;

  const yesOv = card.querySelectorAll('.vote-overlay')[0];
  const noOv  = card.querySelectorAll('.vote-overlay')[1];
  const str = Math.abs(dx) / 80;
  if (dx > 20)      { yesOv.style.opacity = Math.min(str, 1); noOv.style.opacity = 0; }
  else if (dx < -20){ noOv.style.opacity  = Math.min(str, 1); yesOv.style.opacity = 0; }
  else              { yesOv.style.opacity = 0; noOv.style.opacity = 0; }
}

function endDrag(card, idx) {
  if (!swipeState.dragging || idx !== swipeState.current) return;
  swipeState.dragging = false;

  const dx = swipeState.currentX;
  if (Math.abs(dx) >= 80) {
    const right = dx > 0;
    card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
    card.style.transform  = `translateX(${right ? 400 : -400}px) rotate(${right ? 20 : -20}deg)`;
    card.style.opacity = '0';
    if (right) swipeState.jizaCount++;
    setTimeout(() => nextCard(), 350);
  } else {
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = '';
    card.querySelectorAll('.vote-overlay').forEach(o => o.style.opacity = 0);
    setTimeout(() => card.style.transition = '', 300);
  }
}

function nextCard() {
  swipeState.current++;
  updateCardsLeft();
  const next = swipeState.cards[swipeState.current];
  if (next) {
    next.style.transition = 'opacity 0.25s ease';
    next.classList.add('top');
    setTimeout(() => next.style.transition = '', 250);
  } else {
    state.deadlines = swipeState.jizaCount * 3;
    state.monday    = swipeState.jizaCount * 4;
    setTimeout(() => goNext(), 400);
  }
}

function updateCardsLeft() {
  const el = document.getElementById('cards-left');
  if (el) el.textContent = Math.max(0, SWIPE_CARDS.length - swipeState.current);
}

// ============================================
// Q5: GYM
// ============================================
function selectGym(val, btn) {
  state.gym = val;
  document.querySelectorAll('.gym-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setTimeout(() => goNext(), 400);
}
window.selectGym = selectGym;

// ============================================
// Q6: EARNINGS
// ============================================
const EARNINGS_OPTIONS = [
  { mod: +12, emoji: '💸', label: 'НА КОФЕ НЕ ХВАТАЕТ',   sub: 'стипа не пришла',       cls: 'earn-broke' },
  { mod: +7,  emoji: '🫠', label: 'ЕЛЕ-ЕЛЕ ДУША В ТЕЛЕ', sub: 'живу на дошик',          cls: 'earn-low'   },
  { mod: +2,  emoji: '😐', label: 'НУ ЧЕ-ТО ДА ЕСТЬ',     sub: 'не богатый, но живу',    cls: 'earn-mid'   },
  { mod: -4,  emoji: '😎', label: 'В СВОЁМ СЕЗОНЕ',        sub: 'летаю бизнесом в душе',  cls: 'earn-good'  },
  { mod: -9,  emoji: '👑', label: 'ПАПА БОГАТЫЙ',          sub: 'не работаю — и не надо', cls: 'earn-rich'  },
];

function initEarnings() {
  const wrap = document.getElementById('earnings-options');
  if (!wrap) return;
  wrap.innerHTML = '';
  EARNINGS_OPTIONS.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'earn-btn ' + opt.cls;
    btn.innerHTML =
      '<span class="earn-emoji">' + opt.emoji + '</span>' +
      '<span class="earn-text">' +
        '<span class="earn-label">' + opt.label + '</span>' +
        '<span class="earn-sub">'   + opt.sub   + '</span>' +
      '</span>';
    btn.onclick = function() { selectEarnings(opt, btn); };
    wrap.appendChild(btn);
  });
}

function selectEarnings(opt, btn) {
  state.earnings = opt.mod;
  document.querySelectorAll('.earn-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setTimeout(() => goNext(), 380);
}

// ============================================
// Q7: MUSIC
// ============================================
const MUSIC_ARTISTS = [
  { id: 'hollis', name: '2HOLLIS',        emoji: '🖤', mod: +8  },
  { id: 'prince', name: 'ТЁМНЫЙ ПРИНЦ',   emoji: '🌑', mod: +6  },
  { id: 'hamali', name: 'HAMALI & NAVAI',  emoji: '💫', mod:  0  },
  { id: 'kaspiy', name: 'КАСПИЙСКИЙ ГРУЗ', emoji: '🌊', mod: -5  },
  { id: 'travis', name: 'TRAVIS SCOTT',    emoji: '🔥', mod: +5  },
  { id: 'kanye',  name: 'KANYE WEST',      emoji: '👑', mod: +9  },
  { id: 'carti',  name: 'PLAYBOI CARTI',   emoji: '🎭', mod: +6  },
  { id: 'billie', name: 'BILLIE EILISH',   emoji: '🌸', mod: -3  },
  { id: 'weeknd', name: 'THE WEEKND',      emoji: '🌙', mod: +3  },
];

var selectedArtists = {};

function initMusic() {
  selectedArtists = {};
  const grid = document.getElementById('music-grid');
  if (!grid) return;
  grid.innerHTML = '';
  MUSIC_ARTISTS.forEach(function(a) {
    var btn = document.createElement('button');
    btn.className = 'music-btn';
    btn.dataset.id = a.id;
    btn.innerHTML =
      '<span class="music-emoji">' + a.emoji + '</span>' +
      '<span class="music-name">'  + a.name  + '</span>';
    btn.onclick = function() { toggleArtist(a.id, btn); };
    grid.appendChild(btn);
  });
  updateMusicHint();
}

function toggleArtist(id, btn) {
  if (selectedArtists[id]) {
    delete selectedArtists[id];
    btn.classList.remove('active');
  } else {
    selectedArtists[id] = true;
    btn.classList.add('active');
  }
  var mod = 0;
  Object.keys(selectedArtists).forEach(function(key) {
    var a = MUSIC_ARTISTS.find(function(x) { return x.id === key; });
    if (a) mod += a.mod;
  });
  state.musicMod = Math.max(-10, Math.min(15, mod));
  updateMusicHint();
}

function updateMusicHint() {
  var count = Object.keys(selectedArtists).length;
  var hint = document.getElementById('music-hint');
  if (hint) hint.textContent = count > 0 ? 'выбрано: ' + count : 'тапни по исполнителям';
}

// ============================================
// Q8: 52 or 67 — CHOOSE YOUR FIGHTER
// ============================================
function selectCountry(val) {
  state.country = val;
  var left  = document.getElementById('fighter-52');
  var right = document.getElementById('fighter-67');
  if (val < 0) { left.classList.add('chosen'); right.classList.add('unchosen'); }
  else         { right.classList.add('chosen'); left.classList.add('unchosen'); }
  setTimeout(function() { showResult(); }, 500);
}
window.selectCountry = selectCountry;

// ============================================
// SCORE CALCULATION
// ============================================
const characters = [
  {
    minScore: 1, maxScore: 19,
    class: 'ZEN NPC',
    titles: ['ЖИВЁТ В МОМЕНТЕ 🌿', 'ВАЙБ ПРИНЯТИЯ И ПОКОЯ', 'СПОКОЕН КАК БУДДИСТ'],
    diagnosis: 'Атмосфера вайба и принятия',
    mental: '🟢 Спокойный коан',
    buff: '+100 к дзену',
    debuff: 'Слегка отстранён от реальности',
    verdict: ['сон', 'нормально', 'кофе', 'почти не пьёт', 'вайб', 'стабильно стабилен', 'итог', 'реально всё ок'],
  },
  {
    minScore: 20, maxScore: 34,
    class: 'CASUAL ENJOYER',
    titles: ['ТЫ НОРМАЛЬНЫЙ. СТРАШНО.', 'ФУНКЦИОНИРУЕТ КАК ЧЕЛОВЕК', 'СРЕДНЕСТАТИСТИЧЕСКИЙ САПИЕНС'],
    diagnosis: 'Умеренный интернет-человек',
    mental: '🟡 Слегка тревожный, но терпимо',
    buff: '+50 к стабильности',
    debuff: 'Прокрастинирует с достоинством',
    verdict: ['сон', 'почти норм', 'кофе', 'умеренно', 'вайб', 'слегка тревожный', 'итог', 'живёт и радуется'],
  },
  {
    minScore: 35, maxScore: 49,
    class: 'NIGHT DRIVE SURVIVOR',
    titles: ['ТЫ ГОРИШЬ, НО КРАСИВО 🔥', 'ХРОНИЧЕСКИЙ ПОЗДНИЙ РЕЖИМ', 'ПРОДУКТИВЕН В 2 НОЧИ'],
    diagnosis: 'Хронический поздний режим',
    mental: '🟡 Всё окей, если не думать',
    buff: '+100 к продуктивности в 3 ночи',
    debuff: 'Будильник — личный враг',
    verdict: ['сон', 'минус два часа', 'кофе', 'заменяет кровь', 'вайб', 'стабильно нестабилен', 'итог', 'жив чисто на чилле'],
  },
  {
    minScore: 50, maxScore: 64,
    class: 'DISCORD MONK',
    titles: ['МАСТЕР ПОГРАНИЧНЫХ СОСТОЯНИЙ', 'ГЛАВНЫЙ ДРАМАТИЧЕСКИЙ ПЕРСОНАЖ', 'ЦИФРОВОЙ ОТШЕЛЬНИК С WI-FI'],
    diagnosis: 'Цифровой отшельник с wi-fi',
    mental: '🟠 Тревожный, но с мемами',
    buff: '+48 альтернативных точек зрения',
    debuff: '-60 к желанию жить при звуках будильника',
    verdict: ['сон', 'непостоянный', 'кофе', 'много', 'вайб', 'discord в 3 ночи', 'итог', 'кортизол платит аренду'],
  },
  {
    minScore: 65, maxScore: 74,
    class: 'CORPORATE BURNOUT GOBLIN',
    titles: ['СВЕРХПРОВОДНИК НОЧНОГО КРИНЖА ⚡', 'ОДИН МЕМ ОТ СРЫВА', 'НА 84% СОСТОИТ ИЗ ДЕДЛАЙНОВ'],
    diagnosis: 'Интернет-психика из дедлайнов',
    mental: '🔴 Один мем от срыва',
    buff: 'Умеет выглядеть норм на зуме',
    debuff: 'Внутри — perpetual fight or flight',
    verdict: ['сон', 'нет времени спать', 'кофе', 'это уже не кофе', 'вайб', 'fight or flight', 'итог', 'организм думает за ним охотятся'],
  },
  {
    minScore: 75, maxScore: 84,
    class: 'GYM DEMON WITH ANXIETY',
    titles: ['ФИЗИЧЕСКИ ГОТОВ, ПСИХИЧЕСКИ НЕТ', 'КАЧОК С ПАНИЧЕСКИМИ АТАКАМИ', 'ОПАСЕН ПОСЛЕ 2 ЭНЕРГЕТИКОВ'],
    diagnosis: 'Качок с паническими атаками',
    mental: '🔴 Физически топ, психически нет',
    buff: '+40 к дисциплине тела',
    debuff: '-60 к умению отдыхать',
    verdict: ['тело', 'в порядке', 'психика', 'паника на стероидах', 'вайб', 'gym is therapy (нет)', 'итог', 'опасен в понедельник'],
  },
  {
    minScore: 85, maxScore: 94,
    class: 'SIGMA INTERN',
    titles: ['ОТРИЦАЕТ УСТАЛОСТЬ СИЛОЙ ВОЛИ', 'HUSTLE CULTURE ЖЕРТВА 24/7', 'ГРАЙНДСЕТ БЕЗ ВЫХОДНЫХ'],
    diagnosis: 'Отрицает усталость силой воли',
    mental: '🔴 Hustle culture жертва',
    buff: 'Грайндсет 24/7',
    debuff: 'Не знает что такое выходной',
    verdict: ['сон', 'выходные для слабых', 'кофе', 'это уже IV-капельница', 'вайб', 'hustle or nothing', 'итог', '84% дедлайнов, 16% кофеин'],
  },
  {
    minScore: 95, maxScore: 100,
    class: '⚠️ CORTISOL SINGULARITY',
    titles: ['ТЫ — ТРЕВОГА В ЧЕЛОВЕЧЕСКОЙ ФОРМЕ', 'GG. EZ. NO REMATCH.', 'КОРТИЗОЛ КУПИЛ У ТЕБЯ КВАРТИРУ'],
    diagnosis: 'Клинически перегруженный сигма',
    mental: '💀 GG. EZ.',
    buff: 'Иммунитет к стрессу (нервов нет)',
    debuff: 'Организм в existential crisis',
    verdict: ['состояние', 'клинически перегружен', 'нервы', 'распроданы', 'вайб', 'апокалипсис с wifi', 'итог', 'кортизол купил квартиру в ипотеку'],
  },
];

function calcScore() {
  const { sleep, coffee, tiktok, monday, gym, deadlines, sigma, earnings, musicMod, country } = state;

  let score = 20;

  if      (sleep <= 4) score += 25;
  else if (sleep <= 5) score += 18;
  else if (sleep <= 6) score += 10;
  else if (sleep <= 8) score += 0;
  else                 score -= 8;

  if      (coffee >= 7) score += 18;
  else if (coffee >= 5) score += 12;
  else if (coffee >= 3) score += 6;
  else if (coffee >= 1) score += 2;
  else                  score -= 3;

  if      (tiktok >= 6) score += 16;
  else if (tiktok >= 4) score += 10;
  else if (tiktok >= 2) score += 5;
  else if (tiktok >= 1) score += 2;
  else                  score -= 3;

  if      (monday >= 15) score += 15;
  else if (monday >= 8)  score += 10;
  else if (monday >= 4)  score += 5;
  else if (monday >= 1)  score += 2;
  else                   score -= 3;

  if      (gym === 0) score += 6;
  else if (gym === 1) score -= 3;
  else                score -= 8;

  score += Math.round(deadlines * 1.5);

  if      (sigma >= 80) score += 10;
  else if (sigma >= 60) score += 5;
  else if (sigma < 20)  score -= 3;

  score += earnings;
  score += musicMod;
  score += country;

  return Math.max(1, Math.min(100, Math.round(score)));
}

function getCharacter(score) {
  return characters.find(c => score >= c.minScore && score <= c.maxScore)
    || characters[characters.length - 1];
}

// ============================================
// RESULT
// ============================================
function showResult() {
  const score = calcScore();
  const char  = getCharacter(score);
  const title = char.titles[Math.floor(Math.random() * char.titles.length)];

  document.getElementById('res-class').textContent     = title;
  document.getElementById('res-diagnosis').textContent = char.diagnosis;
  document.getElementById('res-mental').textContent    = char.mental;
  document.getElementById('res-buff').textContent      = char.buff;
  document.getElementById('res-debuff').textContent    = char.debuff;

  buildReceipt(char, score);
  goTo('result');
  buildWinamp(score);
  animatePercent(score);
  setWinampFace(score);
}

function buildReceipt(char, score) {
  const v = char.verdict;
  const lines = [
    '================================',
    '    *** МЕНТАЛЬНЫЙ ПАСПОРТ ***  ',
    '================================',
    '',
    pad(v[0].toUpperCase()) + ': ' + v[1],
    pad(v[2].toUpperCase()) + ': ' + v[3],
    pad(v[4].toUpperCase()) + ': ' + v[5],
    '',
    '--------------------------------',
    'КОРТИЗОЛ: ' + score + '%',
    '--------------------------------',
    '',
    'ИТОГ: ' + v[7],
    '',
    '================================',
    '   СПАСИБО ЧТО ВЫЖИЛ(А) :)     ',
    '================================',
  ].join('\n');
  document.getElementById('res-receipt').textContent = lines;
}

function pad(s) { return s.padEnd(12, ' '); }

function animatePercent(target) {
  const el = document.getElementById('res-percent');
  let current = 0;
  const step = target / 60;
  const iv = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + '%';
    if (current >= target) clearInterval(iv);
  }, 16);
}

function buildWinamp(score) {
  const eq = document.getElementById('winamp-eq');
  eq.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const bar = document.createElement('div');
    bar.className = 'eq-bar';
    const base = 10 + score * 0.4;
    bar.style.setProperty('--min-h', Math.max(5, base - Math.random() * 15) + '%');
    bar.style.setProperty('--max-h', Math.min(95, base + (20 + score * 0.3) * Math.random()) + '%');
    bar.style.setProperty('--dur',   (0.4 + Math.random() * 0.6).toFixed(2) + 's');
    bar.style.animationDelay = (Math.random() * 0.3).toFixed(2) + 's';
    if (score >= 75)      bar.style.background = 'var(--pink)';
    else if (score >= 50) bar.style.background = '#ffbe0b';
    eq.appendChild(bar);
  }
}

function setWinampFace(score) {
  const face = document.getElementById('winamp-face');
  if      (score >= 85) { face.textContent = '😵'; face.style.animation = 'eyeTwitch 0.5s infinite'; }
  else if (score >= 65) { face.textContent = '😰'; }
  else if (score >= 45) { face.textContent = '😐'; }
  else if (score >= 25) { face.textContent = '🙂'; }
  else                  { face.textContent = '😌'; }
}

// ============================================
// SHARE
// ============================================
function shareResult() {
  const wrap = document.getElementById('result-wrap');
  wrap.classList.add('share-mode');
  setTimeout(() => {
    alert('Скриншоть экран и скидывай в сторис! 📸');
    wrap.classList.remove('share-mode');
  }, 200);
}
window.shareResult = shareResult;

// ============================================
// RESET
// ============================================
function resetApp() {
  state.sleep = 6; state.coffee = 0; state.tiktok = 0;
  state.monday = 3; state.gym = 0; state.deadlines = 0; state.sigma = 30;
  state.earnings = 0; state.musicMod = 0; state.country = 0;

  renderNokia();

  document.getElementById('mug-fill').style.height = '0%';
  document.getElementById('coffee-count').textContent = '0 ЧАШЕК';
  document.getElementById('coffee-vibe').textContent  = COFFEE_VIBES[0];
  const coffeeBtn = document.getElementById('coffee-btn');
  coffeeBtn.textContent = '+ ЕЩЁ ОДНУ ☕';
  coffeeBtn.style.opacity = '';

  document.getElementById('tiktok-slider').value = 0;
  updateTiktok(0);

  initSwipe();
  initEarnings();
  initMusic();

  document.querySelectorAll('.gym-btn').forEach(b => b.classList.remove('active'));

  const f52 = document.getElementById('fighter-52');
  const f67 = document.getElementById('fighter-67');
  if (f52) { f52.classList.remove('chosen', 'unchosen'); }
  if (f67) { f67.classList.remove('chosen', 'unchosen'); }

  document.getElementById('res-percent').textContent = '0%';

  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');
  document.getElementById('screen-boot').classList.add('active');
  currentScreen = 'boot';
  updateProgress();
  document.getElementById('boot-terminal').textContent = '';
  document.getElementById('win98-popup').classList.remove('show');
  setTimeout(runBoot, 200);
}
window.resetApp = resetApp;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  updateProgress();
  renderNokia();
  updateTiktok(0);
  initSwipe();
  initEarnings();
  initMusic();
  runBoot();
}// ============================================
// DEBUG MODE — Диагностика ошибок
// ============================================
window.debugMode = true;

function showDebugInfo() {
  const info = {
    'addCoffee доступна': typeof addCoffee !== 'undefined',
    'adjustSleep доступна': typeof adjustSleep !== 'undefined',
    'state.coffee': state.coffee,
    'state.sleep': state.sleep,
    'currentScreen': currentScreen,
    'Элемент mug-fill': document.getElementById('mug-fill') ? 'OK' : 'MISSING',
    'Элемент nokia-bars': document.getElementById('nokia-bars') ? 'OK' : 'MISSING',
    'Кнопка кофе': document.getElementById('coffee-btn') ? 'OK' : 'MISSING',
  };
  
  console.table(info);
  alert('DEBUG INFO:\n' + JSON.stringify(info, null, 2));
}

// Добавь дебаг кнопку на экран
document.addEventListener('DOMContentLoaded', function() {
  // ... (существующий код)
  
  // Добавь в конец:
  const debugBtn = document.createElement('button');
  debugBtn.textContent = '🐛 DEBUG';
  debugBtn.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 9999;
    padding: 8px 12px;
    background: #FF007A;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 10px;
    font-family: monospace;
  `;
  debugBtn.onclick = showDebugInfo;
  document.body.appendChild(debugBtn);
});

window.showDebugInfo = showDebugInfo;);
