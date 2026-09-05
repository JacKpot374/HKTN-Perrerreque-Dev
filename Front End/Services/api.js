// api.js

export const COLORS = {
  green: '#668F55',
  blue: '#2878B8',
  brown: '#B8785B',
  yellow: '#E8B84A',
  bg: '#FAF9F5',
  text: '#50545A'
};

export const LUGARES = [
  { id: 'leon', nombre: 'León', icon: '🦁', saturacion: 'baja', descripcion: 'Ciudad Universitaria. Cuna de poetas y murales históricos.', coords: { top: '35%', left: '25%' } },
  { id: 'masaya', nombre: 'Masaya', icon: '🌋', saturacion: 'media', descripcion: 'Cuna del Folklore. Tierra de artesanos y el imponente volcán.', coords: { top: '60%', left: '40%' } },
  { id: 'granada', nombre: 'Granada', icon: '🏛️', saturacion: 'alta', descripcion: 'La Gran Sultana. Arquitectura colonial a orillas del Lago Cocibolca.', coords: { top: '70%', left: '55%' } }
];

export const MISSIONS = [
  { id: 'g1', lugarId: 'granada', titulo: 'Ruta del Cacao', tipoClasificacion: 'permanente', tipoAccion: 'visitarLugar', descripcion: 'Visita 3 talleres artesanales de chocolate y conoce el proceso.', puntosDeMision: 50 },
  { id: 'g2', lugarId: 'granada', titulo: 'Festival de la Poesía', tipoClasificacion: 'temporal', tipoAccion: 'responderPregunta', descripcion: 'Responde la trivia sobre los poetas participantes del festival.', puntosDeMision: 75 },
  { id: 'g3', lugarId: 'granada', titulo: 'Limpieza de Costas', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Únete al grupo local en las Isletas y toma una foto de tu recolección.', puntosDeMision: 100 },
  { id: 'm1', lugarId: 'masaya', titulo: 'Misterios del Volcán', tipoClasificacion: 'permanente', tipoAccion: 'responderPregunta', descripcion: 'Completa la trivia sobre la historia del Parque Nacional Volcán Masaya.', puntosDeMision: 40 },
  { id: 'm2', lugarId: 'masaya', titulo: 'Baile de Negras', tipoClasificacion: 'temporal', tipoAccion: 'tomarfoto', descripcion: 'Toma una foto de los trajes tradicionales durante las fiestas patronales.', puntosDeMision: 120 },
  { id: 'm3', lugarId: 'masaya', titulo: 'San Juan de Oriente', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Visita y adquiere cerámica directamente de los talleres familiares.', puntosDeMision: 90 },
  { id: 'l1', lugarId: 'leon', titulo: 'Ruta de los Murales', tipoClasificacion: 'permanente', tipoAccion: 'visitarLugar', descripcion: 'Encuentra y visita 5 murales históricos de la Revolución.', puntosDeMision: 60 },
  { id: 'l2', lugarId: 'leon', titulo: 'La Gritería Chiquita', tipoClasificacion: 'temporal', tipoAccion: 'responderPregunta', descripcion: 'Responde 3 preguntas sobre el origen de esta celebración.', puntosDeMision: 90 },
  { id: 'l3', lugarId: 'leon', titulo: 'Jornada Cerro Negro', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Ayuda a limpiar el sendero del volcán y sube tu evidencia.', puntosDeMision: 150 },
];

// ESTO ERA LO QUE FALTABA
export const NEWS = [
  { id: 1, title: 'Nueva ruta ecológica habilitada en Mombacho', date: '15 Oct 2026', tag: 'Naturaleza', image: 'https://images.unsplash.com/photo-1518182170546-076616fd63f9?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Feria de Artesanías en Masaya este fin de semana', date: '18 Oct 2026', tag: 'Cultura', image: 'https://images.unsplash.com/photo-1605389647249-01124e930f36?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Iniciativa de limpieza en Peñitas supera meta', date: '20 Oct 2026', tag: 'Comunidad', image: 'https://images.unsplash.com/photo-1594142410313-2d288d6beec7?auto=format&fit=crop&w=400&q=80' }
];