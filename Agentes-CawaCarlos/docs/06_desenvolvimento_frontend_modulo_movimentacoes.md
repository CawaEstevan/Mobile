# Desenvolvimento front-end, módulo Movimentações

## 1. Contexto do módulo
Tela de detalhes do produto com histórico de movimentações. Botões para registrar entrada e saída com formulário de motivo e quantidade. Segue o padrão MVVM: a tela observa `MovementHistoryViewModel`, que chama UseCases do domínio para carregar histórico e registrar operações.

## 2. Contrato consumido
Seções 4.3.1 a 4.3.3 do `04_contratos_de_api.md` e módulo back-end de Movimentações.

Arquitetura: MVVM. `MovementHistoryScreen` observa `MovementHistoryViewModel`. O ViewModel chama `GetMovementsUseCase`, `AddEntryUseCase`, `AddExitUseCase` e expõe estado reativo da lista e das operações.

## 3. O que deve ser gerado
- MovementHistoryScreen.tsx: Lista de movimentações do produto. Observa `MovementHistoryViewModel`.
- MovementHistoryViewModel.ts: Estado (`movements`, `loading`, `error`, `operationResult`), ações `loadMovements(productId)`, `addEntry(productId, amount, reason)`, `addExit(productId, amount, reason)`.
- MovementFormModal.tsx: Modal para registrar entrada/saída com campos de quantidade e motivo.
- Componentes: MovementItem, Badge (entrada/saída).

## 4. Experiência esperada
- Histórico mostra data, tipo, quantidade e motivo.
- Entrada e saída usam modal com campos de quantidade e motivo.
- Validação local de quantidade positiva e motivo preenchido.
- Erro de estoque insuficiente exibe mensagem clara.
- Atualização da quantidade do produto reflete imediatamente (pode ser comunicada via callback ao módulo de Produtos).

## 5. Testes obrigatórios
- Teste de renderização do histórico vazio e com itens.
- Teste de interação: abrir modal, preencher, submeter.
- Teste do ViewModel: verificar atualizações de estado após entrada e saída.
- Teste de erro: tentar saída maior que estoque.

## 6. Critérios de aceite
1. Histórico exibe movimentações em ordem decrescente de data.
2. Modal de entrada/saída valida campos obrigatórios.
3. Erro de estoque insuficiente exibe mensagem e não fecha modal.
4. Registro bem-sucedido fecha modal e atualiza lista.

## 7. Pedido para o Agente Front-end
Gere a interface completa do módulo, consumindo o contrato aprovado, seguindo o padrão MVVM e incluindo os testes necessários.