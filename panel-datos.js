/* Base 24 — Panel "Remuneración y presupuesto"
   Se carga desde base24.html con: <script src="panel-datos.js"></script>
   Completar los 3 enlaces CSV publicados (Archivo > Compartir > Publicar en la Web). Si están vacíos, el botón no aparece. */
const DATOS_URLS={
  rem:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMtPjlivaeE_i2QnwhgHr_MU2Ik4ABF1W2K6Am0jKrTzwVE7pR7TpnGDVNMlQTtQxOaAKbRVtCSpre/pub?gid=479450843&single=true&output=csv',   // pestaña REMUNERACIONES
  pre:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMtPjlivaeE_i2QnwhgHr_MU2Ik4ABF1W2K6Am0jKrTzwVE7pR7TpnGDVNMlQTtQxOaAKbRVtCSpre/pub?gid=1972494966&single=true&output=csv',   // pestaña PRESUPUESTOS
  fue:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMtPjlivaeE_i2QnwhgHr_MU2Ik4ABF1W2K6Am0jKrTzwVE7pR7TpnGDVNMlQTtQxOaAKbRVtCSpre/pub?gid=1405292426&single=true&output=csv',
  tra:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMtPjlivaeE_i2QnwhgHr_MU2Ik4ABF1W2K6Am0jKrTzwVE7pR7TpnGDVNMlQTtQxOaAKbRVtCSpre/pub?gid=313540980&single=true&output=csv' // pestaña TRANSPARENCIA
};
(function(){
  if(!DATOS_URLS.rem&&!DATOS_URLS.pre)return;
  const css=document.createElement('style');
  css.textContent=`
  #vDatos .dt-sec{margin-bottom:22px}
  #vDatos h3{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:0 0 10px}
  #vDatos .dt-card{background:var(--subtle);border-radius:10px;padding:14px 16px;margin-bottom:10px;border-left:5px solid var(--pba)}
  #vDatos .dt-label{font-size:12px;font-weight:700;color:var(--muted)}
  #vDatos .dt-monto{font-size:30px;font-weight:900;letter-spacing:-.02em;margin:2px 0}
  #vDatos .dt-sub{font-size:12px;color:var(--muted);font-weight:600;line-height:1.5}
  #vDatos .dt-sub a{color:var(--pba);font-weight:700;text-decoration:none}
  #vDatos .dt-badge{display:inline-block;font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;background:#e2e8f0;color:#334155;margin-left:6px;vertical-align:middle}
  #vDatos .dt-badge.of{background:#dcfce7;color:#166534}
  #vDatos .dt-badge.nd{background:#fee2e2;color:#991b1b}
  #vDatos .dt-bar{display:flex;height:14px;border-radius:7px;overflow:hidden;background:#e2e8f0;margin:8px 0 4px}
  #vDatos .dt-bar span{display:block;height:100%}
  #vDatos .dt-leg{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;font-weight:700}
  #vDatos .dt-leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px}
  #vDatos .dt-rank{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;margin:4px 0;padding:2px 4px;border-radius:6px}
  #vDatos .dt-rank.sel{background:#fef9c3}
  #vDatos .dt-rank .nom{width:34%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #vDatos .dt-rank .bg{flex:1;background:var(--subtle);border-radius:4px;height:14px;overflow:hidden}
  #vDatos .dt-rank .fill{height:100%;background:#94a3b8}
  #vDatos .dt-rank.sel .fill{background:var(--pba)}
  #vDatos .dt-rank .m{width:96px;text-align:right}
    #vDatos .dt-det summary{cursor:pointer;font-size:13px;font-weight:800;color:var(--pba);margin:12px 0 6px}
  #vDatos .dt-nota{font-size:12px;color:var(--muted);font-weight:600;line-height:1.5}
  @media(max-width:560px){#vDatos .dt-rank .nom{width:40%}#vDatos .dt-rank .m{width:80px}#vDatos .dt-monto{font-size:24px}}`;
  document.head.appendChild(css);

  const btn=document.createElement('button');btn.dataset.v='datos';btn.textContent='Costos y transparencia';
  $('vbtns').appendChild(btn);
  const panel=document.createElement('div');panel.id='vDatos';panel.hidden=true;
  $('vHemi').parentNode.insertBefore(panel,$('leyenda'));

  let datos=null;
  function num(s){
    s=String(s==null?'':s).replace(/[^\d.,-]/g,'');if(!s)return null;
    const c=s.lastIndexOf(','),p=s.lastIndexOf('.');
    if(c>-1&&p>-1){s=c>p?s.replace(/\./g,'').replace(',','.'):s.replace(/,/g,'')}
    else if(c>-1){s=/,\d{1,2}$/.test(s)?s.replace(',','.'):s.replace(/,/g,'')}
    else if(p>-1){s=/^-?\d{1,3}(\.\d{3})+$/.test(s)?s.replace(/\./g,''):s}
    const n=parseFloat(s);return isNaN(n)?null:n;
  }
  const $$=n=>n==null?'—':'$ '+Math.round(n).toLocaleString('es-AR');
  const fecha=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?`${m[3]}/${m[2]}/${m[1]}`:(s||'')};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  async function bajar(u){if(!u)return [];const r=await fetch(u);if(!r.ok)throw new Error('HTTP '+r.status);return parseCSV(await r.text())}
  async function cargarDatos(){
    if(datos)return datos;
    const [rem,pre,fue,tra]=await Promise.all([bajar(DATOS_URLS.rem),bajar(DATOS_URLS.pre),bajar(DATOS_URLS.fue),bajar(DATOS_URLS.tra)]);
    const F={};fue.forEach(f=>{if(f.fuente_id)F[f.fuente_id]=f});
    datos={rem,pre,tra,F};return datos;
  }
  const fuenteHtml=(F,id)=>{const f=F[id];if(!f)return id?esc(id):'';return f.url?`<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.nombre_fuente||id)}</a>`:esc(f.nombre_fuente||id)};
  const badge=e=>e==='Verificado en fuente oficial'?'<span class="dt-badge of">Fuente oficial</span>':e==='No disponible públicamente'?'<span class="dt-badge nd">No disponible</span>':e?`<span class="dt-badge">${esc(e.replace('Verificado en ',''))}</span>`:'';
  function etiquetaCamara(cid){
    const c=(sheetData&&sheetData.cam||[]).find(x=>x.camara_id===cid);if(!c)return cid;
    const j=(JURS.find(x=>x.id===c.jurisdiccion_id)||{}).nombre||c.jurisdiccion_id;
    return c.tipo_camara==='Unicameral'?j:`${j} · ${c.tipo_camara}`;
  }

  function serieHtml(g,D){
    const filas=g.map(r=>({p:String(r.periodo_referencia),v:num(r.valor),o:r.observaciones||''})).filter(x=>x.v!=null).sort((a,b)=>a.p.localeCompare(b.p));
    if(!filas.length)return '';
    const max=Math.max(...filas.map(x=>x.v)),r0=g[0],unidad=r0.unidad;
    const fv=v=>unidad==='ARS'?$$(v):v.toLocaleString('es-AR')+(unidad?' '+esc(unidad):'');
    const par=filas.find(x=>/parcial/i.test(x.o));
    let h=`<div class="dt-card"><div class="dt-label">${esc(r0.indicador)}${badge(r0.estado_verificacion)}</div>`;
    filas.forEach(x=>{const p=/parcial/i.test(x.o);h+=`<div class="dt-rank"><span class="nom" style="width:64px">${esc(x.p)}${p?' *':''}</span><div class="bg"><div class="fill" style="width:${x.v/max*100}%${p?';opacity:.55':''}"></div></div><span class="m" style="width:130px">${fv(x.v)}</span></div>`});
    h+=`<div class="dt-sub" style="margin-top:6px">${r0.fuente_id?'Fuente: '+fuenteHtml(D.F,r0.fuente_id):''}${par?'<br>* '+esc(par.o):''}</div></div>`;
    return h;
  }
  async function render(){
    const cid=camActiva&&camActiva.id;
    panel.innerHTML='<div class="dt-nota">Cargando datos…</div>';
    let D;try{D=await cargarDatos()}catch(e){panel.innerHTML=`<div class="dt-nota">No se pudieron cargar los datos (${esc(e.message)}). Revisá que las pestañas sigan publicadas.</div>`;return}
    if(camActiva.id!==cid||vista!=='datos')return;
    let h='';
    // 1) Remuneración de la cámara
    const mias=D.rem.filter(r=>r.camara_id===cid).sort((a,b)=>String(b.periodo_referencia).localeCompare(String(a.periodo_referencia)));
    h+='<div class="dt-sec"><h3><svg class="ic" viewBox="0 0 24 24"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>Remuneración mensual de un legislador</h3>';
    if(!mias.length)h+='<div class="dt-nota">Todavía no hay datos de remuneración cargados para esta cámara.</div>';
    mias.forEach(r=>{
      const m=num(r.monto);
      h+=`<div class="dt-card"><div class="dt-label">${esc(r.concepto)} · ${esc(r.tipo_monto)} · ${esc(r.periodicidad)}</div>
        <div class="dt-monto">${m==null?'No disponible':$$(m)}</div>
        <div class="dt-chips"><span class="dt-chip per">Período ${esc(r.periodo_referencia)}</span>${r.fuente_id?'<span class="dt-chip">Fuente: '+fuenteHtml(D.F,r.fuente_id)+'</span>':''}${badge(r.estado_verificacion)}</div>${r.observaciones?'<div class="dt-sub" style="margin-top:8px">'+esc(r.observaciones)+'</div>':''}</div>`;
    });
    // ranking
    const rk=D.rem.map(r=>({cid:r.camara_id,v:num(r.total_comparable),f:r.fuente_id,p:r.periodo_referencia})).filter(r=>r.v!=null).sort((a,b)=>b.v-a.v);
    if(rk.length&&jurActiva.id!=='NAC'){h+='<details class="dt-det"><summary>Ver ranking de remuneración</summary>';
      const max=rk[0].v,prom=rk.reduce((s,r)=>s+r.v,0)/rk.length;
      h+=`<div class="dt-nota" style="margin:14px 0 6px"><b>Ranking de remuneración</b> (${rk.length} cámaras con dato comparable, período ${esc(rk[0].p)}). Promedio simple: ${$$(prom)}. Fuente: ${fuenteHtml(D.F,rk[0].f)}</div>`;
      rk.forEach(r=>{h+=`<div class="dt-rank${r.cid===cid?' sel':''}"><span class="nom" title="${esc(etiquetaCamara(r.cid))}">${esc(etiquetaCamara(r.cid))}</span><div class="bg"><div class="fill" style="width:${r.v/max*100}%"></div></div><span class="m">${$$(r.v)}</span></div>`});h+='</details>';
    }
    h+='</div>';
    // 2) Presupuesto
    const pr=D.pre.filter(r=>r.camara_id===cid).sort((a,b)=>String(b.anio).localeCompare(String(a.anio)));
    h+='<div class="dt-sec"><h3><svg class="ic" viewBox="0 0 24 24"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>Presupuesto de la cámara</h3>';
    if(!pr.length)h+='<div class="dt-nota">Todavía no hay datos de presupuesto cargados para esta cámara.</div>';
    pr.forEach(r=>{
      const ap=num(r.presupuesto_aprobado),vi=num(r.presupuesto_vigente),ej=num(r.presupuesto_ejecutado),pe=num(r.gastos_personal);
      const base=ap!=null?ap:vi;
      h+=`<div class="dt-card"><div class="dt-label">Presupuesto ${ap!=null?'aprobado':'vigente'} ${esc(r.anio)}${badge(r.estado_verificacion)}</div><div class="dt-monto">${$$(base)}</div>`;
      if(pe!=null&&base){
        const p1=pe/base*100;
        h+=`<div class="dt-bar"><span style="width:${p1}%;background:#1d4ed8"></span><span style="width:${100-p1}%;background:#cbd5e1"></span></div>
          <div class="dt-leg"><span><i style="background:#1d4ed8"></i>Personal: ${$$(pe)} (${p1.toFixed(0)}%)</span><span><i style="background:#cbd5e1"></i>Otros rubros: ${$$(base-pe)} (${(100-p1).toFixed(0)}%)</span></div>`;
      }
      if(ej!=null&&(vi||ap)){const b2=vi||ap;h+=`<div class="dt-sub" style="margin-top:8px">Ejecutado: ${$$(ej)} (${(ej/b2*100).toFixed(1)}% del ${vi?'vigente':'aprobado'})</div>`}
      h+=`<div class="dt-sub" style="margin-top:6px">${r.fecha_corte?'Fecha de corte: '+esc(fecha(r.fecha_corte))+' · ':''}${r.fuente_id?'Fuente: '+fuenteHtml(D.F,r.fuente_id):''}</div></div>`;
    });
    h+='</div>';
    if(DATOS_URLS.tra){
      const trAll=D.tra.filter(r=>r.camara_id===cid);
      const grupos={};trAll.forEach(r=>{(grupos[r.indicador]=grupos[r.indicador]||[]).push(r)});
      const series=Object.values(grupos).filter(g=>new Set(g.map(r=>r.periodo_referencia)).size>=3);
      const nomSeries=new Set(series.map(g=>g[0].indicador));
      const tr=trAll.filter(r=>!nomSeries.has(r.indicador));
      h+='<div class="dt-sec"><h3'+((!tr.length&&!series.length)?' style="display:inline;margin-right:8px"':'')+'><svg class="ic" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>Transparencia</h3>';h+=series.map(g=>serieHtml(g,D)).join('');
      if(!tr.length&&!series.length)h+='<span class="dt-nota">Sin indicadores disponibles para esta cámara.</span>';
      tr.forEach(r=>{
        const v=num(r.valor);
        const txt=v==null?esc(r.valor||'—'):(r.unidad==='ARS'?$$(v):v.toLocaleString('es-AR')+(r.unidad?' '+esc(r.unidad):''));
        h+=`<div class="dt-card"><div class="dt-label">${esc(r.indicador)}${badge(r.estado_verificacion)}</div><div class="dt-monto" style="font-size:22px">${txt}</div><div class="dt-sub">${r.periodo_referencia?'Período: '+esc(r.periodo_referencia):''}${r.fuente_id?' · Fuente: '+fuenteHtml(D.F,r.fuente_id):''}${r.observaciones?'<br>'+esc(r.observaciones):''}</div></div>`;
      });
      h+='</div>';
    }
    h+='<div class="dt-nota">Cada monto indica su concepto, tipo (bruto o neto), período y fuente. No se comparan cifras de conceptos o períodos distintos.</div>';
    panel.innerHTML=h;
  }

  const orig=window.setVista;
  window.setVista=function(v,forzar){
    if(v==='datos'){
      vista='datos';
      document.querySelectorAll('#vbtns button').forEach(b=>b.classList.toggle('active',b.dataset.v==='datos'));
      ['vHemi','vMapa','vLista'].forEach(id=>$(id).hidden=true);
      $('leyenda').style.display='none';
      ['lblVer','lblBusca','lblDist'].forEach(id=>$(id).hidden=true);
      panel.hidden=false;render();return;
    }
    panel.hidden=true;return orig(v,forzar);
  };
})();
