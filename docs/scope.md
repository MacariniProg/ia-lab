# Scope: PetVida

App for the PetVida veterinary clinic: the pet owner books online and the front desk runs the day's schedule.

**Build approach:** Tracer Bullet (one thin end to end path first, then thicken it).
**Workflow:** Beta (after develop, check verify and then test). The project's default level of rigor.

_These are recommendations to keep the build in order, not requirements. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack and architecture | Foundation | planned |
| 2 | Online booking | Slice 1 | in-progress |
| 3 | Appointment reminders | Slice 2 | planned |

## Foundations

### 1. Stack and architecture · needs a decision
Decide the stack and create a project that runs, so every slice builds on a real structure.
**Done when:** the stack is in a spec and the empty project starts locally.
- [ ] Decide the stack (spec): `/architect stack`
Folder `docs/features/stack/`

## Slice 1: Online booking

### 2. Online booking · in-progress
The pet owner books a consultation or vaccine in a free slot; the front desk sees the day's schedule.
**Done when:** the rules in `business-rules/v2.md` hold (RN-01..RN-10).
- [x] Rules settled: `/discovery appointment-booking`
- [x] Screens done: `/design appointment-booking`
- [x] Design it (spec): `/architect appointment-booking`
- [ ] Build it: `/develop appointment-booking`
   - [ ] Data model and free slots (AC-2..4)
   - [ ] Book and cancel (AC-1, AC-5, AC-6, AC-9)
   - [ ] Pet owner screens and the day's schedule (AC-7, AC-8)
- [ ] Verify it: `/check verify appointment-booking`
- [ ] Test it: `/test appointment-booking`
Folder `docs/features/appointment-booking/` · spec 0001

## Slice 2: Appointment reminders

### 3. Appointment reminders
Remind the pet owner of the appointment one day before, over WhatsApp.
**Done when:** the pet owner gets the reminder before every confirmed appointment.
- [ ] Settle the rules: `/discovery "appointment reminders"`
Folder `docs/features/appointment-reminders/`

## Deferred
- **Online payment**: pay for the appointment when booking · needs a decision
