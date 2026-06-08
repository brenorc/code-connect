import { render, screen, fireEvent } from '@testing-library/react'
import { CreatePostModal } from './CreatePostModal'
import { AuthContext } from '../../../contexts/AuthContext'

function renderModal(onClose = vi.fn(), onCreated = vi.fn()) {
  return render(
    <AuthContext.Provider
      value={{
        user: { id: '1', name: 'Julio', email: 'j@e.com' },
        token: 'fake-token',
        login: vi.fn(),
        logout: vi.fn(),
      }}
    >
      <CreatePostModal onClose={onClose} onCreated={onCreated} />
    </AuthContext.Provider>,
  )
}

describe('CreatePostModal', () => {
  it('renders the modal with title', () => {
    renderModal()
    expect(screen.getByText('Nova publicação')).toBeInTheDocument()
  })

  it('calls onClose when cancel button is clicked', () => {
    const handleClose = vi.fn()
    renderModal(handleClose)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close icon button is clicked', () => {
    const handleClose = vi.fn()
    renderModal(handleClose)
    fireEvent.click(screen.getByLabelText('Fechar modal'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('adds and removes tags', () => {
    renderModal()
    const tagInput = screen.getByPlaceholderText('Ex: React')
    fireEvent.change(tagInput, { target: { value: 'React' } })
    fireEvent.click(screen.getByText('Adicionar'))
    expect(screen.getByText('React')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Remover tag React'))
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })
})
