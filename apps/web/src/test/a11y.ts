import { configureAxe } from 'jest-axe'

/**
 * Runner do axe-core configurado para o WCAG 2 nível AA (segundo nível).
 *
 * `runOnly` restringe a auditoria às regras marcadas com os critérios de
 * sucesso de nível A e AA — o nível AA engloba o A — abrangendo WCAG 2.0,
 * 2.1 e 2.2. Regras AAA e best-practices ficam de fora para não poluir o
 * resultado com itens fora do escopo exigido.
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
})
