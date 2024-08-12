import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { isAuthenticated } from './services/authService';

// jest.mockを使用して、isAuthenticated関数をモック
jest.mock('./services/authService', () => ({
  isAuthenticated: jest.fn(),
}));

describe('App Routing', () => {
  it('renders RegisterPage at /register', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it('renders LoginPage at /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('redirects to LoginPage when user is not authenticated and tries to access HomePage', () => {
    (isAuthenticated as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders HomePage when user is authenticated', () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Todoリスト/i)).toBeInTheDocument();
  });

  it('redirects to LoginPage when user is not authenticated and tries to access AccountManagementPage', () => {
    (isAuthenticated as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders AccountManagementPage when user is authenticated', () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/アカウント管理/i)).toBeInTheDocument();
  });
});
