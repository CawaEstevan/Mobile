# Desenvolvimento back-end, módulo Movimentações

## 1. Contexto do módulo
Implementar registro de entrada e saída de itens com atualização atômica da quantidade do produto via transação Firestore. Listar histórico de movimentações por produto.

## 2. Requisitos técnicos
- Banco: Firestore (coleções `products` e `movements`).
- Linguagem: TypeScript.
- Framework: React Native.
- Padrão: Serviço isolado, transações com `runTransaction`.
- Dependência: Módulo de Autenticação e módulo de Produtos.

## 3. Contrato da API consumido
Conforme `04_contratos_de_api.md`, seções 4.3.1 a 4.3.3.

Operações: `listMovements(productId)`, `addEntry(productId, amount, reason)`, `addExit(productId, amount, reason)`.

## 4. O que deve ser gerado

### 4.1 Arquitetura e padrão
Clean Architecture + MVVM. Feature `movements` com camadas presentation, domain, data. Transações Firestore encapsuladas na camada data.

### 4.2 Estrutura de pastas esperada
src/features/movements/
├── presentation/
│ ├── MovementHistoryScreen.tsx
│ ├── MovementHistoryViewModel.ts
│ └── components/
│ ├── MovementItem.tsx
│ └── MovementFormModal.tsx
├── domain/
│ ├── entities/
│ │ └── Movement.ts
│ ├── usecases/
│ │ ├── GetMovementsUseCase.ts
│ │ ├── AddEntryUseCase.ts
│ │ └── AddExitUseCase.ts
│ └── repositories/
│ └── MovementRepository.ts (interface)
└── data/
├── repositories/
│ └── FirestoreMovementRepository.ts (implementação)
├── datasources/
│ └── FirestoreMovementDataSource.ts
└── dtos/
└── MovementDTO.ts

text

### 4.3 Responsabilidades
- domain/entities/Movement.ts: Interface com `id`, `productId`, `type`, `amount`, `reason`, `createdAt`.
- domain/usecases/: Casos de uso para listar movimentações e registrar entrada/saída.
- domain/repositories/MovementRepository.ts: Interface com `getByProductId`, `addEntry`, `addExit`.
- data/repositories/FirestoreMovementRepository.ts: Implementação com transação Firestore (`runTransaction`) para garantir atomicidade.
- data/datasources/FirestoreMovementDataSource.ts: Operações diretas no Firestore para coleção `movements`.
- data/dtos/MovementDTO.ts: Conversão entre documento Firestore e entidade Movement.
- presentation/MovementHistoryViewModel.ts: Estado reativo do histórico e ações de entrada/saída.
- presentation/MovementHistoryScreen.tsx: Observa ViewModel.
- presentation/components/MovementFormModal.tsx: Modal com campos de quantidade e motivo.

## 5. Testes obrigatórios
- Teste unitário de cada função mockando Firestore.
- Teste de validação de regras (saída maior que estoque, motivo vazio, amount <= 0).
- Teste de integração manual registrando entrada e saída reais e verificando quantidade final.
- Cobertura de 100% das funções públicas.

## 6. Critérios de aceite
1. Entrada aumenta a quantidade do produto corretamente.
2. Saída diminui a quantidade do produto corretamente.
3. Saída com quantidade insuficiente gera erro `app/insufficient-stock`.
4. Motivo vazio gera erro `app/invalid-reason`.
5. Histórico aparece ordenado por data decrescente.
6. Transação garante atomicidade (quantidade e movimentação registradas juntas).

## 7. Pedido para o Agente Back-end
Gere o código completo do módulo, junto com os testes, seguindo estritamente o contrato.