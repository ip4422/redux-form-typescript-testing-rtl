import React from 'react'
import { Layout, LoginForm } from '../components'
import { showResults } from '../utils'

export function App() {
  return (
    <Layout>
      <LoginForm onSubmit={showResults} />
    </Layout>
  )
}
