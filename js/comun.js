/* Partes compartidas por todas las páginas: header, menú, música, footer
   y la navegación entre páginas sin recargar (para que la música no se corte). */
(function () {
  const WHATSAPP = 'https://wa.me/5491163596278?text=Hola%20Cami!%20Vi%20tu%20portfolio%20y%20quiero%20hablar%20sobre%20un%20proyecto';
  const FOTOGRAFIA = 'https://www.foto.camilaizuel.com';
  const links = [
    ['sobre mí', 'index.html#sobremi'],
    ['portfolio', 'proyectos.html'],
    ['contacto', 'index.html#contacto']
  ];

  // ---------- header ----------
  const header = document.getElementById('header');
  if (header) {
    header.className = 'header';
    header.innerHTML =
      '<a class="header__logo" href="index.html" aria-label="inicio"><img src="assets/img/logo-header.svg" alt="cami"></a>' +
      '<nav class="header__nav">' + links.map(([t, h]) => `<a href="${h}">${t}</a>`).join('') + '</nav>' +
      `<a class="btn-foto" href="${FOTOGRAFIA}" target="_blank" rel="noopener">fotografía</a>` +
      '<button class="hamburguesa" aria-label="abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>';

    const menu = document.createElement('nav');
    menu.className = 'menu-movil';
    menu.innerHTML = links.map(([t, h]) => `<a href="${h}">${t}</a>`).join('');
    header.after(menu);

    const boton = header.querySelector('.hamburguesa');
    const cerrar = () => { menu.classList.remove('abierto'); boton.setAttribute('aria-expanded', 'false'); };
    boton.addEventListener('click', e => {
      e.stopPropagation();
      const abrir = !menu.classList.contains('abierto');
      menu.classList.toggle('abierto', abrir);
      boton.setAttribute('aria-expanded', String(abrir));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
    document.addEventListener('click', e => { if (!menu.contains(e.target)) cerrar(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

    const sombra = () => header.classList.toggle('con-sombra', window.scrollY > 10);
    window.addEventListener('scroll', sombra, { passive: true });
    sombra();
  }

  // ---------- música (CD) ----------
  const musica = document.createElement('button');
  musica.className = 'musica';
  musica.setAttribute('aria-label', 'música');
  musica.innerHTML = '<img class="musica__base" src="assets/img/cd-player.png" alt=""><img class="musica__cd" src="assets/img/cd.png" alt="">';
  const audio = new Audio('assets/audio/sunflower.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  const cd = musica.querySelector('.musica__cd');
  const play = () => audio.play().then(() => { cd.classList.add('gira'); guardarMusica(); }).catch(() => {});
  const pausar = () => { audio.pause(); cd.classList.remove('gira'); guardarMusica(); };
  musica.addEventListener('click', () => { if (audio.paused) play(); else pausar(); });
  document.body.appendChild(musica);

  // si la página se recarga igual (link directo, F5), la música sigue desde donde iba;
  // si el navegador no deja arrancar solo, arranca con el primer toque o clic
  function guardarMusica() {
    try { sessionStorage.setItem('musica', JSON.stringify({ sonando: !audio.paused, t: audio.currentTime })); } catch (e) {}
  }
  window.addEventListener('pagehide', guardarMusica);
  setInterval(() => { if (!audio.paused) guardarMusica(); }, 2000);
  let estado = null;
  try { estado = JSON.parse(sessionStorage.getItem('musica') || 'null'); } catch (e) {}
  if (estado && estado.sonando) {
    const retomar = () => {
      if (!audio.paused) return;
      try { audio.currentTime = estado.t || 0; } catch (e) {}
      play();
    };
    audio.addEventListener('loadedmetadata', () => { try { audio.currentTime = estado.t || 0; } catch (e) {} }, { once: true });
    audio.play().then(() => cd.classList.add('gira')).catch(() => {
      const unaVez = () => { retomar(); ['pointerdown', 'keydown', 'touchend'].forEach(ev => document.removeEventListener(ev, unaVez, true)); };
      ['pointerdown', 'keydown', 'touchend'].forEach(ev => document.addEventListener(ev, unaVez, true));
    });
  }

  // ---------- footer ----------
  const footer = document.getElementById('footer');
  if (footer) {
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="footer__links">' +
        '<nav class="footer__nav">' + links.map(([t, h]) => `<a href="${h}">${t === 'portfolio' ? 'porfolio' : t}</a>`).join('') + '</nav>' +
        '<div class="footer__redes">' +
          '<a href="https://www.instagram.com/kmi.dg_/" target="_blank" rel="noopener" aria-label="Instagram"><img src="assets/img/instagram.svg" alt=""></a>' +
          '<a href="https://www.linkedin.com/in/camila-izuel/" target="_blank" rel="noopener" aria-label="LinkedIn"><img src="assets/img/linkedin.svg" alt=""></a>' +
        '</div>' +
      '</div>' +
      '<img class="footer__logo" src="assets/img/logo-footer.svg" alt="">';
  }

  // ---------- reveal al scrollear ----------
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entradas, obs) => {
    entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  window.observarAparece = raiz => (raiz || document).querySelectorAll('.aparece:not(.visto)').forEach(el => io ? io.observe(el) : el.classList.add('visto'));

  function prepararPagina() {
    document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = WHATSAPP; });
    observarAparece();
  }
  prepararPagina();

  // preview en GitHub: que Google no la indexe
  if (/github\.io$/.test(location.hostname)) {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m);
  }

  // ---------- navegación sin recargar ----------
  // Los links internos cambian el contenido de la página en vez de cargar otra,
  // así el audio nunca se corta. Si algo falla, se navega de la forma normal.
  const salidas = [];
  const alSalir = fn => salidas.push(fn);
  window.CAMI = { play, pausar, musica, audio, alSalir };

  const fijos = el => el === header || el === footer || el === musica ||
    (el.classList && el.classList.contains('menu-movil')) || el.tagName === 'SCRIPT';
  const nombre = src => (src.split('/').pop() || '').split('?')[0];
  const cargados = new Set([...document.scripts].map(s => nombre(s.src)).filter(Boolean));
  const UNA_VEZ = ['comun.js', 'trabajos.js'];
  // "/sitio/" y "/sitio/index.html" son la misma página
  const ruta = p => p.replace(/index\.html$/, '');
  let paginaActual = ruta(location.pathname) + location.search;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function cargarScript(src) {
    return new Promise(res => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = s.onerror = () => { s.remove(); res(); };
      document.body.appendChild(s);
    });
  }

  function irAHash(hash, suave) {
    if (!hash) return false;
    let el = null;
    try { el = document.querySelector(decodeURIComponent(hash)); } catch (e) {}
    if (!el) return false;
    el.scrollIntoView({ behavior: suave ? 'smooth' : 'auto' });
    return true;
  }

  async function navegar(url, empujar, y) {
    let html;
    try {
      const r = await fetch(url.href, { credentials: 'same-origin' });
      if (!r.ok) throw new Error(r.status);
      html = await r.text();
    } catch (e) { location.href = url.href; return; }

    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (empujar) {
      try { history.replaceState(Object.assign({}, history.state, { y: window.scrollY }), ''); } catch (e) {}
      history.pushState({ pjax: true }, '', url.href);
    }

    salidas.splice(0).forEach(fn => { try { fn(); } catch (e) {} });
    [...document.body.children].forEach(el => { if (!fijos(el)) el.remove(); });
    [...doc.body.children].forEach(el => {
      if (el.id === 'header' || el.id === 'footer' || el.tagName === 'SCRIPT') return;
      document.body.insertBefore(document.importNode(el, true), footer);
    });
    document.body.className = doc.body.className;
    document.title = doc.title;
    paginaActual = ruta(location.pathname) + location.search;
    window.scrollTo(0, y || 0);

    for (const s of doc.querySelectorAll('body script[src]')) {
      const n = nombre(s.getAttribute('src'));
      if (n === 'comun.js' || (UNA_VEZ.includes(n) && cargados.has(n))) continue;
      cargados.add(n);
      await cargarScript(s.getAttribute('src'));
    }
    prepararPagina();
    if (!y) irAHash(location.hash, false);
    if (window.gtag) gtag('event', 'page_view', { page_location: location.href, page_title: document.title });
  }

  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
    if (location.protocol === 'file:') return;
    e.preventDefault();
    // mismo lugar, solo cambia el #: deslizar hasta ahí
    if (ruta(url.pathname) === ruta(location.pathname) && url.search === location.search && url.hash) {
      if (irAHash(url.hash, true)) history.replaceState(history.state, '', url.href);
      return;
    }
    navegar(url, true);
  });

  window.addEventListener('popstate', e => {
    const mismaRuta = ruta(location.pathname) === paginaActual.split('?')[0];
    // dentro de proyectos (cambio de categoría) o del inicio (#) se encarga la propia página
    if (mismaRuta && !/trabajo\.html$/.test(location.pathname)) return;
    if (ruta(location.pathname) + location.search === paginaActual) return;
    navegar(new URL(location.href), false, e.state && e.state.y);
  });
})();

/* Filas parejas: cada pieza conserva su proporción (r) y todas las de una fila tienen la
   misma altura. "objetivo" = suma de proporciones por fila (más alto = piezas más chicas). */
function armarFilas(items, objetivo, tarjeta) {
  const filas = [];
  let fila = [], suma = 0;
  items.forEach(it => {
    fila.push(it); suma += it.r || 1.778;
    if (suma >= objetivo) { filas.push({ fila, suma }); fila = []; suma = 0; }
  });
  if (fila.length) filas.push({ fila, suma, corta: true });
  return '<div class="filas">' + filas.map(({ fila, suma, corta }) => {
    const ancho = corta ? Math.min(1, suma / objetivo) : 1;
    return `<div class="fila"${ancho < 1 ? ` style="width:${(ancho * 100).toFixed(2)}%"` : ''}>` +
      fila.map(it => { const r = (it.r || 1.778).toFixed(4); return tarjeta(it, `flex:${r} ${r} 0;aspect-ratio:${r}`); }).join('') +
      '</div>';
  }).join('') + '</div>';
}
const enCelu = () => window.matchMedia('(max-width: 900px)').matches;

/* Videos de las grillas: se reproducen solo cuando se ven */
function videosVisibles(raiz) {
  const vids = (raiz || document).querySelectorAll('video[data-auto]');
  if (!('IntersectionObserver' in window)) { vids.forEach(v => v.play().catch(() => {})); return; }
  const io = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    });
  }, { rootMargin: '200px 0px' });
  vids.forEach(v => io.observe(v));
}
