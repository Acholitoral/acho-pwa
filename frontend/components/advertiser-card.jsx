'use client';

import Link from 'next/link';

export default function AdvertiserCard({ advertiser, compact = false }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('⭐');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  const getPlanBadge = (plan) => {
    const badges = {
      plus: { label: '⭐ PLUS', color: 'bg-yellow-100 text-yellow-800' },
      basic: { label: 'Basic', color: 'bg-blue-100 text-blue-800' },
      free: { label: 'Free', color: 'bg-gray-100 text-gray-800' }
    };
    return badges[plan] || badges.free;
  };

  const badge = getPlanBadge(advertiser.plan);

  if (compact) {
    return (
      <Link href={`/advertiser/${advertiser.id}`}>
        <div className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-cyan-100 to-orange-100 flex items-center justify-center text-4xl">
            {advertiser.image}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate">{advertiser.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-yellow-600">{renderStars(advertiser.rating)}</span>
              <span className="text-xs text-gray-500">({advertiser.reviewCount})</span>
            </div>
            {advertiser.hasPromotion && (
              <div className="mt-2 text-xs bg-red-50 text-red-700 p-1 rounded truncate">
                🎁 {advertiser.promotion}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/advertiser/${advertiser.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-cyan-100 to-orange-100 flex items-center justify-center text-6xl">
            {advertiser.image}
          </div>
          <div className={`absolute top-3 right-3 ${badge.color} px-2 py-1 rounded text-xs font-semibold`}>
            {badge.label}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg">{advertiser.name}</h3>
          <p className="text-gray-600 text-sm">{advertiser.description}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">{renderStars(advertiser.rating)}</span>
              <span className="text-sm text-gray-600">({advertiser.reviewCount} avaliações)</span>
            </div>
            <span className="text-sm text-gray-500">{advertiser.distance} km</span>
          </div>

          {advertiser.hasPromotion && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded p-2">
              <p className="text-sm text-red-700 font-semibold">🎁 {advertiser.promotion}</p>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-cyan-500 text-white py-2 rounded font-semibold hover:bg-cyan-600 transition text-sm">
              Ver Perfil
            </button>
            <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition text-sm">
              ❤️ Favoritar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
