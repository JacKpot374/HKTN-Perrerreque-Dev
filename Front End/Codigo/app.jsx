import React, { useState } from 'react';
import { Map, Compass, CalendarDays, User, Trophy, LogOut } from 'lucide-react';
import { COLORS, MISSIONS, LUGARES } from '../Services/api';

// Importando tus componentes separados
import LoginView from '../Components/iniciosesion';
import LocationPermissionView from '../Components/Localizacion';
import MapView from '../Components/mapa';
import MissionsView from '../Components/misiones';
import NewsView from '../Components/noticia';
import ProfileView from '../Components/perfil';
import SettingsView from '../Components/configuracion';

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