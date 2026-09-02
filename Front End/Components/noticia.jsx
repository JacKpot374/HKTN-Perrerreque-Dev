import React from 'react';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { COLORS, NEWS } from '../Services/api';

export default function NoticiasView() {
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