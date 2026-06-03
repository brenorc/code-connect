# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo structure

pnpm workspace with two apps under `apps/`:

- `apps/api` — NestJS 11 REST API, runs on port 3000 (configurable via `PORT` env var)
- `apps/web` — React 19 + Vite 8 frontend

All workspace commands are run from the repo root using pnpm filters.

## Commands

```bash
# Development servers
pnpm api:dev        # NestJS with --watch
pnpm web:dev        # Vite HMR dev server

# Build
pnpm api:build      # nest build → apps/api/dist/
pnpm web:build      # tsc + vite build

# Tests (API only — web has no tests yet)
pnpm api:test                          # jest (unit, matches *.spec.ts in src/)
pnpm --filter api test:e2e             # jest with apps/api/test/jest-e2e.json
pnpm --filter api test -- --testPathPattern=app.controller  # single test file

# Lint & format
pnpm api:lint       # eslint --fix
pnpm web:lint       # eslint
pnpm --filter api format  # prettier --write
```

## Architecture

**API (`apps/api/src/`)**: Standard NestJS module structure — `AppModule` imports controllers and providers. Controllers handle HTTP routing; services contain business logic. Unit tests live alongside source files (`*.spec.ts`); e2e tests are in `apps/api/test/`.

**Web (`apps/web/src/`)**: Single React entry point (`main.tsx` → `App.tsx`). No routing library or state management added yet — the app is at initial scaffold stage.

The two apps are independent; there is no shared package between them yet.

## Frontend conventions

**Atomic Design**: Organize components under `src/components/` following the atomic hierarchy — `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`. Place each component in its own folder with its test file alongside it.

**Tailwind CSS**: Use Tailwind utility classes for all styling. Avoid custom CSS except for design tokens or things Tailwind cannot express.

**Component tests**: Every component must have a test file (`ComponentName.test.tsx`) covering its essential use — render output, key interactions, and prop variations that affect behavior. No component ships without a test.

### Design tokens (colors)

Colors are defined once as Tailwind v4 `@theme` tokens in `apps/web/src/index.css` (synced to the Figma values). **Always reference a token** via its utility (`bg-surface`, `text-text-strong`, `border-border`, …) — never hardcode a hex value in a component. The palette is a dark theme:

| Token | Hex | Use for |
| --- | --- | --- |
| `bg` | `#00090e` | App/page background |
| `surface` | `#171d1f` | Cards, panels, social buttons |
| `border` | `#2e303a` | Borders, dividers |
| `text` | `#cfd0d4` | Body text, labels |
| `text-strong` | `#e1e1e1` | Headings, input values |
| `text-muted` | `#9ca3af` | Secondary/hint text, dividers |
| `accent` | `#81fe88` | Primary buttons, links, focus ring |
| `accent-fg` | `#132e35` | Text/icons on `accent` surfaces |
| `input-bg` | `#4a4d54` | Input field background |

To add or change a color, edit the `@theme` block in `index.css` (and keep the `body` fallback in sync) — do not introduce ad-hoc colors in components.

### Typography & sizing

Stick to the Tailwind scale already in use; don't introduce off-scale values.

- **Font**: system stack (`system-ui, 'Segoe UI', Roboto, sans-serif`), set on `body`.
- **Sizes**: `text-3xl` page headings (`h1`) · `text-base` intros/paragraphs · `text-sm` labels, buttons, form controls and helper text. (No `text-xs` — `text-sm` is the floor for readability.)
- **Weights**: `font-semibold` headings and primary buttons · `font-medium` labels and accent links · default weight for body copy.
- **Radius**: `rounded-lg` inputs & buttons · `rounded-xl` social buttons & banner image · `rounded-2xl` the card container.
- **Spacing**: use the default Tailwind scale — `gap-6` between page sections, `gap-4` within a form, `p-6` card padding, `py-3 px-6` button/input padding.

### Accessibility (WCAG 2 level AA)

The frontend targets **WCAG 2 level AA**. Every foreground/background token pairing must meet the AA contrast minimums — **4.5:1** for normal text, **3:1** for large text (≥24px, or ≥18.66px bold) and UI/non-text elements. Verify with `pnpm --filter web test:a11y` (jest-axe structural checks per page + a token-contrast test that jsdom's axe cannot cover).

- `text-muted` only passes AA on `bg`/`surface` — **not** on `input-bg` (that pairing is `3.33:1`). Placeholders need a higher-contrast token or a darker input background.
- Add a `ComponentOrPage.a11y.test.tsx` running `axe(container)` + `toHaveNoViolations()` for new pages; the shared runner in `src/test/a11y.ts` is already scoped to the AA ruleset.

## Backend conventions

**REST adherence**:
- Use the correct HTTP method for each operation: `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove).
- Resource names in URLs must be nouns in plural form (e.g., `/posts`, `/users/:id/comments`).
- Return the appropriate HTTP status codes: `200` OK, `201` Created, `204` No Content, `400` Bad Request, `404` Not Found, `409` Conflict, `422` Unprocessable Entity, etc.
- Never expose internal implementation details (database IDs format, stack traces) in responses.
- Use DTOs to validate request bodies and shape response payloads explicitly.

## Git

Both projects follow **Conventional Commits**:

```
<type>(optional scope): <description>

Types: feat, fix, docs, style, refactor, test, chore
```

Examples: `feat(auth): add JWT refresh token endpoint`, `fix(button): correct hover state color`, `test(post-card): add missing render test`.
