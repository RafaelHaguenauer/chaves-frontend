import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user?.nome}!</h1>

      <p className="mb-4">Você está autenticado com o e-mail: {user?.email}</p>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  )
}
