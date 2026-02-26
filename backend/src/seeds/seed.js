import { Pool } from 'pg';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function seed() {
  try {
    console.log('🌱 Iniciando seed de dados...\n');

    // Criar usuários de teste
    const userId1 = uuidv4();
    const userId2 = uuidv4();
    const userId3 = uuidv4();
    const userId4 = uuidv4();

    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [userId1, '11999999001', 'João Silva', 'user']
    );
    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [userId2, '11999999002', 'Maria Santos', 'user']
    );
    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [userId3, '11999999003', 'Pedro Costa', 'user']
    );
    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [userId4, '11999999004', 'Ana Oliveira', 'user']
    );

    console.log('✅ Usuários criados');

    // Criar anunciantes de teste
    const catFoodId = '550e8400-e29b-41d4-a716-446655440001';
    const catBeautyId = '550e8400-e29b-41d4-a716-446655440005';
    const catServiceId = '550e8400-e29b-41d4-a716-446655440002';

    const advertiserUserId1 = uuidv4();
    const advertiserUserId2 = uuidv4();
    const advertiserUserId3 = uuidv4();

    // Criar usuários anunciantes
    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [advertiserUserId1, '11988888001', 'Restaurante XYZ', 'advertiser']
    );
    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [advertiserUserId2, '11988888002', 'Salão Glamour', 'advertiser']
    );
    await pool.query(
      'INSERT INTO users (id, phone, name, type, created_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING',
      [advertiserUserId3, '11988888003', 'Eletricista Silva', 'advertiser']
    );

    const advertiserId1 = uuidv4();
    const advertiserId2 = uuidv4();
    const advertiserId3 = uuidv4();

    await pool.query(
      `INSERT INTO advertisers (id, user_id, name, description, category_id, phone, whatsapp, email, address, city, plan, rating, review_count, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()) ON CONFLICT DO NOTHING`,
      [
        advertiserId1,
        advertiserUserId1,
        'Restaurante XYZ',
        'Melhor comida da região, cardápio variado',
        catFoodId,
        '1133333333',
        '11999999999',
        'contato@restaurante.com',
        'Rua das Flores, 123',
        'São Sebastião',
        'basic',
        4.5,
        10
      ]
    );

    await pool.query(
      `INSERT INTO advertisers (id, user_id, name, description, category_id, phone, whatsapp, email, address, city, plan, rating, review_count, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()) ON CONFLICT DO NOTHING`,
      [
        advertiserId2,
        advertiserUserId2,
        'Salão Glamour',
        'Beleza e bem-estar para todos',
        catBeautyId,
        '1144444444',
        '11988888888',
        'contato@salao.com',
        'Av. Principal, 456',
        'Caraguatatuba',
        'plus',
        4.8,
        15
      ]
    );

    await pool.query(
      `INSERT INTO advertisers (id, user_id, name, description, category_id, phone, whatsapp, email, address, city, plan, rating, review_count, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()) ON CONFLICT DO NOTHING`,
      [
        advertiserId3,
        advertiserUserId3,
        'Eletricista Silva',
        'Serviços elétricos rápidos e confiáveis',
        catServiceId,
        '1155555555',
        '11977777777',
        'contato@eletricista.com',
        'Rua do Comércio, 789',
        'Ubatuba',
        'free',
        4.2,
        8
      ]
    );

    console.log('✅ Anunciantes criados');

    // Criar avaliações de teste
    const reviews = [
      {
        advertiserId: advertiserId1,
        userId: userId1,
        rating: 5,
        comment: 'Excelente comida, atendimento impecável!'
      },
      {
        advertiserId: advertiserId1,
        userId: userId2,
        rating: 4,
        comment: 'Muito bom, mas poderia ser mais rápido'
      },
      {
        advertiserId: advertiserId1,
        userId: userId3,
        rating: 5,
        comment: 'Voltarei com certeza!'
      },
      {
        advertiserId: advertiserId2,
        userId: userId1,
        rating: 5,
        comment: 'Profissionais muito competentes'
      },
      {
        advertiserId: advertiserId2,
        userId: userId2,
        rating: 5,
        comment: 'Ambiente limpo e aconchegante'
      },
      {
        advertiserId: advertiserId2,
        userId: userId4,
        rating: 4,
        comment: 'Bom serviço, preço um pouco alto'
      },
      {
        advertiserId: advertiserId3,
        userId: userId1,
        rating: 4,
        comment: 'Resolveu meu problema rapidamente'
      },
      {
        advertiserId: advertiserId3,
        userId: userId3,
        rating: 4,
        comment: 'Profissional confiável'
      }
    ];

    for (const review of reviews) {
      const reviewId = uuidv4();
      await pool.query(
        `INSERT INTO reviews (id, advertiser_id, user_id, rating, comment, status, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, NOW()) ON CONFLICT DO NOTHING`,
        [reviewId, review.advertiserId, review.userId, review.rating, review.comment, 'approved']
      );
    }

    console.log('✅ Avaliações criadas');

    console.log('\n✅ Seed concluído com sucesso!\n');
    console.log('Dados criados:');
    console.log('- 4 usuários regulares');
    console.log('- 3 anunciantes');
    console.log('- 8 avaliações');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
}

seed();
