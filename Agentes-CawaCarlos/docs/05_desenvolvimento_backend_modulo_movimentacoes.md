# Desenvolvimento back-end, módulo Movimentações

## 1. Contexto do módulo
Implementar registro de entrada e saída de itens com atualização atômica da quantidade do produto via transação Firestore. Listar histórico de movimentações por produto.

## 2. Requisitos técnicos
- Banco: Firestore (coleções `products` e `movements`).
- Linguagem: TypeScript.
- Framework: React Native com Expo.
- Padrão: Arquitetura baseada em componentes — serviços para acesso ao Firestore, hooks para estado e ações.
- Dependência: Módulo de Autenticação e módulo de Produtos.

## 3. Contrato da API consumido
Conforme `04_contratos_de_api.md`, seções 4.3.1 a 4.3.3.

Operações: `listMovements(productId)`, `addEntry(productId, amount, reason)`, `addExit(productId, amount, reason)`.

## 4. O que deve ser gerado

### 4.1 Arquitetura e padrão
Arquitetura baseada em componentes. Serviços encapsulam transações Firestore; hooks gerenciam estado e expõem ações para os componentes.

### 4.2 Estrutura de pastas esperada

src/features/movements/
├── components/
│ ├── MovementHistoryScreen.tsx
│ ├── MovementItem.tsx
│ └── MovementFormModal.tsx
├── services/
│ └── movementService.ts
├── hooks/
│ ├── useMovements.ts
│ └── useStockMovement.ts
└── types/
└── movement.ts


### 4.3 O que cada arquivo deve conter
- types/movement.ts: Interface `Movement` (id, productId, type, amount, reason, createdAt).
- services/movementService.ts: Funções `getMovements(productId)`, `addEntry(productId, amount, reason)`, `addExit(productId, amount, reason)`. `addEntry` e `addExit` usam `runTransaction` para atomicidade. Validações: amount > 0, reason não vazio, estoque suficiente para saída.
- hooks/useMovements.ts: Hook que gerencia estado do histórico (`movements`, `loading`, `error`). Função `loadMovements(productId)`.
- hooks/useStockMovement.ts: Hook que gerencia estado da operação de entrada/saída (`loading`, `error`, `success`). Funções `addEntry` e `addExit`.
- components/MovementHistoryScreen.tsx:** Tela que lista movimentações usando `useMovements`. Botões para abrir modal de entrada/saída.
- components/MovementItem.tsx: Item da lista exibindo data, tipo, quantidade, motivo.
- components/MovementFormModal.tsx: Modal com campos de quantidade e motivo. Usa `useStockMovement`. Validação local.

## 5. Testes obrigatórios
- Teste unitário do `movementService` mockando Firestore e transações.
- Teste dos hooks `useMovements` e `useStockMovement`: verificar estados de loading, sucesso, erro.
- Teste de validação de regras (saída maior que estoque, motivo vazio, amount ≤ 0).
- Teste de integração manual registrando entrada e saída reais e verificando quantidade final.

## 6. Critérios de aceite
1. Entrada aumenta a quantidade do produto corretamente.
2. Saída diminui a quantidade do produto corretamente.
3. Saída com quantidade insuficiente gera erro `app/insufficient-stock`.
4. Motivo vazio gera erro `app/invalid-reason`.
5. Histórico aparece ordenado por data decrescente.
6. Transação garante atomicidade.

## 7. Pedido para o Agente Back-end
Gere o código completo do módulo, junto com os testes, seguindo estritamente o contrato e a estrutura baseada em componentes.