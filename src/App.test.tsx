import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useAtomValue } from 'jotai';
import { lockScrollingAtom, scrollPositionAtom } from './libs/atoms';

jest.mock('jotai', () => ({
  useAtomValue: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    (useAtomValue as jest.Mock).mockImplementation((atom) => {
      if (atom === lockScrollingAtom) return false;
      if (atom === scrollPositionAtom) return 0;
    });
  });

  test('renders App component with Nav and Outlet', () => {
    render(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /logo/i })).toBeInTheDocument();
  });

  test('scrolls to top when lockScrolling is true', () => {
    (useAtomValue as jest.Mock).mockReturnValueOnce(true);
    render(<App />);

    expect(window.scrollY).toBe(0);
  });
});

describe('Nav Component', () => {
  test('renders Nav component with menu items and user actions', () => {
    render(<App />);

    const menuItems = ['Categorias', 'Assuntos', 'Outras páginas', 'Minha Lista', 'Lives', 'Fórum'];
    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user profile/i)).toBeInTheDocument();
  });

  test('applies scrolled style to navbar on scroll', () => {
    render(<App />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.getByRole('navigation')).toHaveClass('navbar--scrolled');
  });
});
