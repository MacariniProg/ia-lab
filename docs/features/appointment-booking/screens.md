# Agendamento online · telas

Status: done · Mode: final · Validation round: 1
Business rules: [v2](business-rules/v2.md) · Design file: [PetVida · appointment-booking](https://design.penpot.app/#/workspace?team-id=example&file-id=example)
Updated: 2026-10-07

## Telas

| # | Fluxo | Tela / frame | Passo da jornada | Regras | Pendências | Página · frame |
|---|---|---|---|---|---|---|
| T-1 | 01 Marcar | Escolher animal e serviço | 1 | RN-01, RN-03, RN-05, RN-09 | | Marcar · `f-101` |
| T-2 | 01 Marcar | Escolher horário | 2 | RN-02, RN-03, RN-04 | | Marcar · `f-102` |
| T-3 | 01 Marcar | Confirmar agendamento | 3 | RN-06 | | Marcar · `f-103` |
| T-4 | 01 Marcar | Agendamento confirmado | 3 | RN-06 | | Marcar · `f-104` |
| T-5 | 02 Minhas consultas | Minhas consultas | 4 | RN-07, RN-08 | | Minhas consultas · `f-201` |
| T-6 | 03 Recepção | Agenda do dia | 5 | RN-08, RN-10 | | Recepção · `f-301` |

## Matriz de estados

| Tela | carregando | vazio | erro | sem permissão | sucesso |
|---|---|---|---|---|---|
| T-1 Escolher animal e serviço | ✓ | ✓ (nenhum animal cadastrado) | ✓ | n/a (só tutor logado chega aqui) | ✓ |
| T-2 Escolher horário | ✓ | ✓ (sem horário livre na semana) | ✓ | n/a (mesmo motivo) | ✓ |
| T-3 Confirmar agendamento | n/a (dados já carregados) | n/a (sempre tem um horário escolhido) | ✓ (horário tomado nesse meio tempo) | n/a | ✓ |
| T-5 Minhas consultas | ✓ | ✓ | ✓ | n/a | ✓ |
| T-6 Agenda do dia | ✓ | ✓ (dia sem consultas) | ✓ | ✓ (tutor tenta abrir) | ✓ |

## Casos de borda

| Caso | Regra | Onde aparece |
|---|---|---|
| Animal já tem 2 consultas futuras | RN-05 | T-1 `Escolher animal e serviço — limite` |
| Horário a menos de 2 h | RN-04 | T-2: não aparece na lista |
| Outro tutor pegou o horário antes de confirmar | RN-02 | T-3 `Confirmar agendamento — erro` |
| Cancelar a menos de 12 h | RN-07, RN-08 | T-5 `Minhas consultas — fora do prazo`: botão some, mostra o telefone |
| Tutor quer encaixe ou urgência | RN-09 | T-1: aviso com o telefone da clínica |

## Decisões

| # | Decisão | Telas | Fonte |
|---|---|---|---|
| D-1 | O telefone da clínica aparece fixo no rodapé de T-1 e T-5, não só no aviso | T-1, T-5 | revisão da Ana por comentário no Penpot, 2026-10-06 |
