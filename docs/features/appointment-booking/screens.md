# Online booking · screens

Status: done · Mode: final · Validation round: 1
Business rules: [v2](business-rules/v2.md) · Design file: [PetVida · appointment-booking](https://design.penpot.app/#/workspace?team-id=example&file-id=example)
Updated: 2026-10-07

## Screens

| # | Flow | Screen / frame | Journey step | Rules | Open points | Page · frame |
|---|---|---|---|---|---|---|
| T-1 | 01 Book | Choose pet and service | 1 | RN-01, RN-03, RN-05, RN-09 | | Book · `f-101` |
| T-2 | 01 Book | Choose slot | 2 | RN-02, RN-03, RN-04 | | Book · `f-102` |
| T-3 | 01 Book | Confirm booking | 3 | RN-06 | | Book · `f-103` |
| T-4 | 01 Book | Booking confirmed | 3 | RN-06 | | Book · `f-104` |
| T-5 | 02 My appointments | My appointments | 4 | RN-07, RN-08 | | My appointments · `f-201` |
| T-6 | 03 Front desk | Day's agenda | 5 | RN-08, RN-10 | | Front desk · `f-301` |

## State matrix

| Screen | loading | empty | error | no permission | success |
|---|---|---|---|---|---|
| T-1 Choose pet and service | ✓ | ✓ (no pet registered) | ✓ | n/a (only a signed in pet owner gets here) | ✓ |
| T-2 Choose slot | ✓ | ✓ (no free slot this week) | ✓ | n/a (same reason) | ✓ |
| T-3 Confirm booking | n/a (data already loaded) | n/a (a slot is always picked) | ✓ (slot taken in the meantime) | n/a | ✓ |
| T-5 My appointments | ✓ | ✓ | ✓ | n/a | ✓ |
| T-6 Day's agenda | ✓ | ✓ (day with no appointments) | ✓ | ✓ (a pet owner tries to open it) | ✓ |

## Edge cases

| Case | Rule | Where it shows |
|---|---|---|
| The pet already has 2 future appointments | RN-05 | T-1 `Choose pet and service — limit` |
| Slot less than 2 h away | RN-04 | T-2: not shown in the list |
| Another pet owner took the slot before confirming | RN-02 | T-3 `Confirm booking — error` |
| Cancelling less than 12 h before | RN-07, RN-08 | T-5 `My appointments — past deadline`: the button goes away, the phone number shows |
| The pet owner wants a fit in or an emergency | RN-09 | T-1: notice with the clinic's phone number |

## Decisions

| # | Decision | Screens | Source |
|---|---|---|---|
| D-1 | The clinic's phone number is fixed in the footer of T-1 and T-5, not only in the notice | T-1, T-5 | Ana's review by comment in Penpot, 2026-10-06 |
