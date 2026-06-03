/**
 * Teste de contraste de cor — WCAG 2 critério 1.4.3 (nível AA).
 *
 * O axe-core roda em jsdom, que não rasteriza pixels nem calcula estilos
 * computados; por isso a regra `color-contrast` sempre volta como
 * "incomplete" e nunca acusa problema. Este teste fecha essa lacuna
 * calculando a razão de contraste diretamente sobre os tokens de cor do
 * tema (`src/index.css`), para os pares de primeiro plano/fundo que os
 * componentes realmente usam.
 *
 * Limiares AA (1.4.3):
 *   - Texto normal: >= 4.5:1
 *   - Texto grande (>= 24px, ou >= 18.66px em negrito): >= 3:1
 */

// Tokens do tema (mantenha em sincronia com @theme em src/index.css).
const token = {
  bg: '#00090e',
  surface: '#171d1f',
  border: '#2e303a',
  text: '#cfd0d4',
  textStrong: '#e1e1e1',
  textMuted: '#9ca3af',
  accent: '#81fe88',
  accentFg: '#132e35',
  inputBg: '#4a4d54',
} as const

function channelLuminance(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8) & 0xff
  const b = n & 0xff
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1]
  return (lighter + 0.05) / (darker + 0.05)
}

interface Pair {
  name: string
  fg: string
  bg: string
  large: boolean
  where: string
}

// Pares de cor efetivamente renderizados pelos componentes das páginas.
const pairs: Pair[] = [
  { name: 'heading (text-strong / surface)', fg: token.textStrong, bg: token.surface, large: true, where: 'LoginPage/SignupPage <h1>' },
  { name: 'parágrafo (text / surface)', fg: token.text, bg: token.surface, large: false, where: 'subtítulo das páginas' },
  { name: 'label (text / surface)', fg: token.text, bg: token.surface, large: false, where: 'Label, Checkbox' },
  { name: 'botão social (text / surface)', fg: token.text, bg: token.surface, large: false, where: 'SocialButton' },
  { name: 'divisor (text-muted / surface)', fg: token.textMuted, bg: token.surface, large: false, where: 'Divider' },
  { name: 'rodapé (text-muted / surface)', fg: token.textMuted, bg: token.surface, large: false, where: 'AuthFooter prompt' },
  { name: 'link secundário (text-muted / surface)', fg: token.textMuted, bg: token.surface, large: false, where: 'TextLink secundário' },
  { name: 'link de destaque (accent / surface)', fg: token.accent, bg: token.surface, large: false, where: 'TextLink accent' },
  { name: 'texto do input (text-strong / input-bg)', fg: token.textStrong, bg: token.inputBg, large: false, where: 'Input' },
  { name: 'placeholder do input (text-muted / input-bg)', fg: token.textMuted, bg: token.inputBg, large: false, where: 'Input placeholder' },
  { name: 'texto do botão (accent-fg / accent)', fg: token.accentFg, bg: token.accent, large: false, where: 'Button' },
]

describe('Contraste de cor — WCAG 2 AA (1.4.3)', () => {
  it.each(pairs)('$name tem contraste suficiente', ({ fg, bg, large }) => {
    const ratio = contrastRatio(fg, bg)
    const threshold = large ? 3 : 4.5
    expect(ratio).toBeGreaterThanOrEqual(threshold)
  })
})
