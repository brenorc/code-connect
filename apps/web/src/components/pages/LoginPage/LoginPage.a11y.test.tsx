import { render } from '@testing-library/react'
import { axe } from '../../../test/a11y'
import { LoginPage } from './LoginPage'

describe('LoginPage — acessibilidade (WCAG 2 AA)', () => {
  it('não possui violações de acessibilidade detectáveis automaticamente', async () => {
    const { container } = render(<LoginPage />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
