'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MaritimeBackground from '@/components/maritime-backgrounds';
import BottomNav from '@/components/bottom-nav';
import AdvertiserCard from '@/components/advertiser-card';
import { categories, advertisers, getAdvertisersByCategory } from '@/lib/mock-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const sortBy = searchParams.get('sort') || 'rating';

  const [filteredAdvertisers, setFilteredAdvertisers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId ? parseInt(categoryId) : null);
  const [sortOrder, setSortOrder] = useState(sortBy);

  useEffect(() => {
    let results = advertisers;

    // Filtrar por categoria
    if (selectedCategory) {
      results = getAdvertisersByCategory(selectedCategory);
    }

    // Ordenar
    if (sortOrder === 'distance') {
      results = results.sort((a, b) => a.distance - b.distance);
    } else if (sortOrder === 'rating') {
      results = results.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === 'name') {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredAdvertisers(results);
  }, [selectedCategory, sortOrder]);

  const currentCategory = selectedCategory ? categories.find(c => c.id === selectedCategory) : null;

  return (
    <div className="min-h-screen relative bg-white pb-24">
      <MaritimeBackground variant="list" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white p-6 pt-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">
              {currentCategory ? `${currentCategory.emoji} ${currentCategory.name}` : '🔍 Buscar'}
            </h1>
            <p className="text-cyan-100 text-sm">
              {filteredAdvertisers.length} negócios encontrados
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar por nome..."
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {/* Filtros */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="space-y-3">
              {/* Categoria */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Categoria</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`py-2 px-3 rounded text-sm font-semibold transition ${
                      !selectedCategory
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas
                  </button>
                  {categories.slice(0, 5).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`py-2 px-3 rounded text-sm font-semibold transition ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordenação */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Ordenar por</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="rating">⭐ Melhor Avaliação</option>
                  <option value="distance">📍 Mais Perto</option>
                  <option value="name">A-Z Nome</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {filteredAdvertisers.length > 0 ? (
            <div className="space-y-3">
              {filteredAdvertisers.map((advertiser) => (
                <AdvertiserCard key={advertiser.id} advertiser={advertiser} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900">Nenhum negócio encontrado</h3>
              <p className="text-gray-600 text-sm mt-2">Tente ajustar seus filtros</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchContent />
    </Suspense>
  );
}
