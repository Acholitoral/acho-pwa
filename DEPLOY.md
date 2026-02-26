# 🚀 DEPLOY STAGING - ACHÔ PWA

Guia completo para fazer deploy do backend e frontend em staging.

---

## 📋 Pré-requisitos

- Conta no [Railway.app](https://railway.app)
- Conta no [Vercel.com](https://vercel.com)
- Conta no [Twilio](https://twilio.com) (para SMS)
- Conta no [SendGrid](https://sendgrid.com) (para emails)
- Conta no [Firebase](https://firebase.google.com) (para push notifications)

---

## 🔧 BACKEND - Deploy no Railway

### Passo 1: Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Conecte seu repositório GitHub com o projeto `acho-pwa`

### Passo 2: Adicionar PostgreSQL

1. No dashboard do Railway, clique em "Add Service"
2. Selecione "PostgreSQL"
3. Railway criará automaticamente a variável `DATABASE_URL`

### Passo 3: Configurar Variáveis de Ambiente

No Railway, vá para "Variables" e adicione:

```
NODE_ENV=production
PORT=3000

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

# Firebase
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@acho.app

# URLs
BACKEND_URL=https://your-railway-domain.railway.app
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

### Passo 4: Rodar Migrations

No Railway, vá para "Deployments" e execute:

```bash
psql $DATABASE_URL < backend/src/migrations/001_initial_schema.sql
```

Ou use o Railway CLI:

```bash
railway run psql $DATABASE_URL < backend/src/migrations/001_initial_schema.sql
```

### Passo 5: Deploy Automático

Railway faz deploy automático a cada push no GitHub. Seu backend estará em:

```
https://your-railway-domain.railway.app
```

---

## 🌐 FRONTEND - Deploy no Vercel

### Passo 1: Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub `acho-pwa`
4. Selecione a pasta `frontend` como root directory

### Passo 2: Configurar Variáveis de Ambiente

No Vercel, vá para "Settings" → "Environment Variables" e adicione:

```
NEXT_PUBLIC_API_URL=https://your-railway-domain.railway.app
```

### Passo 3: Deploy Automático

Vercel faz deploy automático a cada push. Seu PWA estará em:

```
https://your-vercel-domain.vercel.app
```

---

## 🧪 Testar Staging (3 Passos)

### Passo 1: Acessar o PWA

1. Abra no celular: `https://your-vercel-domain.vercel.app`
2. Selecione "Usuário" ou "Anunciante"
3. Insira um telefone válido (ex: 11999999999)

### Passo 2: Enviar OTP

1. Clique em "Enviar Código"
2. Você receberá um SMS com o código (ou veja no console em desenvolvimento)
3. Copie o código de 6 dígitos

### Passo 3: Verificar OTP e Entrar

1. Cole o código na tela de verificação
2. Clique em "Entrar"
3. Se bem-sucedido, você será redirecionado para a home (próxima semana)

---

## 📱 Instalar como App (PWA)

### iOS (Safari)

1. Abra em Safari: `https://your-vercel-domain.vercel.app`
2. Clique em "Compartilhar" (ícone de cima)
3. Selecione "Adicionar à Tela Inicial"
4. Nomeie como "Achô"
5. Clique em "Adicionar"

### Android (Chrome)

1. Abra em Chrome: `https://your-vercel-domain.vercel.app`
2. Clique em "Menu" (⋮)
3. Selecione "Instalar app"
4. Confirme

---

## 🔗 Links de Staging

| Serviço | URL |
|---------|-----|
| Frontend PWA | https://your-vercel-domain.vercel.app |
| Backend API | https://your-railway-domain.railway.app |
| Health Check | https://your-railway-domain.railway.app/health |

---

## 🐛 Troubleshooting

### "Erro ao conectar à API"

Verifique:
1. `NEXT_PUBLIC_API_URL` está correto no Vercel
2. CORS está habilitado no backend
3. Backend está rodando no Railway

### "OTP não chega"

Verifique:
1. Credenciais do Twilio estão corretas
2. Número de telefone é válido
3. Saldo do Twilio é suficiente

### "Erro no banco de dados"

Verifique:
1. Migrations foram rodadas
2. `DATABASE_URL` está correto
3. PostgreSQL está ativo no Railway

---

## 📊 Monitoramento

### Railway

- Dashboard: Logs em tempo real
- Métricas: CPU, memória, requisições

### Vercel

- Analytics: Visitantes, performance
- Logs: Erros do cliente

---

## 🔄 Atualizar Staging

Toda vez que você faz push no GitHub:

1. **Backend:** Railway faz deploy automaticamente
2. **Frontend:** Vercel faz deploy automaticamente

Nenhuma ação manual necessária!

---

## ✅ Checklist de Deploy

- [ ] Repositório GitHub criado
- [ ] Railway conectado ao GitHub
- [ ] PostgreSQL criado no Railway
- [ ] Variáveis de ambiente configuradas (Railway)
- [ ] Migrations rodadas
- [ ] Backend deployado e funcionando
- [ ] Vercel conectado ao GitHub
- [ ] Variáveis de ambiente configuradas (Vercel)
- [ ] Frontend deployado e funcionando
- [ ] PWA instalável no celular
- [ ] OTP funcionando (SMS)
- [ ] Login funcionando end-to-end

---

**Status:** ✅ Pronto para Staging
