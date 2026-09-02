import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { COLORS } from '../Services/api';
import logoLani from '../Assets/Imagotipo_Lani 2_5.png';

export default function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const userTrim = username.trim();
    if (userTrim.length < 3 || userTrim.includes(' ')) {
      return setError('El usuario debe tener al menos 3 letras y sin espacios.');
    }
    if (password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }
    setError('');
    onLogin({ username: userTrim, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full" style={{ backgroundColor: COLORS.bg }}>
      <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl border-t-[10px]" style={{ borderColor: COLORS.blue }}>
        <div className="flex flex-col items-center justify-center mb-6">
          <img src={logoLani} alt="Logotipo Oficial Lani" className="w-48 h-auto object-contain drop-shadow-md" />
        </div>
        <p className="text-center text-sm mb-6 text-gray-500 font-medium">Descubre la esencia de Nicaragua.</p>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-bold text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><User size={18} /></div>
            <input type="text" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none" />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Lock size={18} /></div>
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña (min. 6 char)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold shadow-md active:scale-95" style={{ backgroundColor: COLORS.blue }}>Comenzar Aventura</button>
        </form>
      </div>
    </div>
  );
}