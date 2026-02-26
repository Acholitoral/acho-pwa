'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MaritimeBackground from '@/components/maritime-backgrounds';
import BottomNav from '@/components/bottom-nav';
import AdvertiserCard from '@/components/advertiser-card';
import { categories, getNearbyAdvertisers, getMostSearched, getPromotedAdvertisers } from '@/lib/mock-data';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar se usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  const nearbyAdvertisers = getNearbyAdvertisers();
  const mostSearched = getMostSearched();
  const promoted = getPromotedAdvertisers();

  return (
    <div className="min-h-screen relative bg-white pb-24">
      <MaritimeBackground variant="home" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white p-6 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">🐙 Achô</h1>
              <p className="text-cyan-100 text-sm">Encontre tudo que você precisa</p>
            </div>
            <div className="text-3xl">🌊</div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar negócios..."
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Categorias */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Categorias</h2>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/search?category=${cat.id}`}>
                  <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition cursor-pointer border border-gray-100">
                    <div className="text-3xl mb-2">{cat.emoji}</div>
                    <p className="text-xs font-semibold text-gray-900">{cat.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Promoções em Destaque */}
          {promoted.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">🎁 Promoções em Destaque</h2>
              <div className="space-y-3">
                {promoted.map((advertiser) => (
                  <div key={advertiser.id} className="bg-white rounded-lg p-3 border-l-4 border-red-500 shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{advertiser.name}</h3>
                        <p className="text-sm text-red-600 font-semibold mt-1">🎁 {advertiser.promotion}</p>
                      </div>
                      <div className="text-2xl">{advertiser.image}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Perto de Você */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">📍 Perto de Você</h2>
              <Link href="/search?sort=distance" className="text-cyan-600 text-sm font-semibold hover:text-cyan-700">
                Ver tudo →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {nearbyAdvertisers.slice(0, 4).map((advertiser) => (
                <AdvertiserCard key={advertiser.id} advertiser={advertiser} compact />
              ))}
            </div>
          </section>

          {/* Mais Procurados */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">⭐ Mais Procurados</h2>
              <Link href="/search?sort=rating" className="text-cyan-600 text-sm font-semibold hover:text-cyan-700">
                Ver tudo →
              </Link>
            </div>
            <div className="space-y-3">
              {mostSearched.slice(0, 3).map((advertiser) => (
                <AdvertiserCard key={advertiser.id} advertiser={advertiser} />
              ))}
            </div>
          </section>

          {/* Dica do Polvô */}
          <section className="bg-gradient-to-r from-cyan-100 to-orange-100 rounded-lg p-4 border border-cyan-200">
            <div className="flex gap-3">
              <div className="text-3xl">🐙</div>
              <div>
                <h3 className="font-bold text-gray-900">Dica do Polvô</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Explore as categorias e descubra negócios incríveis perto de você. Não esqueça de deixar uma avaliação! ⭐
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
