# Reunião 2026-10-01: agendamento online

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| este arquivo | ata |
| [transcript.md](transcript.md) | transcrição com falas |

## Fontes e confiança

| Fonte | Cobre |
|---|---|
| legendas do Meet | 00:00 a 14:02, com nomes; boa qualidade |

## Participantes

- Ana: produto
- Bruno: desenvolvimento
- Carla: recepção da clínica

## Por que a reunião

A recepção gasta a manhã no telefone marcando consultas. A ideia é deixar o tutor (dono do animal) agendar pelo site.

## Resumo por tema

### 1. Agendamento online [00:12–05:41]

Ana propôs que o tutor escolha animal, serviço e horário livre no site. Carla explicou que a grade de cada veterinário está numa planilha, com consulta de 30 min e vacina de 15 min. Encaixe continua só na recepção. Cancelamento pelo tutor é aceito, mas não em cima da hora; o prazo ficou em aberto. Também ficou em aberto se o agendamento já nasce confirmado.

### 2. Lembretes por WhatsApp [06:55–08:20]

Ana sugeriu um lembrete um dia antes. Bruno lembrou que envolve integração e custo por mensagem. Todos concordaram em tratar depois, separado.

### 3. Urgências [09:15]

Carla: urgência nunca é marcada pelo site, é sempre por telefone.

### 4. Planilha de horários [10:40]

Carla vai mandar a planilha atualizada da grade de todos os veterinários.

## Decisões

- Encaixe fica só com a recepção [02:16]
- Lembretes ficam fora desta primeira entrega [08:20]
- Urgência não é agendada pelo site [09:15]

## Pontos em aberto

- Prazo mínimo para o tutor cancelar sozinho [04:08]
- Agendamento confirmado na hora ou aprovado pela recepção [05:41]

## Responsáveis

- Carla · planilha de horários atualizada · até sexta
- Ana · perguntas por escrito para a recepção · esta semana

## Encaminhamento
<!-- routing: /discovery -->
| Tema | Vai para | Status |
|---|---|---|
| 1. Agendamento online | `appointment-booking` (nova) | done: appointment-booking business rules v2 |
| 2. Lembretes por WhatsApp | `appointment-reminders` (nova) | pending |
| 3. Urgências | `appointment-booking` | done: appointment-booking business rules v2 |
| 4. Planilha de horários | não é feature | — |
