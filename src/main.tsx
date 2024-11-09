import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routes } from '@generouted/react-router'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Routes = () => (
  <RouterProvider
    router={createBrowserRouter(routes, { basename: '/time-block/' })}
  />
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes></Routes>
  </StrictMode>,
)
