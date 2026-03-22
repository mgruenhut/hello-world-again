const greetings = [
  'hello world',
  'hey there, friend!',
  'hola, mundo! 🌎',
  'howdy, partner 🤠',
  'hiya — great to see you!',
  'bonjour, le monde!'
];
const el = document.getElementById?.('line');
const btn = document.getElementById?.('surprise');
const themeBtn = document.getElementById?.('theme');
let i = 0;

function setGreeting(text){
  if(!el) return;
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = text; el.style.opacity = 1; }, 220);
}

if(btn){
  btn.addEventListener('click', ()=>{
    i = (i+1) % greetings.length;
    setGreeting(greetings[i]);
    burstParticles();
  });
}

if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    themeBtn.textContent = document.documentElement.classList.contains('dark') ? 'Light' : 'Dark';
  });
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

// choose greeting by time
(function pickByTime(){
  try{
    const h = new Date().getHours();
    if(h<12) setGreeting('good morning — hello world! ☀️');
    else if(h<18) setGreeting('good afternoon — hello world! 🌤️');
    else setGreeting('good evening — hello world! 🌙');
  }catch(e){ setGreeting('hello world'); }
})();
