# Plano de testes

## 1. Objetivo
Definir a estratégia de verificação para cada etapa do projeto, garantindo que todos os requisitos funcionais e não funcionais sejam validados.

## 2. Testes de arquitetura
- Verificar se a modelagem de dados (`03`) atende aos requisitos de consulta.
- Verificar se os contratos (`04`) cobrem todos os casos de uso descritos em `02`.
- Verificar se as regras de segurança do Firestore estão documentadas.

## 3. Testes de back-end

### 3.1 Testes unitários (obrigatórios por módulo)
- **Autenticação:** login, logout, onAuthChange com mocks do Firebase.
- **Produtos:** CRUD completo, validações de nome, quantidade, exclusão com movimentações.
- **Movimentações:** entrada, saída, validação de estoque, motivo, transação.

Ferramenta: Jest com mocks manuais para Firebase SDK.

### 3.2 Testes de integração manual
- Login com credenciais reais de teste no Firebase.
- Criar, editar, listar e excluir produto real no Firestore.
- Registrar entrada e saída e verificar quantidade final.
- Tentar excluir produto com movimentações e verificar erro.

Evidências: Screenshots do console Firebase ou logs do app.

## 4. Testes de front-end ou mobile

### 4.1 Testes de renderização
- Todas as telas renderizam com estados: carregando, vazio, com dados, erro.

### 4.2 Testes de interação
- Preenchimento de formulários, submissão, validação de campos.
- Navegação entre telas.
- Exibição de mensagens de erro conforme contrato.

### 4.3 Testes de fluxo
- Login → listagem de produtos → cadastro → edição → exclusão.
- Entrada e saída com verificação de indicador de baixo estoque.

Ferramenta: React Native Testing Library.

## 5. Critérios de aprovação
- 100% dos testes unitários passando.
- Testes de integração manual executados e aprovados por humano.
- Cobertura mínima de 80% do código (exceto arquivos de configuração).
- Nenhum bug de severidade alta em aberto.

## 6. Evidências
- Logs de execução dos testes unitários.
- Screenshots ou gravações dos testes manuais.
- Registro no `08_log_de_evolucao.md` com resultado.

## 7. Pedido para o Agente de QA
Organize os testes por prioridade e indique o que deve ser validado em cada etapa de desenvolvimento.