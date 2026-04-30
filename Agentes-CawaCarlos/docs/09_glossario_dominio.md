# Glossário de domínio

## 1. Termos do negócio
- **Produto:** item físico cadastrado no estoque.
- **SKU:** código de identificação único (opcional no sistema).
- **Quantidade atual:** número de unidades em estoque.
- **Quantidade mínima:** limiar que define "baixo estoque".
- **Movimentação:** registro de entrada ou saída de itens de um produto.
- **Motivo:** justificativa textual para uma movimentação.
- **Baixo estoque:** estado em que a quantidade atual ≤ quantidade mínima.

## 2. Termos técnicos
- **Firestore:** banco de dados NoSQL do Firebase.
- **Firebase Auth:** serviço de autenticação.
- **Coleção:** equivalente a uma tabela no Firestore.
- **Documento:** equivalente a um registro no Firestore.
- **Transação:** operação atômica no Firestore.

## 3. Convenções de nomenclatura
- Campos no Firestore: camelCase (ex: `minQuantity`).
- Componentes React: PascalCase (ex: `ProductList`).
- Funções e variáveis: camelCase.

## 4. Termos ambíguos resolvidos
(Nenhum até o momento)

## 5. Pedido para o Agente Documentador
Manter este arquivo consistente. Toda nova definição passa por humano.