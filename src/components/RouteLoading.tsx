import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingPage from '@/pages/LoadingPage'

const RouteLoading = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (loading) return <LoadingPage />
  return <>{children}</>
}

export default RouteLoading