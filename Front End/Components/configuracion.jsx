import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Save, ChevronRight, Globe, LogOut } from 'lucide-react';
import { COLORS } from '../Services/api';
import { IDIOMAS_DISPONIBLES, DICCIONARIO } from '../Services/diccionario';

export default function Configuracion({ currentUser, setCurrentUser, onBack, idioma, setIdioma, onLogout }) {
  const [newUsername, setNewUsername] = useState(currentUser?.username || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [tempIdioma, setTempIdioma] = useState(idioma);

  // Diccionario conectado
  const t = DICCIONARIO[tempIdioma] || DICCIONARIO['es'];
  // Escudo de seguridad: si no existe la palabra en inglés, usa la de español
  const es = DICCIONARIO['es'];

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
    <div className="p-6 flex flex-col min-h-full overflow-y-auto pb-10 bg-gray-50 absolute inset-0 z-50 animate-slide-in-right">
      
      {/* Cabecera */}
      <div className="mb-6 mt-4">
        <button onClick={onBack} className="text-sm font-bold flex items-center gap-1 mb-4 text-gray-500 active:scale-95 transition-transform">
          <ChevronRight size={18} className="transform rotate-180" /> {t.volver || es.volver}
        </button>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>
          {t.titulo || es.titulo}
        </h2>
      </div>

      {/* SECCIÓN 1: MI CUENTA */}
      <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold mb-5 flex items-center gap-2 text-lg text-gray-800 border-b border-gray-100 pb-3">
          <User size={20} style={{ color: COLORS.brown }}/> {t.datosCuenta || es.datosCuenta}
        </h3>

        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
              {t.nombreUsuario || es.nombreUsuario}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><User size={18} /></div>
              <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8] focus:bg-white transition-colors" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
              {t.nuevaContrasena || es.nuevaContrasena}
            </label>
            <div className="relative group mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
              <input type={showNewPassword ? "text" : "password"} placeholder={t.phContrasena || es.phContrasena} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8] focus:bg-white transition-colors" />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
              <input type={showConfirmPassword ? "text" : "password"} placeholder={t.phConfirmar || es.phConfirmar} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8] focus:bg-white transition-colors" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold flex justify-center items-center gap-2 mt-4 shadow-md active:scale-95 transition-transform" style={{ backgroundColor: COLORS.green }}>
            <Save size={18} /> {t.guardarCambios || es.guardarCambios}
          </button>
        </form>
      </div>

      {/* SECCIÓN 2: IDIOMAS */}
      <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-800 border-b border-gray-100 pb-3">
          <Globe size={20} style={{ color: COLORS.blue }}/> {t.idioma || es.idioma}
        </h3>
        
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
          {IDIOMAS_DISPONIBLES.map((opcion) => (
            <button 
              key={opcion.id}
              onClick={() => setTempIdioma(opcion.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${tempIdioma === opcion.id ? 'bg-blue-50/50 border-blue-200 font-bold' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
              style={{ color: tempIdioma === opcion.id ? COLORS.blue : '' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{opcion.icono}</span> {opcion.nombre}
              </div>
              {tempIdioma === opcion.id && <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS.blue }}></div>}
            </button>
          ))}
        </div>

        <button 
          onClick={() => {
            setIdioma(tempIdioma);
            setMessage({ type: 'success', text: '¡Idioma actualizado!' });
          }}
          className="w-full py-4 rounded-2xl text-white font-bold flex justify-center items-center gap-2 mt-4 shadow-md active:scale-95 transition-transform" 
          style={{ backgroundColor: COLORS.blue }}
        >
          <Save size={18} /> {t.guardarIdioma || es.guardarIdioma}
        </button>
      </div>

      {/* SECCIÓN 3: CERRAR SESIÓN */}
      <button 
        onClick={onLogout}
        className="w-full py-4 rounded-2xl text-red-500 font-bold text-base bg-white active:scale-95 flex items-center justify-center gap-2 shadow-sm border border-red-100 hover:bg-red-50 transition-colors mt-auto"
      >
        <LogOut size={20} />
        {t.cerrarSesion || es.cerrarSesion}
      </button>

    </div>
  );
}