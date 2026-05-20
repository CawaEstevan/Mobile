# Desenvolvimento front-end, módulo Produtos

## 1. Contexto do módulo
Tela de listagem de produtos com destaque visual para itens em baixo estoque. Tela de cadastro/edição de produto. Ações de excluir e visualizar detalhes. Segue o padrão MVVM: cada tela observa seu ViewModel específico, que chama os UseCases do domínio.

## 2. Contrato consumido
Seções 4.2.1 a 4.2.5 do `04_contratos_de_api.md` e módulo back-end de Produtos.

Arquitetura: MVVM. As telas (`ProductListScreen`, `ProductFormScreen`, `ProductDetailScreen`) observam ViewModels (`ProductListViewModel`, `ProductFormViewModel`). Os ViewModels chamam UseCases (`GetProductsUseCase`, `CreateProductUseCase`, etc.) e expõem estado reativo.

## 3. O que deve ser gerado
- ProductListScreen.tsx: Lista com indicador de baixo estoque (cor, ícone). Observa `ProductListViewModel`.
- ProductFormScreen.tsx: Formulário de criação/edição. Observa `ProductFormViewModel`.
- ProductDetailScreen.tsx: Detalhes do produto.
- ProductListViewModel.ts: Estado da lista (`products`, `loading`, `error`), ações `loadProducts()`, `deleteProduct(id)`.
- ProductFormViewModel.ts: Estado do formulário, validações, ação `save()` para criar ou editar.
- Componentes: ProductCard, StockIndicator, EmptyState.

## 4. Experiência esperada
- Lista carrega com indicador de loading.
- Produtos com quantidade ≤ mínima aparecem em vermelho ou com alerta.
- Formulário valida campos obrigatórios.
- Exclusão exibe confirmação e trata erro se houver movimentações.
- Feedback visual para toda ação (sucesso/erro).

## 5. Testes obrigatórios
- Teste de renderização da lista vazia e com itens.
- Teste de interação: criar, editar, excluir.
- Teste do ViewModel: verificar atualizações de estado em load, create, delete.
- Teste de indicador de baixo estoque.

## 6. Critérios de aceite
1. Lista exibe todos os produtos com nome, SKU e quantidade.
2. Itens em baixo estoque têm destaque visual.
3. Cadastro com nome vazio mostra erro.
4. Exclusão de produto com movimentações mostra erro.
5. Edição atualiza dados imediatamente na lista.

## 7. Pedido para o Agente Front-end
Gere a interface completa do módulo, consumindo o contrato aprovado, seguindo o padrão MVVM e incluindo os testes necessários.