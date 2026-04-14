import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
// Pastikan path ini mengarah ke komponen yang baru dibuat
import RegisterInput from '../../components/RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('John Doe');

    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    await userEvent.type(emailInput, 'test@email.com');
    expect(emailInput).toHaveValue('test@email.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const passwordInput =
      await screen.getByPlaceholderText('Minimal 6 karakter');

    await userEvent.type(passwordInput, 'rahasia123');
    expect(passwordInput).toHaveValue('rahasia123');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('John Doe');
    await userEvent.type(nameInput, 'John Doe');

    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'test@email.com');

    const passwordInput =
      await screen.getByPlaceholderText('Minimal 6 karakter');
    await userEvent.type(passwordInput, 'rahasia123');

    const registerButton = await screen.getByRole('button', {
      name: 'Daftar Sekarang',
    });
    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'John Doe',
      email: 'test@email.com',
      password: 'rahasia123',
    });
  });
});
