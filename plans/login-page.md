# Página de Login — code|connect

## Contexto

O `apps/web` está em estado scaffold (boilerplate Vite + React). Precisamos entregar a página de Login conforme o mockup anexo, seguindo o `CLAUDE.md`: Atomic Design, Tailwind para estilização, e teste para cada componente.

A página de **Cadastro** virá em seguida com o **mesmo layout base** (banner à esquerda, formulário à direita), porém com **banner diferente, campos diferentes e prompt diferente** no rodapé. Os componentes serão desenhados para reuso direto, sem precisar refatorar.

Decisões já alinhadas com o usuário:
- **Tailwind v4** via `@tailwindcss/vite` (sem postcss.config)
- **Sem react-router** por ora — `App.tsx` renderiza `LoginPage` direto; "Crie seu cadastro!" fica como `<a href="#">`
- **Substituir tokens de cor** do `index.css` para casar com o mockup (dark + verde)
- **Responsivo**: banner colapsa no mobile (`<768px`), formulário fica em largura total

---

## Setup (passos 1–3)

### 1. Instalar Tailwind v4 + dependências de teste

No diretório `apps/web`:
```bash
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/node
```

### 2. Configurar Tailwind no Vite

[apps/web/vite.config.ts](apps/web/vite.config.ts): adicionar plugin `tailwindcss()` e habilitar test config (jsdom).

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' },
})
```

Criar [apps/web/src/test/setup.ts](apps/web/src/test/setup.ts):
```ts
import '@testing-library/jest-dom/vitest'
```

Adicionar scripts em [apps/web/package.json](apps/web/package.json):
```json
"test": "vitest",
"test:run": "vitest run"
```

### 3. Reescrever tokens de cor em `index.css`

Reescrever [apps/web/src/index.css](apps/web/src/index.css) com `@import "tailwindcss"` + bloco `@theme` definindo tokens que casem com o mockup (dark bg, verde lime accent). Remover regras antigas do boilerplate (`#root` com largura fixa, `h1`/`h2` custom, etc.).

Paleta proposta (`@theme`):
- `--color-bg`: `#1a1d23` (fundo geral) e `--color-surface`: `#20232a` (card)
- `--color-border`: `#2e303a`
- `--color-text`: `#cfd0d4` / `--color-text-strong`: `#ffffff` / `--color-text-muted`: `#9ca3af`
- `--color-accent`: `#a8eb12` (verde do botão/link) / `--color-accent-fg`: `#0f1014` (texto sobre verde)
- `--color-input-bg`: `#4a4d54`
- Fonte base: system-ui, mantida.

Apagar [apps/web/src/App.css](apps/web/src/App.css) e os assets boilerplate (`react.svg`, `vite.svg`, `hero.png`) já que `App.tsx` será reescrito.

---

## Atomic Design — estrutura de componentes

Cada componente em sua própria pasta com `Componente.tsx` + `Componente.test.tsx`.

```
apps/web/src/components/
├── atoms/
│   ├── Button/         (variant primary, prop loading, prop trailingIcon)
│   ├── Checkbox/       (id, name, checked, onChange, label)
│   ├── Divider/        (prop label opcional, centralizado entre 2 linhas)
│   ├── Input/          (type='text'|'password'|'email', controlled)
│   ├── Label/          (htmlFor, children)
│   └── TextLink/       (href, children, variant 'accent' | 'muted')
├── molecules/
│   ├── FormField/      (id, label, children=input atom; cuida do htmlFor)
│   ├── SocialButton/   (iconSrc, iconAlt, label, href?, onClick?)
│   └── SocialLoginRow/ (providers: { id, label, iconSrc, href? }[])
├── organisms/
│   ├── AuthFooter/     (promptText, linkLabel, linkHref, trailingIcon?)
│   └── LoginForm/      (onSubmit(values), isSubmitting?, errorMessage?)
├── templates/
│   └── AuthLayout/     (bannerSrc, bannerAlt, children)
└── pages/
    └── LoginPage/      (compõe AuthLayout + cabeçalho inline + LoginForm + Divider + SocialLoginRow + AuthFooter)
```

**Total: 13 componentes + 13 testes.**

### Decisões de granularidade (justificadas)

- **Sem `Logo`** — logo já está embutido no `Banner.png`.
- **Sem `Banner`** — é só uma `<img>`; o `AuthLayout` cuida do estilo via `bannerSrc`/`bannerAlt`.
- **Sem `AuthHeader`** — `<h1>` + `<p>` duplicados em 2 páginas não justifica abstração.
- **Sem `RememberRow`** — usado uma única vez (cadastro não terá); fica inline em `LoginForm` como `<div className="flex justify-between">`.
- **`Divider` é atom** — elemento único estilizado, sem composição.
- **`Input` único** com prop `type`; sem `PasswordInput` separado (YAGNI; show/hide não está no mockup).
- **`Button` com `loading` desde já** — evita refactor quando submit assíncrono entrar.

### Layout do template (reuso com Cadastro)

`AuthLayout`:
```tsx
<div className="min-h-svh bg-bg flex items-center justify-center p-4">
  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 bg-surface rounded-2xl p-6 max-w-4xl w-full">
    <aside className="hidden md:block">
      <img src={bannerSrc} alt={bannerAlt} className="rounded-xl h-full object-cover" />
    </aside>
    <main className="flex flex-col gap-6 py-4 px-2">{children}</main>
  </div>
</div>
```

Página de Cadastro futura reutiliza `AuthLayout` trocando `bannerSrc` e `children`.

### Composição da `LoginPage`

```tsx
<AuthLayout bannerSrc="/Banner.png" bannerAlt="Pessoa programando">
  <header>
    <h1 className="text-text-strong text-3xl font-medium">Login</h1>
    <p className="text-text mt-2">Boas-vindas! Faça seu login.</p>
  </header>
  <LoginForm onSubmit={(values) => console.log(values)} />
  <Divider label="ou entre com outras contas" />
  <SocialLoginRow providers={[
    { id: 'github', label: 'Github', iconSrc: '/Github.png' },
    { id: 'gmail',  label: 'Gmail',  iconSrc: '/Gmail.png'  },
  ]} />
  <AuthFooter
    promptText="Ainda não tem conta?"
    linkLabel="Crie seu cadastro!"
    linkHref="#"
    trailingIcon="📋"
  />
</AuthLayout>
```

`App.tsx` vira:
```tsx
import LoginPage from './components/pages/LoginPage/LoginPage'
export default function App() { return <LoginPage /> }
```

---

## Testes (1 por componente)

Cada `*.test.tsx` cobre o essencial — render + interação chave + variação de prop relevante. Exemplos:

- `Button.test.tsx`: renderiza children, dispara `onClick`, fica `disabled` quando `loading`
- `Input.test.tsx`: aplica `type`, propaga `onChange`, exibe `placeholder`
- `Checkbox.test.tsx`: alterna `checked` ao clicar, associa `label` via `htmlFor`
- `FormField.test.tsx`: clicar no label foca o input filho (wiring de `htmlFor`)
- `SocialLoginRow.test.tsx`: renderiza um botão por provider passado
- `LoginForm.test.tsx`: preencher campos e submeter chama `onSubmit` com os valores
- `AuthLayout.test.tsx`: renderiza `bannerSrc` com alt correto e expõe children no main
- `LoginPage.test.tsx`: smoke test — renderiza heading "Login" e o botão de submit

---

## Arquivos críticos

- [apps/web/package.json](apps/web/package.json) — novas dependências e scripts de teste
- [apps/web/vite.config.ts](apps/web/vite.config.ts) — plugin Tailwind + config Vitest
- [apps/web/src/index.css](apps/web/src/index.css) — reescrita: `@import "tailwindcss"` + `@theme`
- [apps/web/src/App.tsx](apps/web/src/App.tsx) — substituído por `<LoginPage />`
- [apps/web/src/App.css](apps/web/src/App.css) — **remover**
- [apps/web/src/assets/](apps/web/src/assets/) — remover `react.svg`, `vite.svg`, `hero.png`
- [apps/web/src/test/setup.ts](apps/web/src/test/setup.ts) — novo, setup do RTL
- [apps/web/src/components/](apps/web/src/components/) — toda a árvore Atomic Design listada acima

---

## Verificação

1. **Build & lint passam**
   ```bash
   pnpm web:build
   pnpm web:lint
   ```
2. **Testes verdes**
   ```bash
   pnpm --filter web test:run
   ```
3. **Smoke visual no navegador** (`pnpm web:dev`):
   - Layout em 2 colunas no desktop, banner à esquerda, formulário à direita
   - Em viewport <768px, banner some e formulário ocupa largura total
   - Inputs editáveis, checkbox alterna, botão verde com seta clicável
   - Botão Github e Gmail visíveis lado a lado abaixo do divider
   - Link "Crie seu cadastro! 📋" em verde no rodapé
   - Submit do formulário loga os valores no console
4. **Conferência commit** — Conventional Commits: `feat(web): add login page with atomic design components`.
