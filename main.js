const CONFIG=window.PORTFOLIO_CONFIG||{};
const ring=document.querySelector('.cursor-ring'),dot=document.querySelector('.cursor-dot');
let mx=-100,my=-100,rx=-100,ry=-100;
document.addEventListener('pointermove',e=>{
  mx=e.clientX; my=e.clientY;
  document.documentElement.style.setProperty('--mx',mx+'px');
  document.documentElement.style.setProperty('--my',my+'px');
});
(function cursorLoop(){
  rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
  if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}
  if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}
  requestAnimationFrame(cursorLoop);
})();
document.querySelectorAll('a,button,.tool,.workflow>div,.float-icon,.portrait,.showreel,.resume').forEach(el=>{
  el.addEventListener('mouseenter',()=>{if(ring){ring.style.width='54px';ring.style.height='54px';ring.style.background='rgba(255,255,255,.05)';ring.style.borderColor='rgba(255,255,255,.8)'}});
  el.addEventListener('mouseleave',()=>{if(ring){ring.style.width='34px';ring.style.height='34px';ring.style.background='transparent';ring.style.borderColor='rgba(255,255,255,.55)'}});
});
const portrait=document.querySelector('.portrait');
document.addEventListener('pointermove',e=>{
  if(!portrait)return;
  const r=portrait.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
  const d=Math.hypot(e.clientX-cx,e.clientY-cy);
  portrait.classList.toggle('zoomed',d<360);
});
const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});
document.querySelectorAll('.section,.timeline article,.workflow>div,.tool,.showreel,.resume,.skill-block').forEach(x=>{x.classList.add('reveal');io.observe(x)});

document.querySelectorAll('.workflow>div').forEach(card=>{
  card.setAttribute('tabindex','0');
  const toggle=()=>{ card.classList.toggle('selected'); };
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});


// Click-to-glow interaction for experience cards
document.querySelectorAll('.timeline article').forEach(card=>{
  card.setAttribute('tabindex','0');
  const toggle=()=>{
    document.querySelectorAll('.timeline article.selected').forEach(x=>{if(x!==card)x.classList.remove('selected')});
    card.classList.toggle('selected');
  };
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});
