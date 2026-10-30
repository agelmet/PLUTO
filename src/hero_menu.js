/* ---------- menu sheet: opens from the hero, the nav and the chips (30 Oct 2026) ---------- */
(function(){var sh=$('#msheet'),dj=$('#menuData');if(!sh||!dj)return;
 var C;try{C=JSON.parse(dj.textContent)}catch(e){return}
 var body=$('#msBody'),tabs=$('.ms-tabs',sh),built='',lastF=null,pushed=false,closing=0;
 function fmt(v){v=+v;return lang==='en'?'€'+v.toFixed(2):v.toFixed(2).replace('.',',')+' €'}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function L(o){return lang==='en'?o.en:o.el}
 function build(){if(built===lang)return;built=lang;var h='',tb='',n=0;
  C.forEach(function(c,ci){tb+='<button type="button" data-t="'+c.id+'"'+(ci?'':' aria-current="true"')+'>'+esc(L(c))+'</button>';
   var cnt=c.items?c.items.length:c.groups.reduce(function(a,g){return a+g.items.length},0);
   h+='<section class="ms-sec" id="ms-'+c.id+'"><h3>'+esc(L(c))+'<small>'+cnt+' '+(lang==='en'?'items':'επιλογές')+'</small></h3>';
   if(c.id==='beef')h+='<p class="ms-note">'+(lang==='en'?'Every burger also comes as a God’s Meal — the price is on each card.':'Κάθε burger υπάρχει και ως God’s Meal (σε μενού) — η τιμή είναι σε κάθε κάρτα.')+'</p>';
   if(c.kind==='tubs'){h+='<div class="ms-tubs">'+c.items.map(function(it,i){return '<div class="ms-tub" style="--i:'+i+';--sc:'+it.c+'"><i aria-hidden="true"></i><span>'+esc(it.n)+'</span><b>'+fmt(it.p)+'</b></div>'}).join('')+'</div>'}
   else if(c.kind==='drinks'){c.groups.forEach(function(g){h+='<h4 class="ms-dg">'+esc(L(g))+'</h4><ul class="ms-dl">'+g.items.map(function(it,i){var nm=lang==='en'?it.ne:it.n,s=lang==='en'?it.se:it.s;return '<li class="ms-di" style="--i:'+i+'"><span>'+esc(nm)+(s?' <small>'+esc(s)+'</small>':'')+'</span><b>'+fmt(it.p)+'</b></li>'}).join('')+'</ul>'})}
   else c.items.forEach(function(it,i){
    h+='<article class="mc" style="--i:'+i+'"><div class="mc-h"><h4>'+esc(it.n)+'</h4><span class="mc-p">'+fmt(it.p)+'</span></div>';
    if(it.ig&&it.ig.length)h+='<p class="mc-l">'+(lang==='en'?'What’s inside':'Τι έχει μέσα')+'</p><ul class="igs">'+it.ig.map(function(g,j){return '<li class="ig ig-'+g[2]+'" style="--j:'+j+'">'+esc(lang==='en'?g[1]:g[0])+'</li>'}).join('')+'</ul>';
    if(it.m)h+='<div class="mc-meal"><span>God’s Meal<small>'+(lang==='en'?'this burger as a meal':'το burger σε μενού')+'</small></span><b>'+fmt(it.m)+'</b></div>';
    h+='</article>'});
   h+='</section>'});
  h+='<p class="ms-foot">'+(lang==='en'?'Prices in euro, VAT included. Allergies or questions? Call us on ':'Τιμές σε ευρώ, με ΦΠΑ. Για αλλεργίες ή ερωτήσεις, καλέστε μας στο ')+'<a href="tel:+302108004455">210 800 4455</a>.</p>';
  tabs.innerHTML=tb;body.innerHTML=h;
  $$('button',tabs).forEach(function(b){b.addEventListener('click',function(){go(b.dataset.t,true)})})}
 function cur(id){$$('button',tabs).forEach(function(b){var on=b.dataset.t===id;if(on)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');if(on&&tabs.scrollWidth>tabs.clientWidth)tabs.scrollTo({left:b.offsetLeft-(tabs.clientWidth-b.offsetWidth)/2,behavior:RM?'auto':'smooth'})})}
 function go(id,smooth){var s=$('#ms-'+id);if(!s)return;body.scrollTo({top:s.offsetTop-body.offsetTop-6,behavior:smooth&&!RM?'smooth':'auto'});cur(id)}
 var st=false;body.addEventListener('scroll',function(){if(st)return;st=true;requestAnimationFrame(function(){st=false;var k=C[0].id,y=body.scrollTop+body.clientHeight*.25;
  C.forEach(function(c){var s=$('#ms-'+c.id);if(s&&s.offsetTop-body.offsetTop<=y)k=c.id});if(body.scrollTop+body.clientHeight>=body.scrollHeight-4)k=C[C.length-1].id;cur(k)})},{passive:true});
 function open(cat){if(!sh.hidden&&sh.classList.contains('on')){if(cat)go(cat,true);return}
  clearTimeout(closing);build();lastF=d.activeElement;sh.hidden=false;D.classList.add('ms-lock');body.scrollTop=0;cur(C[0].id);
  if(cat)go(cat,false);void sh.offsetWidth;sh.classList.add('on');setTimeout(function(){$('.ms-x',sh).focus({preventScroll:true})},60);
  try{history.pushState({ms:1},'');pushed=true}catch(e){}}
 function close(fromPop){if(sh.hidden)return;sh.classList.remove('on');D.classList.remove('ms-lock');
  closing=setTimeout(function(){sh.hidden=true},RM?0:560);if(lastF&&lastF.focus)lastF.focus({preventScroll:true});
  if(pushed&&!fromPop){pushed=false;try{history.back()}catch(e){}}pushed=false}
 addEventListener('popstate',function(){if(!sh.hidden)close(true)});
 $$('[data-close]',sh).forEach(function(b){b.addEventListener('click',function(){close()})});
 d.addEventListener('keydown',function(e){if(sh.hidden)return;if(e.key==='Escape'){close();return}
  if(e.key==='Tab'){var f=$$('button,a[href]',sh).filter(function(x){return x.offsetParent}),a=f[0],z=f[f.length-1];if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}}});
 d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-open-menu]');if(!a)return;e.preventDefault();
  if(typeof navT==='function'&&nav&&nav.classList.contains('open'))navT(false);open(a.getAttribute('data-open-menu')||'')});
 new MutationObserver(function(){if(!sh.hidden){var y=body.scrollTop;build();body.scrollTop=y}}).observe(D,{attributes:true,attributeFilter:['lang']});
})();

