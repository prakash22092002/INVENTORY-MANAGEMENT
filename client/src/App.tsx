import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { routes } from './routes/routes.tsx'
import { Navbar } from './features/navbar/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'
import './App.css'

function AppContent() {
  const { pathname } = useLocation()

  const hideNavbar = pathname === '/login' || pathname === '/signup'

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? '' : 'mt-4 px-1 pb-8 sm:mt-6 sm:px-2'}>
        <Routes>
          {routes?.map((route) => {
            const element = route.hideNavbar ? (
              route.element
            ) : (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            )
            return <Route key={route.path} path={route.path} element={element} />
          })}
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <AppContent />
    </BrowserRouter>
  )
}

export default App
