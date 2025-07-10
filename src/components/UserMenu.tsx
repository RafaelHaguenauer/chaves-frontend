import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const UserMenu = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 transition-all duration-200 text-blue-700 font-semibold"
      >
        {user?.nome}
        <ChevronDown size={16} />
      </button>

      {menuAberto && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
