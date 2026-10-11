# El Jarillón de Cali — prototipo de mapa interactivo

## Cómo ejecutarlo
1. Descomprime `jarillon_web.zip`.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` en el navegador. Si el mapa no carga correctamente, instala la extensión **Live Server** en VS Code y pulsa **Go Live**.
4. Necesita conexión a internet para cargar Leaflet y los mapas base de OpenStreetMap.

## Qué incluye
- Mapa interactivo con zoom y desplazamiento.
- Polígono de riesgo ilustrativo y línea del río.
- Marcadores para Floralía, Decepaz, Paso del Comercio y Navarro.
- Fichas emergentes y panel lateral de historias.
- Controles para activar/desactivar capas.
- Diseño adaptable a celular y escritorio.
- Personaje SVG original de muestra, fácil de reemplazar por la mascota oficial.

## Importante antes de publicar
Las coordenadas y el polígono de riesgo son aproximados y se incluyeron solo para demostrar el funcionamiento. **No son una delimitación oficial del riesgo.** Para una entrega académica o publicación real, reemplaza `riskCoords` en `app.js` por la geometría oficial (GeoJSON) de la entidad competente y añade fuentes verificables a cada ficha. Revisa también los nombres, ubicaciones y textos con tu investigación.

## Archivos
- `index.html`: estructura de la página.
- `styles.css`: línea gráfica, colores, diseño adaptable.
- `app.js`: mapa, capas, puntos y contenido interactivo.
- `assets/mascota-jarillon.svg`: personaje ilustrado de muestra.
