/* Base 24 — Ventana "Acerca de" (metodología, fuentes y licencias)
   Se carga desde base24.html con: <script src="acerca.js"></script>  (antes de </body>)
   Agrega un botón en el encabezado y una línea en el pie. Para editar el texto, modificar la variable TEXTO. */
(function(){
  const TEXTO=`
  <h2>Acerca de Base 24</h2>
  <p class="ac-intro">Base 24 es una herramienta de consulta y visualización del Poder Legislativo argentino: las 24 jurisdicciones (23 provincias y la Ciudad de Buenos Aires) y el Congreso Nacional. Es un proyecto de <a href="https://x.com/argelecciones" target="_blank" rel="noopener">@ArgElecciones</a>.</p>

  <h3>Qué se muestra</h3>
  <p>Solo legisladores con <b>mandato vigente</b>. Cuando un legislador renuncia, fallece o termina su mandato, pasa a un registro histórico y no aparece en el recinto. Si está con licencia, su banca la ocupa el suplente. Las bancas sin legislador cargado en la planilla se ven en gris claro, y la página avisa cuando los números no cierran.</p>
  <p>En el hemiciclo, cada punto es una banca coloreada según el bloque. Las bancas se ordenan por tamaño de bloque, <b>no</b> por su ubicación real en el recinto.</p>

  <h3>De dónde salen los datos</h3>
  <ul>
    <li><b>Legislaturas provinciales:</b> planilla propia de @ArgElecciones, armada con la información de los sitios oficiales de cada legislatura. Se actualiza manualmente.</li>
    <li><b>Congreso Nacional:</b> <a href="https://argentinadatos.com/" target="_blank" rel="noopener">ArgentinaDatos</a> (datos de la Cámara de Diputados y del Senado), leídos en el momento de abrir la página. No es una fuente oficial.</li>
    <li><b>Remuneraciones:</b> relevamiento de Ruido (medio aliado de Reverso, proyecto de Chequeado y AFP) para la Red Federal de Periodismo e Innovación, con datos de 2025 netos "de bolsillo"; la escala oficial de la Legislatura de Córdoba; y, para el Senado de la Nación, el esquema de la Res. DR 8/24 (2.500 módulos de dieta, 1.000 de gastos de representación y 500 de desarraigo) con el valor del módulo estimado por ArgentinaDatos.</li>
    <li><b>Viajes de legisladores nacionales:</b> <a href="https://www.datacp.ar/congreso/cuanto-viajo" target="_blank" rel="noopener">DataCP</a>, con datos de la HCDN y el HCS (CC BY 4.0). Solo vuelos nacionales: Diputados hasta junio de 2026 y Senado hasta agosto de 2026. Se muestra la suma por año de todos los grupos provinciales.</li>
    <li><b>Presupuestos y transparencia:</b> sitios oficiales de cada cámara y leyes de presupuesto. Cada dato indica su fuente en el panel "Costos y transparencia".</li>
  </ul>

  <h3>Estados de verificación</h3>
  <ul>
    <li><b>Verificado en fuente oficial:</b> el dato figura en el sitio de la propia cámara o del organismo que lo publica.</li>
    <li><b>Verificado en fuente secundaria:</b> proviene de una base de terceros o de una compilación propia; todavía no se contrastó con el sitio oficial.</li>
    <li><b>Estimado:</b> calculado a partir de otros datos o de supuestos (por ejemplo, el valor del módulo del Senado). Puede diferir del monto efectivamente cobrado.</li>
    <li><b>Pendiente:</b> hay un dato por confirmar, por ejemplo la fecha de un reemplazo.</li>
    <li><b>No disponible públicamente:</b> la fuente no lo publica.</li>
    <li><b>Histórico:</b> dato de un período anterior.</li>
  </ul>
  <p>No se comparan cifras de conceptos o períodos distintos. Cada monto indica su concepto, si es bruto o neto, el período al que corresponde y su fuente.</p>

  <h3>Mapas</h3>
  <ul>
    <li>Los límites de departamentos provienen del Instituto Geográfico Nacional (SIG 250), difundidos por la CONAE y convertidos a GeoJSON en el repositorio <a href="https://github.com/mgaitan/departamentos_argentina" target="_blank" rel="noopener">mgaitan/departamentos_argentina</a>. Las geometrías se simplificaron para que la página sea liviana.</li>
    <li>Las secciones electorales de Buenos Aires provienen de <a href="https://catalogo.datos.gba.gob.ar/dataset/secciones-electorales" target="_blank" rel="noopener">Datos Abiertos de la Provincia</a>.</li>
    <li><b>Río Negro:</b> los circuitos electorales (Ley O Nº 2431, art. 139) son aproximados. Se adaptó el mapa «Circuitos electorales de Río Negro» de Misionero~commonswiki (<a href="https://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank" rel="noopener">CC BY-SA 3.0</a>), ajustado a los departamentos del IGN. Ese archivo conserva su licencia.</li>
    <li><b>Santa Cruz:</b> cada municipio es un punto ubicado en el centro de la localidad, de forma aproximada, y no un límite.</li>
    <li><b>Congreso Nacional:</b> se muestran las 24 jurisdicciones, con las Islas Malvinas dentro de Tierra del Fuego. Las Georgias del Sur, las Sandwich del Sur y la Antártida Argentina no se dibujan.</li>
    <li>Los legisladores elegidos por distrito único no pueden ubicarse en una zona del mapa: figuran en el aviso inferior, en el hemiciclo y en el listado.</li>
  </ul>

  <h3>Límites conocidos</h3>
  <ul>
    <li>La base está en proceso de verificación: algunos reemplazos y datos de origen figuran como pendientes.</li>
    <li>Los colores de los bloques los define el proyecto y no representan a los partidos.</li>
    <li>Las remuneraciones de distintas fuentes y períodos no son comparables entre sí.</li>
    <li>El Congreso Nacional depende de un servicio externo: si no está disponible, esa sección no carga.</li>
  </ul>

  <h3>Atribuciones</h3>
  <p>IGN y CONAE (límites de departamentos) · Gobierno de la Provincia de Buenos Aires, Datos Abiertos · Misionero~commonswiki, Wikimedia Commons (circuitos de Río Negro) · ArgentinaDatos · DataCP (CC BY 4.0) · Ruido, Reverso, Chequeado y AFP · Legislaturas, ministerios y portales de transparencia de cada jurisdicción · Disposición de bancas basada en <a href="https://github.com/elexnuk/arches" target="_blank" rel="noopener">Arches</a> (David Richfield, Mathis Rade, Ranjith Siji y Ambady Anand S.).</p>

  <h3>Licencias</h3>
  <ul>
    <li><b>Código:</b> GPL v2. El hemiciclo usa una adaptación de Arches, que se distribuye bajo esa licencia.</li>
    <li><b>Datos propios:</b> <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener">CC BY-SA 4.0</a>. Se pueden reutilizar citando a @ArgElecciones y manteniendo la misma licencia.</li>
    <li>Los datos y mapas de terceros conservan su licencia original.</li>
  </ul>
  <p class="ac-fin">Texto revisado en noviembre de 2026.</p>`;

  const css=document.createElement('style');
  css.textContent=`
  .ac-btn{border:none;background:rgba(255,255,255,.15);color:#fff;font:800 12px 'Inter',sans-serif;padding:6px 12px;border-radius:6px;cursor:pointer;white-space:nowrap}
  .ac-btn:hover{background:rgba(255,255,255,.25)}
  .ac-fondo{position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:10000;display:none;align-items:center;justify-content:center;padding:20px}
  .ac-fondo.abierto{display:flex}
  .ac-ventana{background:#fff;color:#0f172a;border-radius:12px;max-width:720px;width:100%;max-height:88vh;overflow-y:auto;padding:26px 28px;position:relative;box-shadow:0 20px 50px rgba(0,0,0,.35);font-family:'Inter',system-ui,sans-serif;font-size:14px;line-height:1.6}
  .ac-ventana h2{font-size:20px;font-weight:900;margin:0 0 8px;padding-right:30px}
  .ac-ventana h3{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:#64748b;margin:22px 0 6px;border-bottom:1px solid #e2e8f0;padding-bottom:4px}
  .ac-ventana p{margin:6px 0}
  .ac-ventana ul{margin:6px 0 6px 20px}
  .ac-ventana li{margin:4px 0}
  .ac-ventana a{color:#1d4ed8;font-weight:700;text-decoration:none}
  .ac-ventana a:hover{text-decoration:underline}
  .ac-intro{font-size:15px}
  .ac-fin{font-size:12px;color:#64748b;margin-top:18px}
  .ac-x{position:absolute;top:12px;right:14px;border:none;background:none;font-size:26px;line-height:1;cursor:pointer;color:#64748b}
  .ac-x:hover{color:#0f172a}`;
  document.head.appendChild(css);

  const fondo=document.createElement('div');
  fondo.className='ac-fondo';fondo.setAttribute('role','dialog');fondo.setAttribute('aria-modal','true');fondo.setAttribute('aria-label','Acerca de Base 24');
  fondo.innerHTML='<div class="ac-ventana"><button class="ac-x" aria-label="Cerrar">&times;</button>'+TEXTO+'</div>';
  document.body.appendChild(fondo);

  function abrir(){fondo.classList.add('abierto');document.body.style.overflow='hidden';fondo.querySelector('.ac-ventana').scrollTop=0}
  function cerrar(){fondo.classList.remove('abierto');document.body.style.overflow=''}
  fondo.addEventListener('click',e=>{if(e.target===fondo)cerrar()});
  fondo.querySelector('.ac-x').addEventListener('click',cerrar);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&fondo.classList.contains('abierto'))cerrar()});

  // botón en el encabezado, junto a "← Toolbox"
  const enlace=document.querySelector('.header a');
  const btn=document.createElement('button');btn.className='ac-btn';btn.type='button';btn.textContent='Acerca de';
  btn.addEventListener('click',abrir);
  if(enlace){
    const cont=document.createElement('div');
    cont.style.cssText='margin-left:auto;display:flex;gap:8px;align-items:center';
    enlace.parentNode.insertBefore(cont,enlace);
    cont.appendChild(btn);cont.appendChild(enlace);enlace.style.marginLeft='0';
  }else{document.body.insertBefore(btn,document.body.firstChild)}

  // línea en el pie
  const pie=document.querySelector('.footer');
  if(pie){
    pie.insertAdjacentHTML('beforeend','<br>Proyecto de <a href="https://x.com/argelecciones" target="_blank" rel="noopener">@ArgElecciones</a> · Código GPL v2 · Datos CC BY-SA 4.0 · <a href="#" id="acAbrirPie">Metodología y fuentes</a>');
    document.getElementById('acAbrirPie').addEventListener('click',e=>{e.preventDefault();abrir()});
  }
})();
