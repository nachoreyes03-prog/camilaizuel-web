/* Partes compartidas por todas las páginas: header, menú, música y footer */
(function () {
  const WHATSAPP = 'https://wa.me/5491163596278?text=Hola%20Cami!%20Vi%20tu%20portfolio%20y%20quiero%20hablar%20sobre%20un%20proyecto';
  const FOTOGRAFIA = 'https://www.foto.camilaizuel.com';
  const enInicio = document.body.classList.contains('pagina-inicio');
  const ir = id => (enInicio ? '#' + id : 'index.html#' + id);
  const links = [
    ['sobre mí', ir('sobremi')],
    ['portfolio', 'proyectos.html'],
    ['contacto', ir('contacto')]
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

    if (enInicio) {
      const sombra = () => header.classList.toggle('con-sombra', window.scrollY > 10);
      window.addEventListener('scroll', sombra, { passive: true });
      sombra();
    }
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
  const play = () => audio.play().then(() => cd.classList.add('gira')).catch(() => {});
  musica.addEventListener('click', () => {
    if (audio.paused) play(); else { audio.pause(); cd.classList.remove('gira'); }
  });
  document.body.appendChild(musica);
  window.CAMI = { play, musica };

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

  // links "contactame" a WhatsApp
  document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = WHATSAPP; });

  // reveal al scrollear
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entradas, obs) => {
    entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  window.observarAparece = raiz => (raiz || document).querySelectorAll('.aparece:not(.visto)').forEach(el => io ? io.observe(el) : el.classList.add('visto'));
  observarAparece();

  // preview en GitHub: que Google no la indexe
  if (/github\.io$/.test(location.hostname)) {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m);
  }
})();

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
