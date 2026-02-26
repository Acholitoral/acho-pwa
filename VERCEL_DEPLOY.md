# Deploy no Vercel - Achô PWA

## Passo 1: Conectar Repositório GitHub

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Busque por `Acholitoral/acho-pwa`
5. Clique em "Import"

## Passo 2: Configurar Projeto

Na tela de configuração do Vercel:

### Framework Preset
- Selecione: **Next.js**

### Root Directory
- Deixe em branco (padrão)
- OU selecione `frontend/` se o Vercel não detectar automaticamente

### Build Command
```
cd frontend && npm install && npm run build
```

### Output Directory
```
frontend/.next
```

### Environment Variables

Adicione as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

(Por enquanto usando dados mock. Depois atualizaremos com a URL real do backend)

## Passo 3: Deploy

1. Clique em "Deploy"
2. Aguarde a build completar
3. Você receberá um link como: `https://acho-pwa.vercel.app`

## Passo 4: Configurar Domínio Customizado (Opcional)

1. Na dashboard do Vercel, vá para "Settings" > "Domains"
2. Adicione seu domínio customizado
3. Configure os DNS records conforme instruído

## Variáveis de Ambiente para Produção

Quando conectar com o backend real:

```
NEXT_PUBLIC_API_URL=https://seu-backend-url.com
```

## Troubleshooting

### Build falha com erro de dependências
- Certifique-se que `frontend/package.json` existe
- Verifique se todas as dependências estão listadas

### Página em branco após deploy
- Verifique o console do navegador (F12) para erros
- Confirme que `NEXT_PUBLIC_API_URL` está configurado

### Dados mock não aparecem
- Verifique se `frontend/lib/mock-data.js` existe
- Confirme que as páginas estão importando corretamente

## Próximos Passos

1. Validar visual e navegação no staging
2. Conectar com APIs reais do backend
3. Implementar autenticação real
4. Deploy do backend em Railway/Render
