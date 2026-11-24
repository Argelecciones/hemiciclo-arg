/* Base 24 — Mejoras de interfaz (bloques arriba del hemiciclo, mapa en dos columnas, celulares, filtros)
   Se carga desde base24.html con: <script src="mejoras-ui.js"></script>  (el último de los scripts, antes de </body>) */
(function(){
  const css=document.createElement('style');
  css.textContent=`
  /* ---- Bloques compactos arriba del hemiciclo: 3 columnas, nombre + bancas + % en la misma tarjeta ---- */
  .leyenda{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px;margin:0 0 14px!important;max-height:264px;overflow-y:auto}
  .leyenda .item{padding:6px 10px;gap:8px;font-size:12px;min-width:0;align-items:center}
  .leyenda .item>span:first-child{flex:1;min-width:0;line-height:1.2}
  .leyenda .item .n{font-size:14px;margin-left:0}
  .leyenda .item .p{font-size:10px;min-width:34px}

  /* ---- Filtros: nombres largos no rompen la fila ---- */
  .header-logo{height:44px;width:44px;object-fit:contain;flex-shrink:0}
  .controles{gap:10px 12px}
  .controles .lbl select{max-width:250px}

  /* ---- Remuneración: período y fuente con más presencia ---- */
  .dt-chips{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}
  .dt-chip{background:#fff;border:1px solid var(--border2);border-radius:20px;padding:4px 12px;font-size:13px;font-weight:700;color:var(--text)}
  .dt-chip.per{background:#1e3a8a;border-color:#1e3a8a;color:#fff;font-weight:800}
  .dt-chip a{color:var(--pba);font-weight:800;text-decoration:none}
  .dt-chips .dt-badge{font-size:12px;padding:4px 12px;margin:0}

  /* ---- Mapa: mapa y zonas arriba (dos columnas), leyenda debajo del mapa y detalle de ancho completo ---- */
  @media(min-width:900px){
    #vMapa:not([hidden]){display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);grid-template-areas:"mapa zonas" "leyenda nota" "detalle detalle";gap:0 16px;align-items:start}
    #vMapa #map{grid-area:mapa}
    #vMapa #chips{grid-area:zonas;margin-top:0;grid-template-columns:repeat(2,minmax(0,1fr));max-height:460px;overflow-y:auto;align-content:start}
    #vMapa #chips:not(:has(.chip:nth-child(7))){grid-template-columns:minmax(0,1fr)}
    #vMapa #chips:not(:has(.chip:nth-child(7))) .chip{padding:12px 14px;font-size:13px}
    #vMapa #leyendaMapa{grid-area:leyenda}
    #vMapa #notaMapa{grid-area:nota;margin-top:10px}
    #vMapa #panelSec{grid-area:detalle;margin-top:16px}
    #vMapa #panelSec .barra{max-width:560px}
    #vMapa #panelSec .bloque-lista{column-count:2;column-gap:28px}
    #vMapa #panelSec .bloque-lista h3,#vMapa #panelSec .bloque-lista ul{break-inside:avoid}
  }

  /* ---- Celulares: todo en una columna, sin cortes laterales ---- */
  html,body{overflow-x:hidden}
  @media(max-width:760px){
    .header{flex-wrap:wrap;gap:8px 12px;padding:14px 16px}
    .header-title{font-size:19px}
    .header-sub{font-size:10px;line-height:1.4}
    .layout{padding:16px 12px 40px}
    .card{padding:14px}
    .vistawrap{grid-template-columns:minmax(0,1fr)!important}
    .vbtns{flex-wrap:wrap}
    .vbtns button{flex:1 1 44%;text-align:center}
    .controles>*{min-width:0}
    .controles .lbl{flex:1 1 150px}
    .controles .lbl select,.controles select{width:100%;max-width:100%}
    .tabs{width:100%}.tab{flex:1;padding:9px 8px}
    .leyenda{grid-template-columns:repeat(2,minmax(0,1fr))!important;max-height:240px}
    #map{height:340px}
    th,td{padding:6px;font-size:12px}
    .dt-monto{overflow-wrap:anywhere}
  }`;
  document.head.appendChild(css);

  // logo en el encabezado (logo.png en la misma carpeta; si no existe, no se muestra)
  const hdr=document.querySelector('.header');
  if(hdr&&!hdr.querySelector('.header-logo')){
    const im=new Image();im.src='logo.png';im.alt='Logo ArgElecciones';im.className='header-logo';
    im.onerror=()=>im.remove();hdr.insertBefore(im,hdr.firstChild);
  }

  // bloques: se mueven arriba del hemiciclo (y quedan también arriba del listado)
  const vc=document.querySelector('.vcont'),ley=document.getElementById('leyenda'),vh=document.getElementById('vHemi');
  if(vc&&ley&&vh)vc.insertBefore(ley,vh);

  // filtro de mandato: solo aparece si hay más de un mandato para elegir y si la vista lo usa
  const sm=document.getElementById('selMand');
  function ajustarMandato(){
    if(!sm)return;
    sm.parentNode.hidden=!(sm.options.length>2&&vista!=='datos');
  }
  if(sm)new MutationObserver(ajustarMandato).observe(sm,{childList:true});
  const setVistaPrev=window.setVista;
  window.setVista=function(v,forzar){const r=setVistaPrev(v,forzar);ajustarMandato();return r};
})();
