-- ============================================
-- ACHÔ - SCHEMA INICIAL (Semana 1)
-- ============================================

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  name VARCHAR(255),
  type VARCHAR(20) NOT NULL CHECK (type IN ('user', 'advertiser', 'admin')),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de OTP (One-Time Password)
CREATE TABLE IF NOT EXISTS otp_codes (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  emoji VARCHAR(10),
  color VARCHAR(7),
  polvо_variation VARCHAR(50),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Anunciantes
CREATE TABLE IF NOT EXISTS advertisers (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES categories(id),
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  email VARCHAR(255),
  address VARCHAR(500),
  city VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'plus')),
  star_status VARCHAR(20) DEFAULT 'none' CHECK (star_status IN ('none', 'regular', 'plus')),
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INT DEFAULT 0,
  avatar_url VARCHAR(500),
  banner_url VARCHAR(500),
  verified BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Avaliações
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY,
  advertiser_id UUID NOT NULL REFERENCES advertisers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(advertiser_id, user_id) -- Uma avaliação por anunciante por usuário
);

-- Tabela de Promoções
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY,
  advertiser_id UUID NOT NULL REFERENCES advertisers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  value VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'expired', 'archived')),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  advertiser_id UUID NOT NULL REFERENCES advertisers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, advertiser_id)
);

-- Tabela de Fila de Moderação
CREATE TABLE IF NOT EXISTS moderation_queue (
  id UUID PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('review', 'promotion', 'photo')),
  content_id UUID NOT NULL,
  advertiser_id UUID REFERENCES advertisers(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(type);
CREATE INDEX idx_advertisers_user_id ON advertisers(user_id);
CREATE INDEX idx_advertisers_category_id ON advertisers(category_id);
CREATE INDEX idx_advertisers_city ON advertisers(city);
CREATE INDEX idx_reviews_advertiser_id ON reviews(advertiser_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_promotions_advertiser_id ON promotions(advertiser_id);
CREATE INDEX idx_promotions_status ON promotions(status);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_moderation_queue_status ON moderation_queue(status);

-- Inserir categorias padrão
INSERT INTO categories (id, name, emoji, color, polvо_variation) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Fome & Bebida', '🍽️', '#FF8C42', 'food'),
('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Serviços', '🔧', '#00B4D8', 'service'),
('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Compras', '🛒', '#FFD60A', 'shopping'),
('550e8400-e29b-41d4-a716-446655440004'::uuid, 'Auto & Transporte', '🚗', '#4CAF50', 'auto'),
('550e8400-e29b-41d4-a716-446655440005'::uuid, 'Beleza & Bem-estar', '💅', '#E91E63', 'beauty'),
('550e8400-e29b-41d4-a716-446655440006'::uuid, 'Pets', '🐾', '#9C27B0', 'pets')
ON CONFLICT DO NOTHING;

-- ============================================
-- SCHEMA PRONTO PARA SEMANA 1
-- ============================================
