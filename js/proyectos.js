/* Página de proyectos: menú de categorías + grillas */
(function () {
  const menu = document.getElementById('categorias');
  const listado = document.getElementById('listado');
  const RUTA = 'assets/trabajos/';

  const pieza = p => (typeof p === 'string' ? { src: p } : p);
  const esVideo = src => /\.mp4$/i.test(src);

  function media(p, nombre) {
    const src = RUTA + p.src;
    if (esVideo(src)) {
      const poster = src.replace(/\.mp4$/i, '.jpg');
      return `<video data-auto data-src="${src}" poster="${poster}" muted loop playsinline preload="none" aria-label="${nombre}"></video>`;
    }
    return `<img src="${src}" alt="${nombre}" loading="lazy" decoding="async">`;
  }

  function tarjeta(t, p, i, conNombre, estilo) {
    const href = `trabajo.html?t=${t.id}` + (i ? `#pieza-${i + 1}` : '');
    const area = p.area ? ` data-area="${p.area}"` : '';
    return `<a class="pieza" href="${href}"${area}${estilo ? ` style="${estilo}"` : ''}>${media(p, t.titulo)}${conNombre ? `<span class="pieza__nombre">${t.titulo}</span>` : ''}</a>`;
  }

  // piezas de un trabajo: mosaico de referencia o filas parejas
  function piezasDe(t) {
    const todas = t.piezas.map(pieza).map((p, i) => Object.assign({ i }, p));
    if (t.mosaico) return `<div class="mosaico mosaico--${t.mosaico}">` + todas.map(p => tarjeta(t, p, p.i, false)).join('') + '</div>';
    const cant = t.grilla || 4;
    return armarFilas(todas.slice(0, cant), enCelu() ? 1.6 : 3.4, (p, estilo) => tarjeta(t, p, p.i, false, estilo));
  }

  function pintar(catId) {
    const cat = CATEGORIAS.find(c => c.id === catId) || CATEGORIAS[0];
    const lista = TRABAJOS.filter(t => t.cat === cat.id);
    let html = '';

    if (!lista.length) {
      html = `<section class="grupo"><h2 class="grupo__titulo">${cat.nombre}</h2><p class="vacio">las piezas de ${cat.nombre} se están subiendo :)</p></section>`;
    } else if (cat.modo === 'todos') {
      const items = lista.map(t => Object.assign({ t }, pieza(t.piezas[0])));
      html = `<section class="grupo"><h2 class="grupo__titulo">${cat.nombre}</h2>` +
        armarFilas(items, enCelu() ? 1.6 : 3.4, (it, estilo) => tarjeta(it.t, it, 0, true, estilo)) + '</section>';
    } else {
      html = lista.map(t =>
        `<section class="grupo aparece"><a class="grupo__titulo" href="trabajo.html?t=${t.id}">${t.titulo}</a>${piezasDe(t)}</section>`
      ).join('');
    }

    listado.innerHTML = html;
    menu.querySelectorAll('a').forEach(a => a.classList.toggle('activa', a.dataset.cat === cat.id));
    document.title = 'Proyectos · ' + cat.nombre + ' · Camila Izuel';
    observarAparece(listado);
    videosVisibles(listado);
    return cat;
  }

  // menú (píldoras)
  menu.parentElement.classList.add('categorias--pildoras');
  document.body.classList.add('menu-pildoras');
  menu.innerHTML = CATEGORIAS.map(c => `<a href="?cat=${c.id}" data-cat="${c.id}">${c.nombre}</a>`).join('');
  menu.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const id = a.dataset.cat;
    if (a.classList.contains('activa')) return;
    history.pushState({ cat: id }, '', '?cat=' + id);
    cambiar(id);
    a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  });

  function cambiar(id) {
    listado.classList.add('cambiando');
    setTimeout(() => {
      pintar(id);
      const tope = document.querySelector('.categorias').getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'));
      if (window.scrollY > tope) window.scrollTo({ top: tope });
      listado.classList.remove('cambiando');
    }, 250);
  }

  // atrás / adelante entre categorías (solo mientras se está en proyectos)
  const alVolver = () => {
    if (/proyectos\.html$/.test(location.pathname)) pintar(new URLSearchParams(location.search).get('cat'));
  };
  window.addEventListener('popstate', alVolver);
  if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => window.removeEventListener('popstate', alVolver));

  // al pasar de compu a celu (o al revés) las filas se rearman con otro tamaño
  const mq = window.matchMedia('(max-width: 900px)');
  const rearmar = () => pintar(new URLSearchParams(location.search).get('cat'));
  if (mq.addEventListener) mq.addEventListener('change', rearmar); else mq.addListener(rearmar);
  if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => { if (mq.removeEventListener) mq.removeEventListener('change', rearmar); else mq.removeListener(rearmar); });

  const inicial = pintar(new URLSearchParams(location.search).get('cat'));
  const activa = menu.querySelector(`[data-cat="${inicial.id}"]`);
  if (activa && activa.scrollIntoView) activa.scrollIntoView({ block: 'nearest', inline: 'center' });
})();
