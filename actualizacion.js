/* Base 24 — Fecha de última actualización de los datos
   Lee la pestaña INFO de la planilla (columnas: clave, valor) y la muestra en el encabezado.
   Se carga desde base24.html con: <script src="actualizacion.js"></script> (después de acerca.js).
   Completar INFO_URL con el enlace CSV publicado de la pestaña INFO. Si está vacío, no muestra nada. */
const INFO_URL='https://docs.google.com/spreadsheets/d/e/2PACX-1vSMtPjlivaeE_i2QnwhgHr_MU2Ik4ABF1W2K6Am0jKrTzwVE7pR7TpnGDVNMlQTtQxOaAKbRVtCSpre/pub?gid=502092396&single=true&output=csv';
(function(){
  if(!INFO_URL)return;
  function fmt(s){
    const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');
    return m?`${m[3]}/${m[2]}/${m[1]}`:(s||'');
  }
  fetch(INFO_URL).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(t=>{
    const d={};
    parseCSV(t).forEach(f=>{if(f.clave)d[f.clave.trim()]=(f.valor||'').trim()});
    const sub=document.querySelector('.header-sub');
    if(sub&&d.ultima_actualizacion){
      sub.textContent+=' · Datos al '+fmt(d.ultima_actualizacion);
      if(d.nota_actualizacion)sub.title=d.nota_actualizacion;
    }
  }).catch(e=>console.warn('No se pudo leer la pestaña INFO:',e.message));
})();
