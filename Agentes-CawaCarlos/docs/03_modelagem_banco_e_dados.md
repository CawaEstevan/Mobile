# Modelagem de banco de dados

## 1. Objetivo da modelagem
Definir a estrutura de dados no Firestore para suportar os requisitos, considerando que é um banco NoSQL orientado a documentos.

## 2. Entidades principais
### Coleção: `products`
Documento (id automático ou definido):
- `name`: string
- `sku`: string | null
- `quantity`: number
- `minQuantity`: number
- `createdAt`: timestamp

### Coleção: `movements`
Documento:
- `productId`: referência ao ID do produto
- `type`: "in" | "out"
- `amount`: number (positivo)
- `reason`: string
- `createdAt`: timestamp

## 3. Relacionamentos
- `movements.productId` referencia `products.id` (relacionamento lógico, sem chave estrangeira).
- Não usaremos subcoleções para manter queries de histórico simples (consultas cross-collection são possíveis no Firestore com consulta composta ou usando `where`).

## 4. Normalização e justificativa
- Firestore é NoSQL, não aplicamos formas normais clássicas. Optamos por coleções separadas para produtos e movimentações, em vez de embedar movimentações dentro do produto, porque o histórico pode crescer e o tamanho do documento é limitado a 1MB.

## 5. Padrões obrigatórios
- IDs de documento: autogerados pelo Firestore (evitar SKU como ID, pois SKU pode ser nulo ou mudar).
- Nomenclatura: camelCase para campos.
- Índices: criar índice composto em `movements` por `productId` + `createdAt` (desc) para histórico ordenado.

## 6. Estratégia de migração
- Não há migração inicial complexa. O app cria as coleções implicitamente ao adicionar documentos. Regras de segurança devem ser implantadas antes do primeiro deploy.

## 7. Script inicial
Como é Firestore, não há SQL. Em vez disso, fornecemos:
- Regras de segurança iniciais (a serem definidas no arquivo `04`).
- Estrutura das coleções em formato JSON para popular o console.

Exemplo de documento `products`:
```json
{
  "name": "Café em grãos",
  "sku": "CF-001",
  "quantity": 15,
  "minQuantity": 10,
  "createdAt": "2026-04-30T12:00:00Z"
}