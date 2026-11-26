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
  const todas = t.piezas.map((p, i) => Object.assign({ i }, typeof p === 'string' ? { src: p } : p));

  function pieza(p, estilo) {
    const src = RUTA + p.src;
    const area = p.area ? ` data-area="${p.area}"` : '';
    const st = estilo ? ` style="${estilo}"` : '';
    if (/\.mp4$/i.test(src)) {
      const poster = src.replace(/\.mp4$/i, '.jpg');
      return `<div class="trabajo__pieza" id="pieza-${p.i + 1}"${area}${st}><video src="${src}" poster="${poster}" controls playsinline muted loop preload="${p.i < 2 ? 'auto' : 'metadata'}"${p.i === 0 ? ' autoplay' : ''}></video></div>`;
    }
    return `<div class="trabajo__pieza" id="pieza-${p.i + 1}"${area}${st}><img src="${src}" alt="${t.titulo}" ${p.i > 1 ? 'loading="lazy"' : ''} decoding="async"></div>`;
  }

  // manual de marca: el PDF se lee ahí mismo en la compu; en el celu, la tapa abre el PDF
  function manual(p) {
    const pdf = RUTA + p.pdf;
    const tapa = RUTA + p.src;
    const visor = !enCelu() && navigator.pdfViewerEnabled !== false;
    return `<div class="trabajo__pdf" id="pieza-${p.i + 1}">` +
      (visor
        ? `<iframe class="trabajo__pdf-visor" src="${pdf}#view=FitH" title="manual de marca de ${t.titulo}" loading="lazy"></iframe>`
        : `<a class="trabajo__pdf-tapa" href="${pdf}" target="_blank" rel="noopener"><img src="${tapa}" alt="manual de marca de ${t.titulo}" loading="lazy"></a>`) +
      `<a class="btn-pdf" href="${pdf}" target="_blank" rel="noopener">ver el manual de marca en PDF <span>↗</span></a>` +
      '</div>';
  }

  function armar() {
    const comunes = todas.filter(p => !p.pdf);
    const pdfs = todas.filter(p => p.pdf);
    const bloque = t.mosaico
      ? `<div class="mosaico mosaico--${t.mosaico}">` + comunes.map(p => pieza(p)).join('') + '</div>'
      : armarFilas(comunes, enCelu() ? 1.1 : 1.75, pieza);
    piezas.innerHTML = bloque + pdfs.map(manual).join('');
    piezas.querySelectorAll('video').forEach(v => { v.volume = 0.5; });
    piezas.querySelectorAll('img').forEach(i => { if (!i.closest('a')) i.style.cursor = 'zoom-in'; });
    observarAparece(piezas);
  }
  armar();
  const mq = window.matchMedia('(max-width: 900px)');
  if (mq.addEventListener) mq.addEventListener('change', armar); else mq.addListener(armar);
  if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => { if (mq.removeEventListener) mq.removeEventListener('change', armar); else mq.removeListener(armar); });

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
    if (!img || img.closest('a')) return;
    contenido.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    lupa.classList.add('abierta');
  });
  document.getElementById('lupa-cerrar').addEventListener('click', cerrar);
  lupa.addEventListener('click', e => { if (e.target === lupa) cerrar(); });
  const conEscape = e => { if (e.key === 'Escape') cerrar(); };
  document.addEventListener('keydown', conEscape);
  if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => document.removeEventListener('keydown', conEscape));
})();
