import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import Home from './pages/HomeScreen';
import VideoDetailScreen from './pages/VideoDetailScreen';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/video/:id', element: <VideoDetailScreen /> },
    ],
  },
];

describe('Routing', () => {
  test('renders Home component at root path', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders VideoDetailScreen component at /video/:id path', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/video/123'] });
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText(/Video Detail/i)).toBeInTheDocument();
  });

  test('navigates to VideoDetailScreen when route is /video/:id', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    router.navigate('/video/123');
    expect(screen.getByText(/Video Detail/i)).toBeInTheDocument();
  });
});
