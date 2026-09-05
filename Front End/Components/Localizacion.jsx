import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { COLORS } from '../Services/api';
// 1. Importamos el diccionario
import { DICCIONARIO } from '../Services/diccionario';

// 2. Agregamos "idioma" a las props
export default function LocationPermissionView({ onAllow, idioma }) {
  
  // 3. Obtenemos las traducciones según el idioma seleccionado
  const t = (DICCIONARIO && DICCIONARIO[idioma]) ? DICCIONARIO[idioma] : ((DICCIONARIO && DICCIONARIO['es']) || {});
  const es = (DICCIONARIO && DICCIONARIO['es']) || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full" style={{ backgroundColor: COLORS.bg }}>
      <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl border-t-[8px] flex flex-col items-center text-center" style={{ borderColor: COLORS.green }}>
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4" style={{ borderColor: COLORS.green }}>
          <Navigation size={40} style={{ color: COLORS.green }} />
        </div>
        
        {/* 4. Aplicamos el diccionario al título */}
        <h2 className="text-2xl font-bold mb-3" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>
          {t.tituloUbicacion || es.tituloUbicacion || 'Permitir ubicación'}
        </h2>
        
        {/* 5. Aplicamos el diccionario a la descripción */}
        <p className="text-sm mb-8 opacity-80 leading-relaxed">
          {t.descUbicacion || es.descUbicacion || 'Lani necesita acceder a tu ubicación para mostrarte los destinos, misiones y negocios tradicionales más cercanos a ti.'}
        </p>
        
        {/* 6. Aplicamos el diccionario al botón */}
        <button onClick={onAllow} className="w-full py-4 rounded-2xl text-white font-bold active:scale-95 flex justify-center items-center gap-2 shadow-md" style={{ backgroundColor: COLORS.green }}>
          <MapPin size={18} /> {t.btnPermitirUbicacion || es.btnPermitirUbicacion || 'Permitir Ubicación'}
        </button>
      </div>
    </div>
  );
}