import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'
import DataTable from '@/components/DataTable'
import FilterField from '@/components/FilterField'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import LoadingScreen from '@/components/LoadingScreen'

interface Funcao {
  id_funcao: number
  funcao: string
  setor: string
  ativo: number
}

const FuncaoListPage = () => {
  const [funcoes, setFuncoes] = useState<Funcao[]>([])
  const [filtroNome, setFiltroNome] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()

  const buscarFuncoes = async () => {
    setLoading(true) // inicia loading
    try {
      const offset = (currentPage - 1) * rowsPerPage
      const response = await api.get('/funcoes', {
        params: {
          limit: rowsPerPage,
          offset,
        },
      })

      if (response.data && Array.isArray(response.data.rows)) {
        setFuncoes(response.data.rows)
        setTotalItems(response.data.count)
      } else {
        setFuncoes([])
        setTotalItems(0)
      }
    } catch (error) {
      console.error('Erro ao buscar funções:', error)
    } finally {
      setLoading(false) // termina loading
    }
  }

  useEffect(() => {
    buscarFuncoes()
  }, [currentPage, rowsPerPage])

  const funcoesFiltradas = funcoes.filter((f) =>
    f.funcao.toLowerCase().includes(filtroNome.toLowerCase())
  )

  if (loading) return <LoadingScreen /> // mostra o loading

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-800">
              Lista de Funções
            </h1>
          </div>

          <FilterField
            label="Filtrar por nome da função"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />

          <DataTable
            data={funcoesFiltradas.map((f) => ({
              ...f,
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

export default FuncaoListPage
