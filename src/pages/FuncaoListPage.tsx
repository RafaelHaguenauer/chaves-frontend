import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import FilterField from '@/components/FilterField'
import DataTable from '@/components/DataTable'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Funcao {
  id_funcao: number
  funcao: string
  setor: string
  ativo: number
}

const FuncaoListPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)
  const [funcoes, setFuncoes] = useState<Funcao[]>([])
  const [filtroFuncao, setFiltroFuncao] = useState('')

  const buscarFuncoes = async () => {
    try {
      const response = await api.get('/funcoes')
      if (Array.isArray(response.data)) {
        setFuncoes(response.data)
      } else {
        setFuncoes([])
      }
    } catch (error) {
      console.error('Erro ao buscar funções:', error)
    }
  }

  useEffect(() => {
    buscarFuncoes()
  }, [])

  const funcoesFiltradas = funcoes.filter((f) =>
    f.funcao?.toLowerCase().includes(filtroFuncao.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-blue-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-700">Lista de Funções</h1>

            <div className="relative">
              <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
              >
                {user?.nome}
                <span>▼</span>
              </button>
              {menuAberto && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          <FilterField
            label="Filtrar por função"
            value={filtroFuncao}
            onChange={(e) => setFiltroFuncao(e.target.value)}
          />

          <DataTable
            data={funcoesFiltradas.map((f) => ({
              funcao: f.funcao ?? '',
              setor: f.setor ?? '',
              is_active: f.ativo === 1,
            }))}
            columns={[
              { label: 'Função', accessor: 'funcao' },
              { label: 'Setor', accessor: 'setor' },
              {
                label: 'Ativo',
                accessor: 'is_active',
                render: (value: boolean) => (value ? 'Sim' : 'Não'),
              },
            ]}
          />
        </main>
      </div>
    </div>
  )
}

export default FuncaoListPage
