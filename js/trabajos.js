/*
  TRABAJOS DE LA WEB — acá se editan todos los proyectos.

  CATEGORÍAS
  - modo "trabajos": la categoría muestra un bloque por trabajo (título + grilla).
  - modo "todos": la categoría muestra una sola grilla con todas las piezas juntas
    (cada pieza abre su propia pantalla).

  TRABAJOS
  - id: nombre corto para el link (trabajo.html?t=id). Sin espacios ni tildes.
  - cat: id de la categoría.
  - titulo, texto: lo que se lee en la pantalla del trabajo.
  - piezas: archivos dentro de assets/trabajos/. Los .mp4 son videos (su póster es el
    .jpg con el mismo nombre). Agregá  v: true  a las piezas verticales.
  - grilla (opcional): cuántas piezas se ven en el listado (por defecto 4).
  - El orden de la lista es el orden en la web.
*/

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
      { src: 'cactus/cactus-video.mp4' },
      { src: 'cactus/manual-02.jpg' },
      { src: 'cactus/manual-05.jpg' },
      { src: 'cactus/cactus-reel.mp4', v: true },
      'cactus/manual-01.jpg', 'cactus/manual-03.jpg', 'cactus/manual-04.jpg', 'cactus/manual-06.jpg',
      'cactus/manual-07.jpg', 'cactus/manual-08.jpg', 'cactus/manual-09.jpg', 'cactus/manual-10.jpg',
      'cactus/manual-11.jpg', 'cactus/manual-12.jpg', 'cactus/manual-13.jpg', 'cactus/manual-14.jpg',
      'cactus/manual-15.jpg', 'cactus/manual-16.jpg', 'cactus/manual-17.jpg'
    ]
  },
  {
    id: 'udent', cat: 'branding', titulo: 'U.Dent',
    texto: 'Identidad visual de U.Dent, estudio dental en Recoleta: logotipo, manual de marca, papelería, video, reel y sitio web.',
    piezas: [
      { src: 'udent/udent-video.mp4' },
      'udent/manual-01.jpg',
      'udent/manual-07.jpg',
      { src: 'udent/udent-web.mp4' },
      { src: 'udent/udent-reel.mp4', v: true },
      'udent/manual-02.jpg', 'udent/manual-03.jpg', 'udent/manual-04.jpg', 'udent/manual-05.jpg',
      'udent/manual-06.jpg', 'udent/manual-08.jpg', 'udent/manual-09.jpg', 'udent/manual-10.jpg',
      'udent/manual-11.jpg', 'udent/manual-12.jpg', 'udent/manual-13.jpg', 'udent/manual-14.jpg',
      'udent/manual-15.jpg', 'udent/manual-16.jpg'
    ]
  },
  {
    id: 'topados', cat: 'branding', titulo: 'topados',
    texto: 'Identidad gráfica de Topados, una marca de alfajores: isologo y reducciones, paleta de colores, tipografías, tramas y recursos visuales.',
    piezas: [
      'topados/topados-logo.jpg',
      'topados/topados-1.jpg',
      'topados/topados-2.jpg',
      'topados/topados-5.jpg',
      { src: 'topados/topados-video.mp4', v: true },
      'topados/topados-3.jpg', 'topados/topados-4.jpg', 'topados/topados-6.jpg',
      { src: 'topados/topados-reel.mp4', v: true }
    ]
  },

  /* ---------- motion graphics (una grilla con todo) ---------- */
  {
    id: 'ariana', cat: 'motion', titulo: 'ariana x britney',
    texto: 'Motion graphics para acompañar la letra de una canción: tipografía, animación y recursos gráficos en movimiento.',
    piezas: [{ src: 'motion/ariana.mp4' }]
  },
  {
    id: 'cactus-motion', cat: 'motion', titulo: 'cActus',
    texto: 'Video de marca de cactus®, estudio de diseño, animado en motion graphics.',
    piezas: [{ src: 'cactus/cactus-video.mp4' }]
  },
  {
    id: 'my-way', cat: 'motion', titulo: 'my way',
    texto: 'Motion graphics para acompañar la letra de una canción: tipografía, animación y recursos gráficos en movimiento.',
    piezas: [{ src: 'motion/my-way.mp4' }]
  },

  /* ---------- redes sociales ---------- */
  {
    id: 'tallo-verde', cat: 'redes', titulo: 'tallo verde',
    texto: 'Contenido para redes de Tallo Verde, una huerta de productos orgánicos: placas, carruseles, historias interactivas y reels.',
    piezas: [
      'talloverde/redes-tallo.jpg',
      { src: 'talloverde/talloverde-redes.mp4' },
      'talloverde/redes-grilla.jpg',
      'talloverde/redes-historias.jpg'
    ]
  },
  {
    id: 'chacabuco-jazz', cat: 'redes', titulo: 'chacabuco jazz',
    texto: 'Contenido para redes de Chacabuco Jazz, una banda de jazz: placas, carruseles, historias y reels.',
    piezas: [{ src: 'chacabuco/chacabuco-redes.mp4' }, { src: 'edicion/chacabuco-jazz.mp4', v: true }]
  },

  /* ---------- piezas publicitarias ---------- */
  {
    id: 'la-casa-neville', cat: 'publicidad', titulo: 'la Casa Neville',
    texto: 'Piezas publicitarias para el lanzamiento de la trilogía “La Casa Neville”, de Florencia Bonelli, para redes sociales y materiales en librerías.',
    piezas: ['neville/neville-1.jpg', 'neville/neville-2.jpg', 'neville/neville-3.jpg', 'neville/neville-5.jpg', 'neville/neville-4.jpg']
  },

  /* ---------- edición de videos (una grilla con todo) ---------- */
  { id: 'bafweek-1', cat: 'video', titulo: 'bafweek', texto: 'Edición de video para redes de BAFWeek.', piezas: [{ src: 'edicion/bafweek-1.mp4', v: true }] },
  { id: 'ishi-segundo-disco', cat: 'video', titulo: 'ishi', texto: 'Edición de video para las redes de ishi, sobre su segundo disco.', piezas: [{ src: 'edicion/ishi-segundo-disco.mp4', v: true }] },
  { id: 'bafweek-2', cat: 'video', titulo: 'bafweek', texto: 'Edición de video para redes de BAFWeek.', piezas: [{ src: 'edicion/bafweek-2.mp4', v: true }] },
  { id: 'ishi-decidida', cat: 'video', titulo: 'ishi en vivo', texto: 'Edición multicámara de ishi en vivo, tocando “Decidida”.', piezas: [{ src: 'edicion/ishi-decidida.mp4', v: true }] },
  { id: 'chacabuco-jazz-video', cat: 'video', titulo: 'chacabuco jazz', texto: 'Edición de video para las redes de Chacabuco Jazz.', piezas: [{ src: 'edicion/chacabuco-jazz.mp4', v: true }] },
  { id: 'bafweek-3', cat: 'video', titulo: 'bafweek', texto: 'Edición de video para redes de BAFWeek.', piezas: [{ src: 'edicion/bafweek-3.mp4', v: true }] },
  { id: 'ishi-uruguay', cat: 'video', titulo: 'ishi en vivo', texto: 'Edición multicámara de ishi en vivo, tocando “Uruguay”.', piezas: [{ src: 'edicion/ishi-uruguay.mp4', v: true }] },

  /* ---------- fiestas ---------- */
  {
    id: 'mika', cat: 'fiestas', titulo: 'mika',
    texto: 'Piezas para una fiesta de 15: invitaciones, decoración, centros de mesa, merchandising y souvenirs.',
    piezas: ['mika/mika-1.jpg', { src: 'mika/mika-7.mp4' }, 'mika/mika-3.jpg', 'mika/mika-4.jpg', { src: 'mika/mika-2.mp4' }, 'mika/mika-6.jpg', { src: 'mika/mika-5.jpg', v: true }]
  }

  /* ---------- papelería: todavía sin piezas ---------- */
];
