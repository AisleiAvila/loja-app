# Sistema de Prestação de Serviços Domésticos (Bearfix)

## 1. Visão Geral

Sistema SAAS para conectar prestadores de serviços domésticos a clientes, facilitando a contratação, pagamento e gestão de serviços residenciais.

## 2. Arquitetura Base

- [x] Backend: Java (Spring Boot)
- [x] Frontend: Angular
- [x] Banco de Dados: PostgreSQL
- [x] Sistema de Autenticação: JWT
- [ ] Processamento de Pagamentos: Integração com gateway de pagamentos

## 3. Perfis de Usuário

### 3.1 Administrador

- [ ] Gerenciamento completo do sistema
- [ ] Configuração de taxas e comissões
- [ ] Relatórios gerenciais
- [ ] Gestão de usuários e perfis
- [ ] Monitoramento de transações
- [ ] Configuração de parâmetros do sistema

### 3.2 Gerente

- [ ] Moderação de prestadores
- [ ] Análise de documentação
- [ ] Suporte ao cliente
- [ ] Gestão de reclamações
- [ ] Relatórios operacionais

### 3.3 Prestador de Serviços

- [ ] Cadastro pessoal e profissional
- [ ] Documentação e certificações
- [ ] Definição de área de atuação (geolocalização)
- [ ] Gestão de agenda e disponibilidade
- [ ] Precificação de serviços
- [ ] Visualização de demandas
- [ ] Aceite/recusa de serviços
- [ ] Histórico de serviços prestados
- [ ] Relatório financeiro
- [ ] Avaliações recebidas

### 3.4 Cliente

- [ ] Cadastro pessoal
- [ ] Busca de prestadores
- [ ] Agendamento de serviços
- [ ] Pagamento online
- [ ] Avaliação de serviços
- [ ] Histórico de contratações
- [ ] Chat com prestadores

## 4. Funcionalidades Principais

### 4.1. Autenticação e Autorização

- [ ] Registro e login com e-mail, redes sociais (Google, Facebook) ou número de telefone.
- [ ] Controle de acesso por perfil:
  - [ ] Administrador: Acesso total ao sistema (CRUD de usuários, configurações globais, relatórios).
  - [ ] Gerente: Gerenciamento regional (aprovar prestadores, definir regiões de atuação, resolver conflitos).
  - [ ] Prestador: Cadastro de serviços, definição de raio de atuação (via geolocalização ou CEP), histórico de serviços.
  - [ ] Cliente: Busca de serviços, agendamento, pagamento, avaliação.
- [ ] Redefinição de senha e verificação em duas etapas (2FA).

### 4.2 Gestão de Serviços

- [x] Protótipo Cadastrar Categorias
- [ ] Cadastro de categorias de serviços (ex.: encanamento, limpeza) e subcategorias
- [ ] Definição de subcategorias
- [ ] Precificação base por tipo de serviço
- [ ] Customização de serviços
- [ ] Sistema de orçamentos
- [ ] Prestador
  - [ ] Associar serviços oferecidos ao seu perfil (com descrição, preço fixo ou por hora, fotos)
  - [ ] Definir tempo médio de execução
- [ ] Cliente
  - [ ] Busca de serviços por categoria, avaliação, preço ou proximidade
  - [ ] Filtro por disponibilidade imediata ou agendamento

### 4.3 Geolocalização e Raio de Atuação

- [ ] Integração com APIs de geolocalização (Google Maps ou OpenStreetMap).
- [ ] Definição de áreas de atuação
- [ ] Cálculo de distância
- [ ] Busca por proximidade
- [ ] Mapa de prestadores disponíveis
- [ ] Mapa interativo para clientes visualizarem prestadores próximos
- [ ] Validação automática do CEP do cliente vs. raio do prestador

### 4.4 Agendamento

- [x] Protótipo
- [ ] Calendário de disponibilidade
- [ ] Confirmação automática
- [ ] Lembretes por email/SMS
- [ ] Reagendamento
- [ ] Cancelamento
- [ ] Notificações em tempo real (ex.: lembretes, atrasos)
- [ ] Cliente
  - [ ] Selecionar data/hora do serviço
  - [ ] Receber confirmação via e-mail/SMS
- [ ] Prestador
  - [ ] Visualizar agenda de serviços em calendário
  - [ ] Bloquear horários indisponíveis

### 4.5 Sistema de Pagamentos

- [ ] Integração com gateway de pagamentos
- [ ] Processamento de cartão de crédito/débito
- [ ] Cálculo automático da taxa do SAAS (ex.: 20% do valor cobrado ao cliente)
- [ ] Repasse automático do valor ao prestador (após confirmação do serviço)
- [ ] Histórico/Extrato financeiro para prestadores (com extrato de ganhos e taxas)
- [ ] Faturas e recibos eletrônicos para clientes
- [ ] Notas fiscais

### 4.6 Avaliações e Feedback

- [ ] Sistema de estrelas (rating) - 1 a 5 estrelas
- [ ] Comentários após conclusão do serviço
- [ ] Moderação de comentários pelo Gerente
- [ ] Fotos do serviço
- [ ] Moderação de avaliações
- [ ] Ranking de prestadores
- [ ] Média de avaliações exibida no perfil do prestador

### 4.7 Comunicação

- [ ] Chat interno
- [ ] Chat integrado entre cliente e prestador (para detalhes do serviço)
- [ ] Notificações push
- [ ] Emails automáticos
- [ ] Confirmação de agendamento
  - [ ] SMS de confirmação
  - [ ] Confirmação via APP
- [ ] Aviso de pagamento concluído
- [ ] Lembrete de serviço agendado
- [ ] Central de mensagens

### 4.8 Relatórios e Analytics

- [ ] Dashboard administrativo
- [ ] Métricas de desempenho
- [ ] Relatórios financeiros
- [ ] Análise de satisfação
- [ ] Indicadores de crescimento
- [ ] Administrador
  - [ ] Métricas de crescimento (usuários, serviços concluídos, receita)
  - [ ] Relatórios de regiões mais lucrativas
- [ ] Gerente
  - [ ] Monitoramento de prestadores na sua região
- [ ] Prestador
  - [ ] Desempenho financeiro e de avaliações

### 4.9 Administrativo

- [ ] Configuração de taxas (percentual cobrado por serviço)
- [ ] Gerenciamento de políticas de cancelamento/reagendamento
- [ ] Logs de auditoria (quem acessou/modificou dados)

## 5. Requisitos Técnicos

### 5.1 Backend (Java)

- [ ] API RESTful
- [ ] Spring Boot
- [ ] Autenticação JWT
- [ ] Geolocalização
- [ ] Microserviços
- [ ] Validações
- [ ] Logs de sistema
- [ ] Cache
- [ ] Testes unitários e integração

### 5.2 Frontend (Angular)

- [ ] Layout responsivo
- [ ] PWA
- [ ] Componentes reutilizáveis
- [ ] Lazy loading
- [ ] Interceptors
- [ ] Guards
- [ ] State management
- [ ] Leaflet/Google Maps API
- [ ] NgRx para gerenciamento de estado
- [ ] Angular Material

### 5.3 Segurança

- [ ] Criptografia
- [ ] Validação de dados
- [ ] Proteção contra ataques
- [ ] Backup automático
- [ ] Auditoria de ações
- [ ] LGPD compliance

### 5.4 Integrações

- [ ] Gateway de pagamentos (Stripe, Pagar.me ou Mercado Pago)
- [ ] Serviço de SMS
- [ ] Email service
- [ ] Maps API
- [ ] Storage para arquivos

### 5.5 Infraestrutura

- [ ] Docker
- [ ] AWS/Google Cloud
- [ ] Redis para cache

## 7. Validações Importantes

- [ ] Escalabilidade: Garantir que o sistema suporte picos de demanda (ex.: horários de rush).
- [ ] Segurança: Criptografia de dados sensíveis (ex.: cartões de crédito), GDPR/ LGPD compliance.
- [ ] UX Mobile: Design responsivo para celulares (maioria dos usuários).

## 6. Implementação Sugerida (Fases)

### Fase 1 - MVP

- [ ] Cadastro básico de usuários
- [ ] Cadastro de serviços
- [ ] Busca de prestadores
- [ ] Agendamento simples
- [ ] Pagamento básico

### Fase 2 - Expansão

- [ ] Sistema de avaliações
- [ ] Chat interno
- [ ] Geolocalização avançada
- [ ] Dashboard completo
- [ ] Relatórios básicos

### Fase 3 - Consolidação

- [ ] App mobile
- [ ] Analytics avançado
- [ ] Marketing automation
- [ ] Integrações adicionais
- [ ] Funcionalidades premium
