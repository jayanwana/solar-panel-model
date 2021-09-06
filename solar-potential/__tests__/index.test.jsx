import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '../pages/index'

describe('LoginPage Tests', () => {
  it('renders a heading', () => {
    render(<LoginPage />)

    const heading = screen.getByRole('heading', {
      name: /Sign in/i,
    });
    expect(heading).toBeInTheDocument()
  })

  it('Renders an email input', () => {
    render(<LoginPage />)

    const email = screen.getByRole('textbox', { name: '' })

    expect(email).toBeInTheDocument()
  })

  it('email accepts input', () => {
    render(<LoginPage />)

    const email = screen.getByRole('textbox', { name: '' })
    fireEvent.change(email, { target: { value: 'test@email.com' } })
    expect(email.value).toBe('test@email.com')
  })
  it('renders a submit button', () => {
    render(<LoginPage />)

    const button = screen.getByRole('button', { name: /Sign in/i })

    expect(email).toBeInTheDocument()
  })
  it('renders a link to the forgot password page', () => {
    render(<LoginPage />)

    const link = screen.getByRole('link', { name: /Forgot password/i })

    expect(link).toBeInTheDocument()
  })
})
