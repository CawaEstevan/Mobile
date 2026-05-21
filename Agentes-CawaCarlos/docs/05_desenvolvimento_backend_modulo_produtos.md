# Desenvolvimento back-end, módulo Produtos

## 1. Contexto do módulo
Implementar o CRUD completo de produtos no Firestore, conforme contrato `04`. O operador autenticado pode listar, criar, editar, visualizar e excluir produtos. A exclusão só é permitida se não houver movimentações vinculadas.

## 2. Requisitos técnicos
- Banco: Firestore (coleção `products`).
- Linguagem: TypeScript.
- Framework: React Native com Expo.
- Padrão: Arquitetura baseada em componentes — serviços para acesso ao Firestore, hooks para estado e ações.
- Dependência: Módulo de Autenticação (usuário precisa estar logado).

## 3. Contrato da API consumido
Conforme `04_contratos_de_api.md`, seções 4.2.1 a 4.2.5.

Operações: `listAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`.

## 4. O que deve ser gerado

### 4.1 Arquitetura e padrão
Arquitetura baseada em componentes. Cada feature contém serviços (acesso a dados), hooks (estado e ações) e componentes (UI). Sem camadas rígidas.

### 4.2 Estrutura de pastas esperada

src/features/products/
├── components/
│ ├── ProductListScreen.tsx
│ ├── ProductFormScreen.tsx
│ ├── ProductDetailScreen.tsx
│ ├── ProductCard.tsx
│ └── StockIndicator.tsx
├── services/
│ └── productService.ts
├── hooks/
│ ├── useProducts.ts
│ └── useProductForm.ts
└── types/
└── product.ts


### 4.3 O que cada arquivo deve conter
- types/product.ts: Interface `Product` (id, name, sku, quantity, minQuantity, createdAt).
- services/productService.ts: Funções CRUD (`getProducts`, `getProductById`, `createProduct`, `updateProduct`, `deleteProduct`) encapsulando Firestore. Validações de regras de negócio (nome obrigatório, quantidade ≥ 0, verificação de movimentações antes de excluir).
- hooks/useProducts.ts: Hook que gerencia estado da lista (`products`, `loading`, `error`). Funções `loadProducts()` e `deleteProduct(id)` que chamam `productService`.
- hooks/useProductForm.ts: Hook para formulário de criação/edição. Estado dos campos, validações, função `save()`.
- components/ProductListScreen.tsx: Lista com `useProducts`. Exibe `ProductCard` para cada item, com `StockIndicator` se baixo estoque.
- components/ProductFormScreen.tsx: Formulário que usa `useProductForm`. Campos de nome, SKU, quantidade, mínima.
- components/ProductDetailScreen.tsx: Detalhes do produto, botões editar/excluir.
- components/ProductCard.tsx: Card reutilizável com nome, SKU, quantidade.
- components/StockIndicator.tsx: Indicador visual (cor/ícone) para baixo estoque.

## 5. Testes obrigatórios
- Teste unitário do `productService` mockando Firestore.
- Teste dos hooks `useProducts` e `useProductForm`: verificar estados de loading, sucesso, erro.
- Teste de validação de campos obrigatórios e regras de negócio.
- Teste de integração manual criando, listando, editando e excluindo produto real.

## 6. Critérios de aceite
1. Produto criado aparece imediatamente na lista.
2. Nome vazio gera erro `app/invalid-product-name`.
3. Quantidade negativa gera erro `app/invalid-quantity`.
4. Produto com movimentações não pode ser excluído.
5. Quantidade inicial e mínima aceitam zero.

## 7. Pedido para o Agente Back-end
Gere o código completo do módulo, junto com os testes, seguindo estritamente o contrato e a estrutura baseada em componentes.