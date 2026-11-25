/* Base 24 — Enlaces compartibles
   La dirección recuerda jurisdicción, cámara y vista, por ejemplo:
   base24.html#j=JUR-SAL&c=CAM-SAL-SEN&v=mapa
   Se carga desde base24.html con: <script src="enlaces.js"></script> (después de los demás scripts). */
(function(){
  const VISTAS=['hemi','mapa','lista','datos'];
  const leer=()=>{const p=new URLSearchParams(location.hash.replace(/^#/,''));return {j:p.get('j'),c:p.get('c'),v:p.get('v')}};
  const vistaValida=v=>v&&VISTAS.includes(v)&&!!document.querySelector('#vbtns [data-v="'+v+'"]');
  const jurValida=j=>j&&JURS.some(x=>x.id===j);

  function escribir(){
    if(!jurActiva||!camActiva)return;
    const h='#j='+encodeURIComponent(jurActiva.id)+'&c='+encodeURIComponent(camActiva.id)+'&v='+encodeURIComponent(vista);
    if(location.hash!==h)history.replaceState(null,'',location.pathname+location.search+h);
  }

  const elegirJurOrig=window.elegirJur;
  const elegirOrig=window.elegir;
  const setVistaOrig=window.setVista;
  let primera=true;

  function aplicar(p){
    if(!jurValida(p.j))return false;
    const cam=jurActiva&&jurActiva.id===p.j?jurActiva:JURS.find(x=>x.id===p.j);
    const mismaJur=jurActiva&&jurActiva.id===p.j;
    const camOk=p.c&&cam.camaras.some(c=>c.id===p.c);
    const mismaCam=mismaJur&&camActiva&&camOk&&camActiva.id===p.c;
    if(mismaJur&&mismaCam){
      if(vistaValida(p.v)&&p.v!==vista)window.setVista(p.v);
      return true;
    }
    if(vistaValida(p.v))vista=p.v;   // se usa cuando terminan de cargar los datos
    elegirJurOrig(p.j);
    if(camOk&&camActiva.id!==p.c)window.elegir(p.c);
    return true;
  }

  window.elegirJur=function(id){
    if(primera){
      primera=false;
      if(aplicar(leer())){escribir();return}
    }
    elegirJurOrig(id);escribir();
  };
  window.elegir=function(id){const r=elegirOrig(id);escribir();return r};
  window.setVista=function(v,forzar){const r=setVistaOrig(v,forzar);escribir();return r};

  window.addEventListener('hashchange',()=>{
    const p=leer();
    if(!jurActiva||!camActiva)return;
    const actual={j:jurActiva.id,c:camActiva.id,v:vista};
    if(p.j===actual.j&&p.c===actual.c&&p.v===actual.v)return;
    aplicar(p);
  });

  // botón "Copiar enlace" en el encabezado, junto a "Acerca de"
  const herramienta=document.querySelector('.header a');
  const barra=herramienta?herramienta.parentNode:null;
  if(barra){
    const css=document.createElement('style');
    css.textContent='.lnk-btn{border:none;background:rgba(255,255,255,.15);color:#fff;font:800 12px \'Inter\',sans-serif;padding:6px 12px;border-radius:6px;cursor:pointer;white-space:nowrap}.lnk-btn:hover{background:rgba(255,255,255,.25)}';
    document.head.appendChild(css);
    const b=document.createElement('button');b.type='button';b.className='lnk-btn';const ICO='<svg class="ic" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';b.innerHTML=ICO+'Copiar enlace';
    b.addEventListener('click',()=>{
      escribir();
      const url=location.origin+location.pathname+location.hash;
      const ok=()=>{b.textContent='✓ Enlace copiado';setTimeout(()=>b.innerHTML=ICO+'Copiar enlace',2000)};
      if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(url).then(ok,()=>window.prompt('Copiá el enlace:',url));
      else window.prompt('Copiá el enlace:',url);
    });
    barra.insertBefore(b,herramienta);
  }
})();
