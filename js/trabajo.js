/* Pantalla de cada trabajo */
(function () {
  const RUTA = 'assets/trabajos/';
  const id = new URLSearchParams(location.search).get('t');
  const t = TRABAJOS.find(x => x.id === id);
  if (!t) { location.replace('proyectos.html'); return; }

  const cat = CATEGORIAS.find(c => c.id === t.cat);
  const hermanos = TRABAJOS.filter(x => x.cat === t.cat);
  const sig = hermanos[(hermanos.indexOf(t) + 1) % hermanos.length];

  document.title = t.titulo + ' · Camila Izuel';
  document.getElementById('categoria').innerHTML = `<a href="proyectos.html?cat=${cat.id}">← ${cat.nombre}</a>`;
  document.getElementById('titulo').textContent = t.titulo;
  document.getElementById('texto').textContent = t.texto;
  const enlaceSig = document.getElementById('siguiente');
  if (hermanos.length > 1) enlaceSig.href = 'trabajo.html?t=' + sig.id;
  else { enlaceSig.href = 'proyectos.html?cat=' + cat.id; enlaceSig.firstChild.textContent = 'Ver más proyectos '; }

  const piezas = document.getElementById('piezas');
  piezas.innerHTML = t.piezas.map((p, i) => {
    p = typeof p === 'string' ? { src: p } : p;
    const src = RUTA + p.src;
    const clase = 'trabajo__pieza aparece' + (p.v ? ' trabajo__pieza--vertical' : '');
    if (/\.mp4$/i.test(src)) {
      const poster = src.replace(/\.mp4$/i, '.jpg');
      return `<div class="${clase}" id="pieza-${i + 1}"><video src="${src}" poster="${poster}" controls playsinline muted loop preload="${i < 2 ? 'auto' : 'metadata'}"${i === 0 ? ' autoplay' : ''}></video></div>`;
    }
    return `<div class="${clase}" id="pieza-${i + 1}"><img src="${src}" alt="${t.titulo}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async"></div>`;
  }).join('');
  observarAparece(piezas);

  // los videos con sonido arrancan al 50 %
  piezas.querySelectorAll('video').forEach(v => { v.volume = 0.5; });

  // si se entra a una pieza puntual, ir hasta ella
  if (location.hash) {
    const destino = document.querySelector(location.hash);
    if (destino) setTimeout(() => destino.scrollIntoView({ block: 'center' }), 60);
  }

  // imágenes en grande al hacer click
  const lupa = document.getElementById('lupa');
  const contenido = document.getElementById('lupa-contenido');
  const cerrar = () => { lupa.classList.remove('abierta'); contenido.innerHTML = ''; };
  piezas.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img) return;
    contenido.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    lupa.classList.add('abierta');
  });
  piezas.querySelectorAll('img').forEach(i => { i.style.cursor = 'zoom-in'; });
  document.getElementById('lupa-cerrar').addEventListener('click', cerrar);
  lupa.addEventListener('click', e => { if (e.target === lupa) cerrar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
})();
