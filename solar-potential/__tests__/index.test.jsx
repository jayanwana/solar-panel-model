import React from 'react'
import {describe, expect, test} from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '../pages/index'

describe('LoginPage Tests', () => {
  test('renders a heading', () => {
    render(<LoginPage />)

    const heading = screen.getByRole('heading', {
      name: /Sign in/i,
    });
    expect(heading).toBeInTheDocument()
  })

  test('Renders an email input', () => {
    render(<LoginPage />)

    const email = screen.getByRole('textbox', { name: '' })

    expect(email).toBeInTheDocument()
  })

  test('email accepts input', () => {
    render(<LoginPage />)

    const email = screen.getByRole('textbox', { name: '' })
    fireEvent.change(email, { target: { value: 'test@email.com' } })
    expect(email.value).toBe('test@email.com')
  })
  test('renders a submit button', () => {
    render(<LoginPage />)

    const button = screen.getByRole('button', { name: /Sign in/i })

    expect(email).toBeInTheDocument()
  })
  test('renders a link to the forgot password page', () => {
    render(<LoginPage />)

    const link = screen.getByRole('link', { name: /Forgot password/i })

    expect(link).toBeInTheDocument()
  })
  test('renders a link with correct href', () => {
    render(<LoginPage />)

    const link = screen.getByRole('link', { name: /Forgot password/i }).closest('a')

    expect(link).toHaveAttribute('href', '/forget-password')
  })
  test('renders a link to the sign up with correct href', () => {
    render(<LoginPage />)

    const signUpLink = screen.getByRole('link', { name: /Dont have an account\? Sign up!/i }).closest('a')

    expect(signUpLink).toHaveAttribute('href', '/signup')
  })
})
