# Analysis, round 1: online booking

Sources: [answers.raw.md](answers.raw.md) (Ana on 2026-10-03, Carla on 2026-10-05). Reopened on 2026-10-05: Carla answered after the first analysis. Nobody pending.

## What changed in our understanding

1. **The front desk wants to record no shows.** Carla (B1); it was not in the proposed flow.

## Hypotheses

- **H-1 (Automatic confirmation): confirmed.** Carla (A2): "yes, confirmed right away".
- **H-2 (Limit per pet): confirmed.** Ana (A3) and Carla (A3): 2.

## Consensus: becomes a rule

| Rule | Basis |
|---|---|
| Pet owner cancels up to 12 h before | Carla (A1), with the vet |
| A booking is confirmed when made | Carla (A2); Ana (A2) |
| Up to 2 future appointments per pet | Ana (A3); Carla (A3) |
| Minimum lead time of 2 h | Ana (A4); Carla (A4) |

## Open points

None after Carla's answer. The first analysis (Ana only) left P-1 (cancellation deadline) and P-2 (confirmation) open; see [v1](../../business-rules/v1.md).

## New requirements

| Requirement | Asked by | Where it goes |
|---|---|---|
| Front desk marks attendance or no show | Carla (B1) | this feature, RN-10 |

## What the code says about the answers

- There is no code yet.

## Agenda for the next round

None: the rules are settled.
