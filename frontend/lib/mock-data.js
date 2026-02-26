// Mock Data para Validação Visual

export const categories = [
  { id: 1, name: 'Fome & Bebida', emoji: '🍽️', color: '#FF8C42' },
  { id: 2, name: 'Serviços', emoji: '🔧', color: '#00B4D8' },
  { id: 3, name: 'Compras', emoji: '🛒', color: '#FFD60A' },
  { id: 4, name: 'Auto & Transporte', emoji: '🚗', color: '#4CAF50' },
  { id: 5, name: 'Beleza & Bem-estar', emoji: '💅', color: '#E91E63' },
  { id: 6, name: 'Pets', emoji: '🐾', color: '#9C27B0' }
];

export const advertisers = [
  {
    id: 1,
    name: 'Restaurante XYZ',
    category: 'Fome & Bebida',
    categoryId: 1,
    rating: 4.8,
    reviewCount: 24,
    distance: 0.5,
    image: '🍽️',
    description: 'Melhor comida da região',
    city: 'São Sebastião',
    hasPromotion: true,
    promotion: '20% de desconto em pizzas',
    plan: 'plus'
  },
  {
    id: 2,
    name: 'Salão Glamour',
    category: 'Beleza & Bem-estar',
    categoryId: 5,
    rating: 4.9,
    reviewCount: 18,
    distance: 1.2,
    image: '💅',
    description: 'Beleza e bem-estar',
    city: 'Caraguatatuba',
    hasPromotion: true,
    promotion: 'Manicure + Pedicure por R$ 60',
    plan: 'plus'
  },
  {
    id: 3,
    name: 'Eletricista Silva',
    category: 'Serviços',
    categoryId: 2,
    rating: 4.5,
    reviewCount: 12,
    distance: 2.3,
    image: '🔧',
    description: 'Serviços elétricos rápidos',
    city: 'Ubatuba',
    hasPromotion: false,
    plan: 'free'
  },
  {
    id: 4,
    name: 'Padaria do Bairro',
    category: 'Fome & Bebida',
    categoryId: 1,
    rating: 4.6,
    reviewCount: 15,
    distance: 0.8,
    image: '🥐',
    description: 'Pães frescos diariamente',
    city: 'São Sebastião',
    hasPromotion: true,
    promotion: 'Compre 3 pães, leve 4',
    plan: 'basic'
  },
  {
    id: 5,
    name: 'Pet Shop Amigos',
    category: 'Pets',
    categoryId: 6,
    rating: 4.7,
    reviewCount: 20,
    distance: 1.5,
    image: '🐾',
    description: 'Tudo para seu pet',
    city: 'Caraguatatuba',
    hasPromotion: true,
    promotion: 'Banho + Tosa por R$ 80',
    plan: 'basic'
  },
  {
    id: 6,
    name: 'Loja de Roupas Modas',
    category: 'Compras',
    categoryId: 3,
    rating: 4.4,
    reviewCount: 10,
    distance: 1.1,
    image: '👕',
    description: 'Roupas e acessórios',
    city: 'São Sebastião',
    hasPromotion: false,
    plan: 'free'
  },
  {
    id: 7,
    name: 'Oficina Auto Express',
    category: 'Auto & Transporte',
    categoryId: 4,
    rating: 4.3,
    reviewCount: 8,
    distance: 3.2,
    image: '🚗',
    description: 'Manutenção de carros',
    city: 'Ubatuba',
    hasPromotion: true,
    promotion: 'Troca de óleo com desconto',
    plan: 'basic'
  },
  {
    id: 8,
    name: 'Café Aconchego',
    category: 'Fome & Bebida',
    categoryId: 1,
    rating: 4.9,
    reviewCount: 22,
    distance: 0.3,
    image: '☕',
    description: 'Café especial e confortável',
    city: 'São Sebastião',
    hasPromotion: true,
    promotion: 'Café + Bolo por R$ 15',
    plan: 'plus'
  }
];

export const getAdvertisersByCategory = (categoryId) => {
  return advertisers.filter(a => a.categoryId === categoryId);
};

export const getNearbyAdvertisers = () => {
  return advertisers.sort((a, b) => a.distance - b.distance).slice(0, 5);
};

export const getMostSearched = () => {
  return advertisers.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);
};

export const getPromotedAdvertisers = () => {
  return advertisers.filter(a => a.hasPromotion).slice(0, 4);
};
