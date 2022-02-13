import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { App } from './'
import { store } from '../store'

test('renders correct header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(
    screen.getByText(
      /Redux Form and React Testing Library example/i
    )
  ).toBeInTheDocument()
})
