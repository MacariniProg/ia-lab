# Scope: PetVida

App da clínica veterinária PetVida: o tutor agenda pelo site e a recepção cuida da agenda do dia.

**Build approach:** Tracer Bullet (um caminho fino de ponta a ponta primeiro, depois engrossa).
**Workflow:** Beta (depois do develop, check verify e depois test). O nível padrão de rigor do projeto.

_São recomendações para manter a construção em ordem, não exigências. Você decide quando uma feature está `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack e arquitetura | Foundation | planned |
| 2 | Agendamento online | Slice 1 | in-progress |
| 3 | Lembretes de consulta | Slice 2 | planned |

## Foundations

### 1. Stack e arquitetura · needs a decision
Decidir o stack e criar um projeto que roda, para cada fatia construir em cima de estrutura real.
**Done when:** o stack está numa spec e o projeto vazio sobe localmente.
- [ ] Decide the stack (spec): `/architect stack`
Folder `docs/features/stack/`

## Slice 1: Agendamento online

### 2. Agendamento online · in-progress
O tutor marca consulta ou vacina num horário livre; a recepção vê a agenda do dia.
**Done when:** as regras de `business-rules/v2.md` valem (RN-01..RN-10).
- [x] Rules settled: `/discovery appointment-booking`
- [x] Screens done: `/design appointment-booking`
- [x] Design it (spec): `/architect appointment-booking`
- [ ] Build it: `/develop appointment-booking`
   - [ ] Modelo de dados e horários livres (AC-2..4)
   - [ ] Marcar e cancelar (AC-1, AC-5, AC-6, AC-9)
   - [ ] Telas do tutor e agenda do dia (AC-7, AC-8)
- [ ] Verify it: `/check verify appointment-booking`
- [ ] Test it: `/test appointment-booking`
Folder `docs/features/appointment-booking/` · spec 0001

## Slice 2: Lembretes de consulta

### 3. Lembretes de consulta
Lembrar o tutor da consulta um dia antes, pelo WhatsApp.
**Done when:** o tutor recebe o lembrete antes de cada consulta confirmada.
- [ ] Settle the rules: `/discovery "lembretes de consulta"`
Folder `docs/features/appointment-reminders/`

## Deferred
- **Pagamento online**: pagar a consulta no agendamento · needs a decision
