# 🔐 VARIÁVEIS DE AMBIENTE - ACHÔ PWA

Guia completo de todas as variáveis de ambiente necessárias para staging e produção.

---

## 📋 Backend (.env)

### Banco de Dados

```
DATABASE_URL=postgresql://user:password@host:5432/acho_db
```

**Validação:**
- ✅ PostgreSQL 12+
- ✅ Formato: `postgresql://user:password@host:port/database`
- ✅ No Railway: Gerado automaticamente

---

### Node.js

```
NODE_ENV=production
PORT=3000
```

**Validação:**
- ✅ NODE_ENV: `development` ou `production`
- ✅ PORT: Número entre 1000-65535

---

### JWT (Autenticação)

```
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRY=7d
```

**Validação:**
- ✅ JWT_SECRET: Mínimo 32 caracteres aleatórios
- ✅ JWT_EXPIRY: Formato válido (ex: `7d`, `24h`, `30m`)

**Como gerar JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Twilio (SMS/OTP)

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

**Onde obter:**
1. Acesse [twilio.com](https://twilio.com)
2. Crie conta e faça login
3. Vá para "Account" → "API Keys & Tokens"
4. Copie `Account SID` e `Auth Token`
5. Vá para "Phone Numbers" → "Manage Numbers"
6. Copie seu número Twilio

**Validação:**
- ✅ TWILIO_ACCOUNT_SID: Começa com `AC`
- ✅ TWILIO_AUTH_TOKEN: 32 caracteres
- ✅ TWILIO_PHONE_NUMBER: Formato `+55XXXXXXXXXX`

---

### Mercado Pago

```
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
MERCADO_PAGO_PUBLIC_KEY=APP_USR-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Onde obter:**
1. Acesse [mercadopago.com.br](https://mercadopago.com.br)
2. Crie conta de desenvolvedor
3. Vá para "Credenciais" → "Chaves de Produção"
4. Copie `Access Token` e `Public Key`

**Validação:**
- ✅ MERCADO_PAGO_ACCESS_TOKEN: Começa com `APP_USR-`
- ✅ MERCADO_PAGO_PUBLIC_KEY: Começa com `APP_USR-`

---

### Firebase (Push Notifications)

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
```

**Onde obter:**
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie novo projeto
3. Vá para "Configurações do Projeto" → "Contas de Serviço"
4. Clique em "Gerar nova chave privada"
5. Copie os valores do JSON baixado

**Validação:**
- ✅ FIREBASE_PROJECT_ID: Formato `project-id`
- ✅ FIREBASE_PRIVATE_KEY: Começa com `-----BEGIN PRIVATE KEY-----`
- ✅ FIREBASE_CLIENT_EMAIL: Formato `xxxxx@xxxxx.iam.gserviceaccount.com`

---

### SendGrid (Emails)

```
SENDGRID_API_KEY=SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SENDGRID_FROM_EMAIL=noreply@acho.app
```

**Onde obter:**
1. Acesse [sendgrid.com](https://sendgrid.com)
2. Crie conta e faça login
3. Vá para "Settings" → "API Keys"
4. Crie nova chave API
5. Copie a chave

**Validação:**
- ✅ SENDGRID_API_KEY: Começa com `SG.`
- ✅ SENDGRID_FROM_EMAIL: Email válido

---

### URLs

```
BACKEND_URL=https://your-railway-domain.railway.app
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

**Validação:**
- ✅ BACKEND_URL: URL completa com https://
- ✅ FRONTEND_URL: URL completa com https://

---

## 🌐 Frontend (.env.local)

### API

```
NEXT_PUBLIC_API_URL=https://your-railway-domain.railway.app
```

**Validação:**
- ✅ NEXT_PUBLIC_API_URL: URL completa com https://
- ✅ Deve ser acessível do navegador

---

## 🔄 Staging vs Produção

| Variável | Staging | Produção |
|----------|---------|----------|
| NODE_ENV | `development` | `production` |
| JWT_SECRET | Qualquer | Gerar novo |
| Twilio | Sandbox | Produção |
| Mercado Pago | Sandbox | Produção |
| Firebase | Dev | Prod |
| URLs | Railway/Vercel | Seu domínio |

---

## ✅ Checklist de Validação

### Backend

- [ ] DATABASE_URL válida
- [ ] NODE_ENV definido
- [ ] JWT_SECRET com 32+ caracteres
- [ ] TWILIO_ACCOUNT_SID válido
- [ ] TWILIO_AUTH_TOKEN válido
- [ ] TWILIO_PHONE_NUMBER válido
- [ ] MERCADO_PAGO_ACCESS_TOKEN válido
- [ ] MERCADO_PAGO_PUBLIC_KEY válido
- [ ] FIREBASE_PROJECT_ID válido
- [ ] FIREBASE_PRIVATE_KEY válida
- [ ] FIREBASE_CLIENT_EMAIL válido
- [ ] SENDGRID_API_KEY válida
- [ ] SENDGRID_FROM_EMAIL válido
- [ ] BACKEND_URL válida
- [ ] FRONTEND_URL válida

### Frontend

- [ ] NEXT_PUBLIC_API_URL válida
- [ ] API acessível do navegador

---

## 🚀 Como Adicionar no Railway

1. Acesse seu projeto no Railway
2. Vá para "Variables"
3. Clique em "New Variable"
4. Adicione cada variável

**Ou use Railway CLI:**

```bash
railway link
railway variables set KEY=VALUE
```

---

## 🚀 Como Adicionar no Vercel

1. Acesse seu projeto no Vercel
2. Vá para "Settings" → "Environment Variables"
3. Clique em "Add"
4. Adicione cada variável

**Ou use Vercel CLI:**

```bash
vercel env add NEXT_PUBLIC_API_URL
```

---

## 🔒 Segurança

### ⚠️ NUNCA

- ❌ Commitar `.env` no Git
- ❌ Compartilhar `JWT_SECRET`
- ❌ Compartilhar tokens de API
- ❌ Usar mesmas credenciais em staging e produção

### ✅ SEMPRE

- ✅ Usar `.env.example` como template
- ✅ Gerar novos secrets para produção
- ✅ Usar variáveis de ambiente no Railway/Vercel
- ✅ Rotacionar tokens periodicamente

---

## 📝 Template .env.example

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/acho_db
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRY=7d

# Twilio (SMS/OTP)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=your_mercado_pago_token
MERCADO_PAGO_PUBLIC_KEY=your_mercado_pago_public_key

# Firebase (Push Notifications)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# SendGrid (Emails)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@acho.app

# Server
PORT=3000
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Logging
LOG_LEVEL=info
```

---

**Status:** ✅ Todas as variáveis validadas e documentadas
