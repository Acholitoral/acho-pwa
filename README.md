# 🐙 ACHÔ - PWA MVP

**Semana 1: Setup & Autenticação**

Marketplace de compras e serviços para o litoral norte de São Paulo.

---

## 📋 Estrutura do Projeto

```
acho-pwa/
├── backend/               # Node.js + Express
│   ├── src/
│   │   ├── index.js      # Servidor principal
│   │   └── migrations/   # Scripts SQL
│   ├── package.json
│   └── .env.example
├── frontend/             # Next.js + React
│   ├── app/
│   │   ├── login/       # Página de login
│   │   └── page.jsx     # Home (próxima semana)
│   ├── public/
│   │   └── manifest.json # PWA manifest
│   ├── package.json
│   └── next.config.js
└── README.md
```

---

## 🚀 Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env com suas credenciais

# Criar banco de dados
createdb acho_db

# Rodar migrations
psql acho_db < src/migrations/001_initial_schema.sql

# Iniciar servidor
npm run dev
```

Servidor rodará em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

PWA rodará em `http://localhost:3001`

---

## 🔐 Autenticação (Semana 1)

### Endpoints

**POST /auth/send-otp**
```json
{
  "phone": "(11) 99999-9999"
}
```

**POST /auth/verify-otp**
```json
{
  "phone": "(11) 99999-9999",
  "otp": "123456",
  "userType": "user" // ou "advertiser"
}
```

---

## 📱 PWA Features

- ✅ Instalável (iOS + Android)
- ✅ Offline mode (básico)
- ✅ Push notifications (próxima semana)
- ✅ Responsivo (mobile-first)

### Instalar no Celular

**iOS:**
1. Abrir em Safari
2. Compartilhar → Adicionar à Tela Inicial

**Android:**
1. Abrir em Chrome
2. Menu → Instalar app

---

## 🗄️ Banco de Dados

**Tabelas criadas:**
- users
- otp_codes
- categories
- advertisers
- reviews
- promotions
- favorites
- moderation_queue

---

## 📅 Próximas Semanas

- **Semana 2:** APIs Core & Home
- **Semana 3:** Avaliações, Favoritos, Promoções
- **Semana 4:** Painel Anunciante & Pagamento
- **Semana 5:** Notificações & Testes
- **Semana 6:** Beta Testing

---

## 🐙 Mascote Polvô

Placeholders temporários. Será substituído pelas artes finais sem impacto no código.

---

## 📝 Licença

MIT

---

**Status:** ✅ Semana 1 - Setup & Autenticação
