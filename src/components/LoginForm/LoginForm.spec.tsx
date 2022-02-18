import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { mockStoreFactory } from '../../utils'
import { reduxForm } from 'redux-form'
import { IStore } from '../../store'
import { UnconnectedLoginForm, IOwnProps, IFormData } from './LoginForm'

const ReduxFormComponent = reduxForm<IFormData, IOwnProps>({
  form: 'LoginForm'
})(UnconnectedLoginForm)

describe('LoginForm testing', () => {
  it('should render username and password fields and buttons', () => {
    render(
      <Provider store={mockStoreFactory({})}>
        <ReduxFormComponent />
      </Provider>
    )

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Clear Values' })
    ).toBeInTheDocument()
  })

  it('should render preseted initial values', () => {
    const onSubmit = jest.fn()

    const mockStore = mockStoreFactory({
      form: {
        LoginForm: { values: { username: 'Cartman', password: '1234' } }
      }
    } as unknown as IStore)

    render(
      <Provider store={mockStore}>
        <ReduxFormComponent onSubmit={onSubmit} />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('Cartman')
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('1234')
  })

  it('should not call submit event', () => {
    const onSubmit = jest.fn()
    render(
      <Provider store={mockStoreFactory({})}>
        <ReduxFormComponent onSubmit={onSubmit} isLoading />
      </Provider>
    )

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Cartman')
    userEvent.type(screen.getByPlaceholderText(/password/i), '1234')
    userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should call submit ones with setted values', () => {
    const onSubmit = jest.fn()

    // For test submit event we should use real store
    render(
      <Provider store={store}>
        <ReduxFormComponent onSubmit={onSubmit} />
      </Provider>
    )

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Cartman')
    userEvent.type(screen.getByPlaceholderText(/password/i), '1234')
    userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'Cartman',
      password: '1234'
    })
  })

  it('should call clear values and reset typed values', () => {
    render(
      <Provider store={mockStoreFactory({})}>
        <ReduxFormComponent />
      </Provider>
    )

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Cartman')
    userEvent.type(screen.getByPlaceholderText(/password/i), '1234')

    userEvent.click(screen.getByRole('button', { name: 'Clear Values' }))

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('')
  })
})
