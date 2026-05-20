# Desenvolvimento back-end, módulo Produtos

## 1. Contexto do módulo
Implementar o CRUD completo de produtos no Firestore, conforme contrato `04`. O operador autenticado pode listar, criar, editar, visualizar e excluir produtos. A exclusão só é permitida se não houver movimentações vinculadas.

## 2. Requisitos técnicos
- Banco: Firestore (coleção `products`).
- Linguagem: TypeScript.
- Framework: React Native.
- Padrão: Serviço isolado para operações de banco, hooks para consumo nos componentes.
- Dependência: Módulo de Autenticação (usuário precisa estar logado).

## 3. Contrato da API consumido
Conforme `04_contratos_de_api.md`, seções 4.2.1 a 4.2.5.

Operações: `listAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`.

## 4. O que deve ser gerado

### 4.1 Arquitetura e padrão
Clean Architecture + MVVM. Feature `products` com camadas presentation, domain, data. Acesso ao Firestore encapsulado na camada data.

### 4.2 Estrutura de pastas esperada
src/features/products/
├── presentation/
│ ├── ProductListScreen.tsx
│ ├── ProductFormScreen.tsx
│ ├── ProductDetailScreen.tsx
│ ├── ProductListViewModel.ts
│ └── components/
│ ├── ProductCard.tsx
│ └── StockIndicator.tsx
├── domain/
│ ├── entities/
│ │ └── Product.ts
│ ├── usecases/
│ │ ├── GetProductsUseCase.ts
│ │ ├── CreateProductUseCase.ts
│ │ ├── UpdateProductUseCase.ts
│ │ └── DeleteProductUseCase.ts
│ └── repositories/
│ └── ProductRepository.ts (interface)
└── data/
├── repositories/
│ └── FirestoreProductRepository.ts (implementação)
├── datasources/
│ └── FirestoreProductDataSource.ts
└── dtos/
└── ProductDTO.ts

text

### 4.3 Responsabilidades
- domain/entities/Product.ts: Interface com `id`, `name`, `sku`, `quantity`, `minQuantity`.
- domain/usecases/: Cada caso de uso orquestra uma operação (listar, criar, editar, excluir) via ProductRepository.
- domain/repositories/ProductRepository.ts: Interface assíncrona para CRUD.
- data/repositories/FirestoreProductRepository.ts: Implementa ProductRepository usando Firestore.
- data/datasources/FirestoreProductDataSource.ts: Operações diretas no Firestore (`getDocs`, `addDoc`, `updateDoc`, `deleteDoc`).
- data/dtos/ProductDTO.ts: Conversão entre documento Firestore e entidade Product.
- presentation/ProductListViewModel.ts: Estado reativo da lista, ações de carregar e excluir.
- presentation/ProductFormViewModel.ts: Estado do formulário, validações, ação de salvar.
- presentation/Screen.tsx: Observam ViewModels, renderizam UI.

## 5. Testes obrigatórios
- Teste unitário de cada função do `productService` mockando Firestore.
- Teste de validação de campos obrigatórios e regras (quantidade não negativa, nome vazio).
- Teste de integração manual criando, listando, editando e excluindo produto real.
- Cobertura de 100% das funções públicas.

## 6. Critérios de aceite
1. Produto criado aparece imediatamente na lista.
2. Nome vazio gera erro `app/invalid-product-name`.
3. Quantidade negativa gera erro `app/invalid-quantity`.
4. Produto com movimentações não pode ser excluído (erro `app/product-has-movements`).
5. Quantidade inicial e mínima aceitam zero.

## 7. Pedido para o Agente Back-end
Gere o código completo do módulo, junto com os testes, seguindo estritamente o contrato.