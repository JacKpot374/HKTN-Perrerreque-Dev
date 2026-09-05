import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, Search, Play } from 'lucide-react';
import { COLORS } from '../Services/api';
import { DICCIONARIO } from '../Services/diccionario';

export default function LoginView({ onLogin, idioma }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Obtenemos las palabras según el idioma seleccionado (Soporta es, en, pt, mi, may)
  const t = (DICCIONARIO && DICCIONARIO[idioma]) ? DICCIONARIO[idioma] : ((DICCIONARIO && DICCIONARIO['es']) || {});
  const es = (DICCIONARIO && DICCIONARIO['es']) || {};

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
    onLogin({ username: userTrim, password, role: 'user' });
  };

  const handleQuickLogin = (roleName) => {
    const roleMap = {
      'user': { username: 'Explorador_Nica', role: 'user' },
      'auditor': { username: 'Auditor_Minsa', role: 'auditor' },
      'admin': { username: 'Admin_Master', role: 'admin' }
    };
    const selected = roleMap[roleName];
    onLogin({ username: selected.username, password: 'demo_password', role: selected.role });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full animate-slide-up" style={{ backgroundColor: COLORS.bg }}>
      <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl border-t-[10px]" style={{ borderColor: COLORS.blue }}>
        
        {/* Encabezado */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-2" style={{ backgroundColor: COLORS.blue }}>L</div>
          <span className="font-bold text-2xl tracking-wider uppercase" style={{ color: COLORS.blue, fontFamily: 'Krub, sans-serif' }}>Lani</span>
        </div>
        
        {/* Subtítulo traducido */}
        <p className="text-center text-sm mb-6 text-gray-500 font-medium">
          {t.iniciarSesion || es.iniciarSesion || 'Iniciar Sesión'}
        </p>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-bold text-center">{error}</div>}
        
        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2878B8] transition-colors">
              <User size={18} />
            </div>
            <input 
              type="text" 
              placeholder={t.usuario || es.usuario || "Nombre de Usuario"} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8] focus:bg-white transition-all shadow-sm focus:shadow-md" 
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2878B8] transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="******" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#2878B8] focus:bg-white transition-all shadow-sm focus:shadow-md" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold shadow-md active:scale-95 transition-transform" style={{ backgroundColor: COLORS.blue }}>
            {t.entrar || es.entrar || 'Comenzar Aventura'}
          </button>
        </form>

        {/* Botones Rápidos para el Jurado */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-widest">
            {t.roles || es.roles || 'Botones de Evaluación (Roles)'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleQuickLogin('user')} type="button" className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors shadow-sm active:scale-95">
              <Play size={16} className="mb-1" style={{ color: COLORS.green }} />
              <span className="text-[10px] font-bold">{t.rolUsuario || es.rolUsuario || 'Usuario'}</span>
            </button>
            <button onClick={() => handleQuickLogin('auditor')} type="button" className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors shadow-sm active:scale-95">
              <Search size={16} className="mb-1" style={{ color: COLORS.yellow }} />
              <span className="text-[10px] font-bold">{t.rolAuditor || es.rolAuditor || 'Auditor'}</span>
            </button>
            <button onClick={() => handleQuickLogin('admin')} type="button" className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors shadow-sm active:scale-95">
              <ShieldCheck size={16} className="mb-1" style={{ color: COLORS.blue }} />
              <span className="text-[10px] font-bold">{t.rolAdmin || es.rolAdmin || 'Admin'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}