# 📱 TESTE NO CELULAR - ACHÔ PWA STAGING

Guia rápido para testar o PWA no seu celular.

---

## 🎯 3 Passos para Testar

### Passo 1️⃣: Acessar o PWA

**No seu celular:**

1. Abra o navegador (Safari no iOS, Chrome no Android)
2. Acesse: `https://your-vercel-domain.vercel.app`
3. Você deve ver a tela de login com o Polvô 🐙

**Esperado:**
- ✅ Página carrega rapidamente
- ✅ Polvô aparece no topo
- ✅ Campos de telefone e seleção de tipo (Usuário/Anunciante)

---

### Passo 2️⃣: Enviar OTP

**Na tela de login:**

1. Selecione "Usuário" ou "Anunciante"
2. Digite seu telefone: `11999999999` (ou seu número real)
3. Clique em "Enviar Código"

**Esperado:**
- ✅ Botão fica "Enviando..."
- ✅ Após 2-3 segundos, você é levado para tela de verificação
- ✅ Mensagem: "Enviamos um código para 11999999999"

**Em Desenvolvimento:**
- 🔧 Se estiver testando localmente, o OTP aparecerá em um alert
- 🔧 Copie o código de 6 dígitos

**Em Staging:**
- 📱 Você receberá um SMS com o código (se Twilio estiver configurado)
- 📱 Se não receber, verifique:
  - Número de telefone está correto?
  - Saldo do Twilio é suficiente?
  - Credenciais do Twilio estão corretas?

---

### Passo 3️⃣: Verificar OTP e Entrar

**Na tela de verificação:**

1. Digite o código de 6 dígitos que você recebeu
2. Clique em "Entrar"

**Esperado:**
- ✅ Botão fica "Verificando..."
- ✅ Após 2-3 segundos, você é redirecionado para a home
- ✅ Você está logado! 🎉

**Erros Possíveis:**
- ❌ "OTP inválido ou expirado" → Código errado ou expirou (10 minutos)
- ❌ "Erro ao verificar OTP" → Problema na API

---

## 📱 Instalar como App

### iOS (Safari)

1. Após fazer login, clique em "Compartilhar" (ícone de cima)
2. Selecione "Adicionar à Tela Inicial"
3. Nomeie como "Achô"
4. Clique em "Adicionar"
5. Agora você tem um ícone na tela inicial!

### Android (Chrome)

1. Após fazer login, clique em "Menu" (⋮)
2. Selecione "Instalar app"
3. Confirme
4. Agora você tem um ícone na tela inicial!

---

## 🧪 Casos de Teste

### ✅ Happy Path

| Teste | Passos | Esperado |
|-------|--------|----------|
| Enviar OTP | 1. Digitar telefone 2. Clicar "Enviar" | SMS recebido |
| Verificar OTP | 1. Digitar código 2. Clicar "Entrar" | Login bem-sucedido |
| Instalar app | 1. Compartilhar 2. "Adicionar à Tela" | App instalado |

### ❌ Casos de Erro

| Teste | Passos | Esperado |
|-------|--------|----------|
| OTP inválido | 1. Digitar código errado 2. Clicar "Entrar" | Erro: "OTP inválido" |
| OTP expirado | 1. Esperar 10+ minutos 2. Digitar código | Erro: "OTP expirado" |
| Telefone vazio | 1. Deixar vazio 2. Clicar "Enviar" | Erro: "Telefone obrigatório" |

---

## 🔍 Verificar Logs

### Frontend (Browser)

1. Abra o DevTools: `F12` ou `Cmd+Option+I`
2. Vá para "Console"
3. Você verá logs de requisições e erros

### Backend (Railway)

1. Acesse seu projeto no Railway
2. Vá para "Deployments"
3. Clique no deployment ativo
4. Vá para "Logs"
5. Você verá logs do servidor em tempo real

---

## 📊 Checklist de Teste

- [ ] PWA carrega no celular
- [ ] Tela de login aparece
- [ ] Polvô está visível
- [ ] Enviar OTP funciona
- [ ] SMS é recebido (ou OTP aparece em desenvolvimento)
- [ ] Verificar OTP funciona
- [ ] Login bem-sucedido
- [ ] Redirecionamento para home
- [ ] App é instalável
- [ ] App abre offline (parcialmente)

---

## 🐛 Troubleshooting

### "Página não carrega"

- ✅ Verifique a URL: `https://your-vercel-domain.vercel.app`
- ✅ Verifique conexão de internet
- ✅ Tente em outro navegador

### "Erro ao enviar OTP"

- ✅ Verifique se o backend está rodando
- ✅ Verifique `NEXT_PUBLIC_API_URL` no Vercel
- ✅ Verifique CORS no backend

### "SMS não chega"

- ✅ Verifique credenciais do Twilio
- ✅ Verifique saldo do Twilio
- ✅ Verifique número de telefone (formato +55XXXXXXXXXX)

### "Erro: OTP inválido"

- ✅ Verifique se o código está correto
- ✅ Verifique se não expirou (10 minutos)
- ✅ Tente enviar um novo código

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs (Frontend + Backend)
2. Verifique as variáveis de ambiente
3. Tente fazer deploy novamente
4. Limpe o cache do navegador

---

**Status:** ✅ Pronto para testar no celular!
