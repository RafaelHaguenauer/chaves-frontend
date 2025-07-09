import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const navigate = useNavigate()

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <aside className="w-64 bg-white border-r p-4 shadow-md h-full">
      <button
        onClick={() => navigate('/home')}
        className="text-xl font-bold text-blue-700 mb-6 hover:underline"
      >
        Menu
      </button>

      <div>
        <button
          className="w-full text-left font-semibold text-blue-600 hover:underline"
          onClick={() => toggleSection('funcao')}
        >
          Função
        </button>
        {openSection === 'funcao' && (
          <div className="ml-4 mt-2 flex flex-col gap-1 text-sm text-gray-700">
            <button onClick={() => navigate('/funcoes/criar')} className="hover:underline">Criar</button>
            <button onClick={() => navigate('/funcoes/alterar')} className="hover:underline">Alterar</button>
            <button onClick={() => navigate('/funcoes')} className="hover:underline">Listar</button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          className="w-full text-left font-semibold text-blue-600 hover:underline"
          onClick={() => toggleSection('funcionario')}
        >
          Funcionário
        </button>
        {openSection === 'funcionario' && (
          <div className="ml-4 mt-2 flex flex-col gap-1 text-sm text-gray-700">
            <button onClick={() => navigate('/funcionarios/criar')} className="hover:underline">Criar</button>
            <button onClick={() => navigate('/funcionarios/alterar')} className="hover:underline">Alterar</button>
            <button onClick={() => navigate('/funcionarios')} className="hover:underline">Listar</button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
