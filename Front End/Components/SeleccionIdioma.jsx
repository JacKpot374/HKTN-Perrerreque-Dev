import React from 'react';
import { Globe } from 'lucide-react';
import { COLORS } from '../Services/api';
// Importamos solo la lista de idiomas
import { IDIOMAS_DISPONIBLES } from '../Services/diccionario';

export default function SeleccionIdioma({ onSelectLanguage }) {
  return (
    // ESTE DIV ES VITAL: "overflow-y-auto" permite que la lista baje y suba.
    <div className="flex flex-col h-full bg-gray-50 p-6 items-center animate-slide-up overflow-y-auto custom-scrollbar">
      
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-md shrink-0 mt-8">
        <Globe size={48} style={{ color: COLORS.blue }} />
      </div>
      
      <h1 className="text-3xl font-black mb-2 text-center" style={{ color: COLORS.brown, fontFamily: 'Krub, sans-serif' }}>
        Lani
      </h1>
      <p className="text-gray-500 mb-8 text-center text-sm font-medium">
        Selecciona tu idioma / Select your language
      </p>

      <div className="w-full flex flex-col gap-3 pb-8">
        {IDIOMAS_DISPONIBLES.map((idioma) => (
          <button 
            key={idioma.id}
            // AQUÍ OCURRE LA MAGIA: Al hacer clic, enviamos 'en', 'es', 'zh', etc.
            onClick={() => onSelectLanguage(idioma.id)}
            className="w-full py-4 px-6 rounded-2xl bg-white text-gray-800 font-bold text-base shadow-sm border border-gray-200 active:scale-95 flex items-center gap-4 hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">{idioma.icono}</span> 
            {idioma.nombre}
          </button>
        ))}
      </div>
      
    </div>
  );
}