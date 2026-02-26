# 📅 SEMANA 2 - APIs CORE & HOME

**Status:** 🚀 Iniciando  
**Duração:** 1 semana  
**Objetivo:** APIs prontas + Home funcional

---

## 📋 O que será entregue

### Backend

- ✅ GET /advertisers (com filtros, busca, ranking)
- ✅ GET /advertisers/:id (perfil completo)
- ✅ GET /categories
- ✅ GET /user/profile
- ✅ PUT /user/profile
- ✅ Lógica de ranking (Estrela)
- ✅ Busca com geolocalização
- ✅ Testes de API (>80% coverage)

### Frontend

- ✅ Home com categorias
- ✅ "Dica do Polvô"
- ✅ "Perto de Você"
- ✅ "Mais Procurados"
- ✅ Navegação inferior (tabs)
- ✅ Perfil do usuário
- ✅ Configurações
- ✅ Responsivo

### Banco de Dados

- ✅ Dados de exemplo (seed)
- ✅ Índices de performance

---

## 🎯 User Stories

### Backend

**Story 1: Listar Anunciantes com Filtros**
```
Como: Usuário
Quero: Ver lista de anunciantes com filtros
Para: Encontrar o que procuro

Critério de Aceite:
- GET /advertisers retorna lista
- Filtros: categoria, distância, avaliação
- Ordenação: relevância, avaliação, distância
- Paginação: 20 por página
- Ranking: Estrela em destaque
```

**Story 2: Perfil Completo do Anunciante**
```
Como: Usuário
Quero: Ver perfil completo do anunciante
Para: Conhecer mais sobre o negócio

Critério de Aceite:
- GET /advertisers/:id retorna dados completos
- Fotos, vídeos, cardápio
- Avaliações e comentários
- Promoções ativas
- Botões de ação (WhatsApp, Ligar, Favoritar)
```

**Story 3: Ranking (Estrela)**
```
Como: Sistema
Quero: Calcular ranking dos anunciantes
Para: Destacar os melhores

Critério de Aceite:
- Estrela Regular: Avaliação >= 4.5 + 10+ reviews
- Estrela PLUS: Plano premium
- Destacar na busca e home
- Atualizar diariamente
```

### Frontend

**Story 1: Home com Categorias**
```
Como: Usuário
Quero: Ver home com categorias
Para: Navegar rápido

Critério de Aceite:
- 6 categorias com ícones
- Clicável (vai para busca)
- Responsivo
- Polvô temático por categoria
```

**Story 2: "Perto de Você"**
```
Como: Usuário
Quero: Ver anunciantes próximos
Para: Encontrar rápido

Critério de Aceite:
- Usar geolocalização
- Mostrar 5 mais próximos
- Distância em km
- Clicável (vai para perfil)
```

**Story 3: "Mais Procurados"**
```
Como: Usuário
Quero: Ver anunciantes populares
Para: Descobrir novos

Critério de Aceite:
- Top 5 por categoria
- Ordenado por avaliação
- Mostrar rating
- Clicável (vai para perfil)
```

---

## 🔧 Tarefas Técnicas

### Backend

- [ ] Criar modelo Advertiser (completo)
- [ ] Criar modelo Category
- [ ] Criar modelo Star (ranking)
- [ ] Implementar GET /advertisers com filtros
- [ ] Implementar GET /advertisers/:id
- [ ] Implementar GET /categories
- [ ] Implementar GET /user/profile
- [ ] Implementar PUT /user/profile
- [ ] Implementar lógica de ranking
- [ ] Implementar busca com geolocalização
- [ ] Criar seed de dados (50+ anunciantes)
- [ ] Criar índices de performance
- [ ] Testes de API (happy path + erro)
- [ ] Documentação Swagger

### Frontend

- [ ] Criar layout da Home
- [ ] Criar componente de Categoria
- [ ] Criar seção "Dica do Polvô"
- [ ] Criar seção "Perto de Você"
- [ ] Criar seção "Mais Procurados"
- [ ] Criar navegação inferior (tabs)
- [ ] Criar página de Perfil do Usuário
- [ ] Criar página de Configurações
- [ ] Integrar com APIs de anunciantes
- [ ] Geolocalização (GPS)
- [ ] Responsivo (mobile-first)
- [ ] Testes (>80% coverage)

---

## 📊 Estimativa

| Componente | Horas | Dev |
|-----------|-------|-----|
| Backend APIs | 40 | 1 |
| Ranking | 16 | 1 |
| Geolocalização | 12 | 1 |
| Seed de dados | 8 | 1 |
| Testes | 16 | 1 |
| Frontend Home | 32 | 1 |
| Frontend Perfil | 24 | 1 |
| Integração | 16 | 1 |
| **TOTAL** | **164 horas** | **1 dev** |

**Timeline:** 1 semana com 1 dev full-time

---

## ✅ Critério de Conclusão

- [ ] Todas as APIs testadas
- [ ] Home renderizando dados reais
- [ ] Busca com filtros funcionando
- [ ] Ranking (Estrela) calculado
- [ ] Geolocalização funcionando
- [ ] Testes >80% coverage
- [ ] Sem erros no console
- [ ] Responsivo (mobile + desktop)
- [ ] Performance >90 Lighthouse
- [ ] Deploy automático em staging

---

## 🚀 Próximas Semanas

- **Semana 3:** Avaliações, Favoritos, Promoções
- **Semana 4:** Painel Anunciante & Pagamento
- **Semana 5:** Notificações & Testes
- **Semana 6:** Beta Testing

---

**Status:** 🚀 Pronto para começar!
