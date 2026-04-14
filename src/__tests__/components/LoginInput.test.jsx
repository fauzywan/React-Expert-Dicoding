import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from '../../components/LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    await userEvent.type(emailInput, 'iwan@test.com');
    expect(emailInput).toHaveValue('iwan@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput =
      await screen.getByPlaceholderText('Masukkan password');

    await userEvent.type(passwordInput, 'rahasia123');
    expect(passwordInput).toHaveValue('rahasia123');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'iwan@test.com');

    const passwordInput =
      await screen.getByPlaceholderText('Masukkan password');
    await userEvent.type(passwordInput, 'rahasia123');

    const loginButton = await screen.getByRole('button', { name: 'Masuk' });
    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'iwan@test.com',
      password: 'rahasia123',
    });
  });
});
