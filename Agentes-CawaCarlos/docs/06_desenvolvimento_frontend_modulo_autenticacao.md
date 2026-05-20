# Desenvolvimento front-end, módulo Autenticação

## 1. Contexto do módulo
Tela de login onde o operador informa e-mail e senha. Deve cobrir estados de carregamento, erro e redirecionamento após sucesso. Segue o padrão MVVM: a Screen observa o AuthViewModel, que por sua vez chama os UseCases definidos no módulo back-end de Autenticação.

## 2. Contrato consumido
Seção 4.1 do `04_contratos_de_api.md` e módulo back-end de Autenticação.

Arquitetura: O front-end segue o padrão MVVM. A camada de apresentação não acessa dados diretamente; toda lógica de estado e ações está no ViewModel. O ViewModel chama os UseCases da camada de domínio, que orquestram o fluxo de autenticação.

## 3. O que deve ser gerado
- LoginScreen.tsx: Tela com campos de e-mail, senha, botão de login. Observa AuthViewModel.
- AuthViewModel.ts: Estado reativo (`user`, `loading`, `error`), ações `login(email, password)`, `logout()`. Chama `LoginUseCase` e `LogoutUseCase`.
- Componentes: Input com validação, botão com estado de loading, mensagem de erro.

## 4. Experiência esperada
- Campos validados localmente (e-mail formato, senha preenchida).
- Botão desabilitado durante loading.
- Mensagem de erro clara conforme código do contrato (usuário não encontrado, senha inválida).
- Redirecionamento automático se já autenticado (estado inicial do ViewModel).

## 5. Testes obrigatórios
- Teste de renderização dos campos e botão.
- Teste de interação: preenchimento, submissão, estados de loading e erro.
- Teste do ViewModel: verificar se `login()` atualiza estado corretamente em caso de sucesso e erro.
- Teste de fluxo: login bem-sucedido redireciona.

## 6. Critérios de aceite
1. Tela exibe campos de e-mail e senha.
2. Botão de login chama ação do ViewModel.
3. Erro exibe mensagem amigável.
4. Sucesso redireciona para tela principal.
5. Sessão ativa pula a tela de login.

## 7. Pedido para o Agente Front-end
Gere a interface completa do módulo, consumindo o contrato aprovado, seguindo o padrão MVVM e incluindo os testes necessários.