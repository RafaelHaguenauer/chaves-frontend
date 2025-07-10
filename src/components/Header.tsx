import { FaCogs } from 'react-icons/fa'
import UserMenu from './UserMenu'

const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <FaCogs className="text-blue-700 text-2xl" />
        <h1 className="text-xl font-semibold text-blue-700">
          MAPUB - Manutenções Públicas
        </h1>
      </div>

      <UserMenu />
    </header>
  )
}

export default Header
