import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'
import DataTable from '@/components/DataTable'
import FilterField from '@/components/FilterField'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '@/components/LoadingScreen'
import ExportCSVButton from '@/components/ExportCSVButton'

interface Funcionario {
  id_funcionario: number
  nome: string
  email: string
  id_funcao: number
  ativo: number
}

const FuncionarioListPage = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [filtroNome, setFiltroNome] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const buscarFuncionarios = async () => {
    setLoading(true)
    const offset = (currentPage - 1) * rowsPerPage
    console.log('[DEBUG] Chamando /funcionarios com:', { limit: rowsPerPage, offset })

    try {
      const response = await api.get('/funcionarios', {
        params: {
          limit: rowsPerPage,
          offset,
        },
        paramsSerializer: (params) => {
          return Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
        },
      })

      console.log('[DEBUG] Resposta da API:', response.data)

      if (response.data && Array.isArray(response.data.rows)) {
        setFuncionarios(response.data.rows)
        setTotalItems(response.data.count)
      } else {
        setFuncionarios([])
        setTotalItems(0)
      }
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error)
    } finally {
      setLoading(false) 
    }
  }

  useEffect(() => {
    buscarFuncionarios()
  }, [currentPage, rowsPerPage])

  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(filtroNome.toLowerCase())
  )

  if (loading) return <LoadingScreen /> // mostra a tela de loading

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-800">
              Lista de Funcionários
            </h1>
          </div>

          <FilterField
            label="Filtrar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />

          <ExportCSVButton data={funcionarios} filename="funcionarios.csv" />

          <DataTable
            data={funcionariosFiltrados.map((f) => ({
              ...f,
              cargo: `Função ${f.id_funcao}`,
              is_active: f.ativo === 1,
            }))}
            columns={[
              { label: 'Nome', accessor: 'nome' },
              { label: 'Email', accessor: 'email' },
              { label: 'Cargo', accessor: 'cargo' },
              {
                label: 'Ativo',
                accessor: 'is_active',
                render: (value: boolean) => (value ? 'Sim' : 'Não'),
              },
            ]}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalItems={totalItems}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows)
              setCurrentPage(1)
            }}
          />
        </main>
      </div>
    </div>
  )
}

export default FuncionarioListPage
