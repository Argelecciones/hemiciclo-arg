/* Base 24 — Descargar imagen del hemiciclo con sus bloques (para X e Instagram)
   Se carga desde base24.html con: <script src="descarga-imagen.js"></script>  (antes de mejoras-ui.js)
   Necesita logo.png en la misma carpeta. Dibuja la imagen directamente (no es una captura de pantalla). */
(function(){
  const FORMATOS={x:{w:1600,h:900,etiqueta:'Para X (1600×900)'},ig:{w:1080,h:1350,etiqueta:'Para Instagram (1080×1350)'}};
  const FUENTE="'Inter','Segoe UI',Arial,sans-serif";

  function recortar(ctx,txt,maxW){
    if(ctx.measureText(txt).width<=maxW)return txt;
    while(txt.length>1&&ctx.measureText(txt+'…').width>maxW)txt=txt.slice(0,-1);
    return txt.trim()+'…';
  }
  function ajustarFuente(ctx,txt,peso,max,min,maxW){
    let s=max;
    while(s>min){ctx.font=`${peso} ${s}px ${FUENTE}`;if(ctx.measureText(txt).width<=maxW)break;s-=2}
    ctx.font=`${peso} ${s}px ${FUENTE}`;return s;
  }

  /* Núcleo de dibujo. modelo = {titulo,fecha,total,bloques:[{nombre,color,n}],vacantes,posiciones,colores}
     posiciones: salida de generarHemicicloOficial; colores: color de cada banca (mismo orden). */
  function dibujar(ctx,fmt,modelo,logo){
    const {w,h}=FORMATOS[fmt],P=fmt==='x'?60:56;
    ctx.fillStyle='#f8fafc';ctx.fillRect(0,0,w,h);

    // encabezado: logo + título + fecha de composición
    const alto=fmt==='x'?96:90;let x0=P;
    if(logo&&logo.width){const lw=alto*logo.width/logo.height;ctx.drawImage(logo,P,P,lw,alto);x0=P+lw+28}
    ctx.textBaseline='alphabetic';ctx.fillStyle='#0f172a';
    const maxT=w-x0-P;
    ajustarFuente(ctx,modelo.titulo,'800',fmt==='x'?54:50,28,maxT);
    ctx.fillText(modelo.titulo,x0,P+alto*0.52);
    ctx.fillStyle='#64748b';ctx.font=`600 ${fmt==='x'?26:25}px ${FUENTE}`;
    ctx.fillText('Composición al '+modelo.fecha,x0,P+alto*0.52+(fmt==='x'?42:40));

    // pie
    ctx.fillStyle='#94a3b8';ctx.font=`700 ${fmt==='x'?24:23}px ${FUENTE}`;
    ctx.textAlign='right';ctx.fillText('@ArgElecciones',w-P,h-P*0.55);ctx.textAlign='left';
    ctx.strokeStyle='#e2e8f0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(P,h-P-8);ctx.lineTo(w-P,h-P-8);ctx.stroke();

    // zonas: hemiciclo y leyenda
    const top=P+alto+(fmt==='x'?34:30),bottom=h-P-26;
    const zh=fmt==='x'?{x:P,y:top,w:Math.round((w-2*P)*0.58),h:bottom-top}:{x:P,y:top,w:w-2*P,h:Math.round((bottom-top)*0.40)};
    const zl=fmt==='x'?{x:P+zh.w+40,y:top,w:w-2*P-zh.w-40,h:bottom-top}:{x:P,y:top+zh.h+24,w:w-2*P,h:bottom-top-zh.h-24};

    // hemiciclo
    const pos=modelo.posiciones;
    if(pos.length){
      let a=1e9,b=1e9,c=-1e9,d=-1e9;
      pos.forEach(p=>{a=Math.min(a,p.x-p.r);b=Math.min(b,p.y-p.r);c=Math.max(c,p.x+p.r);d=Math.max(d,p.y+p.r)});
      const s=Math.min(zh.w/(c-a),zh.h/(d-b));
      const ox=zh.x+(zh.w-(c-a)*s)/2,oy=zh.y+(zh.h-(d-b)*s)/2;
      pos.forEach((p,i)=>{
        ctx.beginPath();ctx.arc(ox+(p.x-a)*s,oy+(p.y-b)*s,Math.max((p.r-0.25)*s,1),0,Math.PI*2);
        ctx.fillStyle=modelo.colores[i]||'#e2e8f0';ctx.fill();
        ctx.lineWidth=Math.max(0.4*s,1);ctx.strokeStyle='#ffffff';ctx.stroke();
      });
      const cx=ox+(180-a)*s,cy=oy+(166-b)*s;
      ctx.fillStyle='#0f172a';ctx.textAlign='center';ctx.font=`900 ${Math.round(26*s)}px ${FUENTE}`;
      ctx.fillText(String(modelo.total),cx,cy);
      ctx.fillStyle='#64748b';ctx.font=`700 ${Math.round(7.5*s)}px ${FUENTE}`;
      ctx.fillText('BANCAS',cx,cy+9*s);ctx.textAlign='left';
    }

    // leyenda de bloques
    const items=modelo.bloques.map(b=>({nombre:b.nombre,color:b.color,n:b.n}));
    if(modelo.vacantes>0)items.push({nombre:'Banca sin legislador cargado',color:'#e2e8f0',n:modelo.vacantes});
    let cols;
    if(fmt==='x')cols=(zl.h/items.length>=38)?1:2;else cols=items.length>8?2:1;
    const filas=Math.ceil(items.length/cols);
    const gap=fmt==='x'?30:40,colW=(zl.w-(cols-1)*gap)/cols;
    const rowH=Math.min(fmt==='x'?62:72,zl.h/filas);
    const sq=Math.round(rowH*0.46),xtOff=sq*0.45+14;
    const pcts=items.map(it=>(it.n/modelo.total*100).toFixed(1).replace('.',',')+'%');
    // tamaño de letra: el más grande en el que el nombre más largo entra en una línea (mínimo 16)
    let fs=Math.max(16,Math.min(fmt==='x'?30:32,Math.floor(rowH*0.46)));
    const medir=(f)=>{
      ctx.font=`900 ${f}px ${FUENTE}`;const wN=Math.max(...items.map(it=>ctx.measureText(String(it.n)).width));
      ctx.font=`600 ${Math.round(f*0.64)}px ${FUENTE}`;const wP=Math.max(...pcts.map(p=>ctx.measureText(p).width));
      ctx.font=`700 ${f}px ${FUENTE}`;const wT=Math.max(...items.map(it=>ctx.measureText(it.nombre).width));
      return {wN,wP,wT,disp:colW-xtOff-(wN+wP+30)};
    };
    let m=medir(fs);
    while(fs>16&&m.wT>m.disp){fs-=1;m=medir(fs)}
    const yIni=zl.y+(fmt==='x'?(zl.h-rowH*filas)/2:0);
    const fsP=Math.round(fs*0.64);
    items.forEach((it,i)=>{
      const col=Math.floor(i/filas),fila=i%filas;
      const x=zl.x+col*(colW+gap),y=yIni+fila*rowH,mid=y+rowH/2;
      ctx.fillStyle=it.color;ctx.fillRect(x,mid-sq/2,sq*0.45,sq);
      ctx.textBaseline='middle';ctx.fillStyle='#0f172a';
      ctx.font=`700 ${fs}px ${FUENTE}`;
      const xt=x+xtOff;
      if(ctx.measureText(it.nombre).width<=m.disp){ctx.fillText(it.nombre,xt,mid)}
      else{ // dos líneas
        const f2=Math.max(13,Math.round(fs*0.82));ctx.font=`700 ${f2}px ${FUENTE}`;
        const pal=it.nombre.split(' ');let l1='',k=0;
        while(k<pal.length&&ctx.measureText((l1+' '+pal[k]).trim()).width<=m.disp){l1=(l1+' '+pal[k]).trim();k++}
        if(!l1){l1=pal[0];k=1}
        const l2=recortar(ctx,pal.slice(k).join(' '),m.disp);
        ctx.fillText(l1,xt,mid-f2*0.58);ctx.fillText(l2,xt,mid+f2*0.58);
      }
      ctx.textAlign='right';
      ctx.font=`600 ${fsP}px ${FUENTE}`;ctx.fillStyle='#64748b';ctx.fillText(pcts[i],x+colW,mid);
      ctx.font=`900 ${fs}px ${FUENTE}`;ctx.fillStyle='#0f172a';ctx.fillText(String(it.n),x+colW-m.wP-16,mid);
      ctx.textAlign='left';ctx.textBaseline='alphabetic';
      if(fila<filas-1){ctx.strokeStyle='#e8edf3';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y+rowH);ctx.lineTo(x+colW,y+rowH);ctx.stroke()}
    });
  }

  if(typeof module!=='undefined'&&module.exports){module.exports={dibujar,FORMATOS};return}

  /* ---- Parte del navegador ---- */
  function fechaComposicion(){
    const hs=document.querySelector('.header-sub');
    const m=hs&&/Datos al (\d{2}\/\d{2}\/\d{4})/.exec(hs.textContent);
    if(jurActiva&&jurActiva.id!=='NAC'&&m)return m[1];
    const hoy=new Date(),p=n=>String(n).padStart(2,'0');
    return `${p(hoy.getDate())}/${p(hoy.getMonth()+1)}/${hoy.getFullYear()}`;
  }
  const logo=new Image();let logoListo=new Promise(r=>{logo.onload=()=>r(logo);logo.onerror=()=>r(null)});logo.crossOrigin='anonymous';logo.src='logo.png';
  const slug=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  async function descargar(fmt){
    if(!Dat||!Dat.lista)return;
    const seats=[];Dat.lista.forEach(b=>b.miembros.forEach(()=>seats.push(b.color)));
    const vac=Math.max(0,Dat.total-seats.length);for(let i=0;i<vac;i++)seats.push('#e2e8f0');
    const pos=generarHemicicloOficial(Math.max(seats.length,1),seats.length<=HEMI_DENSO_HASTA);
    const modelo={titulo:Dat.titulo,fecha:fechaComposicion(),total:Dat.total,vacantes:vac,posiciones:pos,colores:seats,
      bloques:Dat.lista.map(b=>({nombre:b.nombre,color:b.color,n:b.miembros.length}))};
    try{await document.fonts.ready}catch(e){}
    const lg=await logoListo;
    const cv=document.createElement('canvas');cv.width=FORMATOS[fmt].w;cv.height=FORMATOS[fmt].h;
    dibujar(cv.getContext('2d'),fmt,modelo,lg);
    cv.toBlob(blob=>{
      const a=document.createElement('a');a.href=URL.createObjectURL(blob);
      a.download=`base24-${slug(jurActiva.nombre)}-${slug(camActiva.label)}-${fmt}.png`;
      document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
    },'image/png');
  }

  const vh=document.getElementById('vHemi');
  if(vh){
    const css=document.createElement('style');
    css.textContent='.img-acc{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px;font-size:12px;font-weight:700;color:var(--muted)}.img-acc button{border:1px solid var(--border2);background:#fff;color:var(--text);font:800 12px \'Inter\',sans-serif;padding:8px 12px;border-radius:8px;cursor:pointer}.img-acc button:hover{background:var(--subtle)}';
    document.head.appendChild(css);
    const d=document.createElement('div');d.className='img-acc';
    d.innerHTML='<span>Descargar imagen:</span>'+Object.keys(FORMATOS).map(k=>`<button type="button" data-f="${k}">${FORMATOS[k].etiqueta}</button>`).join('');
    d.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>descargar(b.dataset.f)));
    vh.appendChild(d);
  }
})();
