import { Settings } from 'lucide-react'

const HeaderLogin = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-blue-800 font-bold text-xl">
        <Settings size={24} className="text-blue-700" />
        MAPUB - Manutenções Públicas
      </div>
    </header>
  )
}

export default HeaderLogin
