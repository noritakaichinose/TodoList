import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountManagementPage from '../pages/AccountManagementPage';

test('submits the form and shows success message', async () => {
  render(<AccountManagementPage />);

  fireEvent.change(screen.getByLabelText(/新しいメールアドレス/i), {
    target: { value: 'newemail@example.com' },
  });

  fireEvent.change(screen.getByLabelText(/新しいパスワード/i), {
    target: { value: 'newpassword' },
  });

  fireEvent.click(screen.getByText(/更新/i));

  expect(await screen.findByText(/Account updated successfully/i)).toBeInTheDocument();
});