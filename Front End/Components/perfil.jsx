import React, { useState } from 'react';
import { User, Trophy, CheckCircle2, Settings, Share2, Globe, Camera, Play, Check } from 'lucide-react';

// -------------------------------------------------------------------------
// ⚠️ NOTA PARA TU PROYECTO LOCAL: 
// Descomenta estas dos líneas y borra los "MOCKS" de abajo en tu VSCode
// import { COLORS, LUGARES } from '../Services/api';
// import { DICCIONARIO } from '../Services/diccionario';
// -------------------------------------------------------------------------

const COLORS = { green: '#668F55', blue: '#2878B8', brown: '#B8785B', yellow: '#E8B84A', bg: '#FAF9F5', text: '#50545A' };
const LUGARES = [{ id: 1, nombre: 'Managua', icon: '🌋' }, { id: 2, nombre: 'Granada', icon: '⛪' }, { id: 3, nombre: 'León', icon: '🦁' }];

const DICCIONARIO = {
  es: {
    nivel: 'Nv.',
    usuario: 'Usuario',
    puntosAcumulados: 'Puntos Acumulados',
    panelPines: 'Panel de Pines',
    descPines: 'Completa las 4 misiones de un departamento para desbloquear su insignia dorada.',
    pinDe: 'Pin de',
    desbloqueado: '¡DESBLOQUEADO!',
    progreso: 'Progreso',
    misiones: 'misiones',
    tusRedes: 'Tus Redes Sociales',
    redesGuardadas: '¡Redes sociales guardadas con éxito!',
    fbPlaceholder: 'Usuario de Facebook',
    igPlaceholder: '@usuario_instagram',
    tkPlaceholder: '@usuario_tiktok',
    guardarRedes: 'Guardar Redes'
  },
  en: {
    nivel: 'Lvl.',
    usuario: 'Username',
    puntosAcumulados: 'Accumulated Points',
    panelPines: 'Pins Panel',
    descPines: 'Complete the 4 missions of a department to unlock its golden badge.',
    pinDe: 'Pin for',
    desbloqueado: 'UNLOCKED!',
    progreso: 'Progress',
    misiones: 'missions',
    tusRedes: 'Your Social Networks',
    redesGuardadas: 'Social networks successfully saved!',
    fbPlaceholder: 'Facebook Username',
    igPlaceholder: '@instagram_user',
    tkPlaceholder: '@tiktok_user',
    guardarRedes: 'Save Networks'
  },
  pt: {
    nivel: 'Nv.',
    usuario: 'Usuário',
    puntosAcumulados: 'Pontos Acumulados',
    panelPines: 'Painel de Pins',
    descPines: 'Complete as 4 missões de um departamento para desbloquear seu distintivo dourado.',
    pinDe: 'Pin de',
    desbloqueado: 'DESBLOQUEADO!',
    progreso: 'Progresso',
    misiones: 'missões',
    tusRedes: 'Suas Redes Sociais',
    redesGuardadas: 'Redes sociais salvas com sucesso!',
    fbPlaceholder: 'Usuário do Facebook',
    igPlaceholder: '@usuario_instagram',
    tkPlaceholder: '@usuario_tiktok',
    guardarRedes: 'Salvar Redes'
  }
};

export default function ProfileView({ 
  currentUser, 
  getDeptProgress = () => ({ completed: 2, total: 4, unlocked: false }), 
  socialLinks = { facebook: '', instagram: '', tiktok: '' }, 
  setSocialLinks, 
  puntos = 150, 
  nivel = 1, 
  onOpenSettings, 
  idioma = 'es' 
}) {
  const [saved, setSaved] = useState(false);
  
  // Magia de Traducción: Inicializamos el diccionario según el idioma seleccionado
  const t = (DICCIONARIO && DICCIONARIO[idioma]) ? DICCIONARIO[idioma] : ((DICCIONARIO && DICCIONARIO['es']) || {});
  const es = (DICCIONARIO && DICCIONARIO['es']) || {}; 

  const handleSaveSocial = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 flex flex-col pb-12 w-full max-w-md mx-auto" style={{ backgroundColor: COLORS.bg, minHeight: '100vh' }}>
      
      {/* Botón de configuración */}
      <div className="flex justify-end animate-slide-up">
        <button onClick={onOpenSettings} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-800 active:scale-95 transition-transform">
          <Settings size={22} />
        </button>
      </div>

      <div className="flex flex-col items-center mb-8 animate-slide-up stagger-1 -mt-4">
        <div className="w-28 h-28 rounded-full bg-white border-[6px] mb-3 flex items-center justify-center shadow-xl relative" style={{ borderColor: COLORS.yellow }}>
          <User size={48} className="text-gray-300" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border-4" style={{ borderColor: COLORS.green }}>
            <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-black text-sm" style={{ backgroundColor: COLORS.green }}>
              {t.nivel || es.nivel}{nivel}
            </div>
          </div>
        </div>
        
        {/* Nombre de usuario o texto traducido por defecto */}
        <h2 className="text-2xl font-bold mt-3 text-gray-800 capitalize">
          {currentUser?.username || (t.usuario || es.usuario)}
        </h2>
        
        <div className="bg-orange-50 px-4 py-1.5 rounded-full mt-2 border border-orange-100">
          <p className="text-sm flex items-center gap-2 font-bold" style={{ color: COLORS.brown }}>
            <Trophy size={16} style={{ color: COLORS.yellow }}/> {puntos} {t.puntosAcumulados || es.puntosAcumulados}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[30px] shadow-lg mb-8 border-t-[8px] animate-slide-up stagger-2" style={{ borderColor: COLORS.yellow }}>
        <h3 className="font-bold mb-2 flex items-center gap-2 text-xl" style={{ color: COLORS.brown, fontFamily: 'Krub, sans-serif' }}>
          <Trophy size={22} /> {t.panelPines || es.panelPines}
        </h3>
        <p className="text-xs opacity-70 mb-6">{t.descPines || es.descPines}</p>
        
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
                  <h4 className={`font-bold text-base ${progress.unlocked ? '' : 'opacity-60'}`} style={{ color: progress.unlocked ? COLORS.brown : COLORS.text }}>
                    {t.pinDe || es.pinDe} {dept.nombre}
                  </h4>
                  {progress.unlocked ? (
                    <div className="text-[11px] font-black mt-2 inline-flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full" style={{ color: COLORS.green }}>
                      <CheckCircle2 size={12} /> {t.desbloqueado || es.desbloqueado}
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs font-bold opacity-60 mb-1.5">
                        <span>{t.progreso || es.progreso}</span><span>{progress.completed} / {progress.total} {t.misiones || es.misiones}</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full rounded-full relative" style={{ width: `${percentage}%`, backgroundColor: COLORS.yellow }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-[30px] shadow-lg animate-slide-up stagger-3">
        <h3 className="font-bold mb-3 flex items-center gap-2 text-xl" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>
          <Share2 size={22} /> {t.tusRedes || es.tusRedes}
        </h3>
        
        {saved && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-xs rounded-xl font-bold flex items-center justify-center gap-2 animate-slide-up">
            <Check size={16} /> {t.redesGuardadas || es.redesGuardadas}
          </div>
        )}

        <form onSubmit={handleSaveSocial} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-600">
              <Globe size={18} />
            </div>
            <input 
              type="text" 
              placeholder={t.fbPlaceholder || es.fbPlaceholder} 
              value={socialLinks.facebook} 
              onChange={(e) => setSocialLinks?.({...socialLinks, facebook: e.target.value})} 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8]" 
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-pink-600">
              <Camera size={18} />
            </div>
            <input 
              type="text" 
              placeholder={t.igPlaceholder || es.igPlaceholder} 
              value={socialLinks.instagram} 
              onChange={(e) => setSocialLinks?.({...socialLinks, instagram: e.target.value})} 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8]" 
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-black">
              <Play size={18} />
            </div>
            <input 
              type="text" 
              placeholder={t.tkPlaceholder || es.tkPlaceholder} 
              value={socialLinks.tiktok} 
              onChange={(e) => setSocialLinks?.({...socialLinks, tiktok: e.target.value})} 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8]" 
            />
          </div>
          
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md active:scale-95 mt-4 transition-transform" style={{ backgroundColor: COLORS.blue }}>
            {t.guardarRedes || es.guardarRedes}
          </button>
        </form>
      </div>
    </div>
  );
}