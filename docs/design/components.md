# Componentes · PetVida DS

Gerado por `/penpot setup` a partir da biblioteca. Reaproveite antes de criar um componente novo.

## Conjuntos de variantes

| Componente | Propriedades e valores | Quando usar |
|---|---|---|
| Button | variant: primary, secondary, ghost · size: md, sm · state: default, disabled, loading | primary só para a ação principal da tela |
| Input | type: text, phone, email · state: default, focus, error, disabled | campos de formulário |
| SlotChip | state: free, selected, unavailable | um horário na lista de horários livres |
| AppointmentCard | status: confirmada, cancelada, realizada, falta | uma consulta em Minhas consultas e na agenda do dia |
| Badge | tone: neutral, success, warning, danger | status curto ao lado de um título |
| Toast | tone: success, danger | resultado de uma ação |
| EmptyState | kind: no-data, error | listas vazias e falhas de carregamento |

## Componentes simples

- `icons/*`: ícones de 24 px (calendar, paw, phone, clock, close).
- `layout/*`: `layout/header-mobile`, `layout/header-desktop`, `layout/footer-phone`.
