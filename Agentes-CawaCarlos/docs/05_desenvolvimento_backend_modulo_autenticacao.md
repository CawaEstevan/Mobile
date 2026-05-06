# Desenvolvimento back-end, módulo Autenticação

## 1. Contexto do módulo
Implementar o fluxo de autenticação do operador de estoque usando Firebase Auth com e-mail e senha. Este módulo é a base para todos os outros, pois todas as operações no Firestore exigem usuário autenticado.

Funcionalidades cobertas:
- Login com e-mail e senha.
- Verificação de sessão ativa ao abrir o app.
- Logout.
- Acesso ao usuário logado em qualquer parte do app (contexto).

## 2. Requisitos técnicos
- SDK: Firebase Auth.
- Linguagem: TypeScript.
- Framework: React Native.
- Padrão arquitetural: Context API do React para prover dados do usuário logado.
- Configuração: Arquivo `firebase.ts` com inicialização do app Firebase e exportação das instâncias `auth` e `db`.

## 3. Contrato da API consumido
Conforme `04_contratos_de_api.md`, seção 4.1:

| Função | `signInWithEmailAndPassword` |
|--------|------------------------------|
| Parâmetros | `email: string`, `password: string` |
| Retorno | `UserCredential` (contém `user`) |
| Erros esperados | `auth/user-not-found`, `auth/wrong-password`, `auth/invalid-email` |

Além do contrato explícito, usaremos:
- `onAuthStateChanged` para monitorar sessão.
- `signOut` para logout.

## 4. O que deve ser gerado
- firebase.ts: Inicialização do Firebase (com variáveis de ambiente).
- authService.ts: Funções `login(email, password)`, `logout()`, `onAuthChange(callback)`.
- AuthContext.tsx: Contexto React com estado de usuário, loading, funções de login/logout.
- useAuth.ts: Hook para consumir o contexto.
- types/auth.ts: Tipos `User` e `AuthState`.

## 5. Testes obrigatórios
- Teste unitário do `authService` mockando Firebase Auth.
- Teste unitário do `AuthContext` verificando estados de loading, autenticado, não autenticado.
- Teste de integração manual com credenciais reais de teste.
- Cobertura de 100% das funções públicas.

## 6. Critérios de aceite
1. Sessão ativa redireciona direto para tela principal.
2. Login válido redireciona para tela principal.
3. Erro de login exibe mensagem clara conforme contrato.
4. Logout volta para tela de login e bloqueia acesso a dados.
5. Contexto de autenticação disponível em qualquer componente.

## 7. Pedido para o Agente Back-end
Gere o código completo do módulo, junto com os testes, seguindo estritamente o contrato definido em `04_contratos_de_api.md`.