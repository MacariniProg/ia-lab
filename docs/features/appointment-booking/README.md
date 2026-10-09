# Online booking

Status: settled · Depth: full · Round: 1
Updated: 2026-10-08

The pet owner books a consultation or a vaccine on the website, in a free slot of the vet's schedule, without calling the front desk. The front desk follows the day's agenda.

## Sources

- meeting: [2026-10-01 online booking](../../meetings/2026-10-01-online-booking/minutes.md)

## Files

| File | What it has |
|---|---|
| [understanding.md](understanding.md) | the request, what is already decided, risks, questions |
| [research.md](research.md) | how other clinics do it, data protection rules |
| [product-analysis.md](product-analysis.md) | today's flow, what breaks, proposed flow, hypotheses H-n |
| [rounds/1/questionnaire.md](rounds/1/questionnaire.md) | questions for Ana and Carla |
| [rounds/1/answers.raw.md](rounds/1/answers.raw.md) | answers verbatim (Ana on 2026-10-03, Carla on 2026-10-05) |
| [rounds/1/analysis.md](rounds/1/analysis.md) | what the answers changed |
| [business-rules/v1.md](business-rules/v1.md) | version with 2 open points (P-1, P-2) |
| [business-rules/v2.md](business-rules/v2.md) | **current version**: business rules RN-n, no open points |
| [screens.md](screens.md) | screens and states (written by `/design`) |
| [specs/0001-appointment-booking.md](specs/0001-appointment-booking.md) | build spec (written by `/architect`) |

## On one page

- The pet owner only sees free slots of each vet's schedule; fit in appointments stay with the front desk.
- A booking is confirmed when made; the front desk can reschedule or cancel it at any time.
- The pet owner can cancel on their own up to 12 h before; after that, only the front desk.
- Emergencies are never booked on the website: the screen shows the phone number.
- WhatsApp reminders are another feature (`appointment-reminders`).
