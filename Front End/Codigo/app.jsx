import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Map, MapPin, Compass, CalendarDays, User, Leaf, Clock, Trophy, Share2, 
  AlertTriangle, CheckCircle2, ChevronRight, LogOut, Camera, MessageSquare, 
  Facebook, Instagram, Video, Navigation, Settings, Lock, Save, Eye, EyeOff 
} from 'lucide-react';

const COLORS = {
  green: '#668F55',
  blue: '#2878B8',
  brown: '#B8785B',
  yellow: '#E8B84A',
  bg: '#FAF9F5',
  text: '#50545A'
};

import LoginView from '../Components/iniciosesion';
import LocationPermissionView from '../Components/Localizacion';
import MapView from '../Components/mapa';
import MissionsView from '../Components/misiones';
import NewsView from '../Components/noticia';
import ProfileView from '../Components/perfil';
import SettingsView from '../Components/configuracion';

const LUGARES = [
  { id: 'leon', nombre: 'León', icon: '🦁', saturacion: 'baja', descripcion: 'Ciudad Universitaria. Cuna de poetas y murales históricos.', coords: { top: '35%', left: '25%' } },
  { id: 'masaya', nombre: 'Masaya', icon: '🌋', saturacion: 'media', descripcion: 'Cuna del Folklore. Tierra de artesanos y el imponente volcán.', coords: { top: '60%', left: '40%' } },
  { id: 'granada', nombre: 'Granada', icon: '🏛️', saturacion: 'alta', descripcion: 'La Gran Sultana. Arquitectura colonial a orillas del Lago Cocibolca.', coords: { top: '70%', left: '55%' } }
];

const MISSIONS = [
  { id: 'g1', lugarId: 'granada', titulo: 'Ruta del Cacao', tipoClasificacion: 'permanente', tipoAccion: 'visitarLugar', descripcion: 'Visita 3 talleres artesanales de chocolate y conoce el proceso.', puntosDeMision: 50 },
  { id: 'g2', lugarId: 'granada', titulo: 'Festival de la Poesía', tipoClasificacion: 'temporal', tipoAccion: 'responderPregunta', descripcion: 'Responde la trivia sobre los poetas participantes del festival.', puntosDeMision: 75 },
  { id: 'g3', lugarId: 'granada', titulo: 'Limpieza de Costas', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Únete al grupo local en las Isletas y toma una foto de tu recolección.', puntosDeMision: 100 },
  { id: 'g4', lugarId: 'granada', titulo: 'Apoyo a Cooperativa', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Visita la cooperativa de mujeres tejedoras y apoya su trabajo.', puntosDeMision: 80 },
  { id: 'm1', lugarId: 'masaya', titulo: 'Misterios del Volcán', tipoClasificacion: 'permanente', tipoAccion: 'responderPregunta', descripcion: 'Completa la trivia sobre la historia del Parque Nacional Volcán Masaya.', puntosDeMision: 40 },
  { id: 'm2', lugarId: 'masaya', titulo: 'Baile de Negras', tipoClasificacion: 'temporal', tipoAccion: 'tomarfoto', descripcion: 'Toma una foto de los trajes tradicionales durante las fiestas patronales.', puntosDeMision: 120 },
  { id: 'm3', lugarId: 'masaya', titulo: 'San Juan de Oriente', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Visita y adquiere cerámica directamente de los talleres familiares.', puntosDeMision: 90 },
  { id: 'm4', lugarId: 'masaya', titulo: 'Reforestación', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Participa en la siembra de árboles en los miradores de Catarina.', puntosDeMision: 110 },
  { id: 'l1', lugarId: 'leon', titulo: 'Ruta de los Murales', tipoClasificacion: 'permanente', tipoAccion: 'visitarLugar', descripcion: 'Encuentra y visita 5 murales históricos de la Revolución.', puntosDeMision: 60 },
  { id: 'l2', lugarId: 'leon', titulo: 'La Gritería Chiquita', tipoClasificacion: 'temporal', tipoAccion: 'responderPregunta', descripcion: 'Responde 3 preguntas sobre el origen de esta celebración.', puntosDeMision: 90 },
  { id: 'l3', lugarId: 'leon', titulo: 'Jornada Cerro Negro', tipoClasificacion: 'comunitaria', tipoAccion: 'tomarfoto', descripcion: 'Ayuda a limpiar el sendero del volcán y sube tu evidencia.', puntosDeMision: 150 },
  { id: 'l4', lugarId: 'leon', titulo: 'Comedor Solidario', tipoClasificacion: 'comunitaria', tipoAccion: 'visitarLugar', descripcion: 'Almuerza en uno de los comedores del mercado apoyando a los locales.', puntosDeMision: 70 }
];

const NEWS = [
  { id: 1, title: 'Nueva ruta ecológica habilitada en Mombacho', date: '15 Oct 2026', tag: 'Naturaleza', image: 'https://images.unsplash.com/photo-1518182170546-076616fd63f9?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Feria de Artesanías en Masaya este fin de semana', date: '18 Oct 2026', tag: 'Cultura', image: 'https://images.unsplash.com/photo-1605389647249-01124e930f36?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Iniciativa de limpieza en Peñitas supera meta', date: '20 Oct 2026', tag: 'Comunidad', image: 'https://images.unsplash.com/photo-1594142410313-2d288d6beec7?auto=format&fit=crop&w=400&q=80' }
];

function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const userTrim = username.trim();
    if (userTrim.length < 3 || userTrim.includes(' ')) {
      return setError('El usuario debe tener al menos 3 letras y sin espacios.');
    }
    if (password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }
    setError('');
    onLogin({ username: userTrim, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full" style={{ backgroundColor: COLORS.bg }}>
      <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl border-t-[10px]" style={{ borderColor: COLORS.blue }}>
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg" style={{ backgroundColor: COLORS.blue }}>L</div>
          <span className="font-bold text-xl mt-2 tracking-wider" style={{ color: COLORS.blue }}>LANI</span>
        </div>
        <p className="text-center text-sm mb-6 text-gray-500 font-medium">Descubre la esencia de Nicaragua.</p>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-bold text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><User size={18} /></div>
            <input type="text" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none" />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Lock size={18} /></div>
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña (min. 6 char)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold shadow-md active:scale-95" style={{ backgroundColor: COLORS.blue }}>Comenzar Aventura</button>
        </form>
      </div>
    </div>
  );
}

function LocationPermissionView({ onAllow }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full" style={{ backgroundColor: COLORS.bg }}>
      <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl border-t-[8px] flex flex-col items-center text-center" style={{ borderColor: COLORS.green }}>
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4" style={{ borderColor: COLORS.green }}>
          <Navigation size={40} style={{ color: COLORS.green }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>Permitir ubicación</h2>
        <p className="text-sm mb-8 opacity-80 leading-relaxed">Lani necesita acceder a tu ubicación para mostrarte los destinos, misiones y negocios tradicionales más cercanos a ti.</p>
        <button onClick={onAllow} className="w-full py-4 rounded-2xl text-white font-bold active:scale-95 flex justify-center items-center gap-2 shadow-md" style={{ backgroundColor: COLORS.green }}>
          <MapPin size={18} /> Permitir Ubicación
        </button>
      </div>
    </div>
  );
}

function MapView({ onSelectDept }) {
  const [activePin, setActivePin] = useState(null);

  const getSaturacionStyle = (nivel) => {
    switch(nivel) {
      case 'alta': return { color: '#EF4444', bg: '#FEF2F2', text: 'Alta (Saturado)' }; 
      case 'media': return { color: COLORS.yellow, bg: '#FEFCE8', text: 'Moderada' };
      case 'baja': return { color: COLORS.green, bg: '#F0FDF4', text: 'Despejado' };
      default: return { color: COLORS.text, bg: '#F3F4F6', text: 'Desconocido' };
    }
  };

  return (
    <div className="p-6 flex flex-col">
      <div className="mb-4 animate-slide-up stagger-1">
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>Explora Nicaragua</h2>
        <p className="text-sm opacity-80">Toca un departamento en el mapa para ver su estado actual.</p>
      </div>
      <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden mb-6 animate-slide-up stagger-2 border-4 shadow-inner" style={{ backgroundColor: '#E2F1F8', borderColor: 'rgba(40,120,184,0.1)' }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-80">
          <path d="M10,20 Q30,10 50,30 T80,40 T90,70 T60,90 T20,80 Z" fill="#D4E6C3" stroke={COLORS.green} strokeWidth="0.5"/>
          <circle cx="35" cy="50" r="8" fill="#90D5E5" />
          <circle cx="65" cy="65" r="12" fill="#90D5E5" />
        </svg>
        {LUGARES.map(lugar => {
          const isActive = activePin?.id === lugar.id;
          const satStyle = getSaturacionStyle(lugar.saturacion);
          return (
            <div 
              key={lugar.id} 
              onClick={() => setActivePin(lugar)} 
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${isActive ? 'scale-125 z-20' : 'hover:scale-110'}`} 
              style={{ top: lugar.coords.top, left: lugar.coords.left }}
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: satStyle.color }}></div>
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2" style={{ borderColor: satStyle.color }}>
                <span className="text-xl">{lugar.icon}</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-0.5 bg-white rounded text-[10px] font-bold shadow">{lugar.nombre}</div>
            </div>
          );
        })}
      </div>
      {activePin && (
        <div className="bg-white p-6 rounded-[24px] shadow-xl border-l-8 animate-slide-up" style={{ borderLeftColor: getSaturacionStyle(activePin.saturacion).color }}>
          <h3 className="font-bold text-2xl mb-2 flex items-center gap-2">{activePin.icon} {activePin.nombre}</h3>
          <p className="text-sm opacity-70 mb-4">{activePin.descripcion}</p>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4 text-sm font-bold" style={{ backgroundColor: getSaturacionStyle(activePin.saturacion).bg, color: getSaturacionStyle(activePin.saturacion).color }}>
            {activePin.saturacion === 'alta' ? <AlertTriangle size={18} /> : activePin.saturacion === 'media' ? <Clock size={18} /> : <CheckCircle2 size={18} />} 
            Estado: {getSaturacionStyle(activePin.saturacion).text}
          </div>
          <button onClick={() => onSelectDept(activePin.id)} className="w-full py-4 rounded-2xl text-white font-bold flex justify-center items-center gap-2 active:scale-95 shadow-md" style={{ backgroundColor: COLORS.blue }}>
            <Compass size={20} /> Ver misión disponible
          </button>
        </div>
      )}
      {!activePin && (
        <div className="mt-2 p-6 rounded-[24px] text-white shadow-lg animate-slide-up stagger-3" style={{ backgroundColor: COLORS.brown }}>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Leaf size={18}/> Turismo Sostenible</h3>
          <p className="text-sm opacity-90">Elige destinos con saturación "Moderada" o "Despejado" para ayudar al ecosistema local.</p>
        </div>
      )}
    </div>
  );
}

function MissionsView({ selectedDept, setSelectedDept, acceptedMissions, arrivedMissions, completedMissions, acceptMission, arriveMission, completeMissionFlow }) {
  const [filter, setFilter] = useState('todas');
  const deptData = LUGARES.find(d => d.id === selectedDept);
  let filteredMissions = selectedDept ? MISSIONS.filter(m => m.lugarId === selectedDept) : MISSIONS;
  if (filter !== 'todas') filteredMissions = filteredMissions.filter(m => m.tipoClasificacion === filter);

  return (
    <div className="p-6 flex flex-col min-h-full">
      <div className="mb-6 animate-slide-up stagger-1">
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>Misiones</h2>
        {deptData ? (
          <div className="flex items-center gap-3 mt-2">
            <button onClick={() => setSelectedDept(null)} className="text-xs font-bold px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg">← Volver</button>
            <p className="text-sm opacity-80 font-medium">Rutas en <b style={{color: COLORS.brown}}>{deptData.nombre}</b></p>
          </div>
        ) : <p className="text-sm opacity-80">Selecciona un destino en el mapa.</p>}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 custom-scrollbar animate-slide-up stagger-2">
        {['todas', 'temporal', 'permanente', 'comunitaria'].map(type => (
          <button key={type} onClick={() => setFilter(type)} className={`px-5 py-2.5 rounded-full text-xs font-bold border-2 capitalize transition-colors whitespace-nowrap`} style={{ backgroundColor: filter === type ? COLORS.blue : 'white', color: filter === type ? 'white' : COLORS.text, borderColor: filter === type ? COLORS.blue : '#E5E7EB' }}>
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4 pb-10">
        {filteredMissions.map((mission, index) => {
          const isAccepted = acceptedMissions.includes(mission.id);
          const isArrived = arrivedMissions.includes(mission.id);
          const isCompleted = completedMissions.includes(mission.id);
          
          let btnText = "Aceptar misión";
          let btnAction = () => acceptMission(mission.id);
          let btnBgColor = COLORS.blue;

          if (isCompleted) { btnText = "Misión Completada"; btnAction = undefined; btnBgColor = '#F3F4F6'; }
          else if (isArrived) { btnText = "Completar misión"; btnAction = () => completeMissionFlow(mission); btnBgColor = COLORS.green; }
          else if (isAccepted) { btnText = "Ir al lugar / simular llegada"; btnAction = () => arriveMission(mission.id); btnBgColor = COLORS.brown; }

          return (
            <div key={mission.id} className={`bg-white p-5 rounded-[24px] shadow-sm border-l-[6px] animate-slide-up stagger-${(index % 4) + 1} ${isCompleted ? 'opacity-80' : ''}`} style={{ borderLeftColor: COLORS.green }}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase font-black px-2 py-1 rounded bg-green-50 text-green-700">{mission.tipoClasificacion}</span>
                <span className="font-bold text-sm" style={{ color: COLORS.brown }}>+{mission.puntosDeMision} pts</span>
              </div>
              <h3 className="font-bold text-lg mb-2 leading-tight">{mission.titulo}</h3>
              <p className="text-sm opacity-70 mb-5">{mission.descripcion}</p>
              <button onClick={btnAction} disabled={isCompleted} className={`w-full py-3.5 rounded-xl text-sm font-bold flex justify-center items-center gap-2 active:scale-95 ${!isCompleted && 'shadow-md text-white'}`} style={{ backgroundColor: btnBgColor, color: isCompleted ? COLORS.green : 'white' }}>
                {isCompleted ? <CheckCircle2 size={18}/> : <MapPin size={18} />} {btnText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewsView() {
  return (
    <div className="p-6 flex flex-col">
      <div className="mb-6 animate-slide-up stagger-1">
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>Noticias Locales</h2>
      </div>
      <div className="space-y-4 pb-10">
        {NEWS.map((item, index) => (
          <div key={item.id} className={`bg-white rounded-3xl overflow-hidden shadow-md animate-slide-up stagger-${(index % 3) + 1}`}>
            <div className="h-40 overflow-hidden relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black uppercase" style={{ color: COLORS.blue }}>{item.tag}</div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold mb-2"><CalendarDays size={12} /> {item.date}</div>
              <h3 className="font-bold text-lg leading-tight mb-3">{item.title}</h3>
              <button className="text-sm font-bold flex items-center gap-1" style={{ color: COLORS.green }}>Leer más <ChevronRight size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ currentUser, getDeptProgress, socialLinks, setSocialLinks, puntos, nivel, onOpenSettings }) {
  return (
    <div className="p-6 flex flex-col">
      <div className="flex justify-end animate-slide-up"><button onClick={onOpenSettings} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-800"><Settings size={22} /></button></div>
      <div className="flex flex-col items-center mb-8 animate-slide-up stagger-1 -mt-4">
        <div className="w-28 h-28 rounded-full bg-white border-[6px] mb-3 flex items-center justify-center shadow-xl relative" style={{ borderColor: COLORS.yellow }}>
          <User size={48} className="text-gray-300" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border-4" style={{ borderColor: COLORS.green }}>
            <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-black text-sm" style={{ backgroundColor: COLORS.green }}>Nv.{nivel}</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-3 text-gray-800 capitalize">{currentUser.username}</h2>
        <div className="bg-orange-50 px-4 py-1.5 rounded-full mt-2 border border-orange-100">
          <p className="text-sm flex items-center gap-2 font-bold" style={{ color: COLORS.brown }}><Trophy size={16} style={{ color: COLORS.yellow }}/> {puntos} Puntos Acumulados</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[30px] shadow-lg mb-8 border-t-[8px] animate-slide-up stagger-2" style={{ borderColor: COLORS.yellow }}>
        <h3 className="font-bold mb-2 flex items-center gap-2 text-xl" style={{ color: COLORS.brown, fontFamily: 'Krub, sans-serif' }}><Trophy size={22} /> Panel de Pines</h3>
        <p className="text-xs opacity-70 mb-6">Completa las 4 misiones de un departamento para desbloquear su insignia dorada.</p>
        <div className="flex flex-col gap-5">
          {LUGARES.map(dept => {
            const progress = getDeptProgress(dept.id);
            const percentage = (progress.completed / progress.total) * 100;
            return (
              <div key={dept.id} className="flex items-center gap-5 bg-gray-50 p-4 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-yellow-100/40" style={{ width: `${percentage}%` }}></div>
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-inner z-10 shrink-0 ${progress.unlocked ? 'shadow-xl' : 'opacity-40 grayscale bg-gray-200'}`}
                  style={{ backgroundColor: progress.unlocked ? COLORS.bg : '#E5E7EB', border: `4px solid ${progress.unlocked ? COLORS.yellow : '#D1D5DB'}` }}
                >
                  {dept.icon}
                </div>
                <div className="z-10 flex-1">
                  <h4 className={`font-bold text-base ${progress.unlocked ? '' : 'opacity-60'}`} style={{ color: progress.unlocked ? COLORS.brown : COLORS.text }}>Pin de {dept.nombre}</h4>
                  {progress.unlocked ? (
                    <div className="text-[11px] font-black mt-2 inline-flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full" style={{ color: COLORS.green }}><CheckCircle2 size={12} /> ¡DESBLOQUEADO!</div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs font-bold opacity-60 mb-1.5"><span>Progreso</span><span>{progress.completed} / {progress.total} misiones</span></div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner"><div className="h-full rounded-full relative" style={{ width: `${percentage}%`, backgroundColor: COLORS.yellow }}></div></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-[30px] shadow-lg animate-slide-up stagger-3">
        <h3 className="font-bold mb-3 flex items-center gap-2 text-xl" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}><Share2 size={22} /> Tus Redes Sociales</h3>
        <div className="space-y-4">
          <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-600"><Facebook size={18} /></div><input type="text" placeholder="Usuario de Facebook" value={socialLinks.facebook} onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-2xl text-sm outline-none focus:border-[#2878B8]" /></div>
          <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center text-pink-600"><Instagram size={18} /></div><input type="text" placeholder="@usuario_instagram" value={socialLinks.instagram} onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-2xl text-sm outline-none focus:border-[#2878B8]" /></div>
          <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center text-black"><Video size={18} /></div><input type="text" placeholder="@usuario_tiktok" value={socialLinks.tiktok} onChange={(e) => setSocialLinks({...socialLinks, tiktok: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-2xl text-sm outline-none focus:border-[#2878B8]" /></div>
          <button className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md active:scale-95 mt-4" style={{ backgroundColor: COLORS.blue }}>Guardar Redes</button>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ currentUser, setCurrentUser, onBack }) {
  const [newUsername, setNewUsername] = useState(currentUser.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = (e) => {
    e.preventDefault();
    const userTrim = newUsername.trim();
    if (userTrim.length < 3 || userTrim.includes(' ')) return setMessage({ type: 'error', text: 'Usuario: min. 3 letras y sin espacios.' });
    if (newPassword !== '' || confirmPassword !== '') {
      if (newPassword.length < 6) return setMessage({ type: 'error', text: 'Nueva contraseña: min. 6 caracteres.' });
      if (newPassword !== confirmPassword) return setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
    }
    setCurrentUser({...currentUser, username: userTrim, password: newPassword !== '' ? newPassword : currentUser.password });
    setMessage({ type: 'success', text: '¡Perfil actualizado!' });
    setTimeout(() => onBack(), 1500);
  };

  return (
    <div className="p-6 flex flex-col min-h-full">
      <div className="mb-8 animate-slide-up">
        <button onClick={onBack} className="text-sm font-bold flex items-center gap-1 mb-4 text-gray-500"><ChevronRight size={18} className="transform rotate-180" /> Volver</button>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>Configuración</h2>
      </div>
      <div className="bg-white p-6 rounded-[30px] shadow-lg animate-slide-up stagger-1">
        {message.text && <div className={`mb-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{message.text}</div>}
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Nombre de Usuario</label>
            <div className="relative group"><div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><User size={18} /></div><input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8]" /></div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Nueva Contraseña</label>
            <div className="relative group mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
              <input type={showNewPassword ? "text" : "password"} placeholder="Dejar en blanco para mantener actual" onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8]" />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar nueva contraseña" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8]" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold flex justify-center items-center gap-2 mt-4 shadow-md active:scale-95" style={{ backgroundColor: COLORS.green }}><Save size={18} /> Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}

export default function LaniApp() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [locationGranted, setLocationGranted] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [selectedDept, setSelectedDept] = useState(null);
  
  const [acceptedMissions, setAcceptedMissions] = useState([]);
  const [arrivedMissions, setArrivedMissions] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', tiktok: '' });
  const [pointsModal, setPointsModal] = useState(null); 

  const totalPuntos = completedMissions.reduce((total, misionId) => {
    const mision = MISSIONS.find(m => m.id === misionId);
    return total + (mision ? mision.puntosDeMision : 0);
  }, 0);
  const nivelActual = Math.floor(totalPuntos / 200) + 1;

  const acceptMission = (id) => { if (!acceptedMissions.includes(id)) setAcceptedMissions([...acceptedMissions, id]); };
  const arriveMission = (id) => { if (!arrivedMissions.includes(id)) setArrivedMissions([...arrivedMissions, id]); };
  const completeMissionFlow = (mission) => {
    if (!completedMissions.includes(mission.id)) {
      setCompletedMissions([...completedMissions, mission.id]);
      setPointsModal(mission);
    }
  };

  const getDeptProgress = (lugarId) => {
    const lugarMissions = MISSIONS.filter(m => m.lugarId === lugarId).map(m => m.id);
    const completedInDept = lugarMissions.filter(mId => completedMissions.includes(mId)).length;
    return { completed: completedInDept, total: lugarMissions.length, unlocked: completedInDept === lugarMissions.length && lugarMissions.length > 0 };
  };

  if (!currentUser) return <LoginView onLogin={setCurrentUser} />;
  if (!locationGranted) return <LocationPermissionView onAllow={() => setLocationGranted(true)} />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans py-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Krub:ital,wght@0,400;0,600;0,700;1,600&display=swap');
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.1s; } .stagger-2 { animation-delay: 0.2s; } .stagger-3 { animation-delay: 0.3s; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(40, 120, 184, 0.3); border-radius: 10px; }
      `}</style>

      <div className="w-full max-w-[400px] h-[800px] relative overflow-hidden flex flex-col shadow-2xl sm:rounded-[40px] sm:border-8 border-gray-800 shrink-0" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
        
        <header className="pt-12 pb-4 px-6 flex justify-between items-center rounded-b-3xl shadow-md z-20 relative" style={{ backgroundColor: COLORS.green }}>
          <div className="flex items-center gap-2 cursor-pointer active:scale-95" onClick={() => setActiveTab('map')}>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold shadow-sm" style={{ color: COLORS.blue }}><Compass size={18} /></div>
            <h1 className="text-white font-bold text-xl tracking-wider uppercase italic" style={{ fontFamily: 'Krub, sans-serif' }}>Lani</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white text-xs bg-black/20 px-3 py-1.5 rounded-full flex items-center gap-1 font-medium"><User size={12} /> {currentUser.username}</span>
            <button onClick={() => { setCurrentUser(null); setLocationGranted(false); setActiveTab('map'); }} className="text-white hover:text-red-200"><LogOut size={20} /></button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32 scroll-smooth custom-scrollbar relative z-10">
          {activeTab === 'map' && <MapView onSelectDept={(id) => { setSelectedDept(id); setActiveTab('missions'); }} />}
          {activeTab === 'missions' && <MissionsView selectedDept={selectedDept} setSelectedDept={setSelectedDept} acceptedMissions={acceptedMissions} arrivedMissions={arrivedMissions} completedMissions={completedMissions} acceptMission={acceptMission} arriveMission={arriveMission} completeMissionFlow={completeMissionFlow} />}
          {activeTab === 'news' && <NewsView />}
          {activeTab === 'profile' && <ProfileView currentUser={currentUser} getDeptProgress={getDeptProgress} socialLinks={socialLinks} setSocialLinks={setSocialLinks} puntos={totalPuntos} nivel={nivelActual} onOpenSettings={() => setActiveTab('settings')} />}
          {activeTab === 'settings' && <SettingsView currentUser={currentUser} setCurrentUser={setCurrentUser} onBack={() => setActiveTab('profile')} />}
        </main>

        {pointsModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-slide-up">
            <div className="bg-white w-full max-w-sm rounded-[30px] p-8 flex flex-col items-center text-center shadow-2xl border-t-[8px]" style={{ borderColor: COLORS.yellow }}>
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 border-4" style={{ borderColor: COLORS.yellow }}><Trophy size={40} style={{ color: COLORS.yellow }} /></div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.text, fontFamily: 'Krub, sans-serif' }}>¡Misión Completada!</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">Has completado "{pointsModal.titulo}" y ganaste <b style={{ color: COLORS.brown }}>+{pointsModal.puntosDeMision} puntos</b>.</p>
              <div className="w-full space-y-3">
                <button onClick={() => { setPointsModal(null); setActiveTab('profile'); }} className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg active:scale-95" style={{ backgroundColor: COLORS.blue }}>Ver mis Insignias</button>
                <button onClick={() => setPointsModal(null)} className="w-full py-3.5 rounded-xl font-bold bg-gray-100 text-gray-600 active:scale-95">Seguir Explorando</button>
              </div>
            </div>
          </div>
        )}

        <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex justify-between items-center z-30 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] rounded-t-3xl pb-6">
          <NavItem icon={<Map />} label="Rutas" isActive={activeTab === 'map'} onClick={() => setActiveTab('map')} />
          <NavItem icon={<Compass />} label="Misiones" isActive={activeTab === 'missions'} onClick={() => setActiveTab('missions')} />
          <NavItem icon={<CalendarDays />} label="Noticias" isActive={activeTab === 'news'} onClick={() => setActiveTab('news')} />
          <NavItem icon={<User />} label="Perfil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ease-out ${isActive ? '-translate-y-3' : 'hover:-translate-y-1'}`}>
      <div className={`p-3 rounded-2xl mb-1.5 transition-all duration-300 ${isActive ? 'shadow-lg scale-110' : 'bg-transparent'}`} style={{ backgroundColor: isActive ? COLORS.green : 'transparent', color: isActive ? 'white' : '#9CA3AF' }}>
        {React.cloneElement(icon, { size: isActive ? 22 : 24, strokeWidth: isActive ? 2.5 : 2 })}
      </div>
      <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 absolute'}`} style={{ color: COLORS.green }}>{label}</span>
    </button>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LaniApp />
  </React.StrictMode>
);