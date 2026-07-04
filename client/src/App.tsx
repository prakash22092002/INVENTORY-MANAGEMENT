import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes.tsx'
import { Navbar } from './features/navbar/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto min-h-screen max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4">
        <Navbar />
        <main className="mt-4 px-1 pb-8 sm:mt-6 sm:px-2">
          <Routes>
            {routes?.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
