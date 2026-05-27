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
