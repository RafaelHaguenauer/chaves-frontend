import { useLocation, Link } from 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaEdit,
  FaClipboardList,
  FaPlus,
  FaPen,
} from 'react-icons/fa'
import { useState } from 'react'

const Sidebar = () => {
  const location = useLocation()
  const [aberto, setAberto] = useState(false)

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      location.pathname === path
        ? 'bg-blue-600 text-white font-semibold'
        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
    }`

  return (
    <aside
      className={`transition-all duration-300 ease-in-out ${
        aberto ? 'w-64' : 'w-20'
      } bg-white border-r shadow-md min-h-screen p-3`}
      onMouseEnter={() => setAberto(true)}
      onMouseLeave={() => setAberto(false)}
    >
      <nav className="space-y-4">
        <Link to="/home" className={linkClass('/home')}>
          <FaHome size={20} />
          {aberto && <span>Início</span>}
        </Link>

        <div>
          {aberto && (
            <h2 className="text-gray-500 text-xs font-semibold uppercase mb-2 ml-2">
              Funcionário
            </h2>
          )}
          <div className="space-y-2 ml-1">
            <Link to="/funcionarios" className={linkClass('/funcionarios')}>
              <FaUsers size={18} />
              {aberto && <span>Listar</span>}
            </Link>
            <Link to="/funcionarios/criar" className={linkClass('/funcionarios/criar')}>
              <FaUserPlus size={18} />
              {aberto && <span>Criar</span>}
            </Link>
            <Link to="/funcionarios/alterar" className={linkClass('/funcionarios/alterar')}>
              <FaEdit size={18} />
              {aberto && <span>Alterar</span>}
            </Link>
          </div>
        </div>

        <div>
          {aberto && (
            <h2 className="text-gray-500 text-xs font-semibold uppercase mb-2 ml-2">
              Função
            </h2>
          )}
          <div className="space-y-2 ml-1">
            <Link to="/funcoes" className={linkClass('/funcoes')}>
              <FaClipboardList size={18} />
              {aberto && <span>Listar</span>}
            </Link>
            <Link to="/funcoes/criar" className={linkClass('/funcoes/criar')}>
              <FaPlus size={18} />
              {aberto && <span>Criar</span>}
            </Link>
            <Link to="/funcoes/alterar" className={linkClass('/funcoes/alterar')}>
              <FaPen size={18} />
              {aberto && <span>Alterar</span>}
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
