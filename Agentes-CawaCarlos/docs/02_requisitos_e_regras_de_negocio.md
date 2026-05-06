# Requisitos e regras de negócio

## 1. Requisitos funcionais
- RF1 – Autenticação: O operador faz login com e-mail e senha (Firebase Auth).
- RF2 – Cadastro de produto:** Criar produto informando nome, SKU (opcional), quantidade inicial e quantidade mínima para alerta.
- RF3 – Listagem de produtos:** Exibir todos os produtos com nome, SKU, quantidade atual e indicador visual (ex: cor vermelha) se quantidade ≤ quantidade mínima.
- RF4 – Registro de entrada:** Aumentar a quantidade de um produto informando valor e motivo (ex: "compra", "devolução").
- RF5 – Registro de saída:** Diminuir a quantidade de um produto informando valor e motivo (ex: "venda", "uso interno").
- RF6 – Histórico de movimentações:** Exibir as últimas movimentações de cada produto (data, tipo, quantidade, motivo).
- RF7 – Alerta de baixo estoque:** Ao abrir o app, destacar produtos com quantidade ≤ quantidade mínima.

## 2. Requisitos não funcionais
- RNF1 – Desempenho:** Listagem de produtos deve carregar em menos de 2 segundos para até 1000 produtos.
- RNF2 – Segurança:** Apenas usuários autenticados podem ler ou escrever dados. Regras do Firestore devem validar autenticação e permissão.
- RNF3 – Disponibilidade:** O app depende da disponibilidade do Firebase. Não há modo offline.
- RNF4 – Manutenibilidade:** Código deve seguir boas práticas de TypeScript, componentes reutilizáveis, separação de serviços e hooks.
- RNF5 – Usabilidade:** Interface simples, mínimo de telas, fluxo linear.

## 3. Regras de negócio
- RN1 – Quantidade não pode ficar negativa:** Tentar retirar mais do que existe deve gerar erro e impedir a operação.
- RN2 – Quantidade mínima padrão:** Se não informada no cadastro, assumir zero (sem alerta).
- RN3 – Motivo obrigatório em movimentações:** Toda entrada ou saída deve ter um texto de motivo.
- RN4 – Produto sem movimentações pode ser excluído:** Apenas se não houver histórico de movimentações vinculado.

## 4. Casos de uso prioritários
1. Fazer login.
2. Cadastrar um produto.
3. Registrar entrada de itens.
4. Registrar saída de itens.
5. Visualizar lista com alertas de baixo estoque.

## 5. Critérios de aceite
- O operador consegue se autenticar e ver apenas os dados do seu projeto Firebase.
- Ao cadastrar um produto, ele aparece na lista imediatamente.
- Após uma entrada ou saída, a quantidade do produto é atualizada corretamente.
- Produtos com quantidade abaixo ou igual ao mínimo aparecem em destaque.
- Tentar retirar mais do que o disponível exibe mensagem de erro e não altera o estoque.

## 6. Dependências entre requisitos
- RF3, RF4, RF5, RF6 dependem de RF1 (autenticação).
- RF7 depende de RF3 e RN1.

## 7. Pedido para o Agente Arquiteto
Organize estes requisitos, identifique inconsistências e indique lacunas que precisam ser decididas antes do desenvolvimento.