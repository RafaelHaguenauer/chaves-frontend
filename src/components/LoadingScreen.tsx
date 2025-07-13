import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

export default function Login() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div>
      {/* Seu formulário de login aqui */}
    </div>
  )
}