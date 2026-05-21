# Desenvolvimento front-end, módulo Autenticação

## 1. Contexto do módulo
Tela de login onde o operador informa e-mail e senha. Deve cobrir estados de carregamento, erro e redirecionamento após sucesso. Segue arquitetura baseada em componentes: a tela usa o hook `useAuth` e o serviço `authService` do módulo back-end de Autenticação.

## 2. Contrato consumido
Seção 4.1 do `04_contratos_de_api.md` e módulo back-end de Autenticação.

Arquitetura: Baseada em componentes. A tela é um componente que usa hooks para estado e serviços para acesso a dados. Nenhuma lógica de negócio no componente.

## 3. O que deve ser gerado
- LoginScreen.tsx: Tela com campos de e-mail, senha, botão de login. Usa `useAuth` hook.
- Componentes auxiliares: Input com validação, botão com estado de loading, mensagem de erro.
- Integração: `useAuth` hook expõe `user`, `loading`, `error`, `login`, `logout`.

## 4. Experiência esperada
- Campos validados localmente (e-mail formato, senha preenchida).
- Botão desabilitado durante loading.
- Mensagem de erro clara conforme contrato (usuário não encontrado, senha inválida).
- Redirecionamento automático se já autenticado.

## 5. Testes obrigatórios
- Teste de renderização dos campos e botão.
- Teste de interação: preenchimento, submissão, estados de loading e erro.
- Teste do hook `useAuth`: verificar se `login()` atualiza estado corretamente.
- Teste de fluxo: login bem-sucedido redireciona.

## 6. Critérios de aceite
1. Tela exibe campos de e-mail e senha.
2. Botão de login chama `login` do hook `useAuth`.
3. Erro exibe mensagem amigável.
4. Sucesso redireciona para tela principal.
5. Sessão ativa pula a tela de login.

## 7. Pedido para o Agente Front-end
Gere a interface completa do módulo, consumindo o contrato aprovado e os hooks/serviços do módulo back-end, seguindo a arquitetura baseada em componentes.