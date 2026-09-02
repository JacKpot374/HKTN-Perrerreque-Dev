import React, { useState } from 'react';
import { CheckCircle2, MapPin } from 'lucide-react';
import { COLORS, LUGARES, MISSIONS } from '../Services/api';

export default function MissionsView({ selectedDept, setSelectedDept, acceptedMissions, arrivedMissions, completedMissions, acceptMission, arriveMission, completeMissionFlow }) {
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