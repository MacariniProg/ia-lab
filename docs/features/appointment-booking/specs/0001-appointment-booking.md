# 0001. Online booking with slots computed from the schedule

**Date**: 2026-10-08
**Status**: Proposed

## Summary

The pet owner books a consultation or a vaccine on the website, and the system computes the free slots on the fly from each vet's schedule and the appointments already booked. We do not store a table of pregenerated slots. To build it, you only need the schedule, the services with their duration, and the appointments.

## Context

Today the schedule lives in a spreadsheet and the front desk books everything by phone. The feature must show only free slots (RN-02, business rule), respect each service's duration (RN-03), and stop two pet owners from taking the same slot. Without deciding where free slots come from, the build would invent the rule.

## Requirements

**Inputs**: [business rules v2](../business-rules/v2.md) · [screens](../screens.md) (done)

**User stories**:
- As a pet owner, I want to book an appointment on the website so I don't depend on the phone.
- As the front desk, I want to see the day's agenda and mark no shows so I know who misses appointments often.

**Acceptance criteria** (AC, acceptance criterion):
- **AC-1** (RN-01; T-1): without an account, the pet owner is taken to create one before booking.
- **AC-2** (RN-02, RN-03, RN-04; T-2): the list shows only free stretches as long as the service, starting 2 h from now.
- **AC-3** (RN-02; T-3): if the slot was taken between choosing and confirming, the pet owner sees the error and goes back to T-2; there are never two appointments in the same slot of the same vet.
- **AC-4** (RN-05; T-1): a pet with 2 future appointments cannot book another.
- **AC-5** (RN-06; T-4): a booked appointment already shows as confirmed.
- **AC-6** (RN-07, RN-08; T-5): the pet owner cancels up to 12 h before; after that the button goes away and the phone number shows.
- **AC-7** (RN-10; T-6): the front desk marks each appointment of the day as attended or no show.
- **AC-8** (RN-09; T-1): the website offers neither fit in appointments nor emergencies; it shows the phone number.
- **AC-9**: a pet owner never sees another pet owner's appointments.

## Options considered

### Option 1: Compute free slots on read

On each search, the system takes the vet's schedule, removes the booked appointments, and cuts it into stretches as long as the service.

**Pros**:
- The schedule is the only source; changing the schedule changes the slots right away.

**Cons**:
- Each search does a computation; with few vets, it is cheap.

### Option 2: Table of pregenerated slots

A job generates every slot of the week into a table and marks each one as free or taken.

**Pros**:
- A search is a simple read.

**Cons**:
- When the schedule changes, it must be generated again; two places for the same truth.

## Decision

**Chosen option**: Option 1: Compute free slots on read

Free slots are computed from the schedule and the appointments on each search, and booking is protected by a unique constraint on vet and start time.

## Rationale

The clinic has few vets and the schedule changes every week through the front desk spreadsheet. Computing on read keeps a single source. The risk of two pet owners in the same slot (AC-3) is handled by the database, through a unique constraint, not by the screen.

## Feature design

**Data model sketch**:
- `vet` (id, name)
- `work_block` (id, vet_id FK, weekday, start, end)
- `service` (id, name, duration in minutes)
- `pet` (id, owner_id FK, name)
- `appointment` (id, pet_id FK, vet_id FK, service_id FK, start, end, status); unique (vet_id, start) while status = confirmed

**State transitions**: confirmed → cancelled · confirmed → attended · confirmed → no show

**API surface**:
| Endpoint | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| /slots | GET | service_id, week | list of (vet, start) | pet owner | 422 |
| /appointments | POST | pet_id, vet_id, service_id, start | id, status | pet owner | 409 slot taken, 422 limit or lead time |
| /appointments/:id/cancel | POST | | status | owning pet owner, front desk | 403 past the deadline |
| /appointments/:id/attendance | POST | attended or no show | status | front desk | 403 |

**Value sourcing**:
| Action | Value produced / displayed | Source |
|---|---|---|
| list slots | free stretches | `work_block` minus confirmed `appointment` rows, cut by the `service` duration |
| list slots | "now" for the 2 h lead time | server clock, clinic time zone (`America/Sao_Paulo`) |
| cancel | 12 h deadline | `appointment.start` minus 12 h, same time zone |

**Key invariants**: never two confirmed appointments with the same vet and start; at most 2 confirmed future appointments per pet.

**Security model**: a pet owner reads and cancels only their own pets' appointments; the front desk reads and changes all of them.

**Critical test scenarios**:
- Happy path: book, see it in My appointments, cancel within the deadline, verifies **AC-2**, **AC-5**, **AC-6**
- Failure case: two pet owners confirm the same slot at the same time, verifies **AC-3**
- Auth/permission: a pet owner tries to open another pet owner's appointment and gets 404, verifies **AC-9**

## Build plan

1. Data model migration with the unique constraint, satisfies **AC-3**, **AC-4**
2. Free slot computation and `/slots`, satisfies **AC-2**
3. Book and cancel with the deadline and limit rules, satisfies **AC-1**, **AC-4**, **AC-5**, **AC-6**, **AC-9**
4. Screens T-1 to T-5 from the frames, satisfies **AC-1**, **AC-6**, **AC-8**
5. Day's agenda (T-6) with attended and no show, satisfies **AC-7**

## Consequences

**Positive**:
- The schedule is the only source of slots.

**Negative / tradeoffs**:
- The schedule still comes from the spreadsheet; someone needs to enter it into the system.

## Follow up

- [ ] The stack has no spec yet: `/architect stack` before `/develop appointment-booking`.
