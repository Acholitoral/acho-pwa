'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MaritimeBackground from '@/components/maritime-backgrounds';
import BottomNav from '@/components/bottom-nav';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen relative bg-white pb-24">
      <MaritimeBackground variant="list" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white p-6 pt-8">
          <h1 className="text-2xl font-bold">👤 Meu Perfil</h1>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {user && (
            <>
              {/* Profile Card */}
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-orange-400 rounded-full flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{user.name || 'Usuário'}</h2>
                    <p className="text-gray-600 text-sm">{user.phone}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {user.type === 'advertiser' ? 'Anunciante' : 'Usuário Regular'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <button className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">⚙️ Configurações</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">📞 Suporte</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">ℹ️ Sobre</span>
                  <span className="text-gray-400">›</span>
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
