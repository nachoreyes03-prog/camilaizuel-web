/* Página de inicio */
(function () {
  const intro = document.getElementById('intro');
  const body = document.body;

  // ---------- bandas "diseño pensado para vos <3" ----------
  // Cada tramo cubre justo el ancho de la pantalla (+1 frase): en iPhone, Safari no anima capas muy anchas
  // (con 14 repeticiones la pista medía ~7700 px y quedaba quieta). La velocidad es fija en px por segundo.
  const frase = 'diseño pensado para vos  <3  ';
  const VELOCIDAD = 95;                      // px/s, igual que antes (40 s por tramo de ~3800 px)
  function armarBandas() {
    document.querySelectorAll('.banda__pista').forEach(pista => {
      pista.innerHTML = `<span>${frase.replace(/</g, '&lt;')}</span>`;
      const anchoFrase = pista.firstChild.getBoundingClientRect().width || 280;
      const veces = Math.ceil(window.innerWidth / anchoFrase) + 1;
      const tramo = frase.repeat(veces).replace(/</g, '&lt;');
      pista.innerHTML = `<span>${tramo}</span><span>${tramo}</span>`;
      pista.style.animationDuration = (anchoFrase * veces / VELOCIDAD).toFixed(2) + 's';
    });
  }
  armarBandas();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(armarBandas);   // medir con la tipo real
  let anchoBandas = window.innerWidth;
  const alCambiar = () => { if (Math.abs(window.innerWidth - anchoBandas) > 40) { anchoBandas = window.innerWidth; armarBandas(); } };
  window.addEventListener('resize', alCambiar);
  if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => window.removeEventListener('resize', alCambiar));

  // ---------- ruleta de palabras ----------
  const palabras = ['diseñadora', 'creativa', 'artista'];
  const pista = document.getElementById('ruleta');
  const [actual, siguiente] = pista.children;
  let i = 0;
  let ruletaActiva = false;
  function girarPalabra() {
    i = (i + 1) % palabras.length;
    siguiente.textContent = palabras[i];
    pista.style.transform = 'translateY(-50%)';
    setTimeout(() => {
      actual.textContent = palabras[i];
      pista.style.transition = 'none';
      pista.style.transform = 'translateY(0)';
      void pista.offsetWidth;
      pista.style.transition = '';
    }, 300);
  }
  function arrancarHome() {
    body.classList.add('cargado');
    if (!ruletaActiva) {
      ruletaActiva = true;
      const espera = setTimeout(() => { reloj = setInterval(girarPalabra, 900); }, 1600);
      let reloj = null;
      if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => { clearTimeout(espera); clearInterval(reloj); });
    }
  }

  // ---------- intro (una vez por visita) ----------
  let vista = false;
  try { vista = sessionStorage.getItem('intro-vista') === '1'; } catch (e) {}
  if (vista || location.hash) {
    intro.remove();
    body.classList.remove('con-intro');
    arrancarHome();
  } else {
    document.getElementById('btn-atender').addEventListener('click', () => {
      try { sessionStorage.setItem('intro-vista', '1'); } catch (e) {}
      window.CAMI.play();
      intro.classList.add('saliendo');
      body.classList.remove('con-intro');
      window.scrollTo(0, 0);
      arrancarHome();
      setTimeout(() => intro.remove(), 650);
    });

    // botón "cortar" que se escapa
    const cortar = document.getElementById('btn-cortar');
    let ox = 0, oy = 0, moviendo = false;
    const base = () => {
      const r = cortar.getBoundingClientRect();
      const m = new DOMMatrixReadOnly(getComputedStyle(cortar).transform);
      return { left: r.left - m.m41, top: r.top - m.m42, w: r.width, h: r.height };
    };
    const limitar = (x, y) => {
      const b = base(), mg = 16;
      return [
        Math.max(mg - b.left, Math.min(innerWidth - mg - b.w - b.left, x)),
        Math.max(mg - b.top, Math.min(innerHeight - mg - b.h - b.top, y))
      ];
    };
    function escapar(cx, cy) {
      const r = cortar.getBoundingClientRect();
      const ang = Math.atan2(r.top + r.height / 2 - cy, r.left + r.width / 2 - cx) + (Math.random() - .5) * .9;
      const paso = 170 + Math.random() * 70;
      let [nx, ny] = limitar(ox + Math.cos(ang) * paso, oy + Math.sin(ang) * paso);
      const b = base();
      const lejos = (x, y) => Math.hypot(cx - (b.left + x + b.w / 2), cy - (b.top + y + b.h / 2));
      for (let k = 0; k < 12 && lejos(nx, ny) < 180; k++) {
        [nx, ny] = limitar(ox + (Math.random() * 2 - 1) * innerWidth, oy + (Math.random() * 2 - 1) * innerHeight);
      }
      ox = nx; oy = ny; moviendo = true;
      cortar.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      setTimeout(() => { moviendo = false; }, 450);
    }
    intro.addEventListener('mousemove', e => {
      if (moviendo) return;
      const r = cortar.getBoundingClientRect();
      if (Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < 120) escapar(e.clientX, e.clientY);
    });
    // en celular: tocarlo también lo hace escapar
    cortar.addEventListener('click', e => { const r = cortar.getBoundingClientRect(); escapar(r.left + r.width / 2, r.top + r.height / 2 + 30); e.preventDefault(); });
  }

  // ---------- flores que siguen el mouse en el hero ----------
  const hero = document.getElementById('hero');
  let ultima = 0;
  hero.addEventListener('mousemove', e => {
    const ahora = Date.now();
    if (ahora - ultima < 70) return;
    ultima = ahora;
    const r = hero.getBoundingClientRect();
    const flor = document.createElement('img');
    flor.src = 'assets/img/micelanea.flor.marron.png';
    flor.className = 'flor-cursor';
    flor.alt = '';
    flor.style.left = (e.clientX - r.left) + 'px';
    flor.style.top = (e.clientY - r.top) + 'px';
    const t = `translate(-50%,-50%) scale(${.8 + Math.random() * .4}) rotate(${Math.random() * 360}deg)`;
    flor.style.transform = t;
    hero.appendChild(flor);
    requestAnimationFrame(() => requestAnimationFrame(() => { flor.style.opacity = 0; flor.style.transform = t + ' scale(1.2)'; }));
    setTimeout(() => flor.remove(), 1000);
  });

  // ---------- flores que giran con el scroll ----------
  const flores = document.querySelectorAll('.flor');
  let pedido = false;
  const girarFlores = () => {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(() => {
      const g = window.scrollY * .5;
      flores.forEach(f => { f.style.transform = `rotate(${g}deg)`; });
      pedido = false;
    });
  };
  window.addEventListener('scroll', girarFlores, { passive: true });
  if (window.CAMI && CAMI.alSalir) CAMI.alSalir(() => window.removeEventListener('scroll', girarFlores));

  // ---------- postal que se da vuelta ----------
  // hover en compu, toque en celular; se da vuelta entera aunque el mouse salga a mitad del giro
  const postal = document.getElementById('postal');
  const tactil = window.matchMedia('(hover: none)').matches;
  if (tactil) {
    postal.addEventListener('click', () => postal.classList.toggle('girada'));
  } else {
    let salida = null;
    postal.addEventListener('mouseenter', () => { clearTimeout(salida); postal.classList.add('girada'); });
    postal.addEventListener('mouseleave', () => { salida = setTimeout(() => postal.classList.remove('girada'), 250); });
    postal.addEventListener('click', () => postal.classList.toggle('girada'));
  }
  postal.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); postal.classList.toggle('girada'); } });
})();
