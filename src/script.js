(function(){
'use strict';
var d=document,D=d.documentElement,W=window,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,HOVER=matchMedia('(hover:hover) and (pointer:fine)').matches;
var $=function(s,c){return (c||d).querySelector(s)},$$=function(s,c){return [].slice.call((c||d).querySelectorAll(s))};
var clamp=function(v,a,b){return v<a?a:v>b?b:v},lerp=function(a,b,t){return a+(b-a)*t},seg=function(p,a,b){return clamp((p-a)/(b-a),0,1)};
var eo=function(t){return 1-Math.pow(1-t,3)},eio=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},back=function(t){var c=1.70158,c3=c+1;return 1+c3*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
var META={el:{t:d.title,d:(($('meta[name=description]')||{}).content||'')},en:{t:'Smash Burgers Drosia | Pluto Smasherie — Eat Like a God',d:'Pluto Smasherie in Drosia: juicy smash burgers with crispy edges and melted cheese, fried chicken and loaded fries. Drosias–Stamatas Ave 3 · +30 210 800 4455.'}};
var lang='el';try{lang=localStorage.getItem('pluto-lang')==='en'?'en':'el'}catch(e){}
if(D.lang==='en')lang='en';
function T(el,en){return lang==='en'?en:el}

/* ---------- seeded random + drips ---------- */
function rng(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
function dripD(x,y,w,L){var r=Math.max(4,w*.42),h=w/2;
 return 'M'+(x-h-6)+' '+(y-2)+'C'+(x-h)+' '+y+' '+(x-r)+' '+(y+L*.35)+' '+(x-r)+' '+(y+L-r)+'A'+r+' '+r+' 0 0 0 '+(x+r)+' '+(y+L-r)+'C'+(x+r)+' '+(y+L*.35)+' '+(x+h)+' '+y+' '+(x+h+6)+' '+(y-2)+'Z'}
function edgeD(Wd,base,drips,k){var s='M0 -2H'+Wd+'V'+base;
 drips.slice().sort(function(a,b){return b.x-a.x}).forEach(function(q){var L=q.L*k,r=Math.max(5,q.w*.42),h=q.w/2+q.w*.5;
  s+='L'+(q.x+h)+' '+base+'C'+(q.x+r*.9)+' '+base+' '+(q.x+r)+' '+(base+L*.3)+' '+(q.x+r)+' '+(base+L-r)+'A'+r+' '+r+' 0 0 1 '+(q.x-r)+' '+(base+L-r)+'C'+(q.x-r)+' '+(base+L*.3)+' '+(q.x-r*.9)+' '+base+' '+(q.x-h)+' '+base});
 return s+'L0 '+base+'Z'}
var EDGES=[];
function buildEdges(){var vw=D.clientWidth;EDGES=[];
 $$('.drip-edge').forEach(function(el,i){var R=rng(97+i*31),n=Math.max(5,Math.round(vw/(vw<700?58:84))),f=+(el.dataset.n||1),drips=[];
  for(var j=0;j<n;j++){var x=(j+.25+R()*.5)/n*vw;drips.push({x:x,w:12+R()*(vw<700?16:22),L:(18+R()*R()*120)*f})}
  var mx=Math.max.apply(null,drips.map(function(q){return q.L}));
  el.innerHTML='<svg viewBox="0 0 '+vw+' 150" preserveAspectRatio="none" style="height:150px"><path fill="'+el.dataset.c+'"/></svg>';
  var fl=drips.slice().sort(function(a,b){return b.L-a.L}).slice(0,vw<700?2:3);
  fl.forEach(function(q,m){var f2=d.createElement('span');f2.className='fall';f2.style.cssText='left:'+(q.x-6)+'px;background:'+el.dataset.c+';--y0:'+(q.L+8)+'px;--t:'+(3.6+m*1.3)+'s;--dl:'+(m*1.1)+'s';el.appendChild(f2)});
  EDGES.push({el:el,p:$('path',el),drips:drips,vw:vw,k:-1})});
 edges(true)}
function edges(force){var vh=innerHeight;EDGES.forEach(function(e){var r=e.el.getBoundingClientRect();if(!force&&(r.bottom<-50||r.top>vh+50))return;
 var t=RM?1:clamp(1-(r.top-vh*.15)/(vh*.85),0,1),k=.45+.75*eo(t);if(Math.abs(k-e.k)<.01&&!force)return;e.k=k;e.p.setAttribute('d',edgeD(e.vw,10,e.drips,k))})}

/* ---------- hero: god drip + burger drips ---------- */
(function(){var p=$('.god-drip path');if(p){var R=rng(7),s='M0 0H200V8';[[180,18,46],[132,14,28],[86,20,58],[38,13,24]].forEach(function(q){var x=q[0],w=q[1],L=q[2],r=w*.42;
 s+='L'+(x+w)+' 8C'+(x+r)+' 8 '+(x+r)+' '+(8+L*.3)+' '+(x+r)+' '+(8+L-r)+'A'+r+' '+r+' 0 0 1 '+(x-r)+' '+(8+L-r)+'C'+(x-r)+' '+(8+L*.3)+' '+(x-r)+' 8 '+(x-w)+' 8'});p.setAttribute('d',s+'L0 8Z')}
 var g=$('#hDrips');if(!g)return;var html='<defs><linearGradient id="hdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD45E"/><stop offset=".7" stop-color="#FFB52E"/><stop offset="1" stop-color="#F59A1C"/></linearGradient></defs>';
 [[214,420,22,70,5.2,0],[268,408,16,44,4.4,.8],[338,398,18,92,6,1.6],[622,392,15,40,4.8,.4],[938,360,20,78,5.6,1.1]].forEach(function(q){
  html+='<path class="d" style="--t:'+q[4]+'s;--dl:'+q[5]+'s" d="'+dripD(q[0],q[1],q[2],q[3])+'"/><circle class="drop" cx="'+q[0]+'" cy="'+(q[1]+q[3])+'" r="'+(q[2]*.36)+'" style="--t:'+(q[4]*1.6)+'s;--dl:'+(q[5]+1)+'s"/>'});
 g.innerHTML=html})();

/* ---------- intro: melt ---------- */
var introOn=false;
function ready(){D.classList.add('ready');var h=$('.hero');h&&h.classList.add('ready')}
(function(){var seen=false;try{seen=sessionStorage.getItem('pluto-intro')}catch(e){}
 if(seen||RM||d.hidden){ready();return}
 try{sessionStorage.setItem('pluto-intro','1')}catch(e){}
 introOn=true;D.classList.add('intro');
 var vw=innerWidth,vh=innerHeight,R=rng(3),drips=[],n=Math.round(vw/60);
 for(var i=0;i<n;i++)drips.push({x:(i+.2+R()*.6)/n*vw,w:14+R()*26,L:30+R()*R()*vh*.32});
 var sv=$('#inCheese');sv.setAttribute('viewBox','0 0 '+vw+' '+vh);$('path',sv).setAttribute('d',edgeD(vw,vh*.86,drips,1));
 setTimeout(function(){D.classList.add('go')},620);
 setTimeout(function(){D.classList.add('out')},1180);
 setTimeout(ready,1300);
 setTimeout(function(){D.classList.remove('intro','go','out');var i=$('#intro');i&&i.remove()},2100)})();
setTimeout(function(){if(!D.classList.contains('ready'))ready()},2600);

/* ---------- i18n ---------- */
var A={'data-en-alt':'alt','data-en-aria':'aria-label','data-en-title':'title'};
function applyLang(l,first){lang=l;D.lang=l;
 $$('[data-en]').forEach(function(e){if(e.dataset.el==null)e.dataset.el=e.innerHTML;var v=l==='en'?e.dataset.en:e.dataset.el;if(!first||l==='en')e.innerHTML=v});
 Object.keys(A).forEach(function(k){$$('['+k+']').forEach(function(e){var a=A[k],ek='el'+a.replace(/\W/g,'');if(e.dataset[ek]==null)e.dataset[ek]=e.getAttribute(a)||'';e.setAttribute(a,l==='en'?e.getAttribute(k):e.dataset[ek])})});
 d.title=META[l].t;var md=$('meta[name=description]');if(md)md.content=META[l].d;
 $$('.langs button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===l)});
 try{localStorage.setItem('pluto-lang',l)}catch(e){}
 $$('.lc').forEach(function(h){var seen=h.classList.contains('in');split(h);if(seen)h.classList.add('in')});
 hint(bites)}
$$('.langs button').forEach(function(b){b.addEventListener('click',function(){if(b.dataset.l!==lang){D.classList.add('swap');applyLang(b.dataset.l);setTimeout(function(){D.classList.remove('swap')},350)}})});

/* ---------- letter split for headings ---------- */
function split(h){h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());var i=0;
 (function walk(n){[].slice.call(n.childNodes).forEach(function(c){
  if(c.nodeType===3){var f=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(d.createTextNode(' '));return}
   var ws=d.createElement('span');ws.className='lc-w';ws.setAttribute('aria-hidden','true');
   Array.from(w).forEach(function(ch){var s=d.createElement('span');s.className='lc-c';s.style.setProperty('--i',i++);s.textContent=ch;ws.appendChild(s)});f.appendChild(ws)});c.replaceWith(f)}
  else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})})(h)}

/* ---------- nav ---------- */
var hd=$('#hd'),nav=$('#nav'),bg=$('#burger');
function navT(o){nav.classList.toggle('open',o);D.classList.toggle('nav-open',o);bg.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':''}
bg.addEventListener('click',function(){navT(!nav.classList.contains('open'))});
$$('a',nav).forEach(function(a){a.addEventListener('click',function(){navT(false)})});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){navT(false);lbClose()}});

/* ---------- hero tilt + bite ---------- */
var hf=$('#hFood'),tilt=$('#tilt'),hero=$('.hero'),img=$('#hBurger'),btn=$('#biteBtn'),cr=$('#crumbs'),bites=0,BL=[];
if(HOVER&&!RM&&hero){hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 tilt.style.setProperty('--ry',(x*16).toFixed(2)+'deg');tilt.style.setProperty('--rx',(-y*10).toFixed(2)+'deg');
 hero.style.setProperty('--gx',(x*60).toFixed(1)+'px');hero.style.setProperty('--gy',(y*40).toFixed(1)+'px')});
 hero.addEventListener('pointerleave',function(){tilt.style.setProperty('--ry','0deg');tilt.style.setProperty('--rx','0deg')})}
function hint(n){var h=$('#biteHint span');if(!h)return;var M=[[ 'Πατήστε το burger. Τολμήστε.','Tap the burger. Go on.'],['Άλλη μία;','One more?'],['Τελευταία μπουκιά…','Last bite…'],['Νέο burger, έτοιμο.','A fresh one, ready.']];
 var m=M[Math.min(n,3)];h.dataset.el=m[0];h.dataset.en=m[1];h.textContent=lang==='en'?m[1]:m[0]}
function mask(){if(!BL.length){img.style.webkitMaskImage=img.style.maskImage='';return}
 var L=[];BL.forEach(function(c){L.push('radial-gradient(circle at '+c[0].toFixed(1)+'% '+c[1].toFixed(1)+'%, transparent '+c[2].toFixed(1)+'px, #000 '+(c[2]+1).toFixed(1)+'px)')});
 var v=L.join(',');img.style.webkitMaskImage=v;img.style.maskImage=v}
function bite(px,py){var r=img.getBoundingClientRect(),R=r.width*.085;if(bites>=3)return;bites++;
 for(var a=-1.6;a<=1.6;a+=.8){var ox=Math.cos(a+Math.PI/2)*R*.75,oy=Math.sin(a)*R*.5;BL.push([(px+ox)/r.width*100,(py+oy)/r.height*100,R*(.62+Math.random()*.12)])}
 mask();
 if(!RM){for(var i=0;i<14;i++){var c=d.createElement('i'),ang=Math.random()*Math.PI*2,dist=40+Math.random()*90;
  c.style.cssText='left:'+px+'px;top:'+py+'px;--s:'+(4+Math.random()*9)+'px;--c:'+['#D9822F','#FFB52E','#6B3320','#F3D9A8'][i%4]+';--x:'+(Math.cos(ang)*dist)+'px;--y:'+(Math.sin(ang)*dist+60)+'px;--r:'+(Math.random()*400)+'deg';
  cr.appendChild(c);setTimeout(function(n){return function(){n.remove()}}(c),950)}
  tilt.animate([{transform:getComputedStyle(tilt).transform},{transform:'perspective(1100px) scale(.96) rotate(-2deg)'},{transform:getComputedStyle(tilt).transform}],{duration:320,easing:'ease-out'})}
 hint(bites);
 if(bites>=3)setTimeout(function(){BL=[];bites=0;mask();if(!RM)img.animate([{transform:'translateY(40px) scale(.9)',opacity:0},{transform:'none',opacity:1}],{duration:650,easing:'cubic-bezier(.34,1.56,.64,1)'});setTimeout(function(){hint(0)},2200)},1100);
}
if(btn){btn.addEventListener('click',function(e){var r=img.getBoundingClientRect(),x,y;
 if(e.detail===0||!e.clientX){x=r.width*(.2+Math.random()*.6);y=r.height*(.16+Math.random()*.12)}else{x=e.clientX-r.left;y=e.clientY-r.top}
 x=clamp(x,r.width*.1,r.width*.9);y=clamp(y,r.height*.1,r.height*.33);bite(x,y)})}

/* ---------- smash scene (signature) ---------- */
var SC={sec:$('#smash'),steps:$$('#steps li'),bar:$('#smBar'),last:-1};
(function(){if(!SC.sec)return;var N=48,i;
 SC.meat=$('#meatP');SC.lace=$('#lace');SC.ch=$('#cheese');SC.spat=$('#spat');SC.bunT=$('#bunT');SC.bunB=$('#bunB');SC.gr=$('#griddle');SC.heat=$('#heat');SC.steam=$('#steam');SC.sb=$('#sBolts');SC.god=$('#godHead');SC.splat=$('#splat');
 var R=rng(11);SC.noise=[];for(i=0;i<N;i++)SC.noise.push(R());SC.N=N;
 var sp='';for(i=0;i<16;i++){var a=Math.PI+(i/15)*Math.PI;sp+='<circle cx="300" cy="425" r="'+(2+R()*4)+'" data-a="'+a.toFixed(3)+'" data-d="'+(120+R()*130)+'"/>'}SC.splat.innerHTML=sp;SC.drops=$$('circle',SC.splat);
 var sk='';for(i=0;i<9;i++)sk+='<circle cx="'+(262+R()*76)+'" cy="'+(330+R()*70)+'" r="'+(2+R()*3)+'" fill="#3A170C" opacity=".6"/>';$('#specks').innerHTML=sk;SC.specks=$('#specks')})();
function meatPts(s,c){var pts=[],N=SC.N,cx=300,b=430,r=62,rx=lerp(r,166,s),ry=lerp(r,19,s),cy=b-ry;
 for(var i=0;i<N;i++){var a=i/N*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a),n=lerp(2,4.5,s),
  ex=Math.sign(ca)*Math.pow(Math.abs(ca),2/n),ey=Math.sign(sa)*Math.pow(Math.abs(sa),2/n),j=1+(SC.noise[i]-.5)*(.05+.16*c*(Math.abs(ca)>.6?1:.25));
  var x=cx+ex*rx*j,y=cy+ey*ry*(sa>0?1:j);if(y>b)y=b;pts.push([x,y])}return pts}
function smooth(p){var s='M'+p[0][0].toFixed(1)+' '+p[0][1].toFixed(1),n=p.length;
 for(var i=0;i<n;i++){var p0=p[(i-1+n)%n],p1=p[i],p2=p[(i+1)%n],p3=p[(i+2)%n];
  s+='C'+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+' '+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+' '+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+' '+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+' '+p2[0].toFixed(1)+' '+p2[1].toFixed(1)}return s+'Z'}
function cheeseD(top,m){var x0=172,x1=428,th=10+5*m,s='M'+(x0-6*m)+' '+(top+th)+'L'+(x0-6*m)+' '+(top+5)+'Q'+(x0-6*m)+' '+top+' '+(x0+5)+' '+top+'L'+(x1-5)+' '+top+'Q'+(x1+6*m)+' '+top+' '+(x1+6*m)+' '+(top+5)+'L'+(x1+6*m)+' '+(top+th),b=top+th;
 if(m>.03)[[410,15,22],[372,18,34],[330,22,50],[288,13,20],[246,20,42],[204,16,28]].forEach(function(q){var x=q[0],w=q[1],L=q[2]*m,r=w*.42,h=w*.9;
  s+='L'+(x+h)+' '+b+'C'+(x+r)+' '+b+' '+(x+r)+' '+(b+L*.3)+' '+(x+r)+' '+(b+L-r)+'A'+r+' '+r+' 0 0 1 '+(x-r)+' '+(b+L-r)+'C'+(x-r)+' '+(b+L*.3)+' '+(x-r)+' '+b+' '+(x-h)+' '+b});
 return s+'L'+(x0-6*m)+' '+b+'Z'}
function smashUpd(){if(!SC.sec)return;var r=SC.sec.getBoundingClientRect(),vh=innerHeight,p=RM?1:clamp(-r.top/(r.height-vh),0,1);
 if(Math.abs(p-SC.last)<.0008)return;SC.last=p;
 var s=eio(seg(p,.17,.29)),c=seg(p,.36,.5),dsc=seg(p,.08,.17),lift=seg(p,.3,.4),pts=meatPts(s,c),top=Math.min.apply(null,pts.map(function(q){return q[1]}));
 SC.meat.setAttribute('d',smooth(pts));SC.lace.setAttribute('d',smooth(pts));SC.lace.setAttribute('opacity',(c*.9).toFixed(2));SC.specks.setAttribute('opacity',(1-s).toFixed(2));
 var sy=p<.17?lerp(-80,top+18,eo(dsc)):p<.3?top+18:lerp(top+18,-200,eio(lift));SC.spat.setAttribute('transform','translate(0 '+sy.toFixed(1)+')');SC.spat.setAttribute('opacity',p>.4?0:1);
 var sp=seg(p,.18,.34);SC.drops.forEach(function(e){var a=+e.dataset.a,dd=+e.dataset.d*eo(sp);e.setAttribute('transform','translate('+(Math.cos(a)*dd).toFixed(1)+' '+(Math.sin(a)*dd*.55+sp*sp*90).toFixed(1)+')');e.setAttribute('opacity',sp>0&&sp<1?(1-sp).toFixed(2):0)});
 SC.heat.setAttribute('opacity',(seg(p,.1,.25)*(1-seg(p,.8,.9))).toFixed(2));SC.steam.setAttribute('opacity',(seg(p,.2,.3)*(1-seg(p,.7,.8))).toFixed(2));
 var cf=seg(p,.53,.61),cm=eo(seg(p,.61,.74)),ct=top-8;
 if(p<.52){SC.ch.setAttribute('opacity',0)}else{SC.ch.setAttribute('opacity',1);var cy=lerp(-280,0,eo(cf)),rot=lerp(-14,0,eo(cf));SC.ch.setAttribute('d',cheeseD(ct,cm));SC.ch.setAttribute('transform','translate(0 '+cy.toFixed(1)+') rotate('+rot.toFixed(1)+' 300 '+ct+')')}
 var bt=seg(p,.77,.86),bb=seg(p,.79,.88);SC.bunT.setAttribute('opacity',p>.76?1:0);SC.bunT.setAttribute('transform','translate(0 '+(lerp(-260,ct-4,back(bt))).toFixed(1)+')');
 SC.bunB.setAttribute('opacity',bb.toFixed(2));SC.bunB.setAttribute('transform','translate(0 '+lerp(30,0,eo(bb)).toFixed(1)+')');SC.gr.setAttribute('opacity',(1-bb).toFixed(2));
 var g=seg(p,.88,.97);SC.sb.setAttribute('opacity',g>0?1:0);SC.sb.setAttribute('transform','translate(0 '+lerp(30,0,back(g)).toFixed(1)+')');SC.god.setAttribute('opacity',eo(g).toFixed(2));SC.god.setAttribute('transform','translate('+lerp(-80,0,back(g)).toFixed(1)+' 0)');
 var k=p<.17?0:p<.36?1:p<.53?2:p<.77?3:4;SC.steps.forEach(function(li,i){li.classList.toggle('on',i===k)});SC.bar.style.setProperty('--p',p.toFixed(3))}

/* ---------- lens ---------- */
(function(){var b=$('#lensBox'),l=$('#lens');if(!b||!HOVER)return;var im=$('img',b),Z=2.4,srcBig='assets/img/pluto-smasherie-diplo-smash-burger-tomi-1200.webp';
 b.addEventListener('pointerenter',function(){l.style.backgroundImage='url('+srcBig+')';b.classList.add('on')});
 b.addEventListener('pointerleave',function(){b.classList.remove('on')});
 b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;l.style.left=(x-100)+'px';l.style.top=(y-100)+'px';
  l.style.backgroundSize=(r.width*Z)+'px '+(r.height*Z)+'px';l.style.backgroundPosition=(-(x*Z-100))+'px '+(-(y*Z-100))+'px'})})();

/* ---------- roadmap ---------- */
var RO={box:$('#ro'),svg:$('#roSvg'),fg:$('#roFg'),bgp:$('.ro-bg'),wk:$('#roWalker'),pins:$$('.stop .pin'),stops:$$('.stop'),len:0,ys:[]};
function roBuild(){if(!RO.box)return;var br=RO.box.getBoundingClientRect(),w=br.width,h=br.height,mob=innerWidth<=860,P=[];
 RO.pins.forEach(function(p,i){var r=p.getBoundingClientRect();p.style.top=(RO.stops[i].offsetHeight/2-15)+'px';r=p.getBoundingClientRect();P.push([r.left+r.width/2-br.left,r.top+r.height/2-br.top])});
 var x0=P[0][0],s='M'+x0+' '+(-40);P.unshift([x0,-40]);P.push([P[P.length-1][0],h+30]);
 for(var i=1;i<P.length;i++){var a=P[i-1],b=P[i],my=(b[1]-a[1])*.5,wob=mob?0:(i%2?1:-1)*w*.16;
  s+='C'+(a[0]+wob)+' '+(a[1]+my)+' '+(b[0]+wob)+' '+(b[1]-my)+' '+b[0]+' '+b[1]}
 RO.svg.setAttribute('viewBox','0 0 '+w+' '+h);RO.fg.setAttribute('d',s);RO.bgp.setAttribute('d',s);RO.len=RO.fg.getTotalLength();
 RO.fg.style.strokeDasharray=RO.len;RO.ys=P.slice(1,-1).map(function(q){return q[1]});RO.lastp=-1;roUpd()}
function roUpd(){if(!RO.box||!RO.len)return;var r=RO.box.getBoundingClientRect(),vh=innerHeight,p=RM?1:clamp((vh*.62-r.top)/r.height,0,1);
 if(Math.abs(p-RO.lastp)<.0005)return;RO.lastp=p;RO.fg.style.strokeDashoffset=(RO.len*(1-p)).toFixed(1);
 var pt=RO.fg.getPointAtLength(RO.len*p);RO.wk.style.setProperty('--wx',pt.x.toFixed(1)+'px');RO.wk.style.setProperty('--wy',pt.y.toFixed(1)+'px');
 RO.stops.forEach(function(st,i){st.classList.toggle('lit',pt.y>=RO.ys[i]-20)})}

/* ---------- menu fill ---------- */
var ROWS=$$('.mh');
function rowsUpd(){var vh=innerHeight;ROWS.forEach(function(r){var b=r.getBoundingClientRect();if(b.bottom<0||b.top>vh)return;var f=RM?100:clamp((vh*.82-b.top)/(vh*.4),0,1)*100;r.style.setProperty('--fill',f.toFixed(1)+'%')})}

/* ---------- ticker skew ---------- */
var tk=$('.tk-in'),tkw;if(tk){tkw=d.createElement('div');tkw.className='tk-sk';tk.parentNode.insertBefore(tkw,tk);tkw.appendChild(tk);tkw.style.overflow='hidden'}
var lastY=scrollY,vel=0;

/* ---------- ambient ---------- */
function ICON(t,r){return t==='bolt'?'<svg viewBox="0 0 20 32"><path transform="rotate('+r+' 10 16)" d="M12 0 2 18h8l-4 14 13-20h-8l5-12z"/></svg>':'<svg viewBox="0 0 40 30"><path transform="rotate('+r+' 20 15)" d="M3 26 1 6l10 9L20 1l9 14 10-9-2 20z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>'}
var PAT="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' fill='none' stroke='%23013241' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M30 70V40m0 0c0-8 6-12 6-12m-6 12c0-8-6-12-6-12M30 40h0'/%3E%3Cpath d='M22 28v-6m16 6v-6M30 70v18'/%3E%3Cpath d='M140 60c0-14 12-24 30-24s30 10 30 24zM140 66h60M142 74c4 8 52 8 56 0'/%3E%3Cpath d='M70 160l-6-22 12 10 8-16 8 16 12-10-6 22z'/%3E%3Cpath d='M170 150l-8 16h8l-4 14 12-18h-8l5-12z'/%3E%3C/svg%3E\")";
$$('.amb').forEach(function(a,ix){var k=a.dataset.k,R=rng(200+ix*13),m=innerWidth<700,h='';
 if(k==='pattern'){h+='<i class="pat" style="background-image:'+PAT+'"></i>';h+='<i class="wash" style="left:-10%;top:10%;--c:rgba(255,181,46,.45);--t:26s;--dx:80px;--dy:60px;--r:0deg"></i><i class="wash" style="right:-15%;bottom:-10%;left:auto;--c:rgba(224,74,83,.18);--t:32s;--dx:-90px;--dy:-40px;--r:0deg"></i>'}
 else{var n=k==='bolts'?(m?7:13):(m?4:8);for(var i=0;i<n;i++){var isB=k==='bolts'||i%3===0;
  h+='<i class="'+(isB?'ab':'ac')+'" style="left:'+(R()*96).toFixed(1)+'%;top:'+(R()*94).toFixed(1)+'%;--s:'+(isB?10+R()*20:30+R()*50).toFixed(0)+'px;--c:'+['#F7ECD6','#FFB52E','#F89D2A','#E04A53'][Math.floor(R()*4)]+';--t:'+(4+R()*7).toFixed(1)+'s;--dl:'+(-R()*8).toFixed(1)+'s;--r:'+(R()*50-25).toFixed(0)+'deg;--o:'+(isB?.35+R()*.3:.1+R()*.08).toFixed(2)+';--dx:'+(R()*80-40).toFixed(0)+'px;--dy:'+(R()*80-40).toFixed(0)+'px">'+ICON(isB?'bolt':'crown',(R()*40-20).toFixed(0))+'</i>'}
  h+='<i class="wash" style="left:'+(R()*60).toFixed(0)+'%;top:'+(R()*50).toFixed(0)+'%;--c:rgba(248,157,42,.16);--t:28s;--dx:100px;--dy:80px;--r:0deg"></i>'}
 a.innerHTML=h});
if('IntersectionObserver' in W){var aio=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('off',!e.isIntersecting)})});$$('.amb').forEach(function(a){aio.observe(a)})}

/* ---------- reveals, videos ---------- */
$$('.lc').forEach(split);
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.04});
$$('.lc,.tile,.st-ph,.rv').forEach(function(e){if(RM)e.classList.add('in');else io.observe(e)});
var vio=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src&&v.dataset.src){v.src=v.dataset.src}if(!RM)v.play().catch(function(){})}else v.pause()})},{threshold:.2});
var con=navigator.connection||{};$$('video[data-src]').forEach(function(v){if(!(con.saveData||/2g/.test(con.effectiveType||'')))vio.observe(v)});

/* ---------- full menu: tabs, God's Meal switch, prices ---------- */
(function(){var mn=$('#menu');if(!mn)return;
 $$('.mi,.di,.tub,.meal-sw',mn).forEach(function(e){if(RM)e.classList.add('in');else io.observe(e)});
 var meal=false,ps=$$('.mp',mn);
 function fmt(v){v=+v;return lang==='en'?'€'+v.toFixed(2):v.toFixed(2).replace('.',',')+' €'}
 function paint(anim){ps.forEach(function(p,i){var v=meal&&p.dataset.m?p.dataset.m:p.dataset.p,t=fmt(v);if(p.textContent===t)return;
  if(anim&&p.dataset.m&&!RM){p.classList.remove('flip');void p.offsetWidth;p.classList.add('flip');setTimeout(function(){p.textContent=t},150+i*8)}else p.textContent=t})}
 var sw=$('.meal-sw',mn),kb=$('.meal-k',mn),bs=$$('.meal-sw button',mn);
 function knob(){var b=bs[meal?1:0];if(!b)return;sw.style.setProperty('--kx',(b.offsetLeft-5)+'px');sw.style.setProperty('--kw',b.offsetWidth+'px')}
 bs.forEach(function(b){b.addEventListener('click',function(){var m=b.dataset.meal==='1';if(m===meal)return;meal=m;mn.classList.toggle('meal',meal);
  bs.forEach(function(x){var on=(x.dataset.meal==='1')===meal;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});knob();paint(true)})});
 new MutationObserver(function(){paint(false);knob();blob()}).observe(D,{attributes:true,attributeFilter:['lang']});
 var tabs=$$('.mtabs a',mn),bin=$('.mtabs-in',mn),bl=$('.mtabs-blob',mn),cur=-1,blocks=tabs.map(function(a){return $(a.getAttribute('href'))});
 function blob(){var a=tabs[cur<0?0:cur];if(!a)return;bin.style.setProperty('--bx',a.offsetLeft+'px');bin.style.setProperty('--bw',a.offsetWidth+'px');bl.style.opacity=cur<0?0:1}
 function spy(){var y=innerHeight*.38,k=-1,bt=-1e9;blocks.forEach(function(b,i){if(!b)return;var t=b.getBoundingClientRect().top;if(t<y&&t>bt+40){k=i;bt=t}});
  var r=mn.getBoundingClientRect();if(r.bottom<innerHeight*.4)k=-1;
  if(k!==cur){cur=k;tabs.forEach(function(a,i){a.classList.toggle('on',i===k);if(i===k)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});blob();
   var a=tabs[k];if(a&&bin.scrollWidth>bin.clientWidth)bin.scrollTo({left:a.offsetLeft-(bin.clientWidth-a.offsetWidth)/2,behavior:RM?'auto':'smooth'})}}
 var st=false;addEventListener('scroll',function(){if(!st){st=true;requestAnimationFrame(function(){st=false;spy()})}},{passive:true});
 addEventListener('resize',function(){knob();blob()});
 (d.fonts&&d.fonts.ready?d.fonts.ready:Promise.resolve()).then(function(){knob();blob();spy()});
 paint(false);knob();spy();
})();

/* ---------- FAQ: one open ---------- */
$$('.qa').forEach(function(q){q.addEventListener('toggle',function(){if(q.open)$$('.qa').forEach(function(o){if(o!==q)o.open=false})})});

/* ---------- lightbox ---------- */
var lb=$('#lb'),lbi=$('#lbImg'),lastF=null;
function lbOpen(im){lastF=d.activeElement;lbi.src=(im.currentSrc||im.src).replace('-720.webp','-1200.webp');lbi.alt=im.alt;lb.hidden=false;d.body.style.overflow='hidden';$('#lbX').focus()}
function lbClose(){if(!lb||lb.hidden)return;lb.hidden=true;d.body.style.overflow='';lastF&&lastF.focus()}
$$('.lens-box img,.tile img,.st-ph img,.stop img').forEach(function(im){var t=im.closest('.lens-box')||im;t.setAttribute('data-lb','');t.tabIndex=0;t.setAttribute('role','button');
 t.addEventListener('click',function(){lbOpen(im)});t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();lbOpen(im)}})});
lb.addEventListener('click',function(e){if(e.target!==lbi)lbClose()});

/* ---------- one scroll loop ---------- */
var mb=$('.mbar'),tt=$('.totop'),ttf=$('#ttFg'),tick=false;
function onScroll(){tick=false;var y=scrollY,vh=innerHeight,H=D.scrollHeight-vh;
 hd.classList.toggle('solid',y>40);D.classList.toggle('scrolled',y>60);
 if(mb)mb.classList.toggle('on',y>vh*.7);if(tt){tt.classList.toggle('on',y>vh);tt.style.setProperty('--p',(y/H).toFixed(3))}
 if(!RM&&tilt&&y<vh*1.2)tilt.style.setProperty('--ty',(y*.12).toFixed(1)+'px');
 vel=lerp(vel,y-lastY,.2);lastY=y;if(tkw&&!RM)tkw.style.transform='skewX('+clamp(-vel*.25,-10,10).toFixed(2)+'deg)';
 edges();smashUpd();rowsUpd();roUpd();
 if(Math.abs(vel)>.3&&!tick){tick=true;requestAnimationFrame(onScroll)}}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){if(Math.abs(D.clientWidth-(EDGES[0]&&EDGES[0].vw||0))>40)buildEdges();roBuild();SC.last=-1;onScroll()},180)});
buildEdges();applyLang(lang,true);
(d.fonts&&d.fonts.ready?d.fonts.ready:Promise.resolve()).then(function(){roBuild();onScroll()});
addEventListener('load',function(){roBuild();onScroll()});
onScroll();
})();
