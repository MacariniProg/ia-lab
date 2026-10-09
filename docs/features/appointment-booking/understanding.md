# Entendimento: agendamento online

Fontes: reunião [2026-10-01 agendamento online](../../meetings/2026-10-01-agendamento-online/minutes.md)

## O pedido

- O tutor entra no site, escolhe o animal, o serviço e um horário livre [2026-10-01 01:05]
- Tirar da recepção as ligações que são só para marcar [2026-10-01 00:31]

## Já decidido

| Onde | Regra ou pergunta |
|---|---|
| reunião 2026-10-01 | encaixe só pela recepção [02:16] |
| reunião 2026-10-01 | urgência nunca pelo site [09:15] |
| reunião 2026-10-01 | lembretes ficam fora desta entrega [08:20] |

## O que existe

- Nenhum código ainda: a grade de horários vive numa planilha por veterinário, mantida pela recepção.

## Dependências

| Feature | Por quê | Sem ela |
|---|---|---|
| `stack` | não há projeto criado | não há onde construir |

## Riscos

- Dois tutores marcando o mesmo horário ao mesmo tempo.
- Dados do tutor (nome, telefone) expostos a outro tutor.
- Faltas aumentarem se marcar ficar fácil demais.

## Perguntas para o produto

1. Até quando o tutor pode cancelar sozinho? Define quanto horário a clínica perde.
2. O agendamento nasce confirmado ou a recepção aprova? Muda a carga da recepção.
3. Quantas consultas futuras um tutor pode ter por animal? Evita reserva em excesso.
4. Qual a antecedência mínima para marcar? Evita consulta marcada para daqui a 10 minutos.

## Perguntas de pesquisa

- Como outras clínicas veterinárias tratam cancelamento e falta no agendamento online?
- O que a LGPD (Lei Geral de Proteção de Dados) exige para guardar nome e telefone do tutor?
