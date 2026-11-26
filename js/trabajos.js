/*
  TRABAJOS DE LA WEB: acá se editan todos los proyectos.

  CATEGORÍAS
  - modo "trabajos": la categoría muestra un bloque por trabajo (título + sus piezas).
  - modo "todos": la categoría muestra todas las piezas juntas (cada una abre su pantalla).

  TRABAJOS
  - id: nombre corto para el link (trabajo.html?t=id). Sin espacios ni tildes.
  - cat: id de la categoría. titulo, texto: lo que se lee en la pantalla del trabajo.
  - piezas: archivos dentro de assets/trabajos/. Los .mp4 son videos (su póster es el .jpg
    con el mismo nombre). r = proporción ancho / alto (16:9 = 1.778, vertical 9:16 = 0.5625).
    Una pieza con pdf es un manual: src es su tapa y pdf el archivo que se abre.
  - grilla (opcional): cuántas piezas se ven en el listado (por defecto 4).
  - mosaico (opcional): 'beauty' o 'cyber' arma el layout de referencia de Cami; cada pieza
    lleva su lugar en area (a, b, c...).
  - El orden de la lista es el orden en la web.
*/

const H = 1.778;   // horizontal 16:9
const V = 0.5625;  // vertical 9:16
const A4 = 1.415;  // tapa de manual A4 horizontal

const CATEGORIAS = [
  { id: 'branding',   nombre: 'branding',             modo: 'trabajos' },
  { id: 'motion',     nombre: 'motion graphics',      modo: 'todos' },
  { id: 'redes',      nombre: 'redes sociales',       modo: 'trabajos' },
  { id: 'publicidad', nombre: 'piezas publicitarias', modo: 'trabajos' },
  { id: 'video',      nombre: 'edición de videos',    modo: 'todos' },
  { id: 'fiestas',    nombre: 'fiestas',              modo: 'trabajos' },
  { id: 'papeleria',  nombre: 'papelería',            modo: 'todos' }
];

const TRABAJOS = [
  /* ---------- branding ---------- */
  {
    id: 'cactus', cat: 'branding', titulo: 'cActus',
    texto: 'Identidad visual de cactus®, estudio de diseño: logotipo, reducciones, tipografías, colores, trama, campaña, video de marca y piezas para redes.',
    piezas: [
      { src: 'cactus/cactus-video.mp4', r: H },
      { src: 'cactus/cactus-web.mp4', r: V },
      { src: 'cactus/manual-01.jpg', pdf: 'cactus/cactus-manual.pdf', r: A4 }
    ]
  },
  {
    id: 'udent', cat: 'branding', titulo: 'U.Dent',
    texto: 'Identidad visual de U.Dent, estudio dental en Recoleta: logotipo, manual de marca, papelería, video y sitio web.',
    piezas: [
      { src: 'udent/udent-video.mp4', r: H },
      { src: 'udent/udent-web.mp4', r: H },
      { src: 'udent/manual-01.jpg', pdf: 'udent/udent-manual.pdf', r: A4 }
    ]
  },
  {
    id: 'topados', cat: 'branding', titulo: 'topados',
    texto: 'Identidad gráfica de Topados, una marca de alfajores: isologo y reducciones, paleta de colores, tipografías, tramas y recursos visuales.',
    piezas: [
      { src: 'topados/topados-video.mp4', r: V },
      { src: 'topados/topados-2.jpg', r: 0.8 },
      { src: 'topados/topados-4.jpg', r: 0.8 },
      { src: 'topados/topados-manual.jpg', pdf: 'topados/topados-manual.pdf', r: A4 },
      { src: 'topados/topados-reel.mp4', r: V }
    ]
  },

  /* ---------- motion graphics (todo junto) ---------- */
  { id: 'ariana', cat: 'motion', titulo: 'ariana x britney', texto: 'Motion graphics para acompañar la letra de una canción: tipografía, animación y recursos gráficos en movimiento.', piezas: [{ src: 'motion/ariana.mp4', r: H }] },
  { id: 'fdm', cat: 'motion', titulo: 'FDM', texto: 'Pieza de motion graphics.', piezas: [{ src: 'motion/fdm.mp4', r: V }] },
  { id: 'not-ok', cat: 'motion', titulo: 'not ok', texto: 'Motion graphics para acompañar la letra de una canción: tipografía, animación y recursos gráficos en movimiento.', piezas: [{ src: 'motion/not-ok.mp4', r: H }] },
  { id: 'my-way', cat: 'motion', titulo: 'my way', texto: 'Motion graphics para acompañar la letra de una canción: tipografía, animación y recursos gráficos en movimiento.', piezas: [{ src: 'motion/my-way-videofondo.mp4', r: H }] },
  { id: 'cactus-motion', cat: 'motion', titulo: 'cActus', texto: 'Presentación en motion graphics de cactus®, estudio de diseño.', piezas: [{ src: 'motion/cactus-presentacion.mp4', r: H }] },

  /* ---------- redes sociales ---------- */
  {
    id: 'tallo-verde', cat: 'redes', titulo: 'tallo verde',
    texto: 'Contenido para redes de Tallo Verde, una huerta de productos orgánicos: placas, carruseles, historias interactivas y reels.',
    piezas: [
      { src: 'talloverde/redes-tallo.jpg', r: 1.333 },
      { src: 'talloverde/talloverde-redes.mp4', r: H },
      { src: 'talloverde/redes-grilla.jpg', r: 0.811 }
    ]
  },
  {
    id: 'cactus-redes', cat: 'redes', titulo: 'cActus',
    texto: 'Piezas para las redes de cactus®, estudio de diseño: anuncios y reels.',
    piezas: [
      { src: 'cactus-redes/anuncio-branding.mp4', r: V },
      { src: 'cactus-redes/anuncio-diseno-integral.mp4', r: V },
      { src: 'cactus-redes/anuncio-estudio-creativo.mp4', r: V },
      { src: 'cactus-redes/este-es-nuestro-trabajo.mp4', r: V },
      { src: 'cactus-redes/publicidad-10s.mp4', r: V }
    ]
  },
  {
    id: 'chacabuco-jazz', cat: 'redes', titulo: 'chacabuco jazz',
    texto: 'Contenido para redes de Chacabuco Jazz, una banda de jazz: placas, carruseles, historias y reels.',
    piezas: [
      { src: 'chacabuco/chacabuco-redes.mp4', r: H },
      { src: 'chacabuco/presentacion.mp4', r: V },
      { src: 'chacabuco/en-vivo.mp4', r: V },
      { src: 'chacabuco/preguntas.mp4', r: V }
    ]
  },

  /* ---------- piezas publicitarias ---------- */
  {
    id: 'la-casa-neville', cat: 'publicidad', titulo: 'la Casa Neville',
    texto: 'Piezas publicitarias para el lanzamiento de la trilogía “La Casa Neville”, de Florencia Bonelli, para redes sociales y materiales en librerías.',
    piezas: [
      { src: 'neville/neville-1.jpg', r: 1.333 },
      { src: 'neville/neville-2.jpg', r: 1.333 },
      { src: 'neville/neville-3.jpg', r: 1.751 },
      { src: 'neville/neville-5.jpg', r: 1.599 },
      { src: 'neville/neville-4.jpg', r: 1.25 }
    ]
  },
  {
    id: 'beauty-week', cat: 'publicidad', titulo: 'beauty week', mosaico: 'beauty',
    texto: 'Piezas para la Beauty Week: placas y banners de descuentos para Tucci, Sarkany, Cher, Ben Simon y una pieza multimarca.',
    piezas: [
      { src: 'beautyweek/tucci.jpg', r: 0.8, area: 'a' },
      { src: 'beautyweek/sarkany.jpg', r: 0.8, area: 'b' },
      { src: 'beautyweek/450x250-cher-3x2.jpg', r: 1.8, area: 'c' },
      { src: 'beautyweek/450x250-cher.jpg', r: 1.8, area: 'd' },
      { src: 'beautyweek/bensimon.jpg', r: 0.8, area: 'e' },
      { src: 'beautyweek/multimarca.jpg', r: 0.8, area: 'f' },
      { src: 'beautyweek/tucci-1.jpg', r: 0.8, area: 'g' }
    ]
  },
  {
    id: 'cyber-week', cat: 'publicidad', titulo: 'cyber week', mosaico: 'cyber',
    texto: 'Piezas para el Cyber Monday: banners en distintos formatos para Cher, Sarkany, Tucci y Ben Simon.',
    piezas: [
      { src: 'cyberweek/cw-1080x1080.jpg', r: 1, area: 'a' },
      { src: 'cyberweek/cw-850x850.jpg', r: 1, area: 'b' },
      { src: 'cyberweek/cw-428x644.jpg', r: 0.665, area: 'c' },
      { src: 'cyberweek/cw-786x1386.jpg', r: 0.567, area: 'd' },
      { src: 'cyberweek/cw-2560x427.jpg', r: 5.922, area: 'e' }
    ]
  },

  /* ---------- edición de videos (todo junto) ---------- */
  { id: 'music-video', cat: 'video', titulo: 'music video', texto: 'Edición de un video musical.', piezas: [{ src: 'edicion/music-video.mp4', r: H }] },
  { id: 'las-pepas-backstage', cat: 'video', titulo: 'LAS PEPAS | BACKSTAGE', texto: 'Edición de video del backstage de Las Pepas.', piezas: [{ src: 'edicion/las-pepas-backstage.mp4', r: V }] },
  { id: 'las-pepas-bafweek', cat: 'video', titulo: 'LAS PEPAS | BAFWEEK', texto: 'Edición de video del desfile de Las Pepas en BAFWeek.', piezas: [{ src: 'edicion/las-pepas-bafweek.mp4', r: V }] },
  { id: 'gnz-bafweek', cat: 'video', titulo: 'GNZ Gonzalez | BAFWEEK', texto: 'Edición de video del desfile de GNZ Gonzalez en BAFWeek.', piezas: [{ src: 'edicion/gnz-bafweek.mp4', r: V }] },
  { id: 'mixed-media-1', cat: 'video', titulo: 'mixed media', texto: 'Video mixed media: animación cuadro a cuadro sobre video real.', piezas: [{ src: 'edicion/mixed-media-1.mp4', r: H }] },
  { id: 'mixed-media-2', cat: 'video', titulo: 'mixed media', texto: 'Video mixed media: animación cuadro a cuadro sobre video real.', piezas: [{ src: 'edicion/mixed-media-2.mp4', r: H }] },
  { id: 'ishi-en-vivo', cat: 'video', titulo: 'ISHI en vivo', texto: 'Edición de video de ishi en vivo.', piezas: [{ src: 'edicion/ishi-en-vivo.mp4', r: V }] },
  { id: 'ishi-decidida', cat: 'video', titulo: 'ISHI en vivo | decidida', texto: 'Edición multicámara de ishi en vivo, tocando “Decidida”.', piezas: [{ src: 'edicion/ishi-decidida.mp4', r: V }] },
  { id: 'photobooth-backstage', cat: 'video', titulo: 'photobooth | backstage', texto: 'Edición de video del backstage de una sesión de photobooth.', piezas: [{ src: 'edicion/photobooth-backstage.mp4', r: H }] },
  { id: 'short-vlog', cat: 'video', titulo: 'short vlog', texto: 'Edición de un vlog corto.', piezas: [{ src: 'edicion/short-vlog.mp4', r: H }] },

  /* ---------- fiestas ---------- */
  {
    id: 'mika', cat: 'fiestas', titulo: 'mika',
    texto: 'Piezas para una fiesta de 15: invitaciones, decoración, centros de mesa, merchandising y souvenirs.',
    piezas: [
      { src: 'mika/mika-1.jpg', r: 1.333 },
      { src: 'mika/mika-7.mp4', r: H },
      { src: 'mika/mika-3.jpg', r: 1.422 },
      { src: 'mika/mika-4.jpg', r: 1.5 },
      { src: 'mika/mika-2.mp4', r: 1 },
      { src: 'mika/mika-6.jpg', r: 1.494 }
    ]
  },

  /* ---------- papelería (todo junto) ---------- */
  { id: 'flyer-ishi', cat: 'papeleria', titulo: 'flyer | ISHI', texto: 'Flyer para la presentación del disco de ishi.', piezas: [{ src: 'papeleria/flyer-ishi.jpg', r: H }] },
  { id: 'ishi-disco', cat: 'papeleria', titulo: 'ISHI | disco', texto: 'Diseño del CD de ishi: tapa, disco y lista de temas.', piezas: [{ src: 'papeleria/ishi-disco.jpg', r: 1.479 }] },
  { id: 'flyers-ishi', cat: 'papeleria', titulo: 'flyers | ISHI', texto: 'Flyers para ishi.', piezas: [{ src: 'papeleria/flyers-ishi.jpg', r: 1 }] },
  { id: 'flyers-chacabuco-jazz', cat: 'papeleria', titulo: 'flyers | Chacabuco Jazz', texto: 'Flyers para Chacabuco Jazz.', piezas: [{ src: 'papeleria/flyers-chacabuco-jazz.jpg', r: 1 }] }
];
