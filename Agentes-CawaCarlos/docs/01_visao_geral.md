# Visão geral do sistema

## 1. Objetivo do projeto
Desenvolver um aplicativo mobile simples de controle de estoque de material escolar, que permita cadastrar produtos (ex: cadernos, lápis, borrachas, mochilas), registrar entradas e saídas, e alertar quando um produto atingir nível de estoque baixo.

## 2. Problema que o sistema resolve
Pequenas papelarias, livrarias ou almoxarifados escolares perdem vendas ou atrasam a reposição por não saberem que um item está acabando. Este sistema oferece uma visão rápida do estoque atual de materiais escolares e avisa ativamente quando é hora de repor.

## 3. Atores envolvidos
- Operador de estoque: único perfil. Cadastra produtos, registra movimentações e visualiza alertas.
- Administrador do Firebase: gerencia o projeto no console Firebase (fora do app).

## 4. Escopo inicial, dentro e fora
Dentro:
- Cadastro de produtos com nome, SKU, quantidade atual e quantidade mínima.
- Registro de entrada e saída de itens, com data e motivo.
- Tela de listagem de produtos com destaque visual para itens em baixo estoque.
- Autenticação simples por e-mail/senha usando Firebase Auth.

Fora desta fase:
- Múltiplos almoxarifados ou filiais.
- Controle de lotes, validade, fornecedores.
- Notificações push.
- Relatórios exportáveis.
- Integração com sistemas de venda.

## 5. Restrições técnicas
- Front-end: React Native com TypeScript.
- Backend como serviço: Firebase (Firestore para dados, Authentication para login).
- Plataforma inicial: Android e iOS (via React Native).
- Ambiente de desenvolvimento: VS Code, Expo ou React Native CLI (a decidir pelo Agente Back-end/Front-end, sem preferência do Arquiteto).
- Sem servidor próprio: toda lógica de negócio reside no cliente, respeitando regras de segurança do Firestore.
- Arquitetura interna: Clean Architecture com MVVM na camada de apresentação, organizada em features (auth, products, movements).


## 6. Premissas
- O app é monousuário por dispositivo, mas os dados são compartilhados entre todos os operadores via Firestore (leitura/escrita compartilhada).
- Conexão com internet é necessária para operação normal; modo offline não será tratado na versão 1.
- A quantidade em estoque é atualizada atomicamente no Firestore usando transactions para evitar inconsistências.

## 7. Riscos conhecidos
1. Concorrência em movimentações simultâneas pode gerar contagem errada – mitigado com transações Firestore.
2. Segurança: regras do Firestore precisam permitir apenas usuários autenticados. Será definido no 04 e na configuração do Firebase.
3. Falta de notificação push pode reduzir a utilidade do alerta – tratado como pendência futura.

## 8. Pedido para o Agente Arquiteto
A arquitetura foi definida como Clean Architecture + MVVM, conforme documento de arquitetura mobile fornecido. As estruturas de pastas e responsabilidades por camada estão detalhadas nos arquivos 05 e 06.