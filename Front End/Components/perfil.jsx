import React from 'react';
import { User, Trophy, CheckCircle2, Settings, Share2, Facebook, Instagram, Video } from 'lucide-react';
import { COLORS, LUGARES } from '../Services/api';

export default function ProfileView({ currentUser, getDeptProgress, socialLinks, setSocialLinks, puntos, nivel, onOpenSettings }) {
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