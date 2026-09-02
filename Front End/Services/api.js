// Datos Simulados Centralizados
export const LUGARES = [
  { id: 'leon', nombre: 'León', icon: '🦁', saturacion: 'baja', descripcion: 'Ciudad Universitaria. Cuna de poetas y murales históricos.', coords: { top: '40%', left: '22%' } },
  { id: 'masaya', nombre: 'Masaya', icon: '🌋', saturacion: 'media', descripcion: 'Cuna del Folklore. Tierra de artesanos.', coords: { top: '56%', left: '38%' } },
  { id: 'granada', nombre: 'Granada', icon: '🏛️', saturacion: 'alta', descripcion: 'La Gran Sultana. Arquitectura colonial.', coords: { top: '65%', left: '46%' } }
];

export const MISSIONS = [
  // GRANADA
  { id: 'g1', lugarId: 'granada', titulo: 'Ruta del Cacao', tipoClasificacion: 'permanente', tipoAccion: 'visitarLugar', descripcion: 'Visita 3 talleres artesanales.', puntosDeMision: 50 },
  { id: 'g2', lugarId: 'granada', titulo: 'Festival de la Poesía', tipoClasificacion: 'temporal', tipoAccion: 'responderPregunta', descripcion: 'Responde la trivia.', puntosDeMision: 75 },
  { id: 'g3', lugarId: 'granada', titulo: 'Limpieza de Costas', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Limpia las isletas.', puntosDeMision: 100 },
  { id: 'g4', lugarId: 'granada', titulo: 'Apoyo a Cooperativa', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Apoya a tejedoras.', puntosDeMision: 80 },
  // MASAYA
  { id: 'm1', lugarId: 'masaya', titulo: 'Misterios del Volcán', tipoClasificacion: 'permanente', tipoAccion: 'responderPregunta', descripcion: 'Trivia del volcán.', puntosDeMision: 40 },
  { id: 'm2', lugarId: 'masaya', titulo: 'Baile de Negras', tipoClasificacion: 'temporal', tipoAccion: 'tomarfoto', descripcion: 'Foto de trajes.', puntosDeMision: 120 },
  { id: 'm3', lugarId: 'masaya', titulo: 'San Juan de Oriente', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Compra cerámica.', puntosDeMision: 90 },
  { id: 'm4', lugarId: 'masaya', titulo: 'Reforestación', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Siembra en Catarina.', puntosDeMision: 110 },
  // LEÓN
  { id: 'l1', lugarId: 'leon', titulo: 'Ruta de los Murales', tipoClasificacion: 'permanente', tipoAccion: 'visitarLugar', descripcion: 'Visita 5 murales.', puntosDeMision: 60 },
  { id: 'l2', lugarId: 'leon', titulo: 'La Gritería Chiquita', tipoClasificacion: 'temporal', tipoAccion: 'responderPregunta', descripcion: 'Preguntas de celebración.', puntosDeMision: 90 },
  { id: 'l3', lugarId: 'leon', titulo: 'Jornada Cerro Negro', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Limpia el sendero.', puntosDeMision: 150 },
  { id: 'l4', lugarId: 'leon', titulo: 'Comedor Solidario', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Almuerza en el mercado.', puntosDeMision: 70 }
];

export const COLORS = {
  green: '#668F55',
  blue: '#2878B8',
  brown: '#B8785B',
  yellow: '#E8B84A',
  bg: '#FAF9F5',
  text: '#50545A'
};