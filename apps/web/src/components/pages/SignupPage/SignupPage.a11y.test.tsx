import { render } from '@testing-library/react'
import { axe } from '../../../test/a11y'
import { SignupPage } from './SignupPage'

describe('SignupPage — acessibilidade (WCAG 2 AA)', () => {
  it('não possui violações de acessibilidade detectáveis automaticamente', async () => {
    const { container } = render(<SignupPage />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
