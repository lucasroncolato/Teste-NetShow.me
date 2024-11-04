import './stylesheets/fonts.css'
import './stylesheets/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Home from './pages/HomeScreen.tsx'
import VideoDetailScreen from './pages/VideoDetailScreen.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/video/:id',
        element: <VideoDetailScreen />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
