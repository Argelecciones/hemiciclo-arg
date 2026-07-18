# 🏛️ Generador de Hemiciclos Legislativos - Argelecciones

Herramienta interactiva nativa para la visualización y diseño de parlamentos, cámaras de diputados y senados, optimizada para la creación de placas de datos electorales.

Esta es una versión completamente rediseñada, simplificada y optimizada a partir del proyecto original de `jamesm2w`. Se eliminó toda la estructura pesada de Node.js, Vue y Vite, transformando la aplicación en una **SPA (Single Page Application) nativa y auto-contenida en un solo archivo**, ideal para un flujo de trabajo veloz en producción y diseño.

Los algoritmos base que generan la disposición de los diagramas están acreditados a los autores originales: David Richfield, Mathis Rade, Ranjith Siji y Ambady Anand S.

## ✨ Características de esta versión
*   **Arquitectura Limpia:** Todo el sistema funciona de manera nativa en un único archivo `index.html` sin necesidad de servidores, compiladores ni dependencias externas.
*   **Diseño Compacto:** Panel interactivo con opción de cálculo de bancas tradicional o filas densas (diseño compacto).
*   **Fondo Transparente:** Opción directa para exportar el hemiciclo en imagen de alta resolución (PNG) con fondo transparente, ideal para insertar directo en placas de redes sociales.
*   **Tipografía Estable:** Renderizado de textos optimizado utilizando fuentes de sistema modernas (`Segoe UI` / `-apple-system`) para garantizar que los números y títulos no se deformen al descargar el SVG o PNG.
*   **Interfaz Dinámica:** Controles rápidos en pantalla para ocultar o mostrar el número total central y los títulos con un solo clic.

## 🚀 Cómo usar o modificar
Al no requerir Node.js ni instalaciones:
1. Cloná o descargá este repositorio.
2. Abrí el archivo `index.html` directamente en cualquier navegador (doble clic) y ya está funcionando.
3. Para modificar el código, solo necesitás un editor de texto (como Notepad++) y editar el `index.html`.

## 📄 Licencia
Herramienta bajo licencia GPL v2 (ver `LICENSE.md`). Desarrollada de forma optimizada para **@argelecciones**.
