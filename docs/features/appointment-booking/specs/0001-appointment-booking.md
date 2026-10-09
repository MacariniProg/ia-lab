# 0001. Agendamento online com horários calculados da grade

**Date**: 2026-10-08
**Status**: Proposed

## Summary

O tutor marca consulta ou vacina pelo site e o sistema calcula os horários livres na hora, a partir da grade de cada veterinário e das consultas já marcadas. Não guardamos uma tabela de horários pré gerados. Para construir, basta a grade, os serviços com a duração e as consultas.

## Context

Hoje a grade vive numa planilha e a recepção marca tudo por telefone. A feature precisa mostrar só horários livres (RN-02), respeitar a duração de cada serviço (RN-03) e impedir que dois tutores peguem o mesmo horário. Sem decidir de onde vêm os horários livres, a construção inventaria a regra.

## Requirements

**Inputs**: [business rules v2](../business-rules/v2.md) · [screens](../screens.md) (done)

**User stories**:
- Como tutor, quero marcar consulta pelo site para não depender do telefone.
- Como recepção, quero ver a agenda do dia e marcar falta para saber quem falta muito.

**Acceptance criteria**:
- **AC-1** (RN-01; T-1): sem conta, o tutor é levado a criar uma antes de agendar.
- **AC-2** (RN-02, RN-03, RN-04; T-2): a lista mostra só intervalos livres do tamanho do serviço, a partir de 2 h depois de agora.
- **AC-3** (RN-02; T-3): se o horário foi tomado entre a escolha e a confirmação, o tutor vê o erro e volta para T-2; nunca existem duas consultas no mesmo horário do mesmo veterinário.
- **AC-4** (RN-05; T-1): um animal com 2 consultas futuras não pode marcar outra.
- **AC-5** (RN-06; T-4): a consulta marcada já aparece como confirmada.
- **AC-6** (RN-07, RN-08; T-5): o tutor cancela até 12 h antes; depois disso o botão some e aparece o telefone.
- **AC-7** (RN-10; T-6): a recepção marca cada consulta do dia como realizada ou falta.
- **AC-8** (RN-09; T-1): o site não oferece encaixe nem urgência; mostra o telefone.
- **AC-9**: um tutor nunca vê consultas de outro tutor.

## Options considered

### Option 1: Calcular horários livres na leitura

A cada busca, o sistema pega a grade do veterinário, tira as consultas marcadas e corta em intervalos do tamanho do serviço.

**Pros**:
- A grade é a única fonte; mudar a grade muda os horários na hora.

**Cons**:
- Cada busca faz uma conta; com poucos veterinários, é barata.

### Option 2: Tabela de horários pré gerados

Um processo gera todos os horários da semana numa tabela e marca cada um como livre ou ocupado.

**Pros**:
- A busca é uma leitura simples.

**Cons**:
- Mudou a grade, precisa gerar de novo; dois lugares para a mesma verdade.

## Decision

**Chosen option**: Option 1: Calcular horários livres na leitura

Os horários livres são calculados da grade e das consultas a cada busca, e a marcação é protegida por uma restrição única de veterinário e início.

## Rationale

A clínica tem poucos veterinários e a grade muda toda semana pela planilha da recepção. Calcular na leitura mantém uma fonte só. O risco de dois tutores no mesmo horário (AC-3) fica com o banco, por uma restrição única, e não com a tela.

## Feature design

**Data model sketch**:
- `vet` (id, nome)
- `work_block` (id, vet_id FK, dia da semana, início, fim)
- `service` (id, nome, duração em minutos)
- `pet` (id, tutor_id FK, nome)
- `appointment` (id, pet_id FK, vet_id FK, service_id FK, início, fim, status); único (vet_id, início) enquanto status = confirmada

**State transitions**: confirmada → cancelada · confirmada → realizada · confirmada → falta

**API surface**:
| Endpoint | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| /slots | GET | service_id, semana | lista de (vet, início) | tutor | 422 |
| /appointments | POST | pet_id, vet_id, service_id, início | id, status | tutor | 409 horário tomado, 422 limite ou antecedência |
| /appointments/:id/cancel | POST | | status | tutor dono, recepção | 403 fora do prazo |
| /appointments/:id/attendance | POST | realizada ou falta | status | recepção | 403 |

**Value sourcing**:
| Action | Value produced / displayed | Source |
|---|---|---|
| listar horários | intervalos livres | `work_block` menos `appointment` confirmadas, cortado pela duração de `service` |
| listar horários | "agora" para a antecedência de 2 h | relógio do servidor, fuso da clínica (`America/Sao_Paulo`) |
| cancelar | prazo de 12 h | `appointment.início` menos 12 h, mesmo fuso |

**Key invariants**: nunca duas consultas confirmadas com o mesmo veterinário e início; no máximo 2 consultas futuras confirmadas por animal.

**Security model**: o tutor lê e cancela só consultas dos próprios animais; a recepção lê e altera todas.

**Critical test scenarios**:
- Happy path: marcar, ver em Minhas consultas, cancelar no prazo, verifica **AC-2**, **AC-5**, **AC-6**
- Failure case: dois tutores confirmam o mesmo horário ao mesmo tempo, verifica **AC-3**
- Auth/permission: tutor tenta abrir consulta de outro tutor e recebe 404, verifica **AC-9**

## Build plan

1. Migração do modelo de dados com a restrição única, satisfaz **AC-3**, **AC-4**
2. Cálculo de horários livres e `/slots`, satisfaz **AC-2**
3. Marcar e cancelar com as regras de prazo e limite, satisfaz **AC-1**, **AC-4**, **AC-5**, **AC-6**, **AC-9**
4. Telas T-1 a T-5 a partir dos frames, satisfaz **AC-1**, **AC-6**, **AC-8**
5. Agenda do dia (T-6) com realizada e falta, satisfaz **AC-7**

## Consequences

**Positive**:
- A grade é a única fonte de horários.

**Negative / tradeoffs**:
- A grade ainda vem da planilha; alguém precisa cadastrá-la no sistema.

## Follow up

- [ ] O stack ainda não tem spec: `/architect stack` antes de `/develop appointment-booking`.
