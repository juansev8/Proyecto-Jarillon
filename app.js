// Prototipo educativo: coordenadas y polígonos aproximados, NO cartografía oficial.
const map = L.map('map', { zoomControl: false }).setView([3.493, -76.475], 13);
L.control.zoom({ position: 'topright' }).addTo(map);

const mapaBase = L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">' +
      'OpenStreetMap</a> contributors',
    referrerPolicy: 'strict-origin-when-cross-origin'
  }
);

mapaBase.addTo(map);

const stories = [
  {
    id: 1, name: 'Floralía', category: 'HISTORIA LOCAL',
    title: 'La zarigüeya del Jarillón',
    text: 'Este punto propone conversar sobre la fauna que comparte el territorio con las comunidades. Completa esta ficha con testimonios, fotografías y fuentes verificadas.',
    source: 'Contenido de ejemplo. Añade aquí la fuente de la investigación.',
    coords: [3.503, -76.493], type: 'bio'
  },
  {
    id: 2, name: 'Decepaz', category: 'MEMORIA DEL TERRITORIO',
    title: 'Vivir junto al río',
    text: 'Un espacio para registrar la memoria local, los cambios del paisaje y las experiencias de las personas que habitan cerca del Jarillón.',
    source: 'Contenido de ejemplo. Reemplazar por entrevista o referencia validada.',
    coords: [3.493, -76.477], type: 'story'
  },
  {
    id: 3, name: 'Paso del Comercio', category: 'ANÁLISIS DE CASO',
    title: 'Territorio, infraestructura y riesgo',
    text: 'Documenta aquí los elementos técnicos del sector, los factores de exposición y las medidas de prevención reportadas por fuentes oficiales.',
    source: 'Verificar con estudios técnicos y entidades competentes antes de publicar.',
    coords: [3.477, -76.455], type: 'risk'
  },
  {
    id: 4, name: 'Navarro', category: 'VOCES Y COMUNIDAD',
    title: 'Personas y territorio',
    text: 'Este punto invita a incorporar relatos de la comunidad, prácticas cotidianas y perspectivas de jóvenes sobre la gestión del riesgo.',
    source: 'Contenido de ejemplo. Publicar testimonios solo con consentimiento.',
    coords: [3.488, -76.444], type: 'story'
  }
];

const detailPanel = document.getElementById('detailPanel');
const detailCategory = document.getElementById('detailCategory');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const detailSource = document.getElementById('detailSource');
const markers = {};
const storyGroup = L.layerGroup().addTo(map);

// Riesgo ilustrativo siguiendo un corredor aproximado. Sustituir por polígono oficial validado.
const riskCoords = [
  [3.513, -76.503], [3.508, -76.492], [3.504, -76.482], [3.499, -76.470],
  [3.493, -76.460], [3.485, -76.450], [3.476, -76.443], [3.469, -76.439],
  [3.472, -76.449], [3.481, -76.457], [3.488, -76.468], [3.493, -76.480],
  [3.498, -76.491], [3.506, -76.501]
];
const riskLayer = L.polygon(riskCoords, {
  color: '#c85d43', weight: 2, opacity: .9,
  fillColor: '#e97b58', fillOpacity: .35,
  dashArray: '7 5'
}).addTo(map);
riskLayer.bindPopup('<span class="risk-label">ZONA REFERENCIAL</span><h3 class="popup-title">Área ilustrativa de análisis</h3><p class="popup-text">No es una delimitación oficial. Reemplaza esta geometría por datos validados.</p>');

const riverCoords = [
  [3.520, -76.510], [3.510, -76.495], [3.501, -76.483],
  [3.493, -76.471], [3.486, -76.460], [3.477, -76.451],
  [3.466, -76.441], [3.458, -76.434]
];
const riverLayer = L.polyline(riverCoords, {
  color: '#ffffff', weight: 15, opacity: .9, lineCap: 'round'
}).addTo(map);
const riverInner = L.polyline(riverCoords, {
  color: '#65bfce', weight: 10, opacity: .95, lineCap: 'round'
}).addTo(map);
const riverGroup = L.layerGroup([riverLayer, riverInner]).addTo(map);

function iconFor(type, id) {
  const bg = type === 'bio' ? '#dbe96e' : type === 'risk' ? '#d96749' : '#174d3b';
  const fg = type === 'bio' ? '#17382e' : '#ffffff';
  return L.divIcon({
    className: '',
    html: `<div style="width:34px;height:34px;border:3px solid #fff;border-radius:50% 50% 50% 8px;transform:rotate(-45deg);background:${bg};box-shadow:0 3px 10px #17382e55;display:grid;place-items:center"><span style="transform:rotate(45deg);font-size:13px;font-weight:900;color:${fg}">${id}</span></div>`,
    iconSize: [34, 34], iconAnchor: [17, 30], popupAnchor: [0, -28]
  });
}

function showDetail(item) {
  detailCategory.textContent = item.category;
  detailTitle.textContent = item.title;
  detailText.textContent = item.text;
  detailSource.textContent = item.source;
  detailPanel.classList.remove('hidden');
  if (window.innerWidth < 650) detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

stories.forEach(item => {
  const marker = L.marker(item.coords, { icon: iconFor(item.type, item.id) });
  marker.bindPopup(`
    <p class="popup-kicker">${item.category}</p>
    <h3 class="popup-title">${item.name}: ${item.title}</h3>
    <p class="popup-text">${item.text}</p>
  `);
  marker.on('click', () => showDetail(item));
  marker.addTo(storyGroup);
  markers[item.id] = marker;
});

const storyList = document.getElementById('storyList');
stories.forEach(item => {
  const button = document.createElement('button');
  button.className = 'story-button';
  button.innerHTML = `<span class="story-number">${item.id}</span><span><strong>${item.name}</strong><small>${item.title}</small></span>`;
  button.addEventListener('click', () => {
    map.flyTo(item.coords, 15, { duration: .7 });
    markers[item.id].openPopup();
    showDetail(item);
    if (window.innerWidth < 650) document.getElementById('sidebar').classList.remove('open');
    document.getElementById('menuButton').setAttribute('aria-expanded', 'false');
  });
  storyList.appendChild(button);
});

document.getElementById('riskToggle').addEventListener('change', e => {
  if (e.target.checked) map.addLayer(riskLayer); else map.removeLayer(riskLayer);
});
document.getElementById('riverToggle').addEventListener('change', e => {
  if (e.target.checked) map.addLayer(riverGroup); else map.removeLayer(riverGroup);
});
document.getElementById('storiesToggle').addEventListener('change', e => {
  if (e.target.checked) map.addLayer(storyGroup); else map.removeLayer(storyGroup);
});
document.getElementById('bioToggle').addEventListener('change', e => {
  stories.filter(s => s.type === 'bio').forEach(s => {
    if (e.target.checked && document.getElementById('storiesToggle').checked) markers[s.id].addTo(storyGroup);
    else storyGroup.removeLayer(markers[s.id]);
  });
});
document.getElementById('closeDetail').addEventListener('click', () => detailPanel.classList.add('hidden'));
document.getElementById('menuButton').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  const open = sidebar.classList.toggle('open');
  document.getElementById('menuButton').setAttribute('aria-expanded', String(open));
});
document.getElementById('visibleCount').textContent = `${stories.length} puntos destacados`;
