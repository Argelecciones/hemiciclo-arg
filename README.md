# Base 24

Herramienta de consulta y visualización del Poder Legislativo argentino: las 24 jurisdicciones (23 provincias y la Ciudad de Buenos Aires) y el Congreso Nacional. Proyecto de [@ArgElecciones](https://x.com/argelecciones).

Muestra, para cada cámara: hemiciclo por bloque, listado de legisladores con mandato vigente, mapa por distrito electoral (donde corresponde), y un panel de costos y transparencia (remuneración, presupuesto, indicadores).

## Cómo funciona
- Los datos se cargan en una planilla de Google Sheets (pestañas JURISDICCIONES, CÁMARAS, DISTRITOS, REPRESENTACIÓN, BLOQUES, LEGISLADORES, HISTÓRICO, REMUNERACIONES, PRESUPUESTOS, TRANSPARENCIA, FUENTES, INFO, LISTAS y CONTROL).
- Las pestañas se publican como CSV y la página las lee en el navegador. El Congreso Nacional se lee de [ArgentinaDatos](https://argentinadatos.com/).
- No necesita servidor, compilación ni dependencias: son archivos estáticos.

## Archivos
- `base24.html`: la página principal.
- `arches.js`: disposición de las bancas del hemiciclo.
- `panel-datos.js`, `acerca.js`, `actualizacion.js`, `enlaces.js`, `mapa-nacion.js`: módulos que se suman a la página.
- `*.geojson`: límites de provincias, departamentos, secciones y circuitos (geometrías simplificadas).

## Datos de cada legislador
Cada fila de la planilla es un mandato. Solo se muestran los mandatos con estado `Vigente`. Cada dato indica su fuente y su estado de verificación. Ver la ventana "Acerca de" de la página.

## Licencias
- **Código:** GPL v2 (ver `LICENSE.md`). El hemiciclo usa una adaptación de [Arches](https://github.com/elexnuk/arches), distribuida bajo esa licencia.
- **Datos propios:** CC BY-SA 4.0 (ver `LICENCIA-DATOS.md`).
- Los datos y mapas de terceros conservan su licencia original.

## Créditos
IGN y CONAE (límites de departamentos) · Datos Abiertos de la Provincia de Buenos Aires · Misionero~commonswiki, Wikimedia Commons (circuitos de Río Negro, CC BY-SA 3.0) · ArgentinaDatos · DataCP · Ruido, Reverso, Chequeado y AFP · Fundación Libertad · legislaturas, ministerios y portales de transparencia de cada jurisdicción · Arches (David Richfield, Mathis Rade, Ranjith Siji y Ambady Anand S.).
