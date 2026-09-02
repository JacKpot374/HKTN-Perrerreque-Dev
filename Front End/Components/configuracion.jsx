import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Save, ChevronRight } from 'lucide-react';
import { COLORS } from '../Services/api';

export default function SettingsView({ currentUser, setCurrentUser, onBack }) {
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