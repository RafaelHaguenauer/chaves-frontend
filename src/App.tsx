import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RouteLoading from '@/components/RouteLoading'
import Login from '@/pages/Login'
import HomePage from '@/pages/HomePage'
import LoadingPage from '@/pages/LoadingPage'

const App = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (loading) return <LoadingPage />

  return (
    <BrowserRouter>
      <RouteLoading>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          {/* ...outras rotas... */}
        </Routes>
      </RouteLoading>
    </BrowserRouter>
  )
}

export default App