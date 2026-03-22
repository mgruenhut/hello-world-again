const el = document.getElementById('line');
const btn = document.getElementById('surprise');
const themeBtn = document.getElementById('theme');
const langEn = document.getElementById('lang-en');
const langEs = document.getElementById('lang-es');
const langHe = document.getElementById('lang-he');

const msgs = {
  en: [
    'hello, world, how are you?',
    'hey there, friend!',
    'hiya — great to see you!',
    'good morning — hello world! ☀️',
    'good afternoon — hello world! 🌤️',
    'good evening — hello world! 🌙'
  ],
  es: [
    'hola, mundo, ¿cómo estás?',
    'hola amigo!',
    '¡qué tal!',
    'buenos días — hola mundo ☀️',
    'buenas tardes — hola mundo 🌤️',
    'buenas noches — hola mundo 🌙'
  ],
  he: [
    'שלום, עולם, מה שלומך?',
    'שלום חבר!',
    'מה נשמע?',
    'בוקר טוב — שלום עולם ☀️',
    'צהריים טובים — שלום עולם 🌤️',
    'ערב טוב — שלום עולם 🌙'
  ]
};

let currentLang = 'en';
let idx = 0;

function setGreeting(text){
  if(!el) return;
  el.style.transition = 'opacity 180ms';
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = text; el.style.opacity = 1; }, 220);
}

function burstParticles(){
  const emojis = ['✨','🌟','🎉','💫','🌈'];
  for(let k=0;k<8;k++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    const x = window.innerWidth/2 + (Math.random()-0.5)*240;
    const y = window.innerHeight/2 + (Math.random()-0.5)*80;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.fontSize = (12 + Math.random()*18) + 'px';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1500);
  }
}

function setLanguage(lang){
  currentLang = lang;
  idx = 0;
  // set direction for Hebrew
  document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  setGreeting(msgs[lang][0]);
  // active styles
  [langEn, langEs, langHe].forEach(b => b.classList.remove('active'));
  if(lang === 'en') langEn.classList.add('active');
  if(lang === 'es') langEs.classList.add('active');
  if(lang === 'he') langHe.classList.add('active');
}

if(btn){
  btn.addEventListener('click', ()=>{
    idx = (idx + 1) % msgs[currentLang].length;
    setGreeting(msgs[currentLang][idx]);
    burstParticles();
  });
}

if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    themeBtn.textContent = document.documentElement.classList.contains('dark') ? 'Light' : 'Dark';
  });
}

if(langEn) langEn.addEventListener('click', ()=> setLanguage('en'));
if(langEs) langEs.addEventListener('click', ()=> setLanguage('es'));
if(langHe) langHe.addEventListener('click', ()=> setLanguage('he'));

// initial greeting (English default)
setLanguage('en');
