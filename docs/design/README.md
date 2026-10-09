# Design · PetVida

Written by `/penpot setup` on 2026-10-06. Fictional example: the ids and links below do not exist.

## Tool

- **Penpot:** https://design.penpot.app
- **Project:** PetVida (`example-project-id`)
- **Library:** PetVida DS (`example-library-id`), linked to every screen file.

## Screen files

- One file per feature: `PetVida · <feature>`.
- Pages: `Validation v<n>`, then one per flow.
- Sizes: pet owner screens on mobile 390×844 (most people book from their phone); front desk screens at 1440×900.

## Tokens

- Theme `light`, sets `primitive` and `semantic`. Screens use `semantic` only (for example `color.action.primary`, `color.status.danger`).
- Green is the brand color and the main action color; red only for errors and no shows.

## Typography

- `Heading/L`, `Heading/M`, `Body/M`, `Body/S`, `Label/S`.
- Page annotations (legend, rule notes): `Body/S` (`S.cfg.typo`).

## Rules

- "Every screen that loads data has its loading, empty, and error states drawn." (team rule)
- "The clinic's phone number shows on every screen where the pet owner cannot solve the problem alone." (D-1 of `appointment-booking`)

## Files

| File | Link |
|---|---|
| PetVida · appointment-booking | [open](https://design.penpot.app/#/workspace?team-id=example&file-id=example) |
