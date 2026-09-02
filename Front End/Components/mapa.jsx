import React, { useState } from 'react';
import { MapPin, AlertTriangle, Clock, CheckCircle2, Compass, Leaf } from 'lucide-react';
import { COLORS, LUGARES } from '../Services/api';

export default function MapView({ onSelectDept }) {
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