/* Base 24 — Mapa de provincias para el Congreso Nacional (Diputados y Senado)
   Se carga desde base24.html con: <script src="mapa-nacion.js"></script>   (después del script principal)
   Necesita en la misma carpeta: provincias-argentina.geojson */
(function(){
  const PROV=['Buenos Aires','Catamarca','Chaco','Chubut','Ciudad de Buenos Aires','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];
  function canon(s){
    const n=norm(s);
    if(n.includes('ciudad')||n.includes('caba')||n.includes('capital federal'))return 'Ciudad de Buenos Aires';
    if(n.startsWith('tierra del fuego'))return 'Tierra del Fuego';
    return PROV.find(p=>norm(p)===n)||null;
  }
  GEOCFG['NAC']={
    file:'provincias-argentina.geojson',
    key:f=>f.properties.key,
    keyLeg:l=>canon(l.filtro),
    nombre:k=>k
  };
  // los legisladores se asignan a la provincia por nombre (en la planilla se asignan por código de distrito)
  const keyDeOrig=window.keyDe;
  window.keyDe=function(l){
    const c=GEOCFG[jurActiva.id];
    return (c&&c.keyLeg)?c.keyLeg(l):keyDeOrig(l);
  };
  // habilita el botón Mapa también en las cámaras que vienen de la API
  const prepararOrig=window.prepararDatos;
  window.prepararDatos=function(){
    if(jurActiva&&jurActiva.id==='NAC')camActiva.tipo='sheet';
    return prepararOrig();
  };
})();
