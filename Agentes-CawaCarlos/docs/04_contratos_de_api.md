# Contratos de API

## 1. Objetivo
Definir a interface entre o front-end React Native e o backend Firebase (Firestore + Authentication), incluindo todos os endpoints lógicos, parâmetros, respostas e erros esperados.

Como o Firebase Firestore é um banco de dados NoSQL acessado diretamente pelo cliente (sem API REST tradicional), os "endpoints" aqui descritos representam operações de leitura/escrita via Firebase SDK, com estrutura de entrada e saída padronizada.

## 2. Padrão de versionamento
- Versão única `/v1` implícita no escopo inicial. Não há versionamento de caminho no Firestore.

## 3. Autenticação e autorização
- Provedor: Firebase Auth, método `signInWithEmailAndPassword`.
- Controle de acesso: Apenas usuários autenticados podem ler/escrever. Regras no Firebase Console validam `request.auth != null`.
- Token: Gerenciado automaticamente pelo SDK do Firebase.

## 4. Endpoints

### 4.1 Autenticação

| Campo | Valor |
|-------|-------|
| Função | `signInWithEmailAndPassword` |
| Parâmetros | `email: string`, `password: string` |
| Retorno | `UserCredential` (contém `user`) |
| Erro | `auth/user-not-found`, `auth/wrong-password`, `auth/invalid-email` |

### 4.2 CRUD de Produtos

#### 4.2.1 Listar todos os produtos

| Campo | Valor |
|-------|-------|
| Coleção | `products` |
| Operação | `getDocs` com query sem filtros |
| Ordenação | por `createdAt` decrescente |
| Retorno | Array de documentos `Product[]` |

#### 4.2.2 Obter produto por ID

| Campo | Valor |
|-------|-------|
| Coleção | `products` |
| Operação | `doc(id).get()` |
| Parâmetro | `id: string` |
| Retorno | `Product` ou `null` |

#### 4.2.3 Criar produto

| Campo | Valor |
|-------|-------|
| Coleção | `products` |
| Operação | `addDoc` |
| Payload | `{ name: string, sku: string \| null, quantity: number, minQuantity: number, createdAt: Timestamp }` |
| Validação | `quantity >= 0`, `minQuantity >= 0`, `name` obrigatório não vazio |
| Retorno | `DocumentReference` (ID gerado) |

#### 4.2.4 Atualizar produto

| Campo | Valor |
|-------|-------|
| Coleção | `products` |
| Operação | `doc(id).update()` |
| Parâmetro | `id: string` |
| Payload | `{ name?: string, sku?: string \| null, minQuantity?: number }` (parciais) |
| Retorno | `void` |

#### 4.2.5 Excluir produto

| Campo | Valor |
|-------|-------|
| Coleção | `products` |
| Operação | `doc(id).delete()` |
| Parâmetro | `id: string` |
| Condição | Produto não pode ter movimentações vinculadas (verificação prévia em `movements`) |
| Retorno | `void` |

### 4.3 Movimentações (Entrada e Saída)

#### 4.3.1 Listar movimentações de um produto

| Campo | Valor |
|-------|-------|
| Coleção | `movements` |
| Operação | `getDocs` com query `where("productId", "==", id)` |
| Ordenação | por `createdAt` decrescente |
| Parâmetro | `productId: string` |
| Retorno | Array de `Movement[]` |

#### 4.3.2 Registrar entrada

| Campo | Valor |
|-------|-------|
| Operação | Transação: `runTransaction` |
| Passos | 1. Ler documento do produto. 2. Incrementar `quantity`. 3. Adicionar documento em `movements`. |
| Payload | `{ productId: string, amount: number, reason: string }` |
| Validação | `amount > 0`, `reason` não vazio |
| Retorno | `void` |

#### 4.3.3 Registrar saída

| Campo | Valor |
|-------|-------|
| Operação | Transação: `runTransaction` |
| Passos | 1. Ler documento do produto. 2. Verificar `quantity >= amount`. Se não, lançar erro. 3. Decrementar `quantity`. 4. Adicionar documento em `movements`. |
| Payload | `{ productId: string, amount: number, reason: string }` |
| Validação | `amount > 0`, `reason` não vazio, `quantity >= amount` |
| Retorno | `void` |

## 5. Requisição e resposta com exemplos JSON reais

### 5.1 Documento `Product`

```json
{
  "id": "abc123",
  "name": "Café em grãos",
  "sku": "CF-001",
  "quantity": 15,
  "minQuantity": 10,
  "createdAt": "2026-04-30T12:00:00Z"
}

### 5.2 Documento 'Movement'

```json
{
  "id": "mov456",
  "productId": "abc123",
  "type": "out",
  "amount": 2,
  "reason": "Venda",
  "createdAt": "2026-04-30T14:30:00Z"
}

### 5.3 Payload de criação de produto

```json
{
  "name": "Açúcar refinado",
  "sku": null,
  "quantity": 50,
  "minQuantity": 5
}

### 5.4 Payload de entrada

```json
{
  "productId": "abc123",
  "amount": 10,
  "reason": "Compra de reposição"
}

### 5.5 Payload de saída

```json
{
  "productId": "abc123",
  "amount": 3,
  "reason": "Venda"
}

## 6. Erros esperados

| Situação | Código | Mensagem |
|----------|--------|----------|
| Email não cadastrado | `auth/user-not-found` | Usuário não encontrado |
| Senha incorreta | `auth/wrong-password` | Senha inválida |
| Email inválido | `auth/invalid-email` | Formato de email inválido |
| Nome do produto vazio | `app/invalid-product-name` | O nome do produto é obrigatório |
| Quantidade negativa | `app/invalid-quantity` | A quantidade não pode ser negativa |
| Valor de entrada/saída inválido | `app/invalid-amount` | O valor deve ser maior que zero |
| Motivo vazio | `app/invalid-reason` | O motivo da movimentação é obrigatório |
| Estoque insuficiente | `app/insufficient-stock` | Quantidade em estoque insuficiente para a saída |
| Exclusão com movimentações | `app/product-has-movements` | Não é possível excluir produto com histórico de movimentações |
| Não autenticado | `app/unauthenticated` | É necessário fazer login |

## 7. Regras de contrato
- Todos os campos obrigatórios seguem os modelos de payload descritos em 5.3, 5.4 e 5.5.
- Datas são armazenadas como `Timestamp` do Firestore (UTC).
- IDs de documento são gerados automaticamente pelo Firestore no momento da criação.
- Transações garantem atomicidade em entrada e saída.
- A autenticação usa sessão gerenciada pelo Firebase Auth.

## 8. Pedido para o Agente Designer de API
Documente o contrato completo e destaque qualquer ponto ambíguo que precise de validação antes do desenvolvimento.