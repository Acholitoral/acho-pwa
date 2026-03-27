'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MaritimeBackground from '@/components/maritime-backgrounds';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('phone'); // 'phone' ou 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('user'); // 'user' ou 'advertiser'

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/send-otp`, { phone });
      
      if (response.data.success) {
        setStep('otp');
        // Em desenvolvimento, mostrar OTP
        if (response.data.otp) {
          alert(`🐙 OTP de teste: ${response.data.otp}`);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao enviar OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        phone,
        otp,
        userType
      });

      if (response.data.success) {
        // Salvar token no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirecionar para home
        router.push('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao verificar OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/demo`, {
        phone: phone || '11999999999',
        userType
      });

      if (response.data.success) {
        // Salvar token no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('demoMode', 'true');

        // Redirecionar para home
        router.push('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao entrar em modo demo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <MaritimeBackground variant="onboarding" />
      <div className="absolute inset-0" />
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐙</div>
          <h1 className="text-3xl font-bold text-gray-900">Achô</h1>
          <p className="text-gray-600 mt-2">Encontre tudo que você precisa</p>
        </div>

        {/* Card - com backdrop blur para melhor legibilidade */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Você é:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="user"
                      checked={userType === 'user'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-gray-700">Usuário</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="advertiser"
                      checked={userType === 'advertiser'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-gray-700">Anunciante</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 hover:from-cyan-600 hover:to-orange-600"
              >
                {loading ? 'Enviando...' : 'Enviar Código'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Enviaremos um código de 6 dígitos via SMS
              </p>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoMode}
                disabled={loading}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                🐙 Modo Demo (Teste Rápido)
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Verificação
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength="6"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 hover:from-cyan-600 hover:to-orange-600"
              >
                {loading ? 'Verificando...' : 'Entrar'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                }}
                className="w-full text-cyan-600 font-semibold py-2 hover:text-cyan-700"
              >
                Voltar
              </button>

              <p className="text-xs text-gray-500 text-center">
                Enviamos um código para {phone}
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          Ao continuar, você concorda com nossos Termos de Serviço
        </p>
      </div>
    </div>
  );
}
