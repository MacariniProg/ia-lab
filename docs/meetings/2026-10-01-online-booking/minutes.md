# Meeting 2026-10-01: online booking

## Files

| File | Content |
|---|---|
| this file | minutes |
| [transcript.md](transcript.md) | transcript with speakers |

## Sources and confidence

| Source | Covers |
|---|---|
| Meet captions | 00:00 to 14:02, with names; good quality |

## Participants

- Ana: product
- Bruno: development
- Carla: clinic front desk

## Why the meeting

The front desk spends the morning on the phone booking appointments. The idea is to let the pet owner book on the website.

## Summary by topic

### 1. Online booking [00:12–05:41]

Ana proposed that the pet owner picks the pet, the service, and a free slot on the website. Carla explained that each vet's schedule lives in a spreadsheet, with 30 min consultations and 15 min vaccines. Fit in appointments stay with the front desk. Cancellation by the pet owner is fine, but not at the last minute; the notice period was left open. Whether a booking is confirmed right away was also left open.

### 2. WhatsApp reminders [06:55–08:20]

Ana suggested a reminder one day before. Bruno pointed out it needs an integration and costs per message. Everyone agreed to handle it later, separately.

### 3. Emergencies [09:15]

Carla: an emergency is never booked on the website, always by phone.

### 4. Schedule spreadsheet [10:40]

Carla will send the updated spreadsheet with every vet's schedule.

## Decisions

- Fit in appointments stay with the front desk [02:16]
- Reminders are out of this first delivery [08:20]
- Emergencies are not booked on the website [09:15]

## Open points

- Minimum notice for the pet owner to cancel on their own [04:08]
- Booking confirmed right away or approved by the front desk [05:41]

## Owners

- Carla · updated schedule spreadsheet · by Friday
- Ana · written questions for the front desk · this week

## Routing
<!-- routing: /discovery -->
| Topic | Goes to | Status |
|---|---|---|
| 1. Online booking | `appointment-booking` (new) | done: appointment-booking business rules v2 |
| 2. WhatsApp reminders | `appointment-reminders` (new) | pending |
| 3. Emergencies | `appointment-booking` | done: appointment-booking business rules v2 |
| 4. Schedule spreadsheet | not a feature | — |
