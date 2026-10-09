# Design · PetVida

Escrito por `/penpot setup` em 2026-10-06. Exemplo fictício: os ids e links abaixo não existem.

## Ferramenta

- **Penpot:** https://design.penpot.app
- **Projeto:** PetVida (`example-project-id`)
- **Biblioteca:** PetVida DS (`example-library-id`), ligada a todos os arquivos de tela.

## Arquivos de tela

- Um arquivo por feature: `PetVida · <feature>`.
- Páginas: `Validação v<n>`, depois uma por fluxo.
- Tamanhos: telas do tutor em celular 390×844 (a maioria agenda pelo celular); telas da recepção em 1440×900.

## Tokens

- Tema `claro`, conjuntos `primitive` e `semantic`. As telas usam só `semantic` (por exemplo `color.action.primary`, `color.status.danger`).
- Verde é a cor da marca e da ação principal; vermelho só para erro e falta.

## Tipografias

- `Heading/L`, `Heading/M`, `Body/M`, `Body/S`, `Label/S`.
- Anotações das páginas (legenda, notas de regra): `Body/S` (`S.cfg.typo`).

## Regras

- "Toda tela que carrega dados tem os estados carregando, vazio e erro desenhados." (regra da equipe)
- "O telefone da clínica aparece em toda tela onde o tutor não consegue resolver sozinho." (D-1 de `appointment-booking`)

## Arquivos

| Arquivo | Link |
|---|---|
| PetVida · appointment-booking | [abrir](https://design.penpot.app/#/workspace?team-id=example&file-id=example) |
