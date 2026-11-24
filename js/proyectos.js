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

  function tarjeta(t, p, i, conNombre) {
    p = pieza(p);
    const href = `trabajo.html?t=${t.id}` + (i ? `#pieza-${i + 1}` : '');
    return `<a class="pieza${p.v ? ' pieza--vertical' : ''}" href="${href}">${media(p, t.titulo)}${conNombre ? `<span class="pieza__nombre">${t.titulo}</span>` : ''}</a>`;
  }

  function pintar(catId) {
    const cat = CATEGORIAS.find(c => c.id === catId) || CATEGORIAS[0];
    const lista = TRABAJOS.filter(t => t.cat === cat.id);
    let html = '';

    if (!lista.length) {
      html = `<section class="grupo"><h2 class="grupo__titulo">${cat.nombre}</h2><p class="vacio">las piezas de ${cat.nombre} se están subiendo :)</p></section>`;
    } else if (cat.modo === 'todos') {
      html = `<section class="grupo"><h2 class="grupo__titulo">${cat.nombre}</h2><div class="grilla grilla--todos">` +
        lista.map(t => tarjeta(t, t.piezas[0], 0, true)).join('') + '</div></section>';
    } else {
      html = lista.map(t => {
        const cant = t.grilla || 4;
        const piezas = t.piezas.map(pieza).filter(p => !p.v).slice(0, cant);
        return `<section class="grupo aparece"><a class="grupo__titulo" href="trabajo.html?t=${t.id}">${t.titulo}</a><div class="grilla">` +
          piezas.map(p => tarjeta(t, p, t.piezas.map(pieza).findIndex(q => q.src === p.src), false)).join('') + '</div></section>';
      }).join('');
    }

    listado.innerHTML = html;
    menu.querySelectorAll('a').forEach(a => a.classList.toggle('activa', a.dataset.cat === cat.id));
    observarAparece(listado);
    videosVisibles(listado);
    return cat;
  }

  // estilo del menú a prueba: ?menu=pildoras o ?menu=carpetas (se recuerda durante la visita)
  const ESTILOS = ['pildoras', 'carpetas'];
  let estilo = new URLSearchParams(location.search).get('menu');
  try {
    if (ESTILOS.includes(estilo)) sessionStorage.setItem('menu-estilo', estilo);
    else estilo = sessionStorage.getItem('menu-estilo');
  } catch (e) {}
  if (!ESTILOS.includes(estilo)) estilo = 'pildoras';
  menu.parentElement.classList.add('categorias--' + estilo);
  document.body.classList.add('menu-' + estilo);

  // menú
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

  window.addEventListener('popstate', () => pintar(new URLSearchParams(location.search).get('cat')));

  const inicial = pintar(new URLSearchParams(location.search).get('cat'));
  const activa = menu.querySelector(`[data-cat="${inicial.id}"]`);
  if (activa && activa.scrollIntoView) activa.scrollIntoView({ block: 'nearest', inline: 'center' });
  document.title = 'Proyectos · ' + inicial.nombre + ' · Camila Izuel';
})();
