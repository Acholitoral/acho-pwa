'use client';

import { useState, useEffect } from 'react';
import MaritimeBackground from '@/components/maritime-backgrounds';
import BottomNav from '@/components/bottom-nav';
import AdvertiserCard from '@/components/advertiser-card';
import { advertisers } from '@/lib/mock-data';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Mock: mostrar alguns anunciantes como favoritos
    setFavorites(advertisers.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen relative bg-white pb-24">
      <MaritimeBackground variant="list" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white p-6 pt-8">
          <h1 className="text-2xl font-bold">❤️ Favoritos</h1>
          <p className="text-cyan-100 text-sm">
            {favorites.length} negócios salvos
          </p>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {favorites.length > 0 ? (
            <div className="space-y-3">
              {favorites.map((advertiser) => (
                <AdvertiserCard key={advertiser.id} advertiser={advertiser} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center mt-8">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-semibold text-gray-900">Nenhum favorito ainda</h3>
              <p className="text-gray-600 text-sm mt-2">
                Explore negócios e adicione seus favoritos aqui
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
