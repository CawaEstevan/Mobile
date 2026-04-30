# Desenvolvimento back-end, módulo Produtos

## 1. Contexto do módulo
Implementar o CRUD completo de produtos no Firestore, conforme contrato `04`. O operador autenticado pode listar, criar, editar, visualizar e excluir produtos. A exclusão só é permitida se não houver movimentações vinculadas.

## 2. Requisitos técnicos
- **Banco:** Firestore (coleção `products`).
- **Linguagem:** TypeScript.
- **Framework:** React Native.
- **Padrão:** Serviço isolado para operações de banco, hooks para consumo nos componentes.
- **Dependência:** Módulo de Autenticação (usuário precisa estar logado).

## 3. Contrato da API consumido
Conforme `04_contratos_de_api.md`, seções 4.2.1 a 4.2.5.

Operações: `listAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`.

## 4. O que deve ser gerado
- **productService.ts:** Funções CRUD encapsulando chamadas ao Firestore.
- **useProducts.ts:** Hook para listar produtos com estado de loading e erro.
- **useProduct.ts:** Hook para operações de criação, edição, exclusão.
- **types/product.ts:** Interface `Product` conforme contrato.
- **Validações:** Funções de validação de nome, quantidade, etc., conforme regras de negócio.

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