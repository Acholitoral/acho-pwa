import request from 'supertest';
import { app, pool } from '../index.js';

describe('Autenticação - OTP', () => {
  // Limpar banco antes de cada teste
  beforeEach(async () => {
    await pool.query('DELETE FROM otp_codes');
    await pool.query('DELETE FROM users WHERE phone = $1', ['11999999999']);
  });

  // Limpar banco após todos os testes
  afterAll(async () => {
    await pool.end();
  });

  describe('POST /auth/send-otp', () => {
    test('✅ Happy Path: Enviar OTP com sucesso', async () => {
      const response = await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('OTP enviado com sucesso');
      expect(response.body.otp).toBeDefined(); // Em desenvolvimento
    });

    test('❌ Erro: Telefone não fornecido', async () => {
      const response = await request(app)
        .post('/auth/send-otp')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Telefone é obrigatório');
    });

    test('✅ OTP salvo no banco com expiração', async () => {
      await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      const result = await pool.query(
        'SELECT * FROM otp_codes WHERE phone = $1',
        ['11999999999']
      );

      expect(result.rows.length).toBe(1);
      expect(result.rows[0].code).toBeDefined();
      expect(result.rows[0].expires_at).toBeDefined();
    });
  });

  describe('POST /auth/verify-otp', () => {
    test('✅ Happy Path: Verificar OTP e gerar token', async () => {
      // 1. Enviar OTP
      const sendResponse = await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      const otp = sendResponse.body.otp;

      // 2. Verificar OTP
      const verifyResponse = await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999',
          otp,
          userType: 'user'
        });

      expect(verifyResponse.status).toBe(200);
      expect(verifyResponse.body.success).toBe(true);
      expect(verifyResponse.body.token).toBeDefined();
      expect(verifyResponse.body.user).toBeDefined();
      expect(verifyResponse.body.user.phone).toBe('11999999999');
      expect(verifyResponse.body.user.type).toBe('user');
    });

    test('❌ Erro: OTP inválido', async () => {
      // 1. Enviar OTP
      await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      // 2. Tentar verificar com OTP errado
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999',
          otp: '000000', // OTP inválido
          userType: 'user'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('OTP inválido ou expirado');
    });

    test('❌ Erro: OTP expirado', async () => {
      // 1. Inserir OTP expirado manualmente
      const expiredTime = new Date(Date.now() - 15 * 60 * 1000); // 15 minutos atrás
      await pool.query(
        'INSERT INTO otp_codes (phone, code, expires_at) VALUES ($1, $2, $3)',
        ['11999999999', '123456', expiredTime]
      );

      // 2. Tentar verificar OTP expirado
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999',
          otp: '123456',
          userType: 'user'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('OTP inválido ou expirado');
    });

    test('❌ Erro: Parâmetros faltando', async () => {
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999'
          // Faltam otp e userType
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('obrigatório');
    });

    test('✅ Criar usuário automaticamente se não existir', async () => {
      // 1. Enviar OTP
      const sendResponse = await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      const otp = sendResponse.body.otp;

      // 2. Verificar OTP (deve criar usuário)
      const verifyResponse = await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999',
          otp,
          userType: 'advertiser'
        });

      expect(verifyResponse.status).toBe(200);
      expect(verifyResponse.body.user.type).toBe('advertiser');

      // 3. Verificar que usuário foi criado no banco
      const userResult = await pool.query(
        'SELECT * FROM users WHERE phone = $1',
        ['11999999999']
      );

      expect(userResult.rows.length).toBe(1);
      expect(userResult.rows[0].type).toBe('advertiser');
    });

    test('✅ OTP deletado após verificação bem-sucedida', async () => {
      // 1. Enviar OTP
      const sendResponse = await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      const otp = sendResponse.body.otp;

      // 2. Verificar OTP
      await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999',
          otp,
          userType: 'user'
        });

      // 3. Verificar que OTP foi deletado
      const otpResult = await pool.query(
        'SELECT * FROM otp_codes WHERE phone = $1 AND code = $2',
        ['11999999999', otp]
      );

      expect(otpResult.rows.length).toBe(0);
    });
  });

  describe('Integração', () => {
    test('✅ Fluxo completo: Enviar OTP → Verificar → Gerar Token', async () => {
      // 1. Enviar OTP
      const sendResponse = await request(app)
        .post('/auth/send-otp')
        .send({ phone: '11999999999' });

      expect(sendResponse.status).toBe(200);
      const otp = sendResponse.body.otp;

      // 2. Verificar OTP
      const verifyResponse = await request(app)
        .post('/auth/verify-otp')
        .send({
          phone: '11999999999',
          otp,
          userType: 'user'
        });

      expect(verifyResponse.status).toBe(200);
      expect(verifyResponse.body.token).toBeDefined();

      // 3. Verificar que usuário foi criado
      const userResult = await pool.query(
        'SELECT * FROM users WHERE phone = $1',
        ['11999999999']
      );

      expect(userResult.rows.length).toBe(1);
      expect(userResult.rows[0].type).toBe('user');
    });
  });
});
