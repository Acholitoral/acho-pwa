import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});
app.use(limiter);

// Middleware de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Pool de conexão PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Testar conexão com banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('✅ Conectado ao banco de dados:', res.rows[0]);
  }
});

// ============================================
// ROTAS DE AUTENTICAÇÃO (Semana 1)
// ============================================

// POST /auth/send-otp - Enviar OTP via SMS
app.post('/auth/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Telefone é obrigatório' });
    }

    // Gerar OTP aleatório (6 dígitos)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Salvar OTP no banco com expiração de 10 minutos
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      'INSERT INTO otp_codes (phone, code, expires_at) VALUES ($1, $2, $3)',
      [phone, otp, expiresAt]
    );

    // TODO: Enviar SMS via Twilio
    console.log(`📱 OTP para ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP enviado com sucesso',
      // Em desenvolvimento, retornar OTP para testes
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('Erro ao enviar OTP:', error);
    res.status(500).json({ error: 'Erro ao enviar OTP' });
  }
});

// POST /auth/verify-otp - Verificar OTP e gerar JWT
app.post('/auth/verify-otp', async (req, res) => {
  try {
    const { phone, otp, userType } = req.body; // userType: 'user' ou 'advertiser'

    if (!phone || !otp || !userType) {
      return res.status(400).json({ error: 'Telefone, OTP e tipo de usuário são obrigatórios' });
    }

    // Verificar OTP no banco
    const result = await pool.query(
      'SELECT * FROM otp_codes WHERE phone = $1 AND code = $2 AND expires_at > NOW()',
      [phone, otp]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'OTP inválido ou expirado' });
    }

    // Deletar OTP usado
    await pool.query('DELETE FROM otp_codes WHERE phone = $1 AND code = $2', [phone, otp]);

    // Verificar se usuário existe
    let user = await pool.query(
      'SELECT * FROM users WHERE phone = $1 AND type = $2',
      [phone, userType]
    );

    // Se não existe, criar novo usuário
    if (user.rows.length === 0) {
      const userId = require('uuid').v4();
      await pool.query(
        'INSERT INTO users (id, phone, type, created_at) VALUES ($1, $2, $3, NOW())',
        [userId, phone, userType]
      );
      user = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      );
    }

    // Gerar JWT
    const token = require('jsonwebtoken').sign(
      { userId: user.rows[0].id, phone, userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.rows[0].id,
        phone: user.rows[0].phone,
        type: user.rows[0].type,
        name: user.rows[0].name
      }
    });
  } catch (error) {
    console.error('Erro ao verificar OTP:', error);
    res.status(500).json({ error: 'Erro ao verificar OTP' });
  }
});

// ============================================
// ROTAS DE AVALIAÇÕES (Semana 3)
// ============================================

// POST /reviews - Criar ou atualizar avaliação
app.post('/reviews', async (req, res) => {
  try {
    const { advertiserId, userId, rating, comment } = req.body;

    if (!advertiserId || !userId || !rating) {
      return res.status(400).json({ error: 'advertiserId, userId e rating são obrigatórios' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating deve estar entre 1 e 5' });
    }

    // Verificar se avaliação já existe
    const existing = await pool.query(
      'SELECT id FROM reviews WHERE advertiser_id = $1 AND user_id = $2',
      [advertiserId, userId]
    );

    let review;
    if (existing.rows.length > 0) {
      // Atualizar avaliação existente
      review = await pool.query(
        'UPDATE reviews SET rating = $1, comment = $2, updated_at = NOW() WHERE advertiser_id = $3 AND user_id = $4 RETURNING *',
        [rating, comment || null, advertiserId, userId]
      );
    } else {
      // Criar nova avaliação
      const reviewId = require('uuid').v4();
      review = await pool.query(
        'INSERT INTO reviews (id, advertiser_id, user_id, rating, comment, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
        [reviewId, advertiserId, userId, rating, comment || null, 'approved']
      );
    }

    // Atualizar rating médio do anunciante
    const stats = await pool.query(
      'SELECT AVG(rating) as avg_rating, COUNT(*) as review_count FROM reviews WHERE advertiser_id = $1 AND status = \'approved\'',
      [advertiserId]
    );

    await pool.query(
      'UPDATE advertisers SET rating = $1, review_count = $2, updated_at = NOW() WHERE id = $3',
      [parseFloat(stats.rows[0].avg_rating) || 0, stats.rows[0].review_count || 0, advertiserId]
    );

    res.json({
      success: true,
      review: review.rows[0],
      message: existing.rows.length > 0 ? 'Avaliação atualizada' : 'Avaliação criada'
    });
  } catch (error) {
    console.error('Erro ao criar/atualizar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar/atualizar avaliação' });
  }
});

// GET /advertisers/:id/reviews - Listar avaliações de um anunciante
app.get('/advertisers/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await pool.query(
      `SELECT r.*, u.name as user_name, u.avatar_url as user_avatar 
       FROM reviews r 
       LEFT JOIN users u ON r.user_id = u.id 
       WHERE r.advertiser_id = $1 AND r.status = 'approved' 
       ORDER BY r.created_at DESC`,
      [id]
    );

    // Calcular estatísticas
    const stats = await pool.query(
      `SELECT 
        AVG(rating) as avg_rating, 
        COUNT(*) as total_reviews,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as five_stars,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as four_stars,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as three_stars,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as two_stars,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as one_star
       FROM reviews 
       WHERE advertiser_id = $1 AND status = 'approved'`,
      [id]
    );

    res.json({
      reviews: reviews.rows,
      stats: {
        avgRating: parseFloat(stats.rows[0].avg_rating) || 0,
        totalReviews: stats.rows[0].total_reviews || 0,
        distribution: {
          fiveStars: stats.rows[0].five_stars || 0,
          fourStars: stats.rows[0].four_stars || 0,
          threeStars: stats.rows[0].three_stars || 0,
          twoStars: stats.rows[0].two_stars || 0,
          oneStar: stats.rows[0].one_star || 0
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).json({ error: 'Erro ao listar avaliações' });
  }
});

// DELETE /reviews/:id - Deletar avaliação (apenas do próprio usuário)
app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório' });
    }

    // Verificar se review pertence ao usuário
    const review = await pool.query(
      'SELECT advertiser_id FROM reviews WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (review.rows.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar esta avaliação' });
    }

    const advertiserId = review.rows[0].advertiser_id;

    // Deletar avaliação
    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);

    // Atualizar rating médio do anunciante
    const stats = await pool.query(
      'SELECT AVG(rating) as avg_rating, COUNT(*) as review_count FROM reviews WHERE advertiser_id = $1 AND status = \'approved\'',
      [advertiserId]
    );

    await pool.query(
      'UPDATE advertisers SET rating = $1, review_count = $2, updated_at = NOW() WHERE id = $3',
      [parseFloat(stats.rows[0].avg_rating) || 0, stats.rows[0].review_count || 0, advertiserId]
    );

    res.json({ success: true, message: 'Avaliação deletada' });
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
});

// GET /user/:userId/review/:advertiserId - Obter avaliação do usuário para um anunciante
app.get('/user/:userId/review/:advertiserId', async (req, res) => {
  try {
    const { userId, advertiserId } = req.params;

    const review = await pool.query(
      'SELECT * FROM reviews WHERE user_id = $1 AND advertiser_id = $2',
      [userId, advertiserId]
    );

    res.json({
      review: review.rows[0] || null
    });
  } catch (error) {
    console.error('Erro ao obter avaliação:', error);
    res.status(500).json({ error: 'Erro ao obter avaliação' });
  }
});

// ============================================
// ROTAS DE SAÚDE
// ============================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🐙 ACHÔ BACKEND - SEMANA 3        ║
║     Avaliações & Reviews              ║
╚════════════════════════════════════════╝

✅ Servidor rodando em http://localhost:${PORT}
✅ Banco de dados conectado
✅ Autenticação OTP pronta
✅ Avaliações implementadas

📝 Endpoints disponíveis:
  - POST /auth/send-otp
  - POST /auth/verify-otp
  - POST /reviews
  - GET /advertisers/:id/reviews
  - DELETE /reviews/:id
  - GET /user/:userId/review/:advertiserId
  - GET /health

🚀 Pronto para desenvolvimento!
  `);
});

export { app, pool };
