# Desenvolvimento back-end, módulo Autenticação

## 1. Contexto do módulo
Implementar o fluxo de autenticação do operador de estoque usando Firebase Auth com e-mail e senha. Este módulo é a base para todos os outros, pois todas as operações no Firestore exigem usuário autenticado.

Funcionalidades cobertas:
- Login com e-mail e senha.
- Verificação de sessão ativa ao abrir o app.
- Logout.
- Acesso ao usuário logado em qualquer parte do app (hook).

## 2. Requisitos técnicos
- SDK: Firebase Auth.
- Linguagem: TypeScript.
- Framework: React Native com Expo.
- Padrão: Arquitetura baseada em componentes — serviços para acesso ao Firebase, hooks para estado e ações.

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

### 4.1 Arquitetura e padrão
Arquitetura baseada em componentes. O código é organizado em features, cada uma com componentes de UI, serviços de acesso a dados e hooks para estado. Não há camadas rígidas — a lógica fica em serviços e hooks, e a UI em componentes.

### 4.2 Estrutura de pastas esperada

src/
├── config/
│ └── firebase.ts
├── features/
│ └── auth/
│ ├── components/
│ │ └── LoginScreen.tsx
│ ├── services/
│ │ └── authService.ts
│ ├── hooks/
│ │ └── useAuth.ts
│ └── types/
│ └── auth.ts


### 4.3 O que cada arquivo deve conter
- config/firebase.ts: Inicialização do Firebase (com variáveis de ambiente). Exportar instâncias `auth` e `db`.
- features/auth/services/authService.ts:** Funções `login(email, password)`, `logout()`, `onAuthChange(callback)` encapsulando Firebase Auth.
- features/auth/hooks/useAuth.ts: Hook que usa `authService` e `onAuthStateChanged`. Gerencia estado reativo (`user`, `loading`, `error`). Provê funções `login` e `logout`.
- features/auth/components/LoginScreen.tsx: Tela de login que usa `useAuth`. Campos de e-mail e senha, botão de login, tratamento de erros.
- features/auth/types/auth.ts:** Tipos `User` (uid, email) e `AuthState`.

## 5. Testes obrigatórios
- Teste unitário do `authService` mockando Firebase Auth.
- Teste do hook `useAuth`: verificar estados de loading, autenticado, não autenticado.
- Teste de integração manual com credenciais reais de teste.

## 6. Critérios de aceite
1. Sessão ativa redireciona para tela principal.
2. Login válido redireciona para tela principal.
3. Erro de login exibe mensagem clara conforme contrato.
4. Logout volta para tela de login e bloqueia acesso a dados.
5. Hook `useAuth` acessível em qualquer componente.

## 7. Pedido para o Agente Back-end
Gere o código completo do módulo, junto com os testes, seguindo estritamente o contrato definido em `04_contratos_de_api.md` e a estrutura baseada em componentes.