import React from 'react';
import { describe, expect, test } from '@jest/globals';
import {
  render, screen, fireEvent, queryByAttribute, userEvent
} from '@testing-library/react';
import SignupPage from '../pages/signup';

const getById = queryByAttribute.bind(null, 'id');

describe('Sign up tests', () => {
  test('renders a heading', () => {
    render(<SignupPage />);

    const heading = screen.getByRole('heading', {
      name: /Sign up/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Renders an email input', () => {
    const dom = render(<SignupPage />);

    const email = getById(dom.container, 'email');

    expect(email).toBeInTheDocument();
  });

  test('Renders a password input', () => {
    const dom = render(<SignupPage />);

    const password = getById(dom.container, 'password');

    expect(password).toBeInTheDocument();
  });

  test('Renders a confirm password input', () => {
    const dom = render(<SignupPage />);

    const confirmPassword = getById(dom.container, 'confirmPassword');

    expect(confirmPassword).toBeInTheDocument();
  });

  test('Renders an agree checkbox', () => {
    render(<SignupPage />);

    const agree = screen.getByRole('checkbox');

    expect(agree).toBeInTheDocument();
  });

  test('email element accepts input', () => {
    const dom = render(<SignupPage />);
    const email = getById(dom.container, 'email');

    fireEvent.change(email, { target: { value: 'test@email.com' } });
    expect(email.value).toBe('test@email.com');
  });

  test('password element accepts input', () => {
    const dom = render(<SignupPage />);
    const password = getById(dom.container, 'password');

    fireEvent.change(password, { target: { value: 'testpassword' } });
    expect(password.value).toBe('testpassword');
  });

  test('confirm Password element accepts input', () => {
    const dom = render(<SignupPage />);
    const confirmPassword = getById(dom.container, 'confirmPassword');

    fireEvent.change(confirmPassword, { target: { value: 'testpassword' } });
    expect(confirmPassword.value).toBe('testpassword');
  });

  test('test password and confirm password match', () => {
    const dom = render(<SignupPage />);
    const password = getById(dom.container, 'password');
    const confirmPassword = getById(dom.container, 'confirmPassword');
    fireEvent.change(password, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPassword, { target: { value: 'testpassword' } });
    expect(confirmPassword.value).toEqual(password.value);
  });

  test('renders a submit button', () => {
    render(<SignupPage />);

    const button = screen.getByRole('button', { name: /Sign up/i });

    expect(button).toBeInTheDocument();
  });
});
