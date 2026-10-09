# Agendamento online

Status: settled · Depth: full · Round: 1
Updated: 2026-10-08

O tutor (dono do animal) marca consulta ou vacina pelo site, num horário livre da grade do veterinário, sem ligar para a recepção. A recepção acompanha a agenda do dia.

## Fontes

- reunião: [2026-10-01 agendamento online](../../meetings/2026-10-01-agendamento-online/minutes.md)

## Arquivos

| Arquivo | O que tem |
|---|---|
| [understanding.md](understanding.md) | o pedido, o que já está decidido, riscos, perguntas |
| [research.md](research.md) | como outras clínicas fazem, regras de proteção de dados |
| [product-analysis.md](product-analysis.md) | fluxo de hoje, o que quebra, fluxo proposto, hipóteses H-n |
| [rounds/1/questionnaire.md](rounds/1/questionnaire.md) | perguntas para Ana e Carla |
| [rounds/1/answers.raw.md](rounds/1/answers.raw.md) | respostas literais (Ana em 2026-10-03, Carla em 2026-10-05) |
| [rounds/1/analysis.md](rounds/1/analysis.md) | o que as respostas mudaram |
| [business-rules/v1.md](business-rules/v1.md) | versão com 2 pendências (P-1, P-2) |
| [business-rules/v2.md](business-rules/v2.md) | **versão atual**: regras RN-n, sem pendências |
| [screens.md](screens.md) | telas e estados (escrito por `/design`) |
| [specs/0001-appointment-booking.md](specs/0001-appointment-booking.md) | spec de construção (escrita por `/architect`) |

## Em uma página

- O tutor só vê horários livres da grade de cada veterinário; encaixe continua só na recepção.
- O agendamento nasce confirmado; a recepção pode remarcar ou cancelar a qualquer momento.
- O tutor cancela sozinho até 12 h antes; depois disso, só a recepção.
- Urgência nunca é marcada pelo site: a tela mostra o telefone.
- Lembretes por WhatsApp são outra feature (`appointment-reminders`).
