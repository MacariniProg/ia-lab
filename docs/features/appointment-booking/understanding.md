# Understanding: online booking

Sources: meeting [2026-10-01 online booking](../../meetings/2026-10-01-online-booking/minutes.md)

## The request

- The pet owner goes to the website and picks the pet, the service, and a free slot [2026-10-01 01:05]
- Take the calls that are only for booking off the front desk [2026-10-01 00:31]

## Already decided

| Where | Rule or question |
|---|---|
| meeting 2026-10-01 | fit in appointments only through the front desk [02:16] |
| meeting 2026-10-01 | emergencies never through the website [09:15] |
| meeting 2026-10-01 | reminders are out of this delivery [08:20] |

## What exists

- No code yet: the schedule lives in one spreadsheet per vet, kept by the front desk.

## Dependencies

| Feature | Why | Without it |
|---|---|---|
| `stack` | no project created yet | nowhere to build |

## Risks

- Two pet owners booking the same slot at the same time.
- A pet owner's data (name, phone) shown to another pet owner.
- No shows going up if booking gets too easy.

## Questions for product

1. Until when can the pet owner cancel on their own? Sets how many slots the clinic loses.
2. Is a booking confirmed when made, or does the front desk approve it? Changes the front desk workload.
3. How many future appointments can a pet owner have per pet? Avoids overbooking.
4. What is the minimum lead time to book? Avoids an appointment booked 10 minutes ahead.

## Research questions

- How do other vet clinics handle cancellations and no shows in online booking?
- What does the LGPD (Lei Geral de Proteção de Dados, Brazil's data protection law) require to store a pet owner's name and phone?
