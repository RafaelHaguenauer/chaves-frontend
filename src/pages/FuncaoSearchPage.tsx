import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LoadingScreen from '@/components/LoadingScreen'

type FuncionarioResumido = {
  id: number
  nome: string
}

type FuncaoComFuncionarios = {
  id_funcao: number
  funcao: string
  setor: string
  funcionarios: FuncionarioResumido[]
}

const FuncaoSearchPage = () => {
  const [dados, setDados] = useState<FuncaoComFuncionarios[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await api.get('/funcoes/listar/funcionarios')
        setDados(response.data)
        setErro('')
      } catch (error) {
        setErro('Erro ao carregar funções e funcionários.')
      } finally {
        setCarregando(false)
      }
    }

    buscarDados()
  }, [])

  if (carregando) return <LoadingScreen /> // tela de loading

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Busca por Função com Funcionários
          </h1>

          {erro ? (
            <p className="text-red-600">{erro}</p>
          ) : (
            <div className="space-y-6">
              {dados.map((funcao) => (
                <div
                  key={funcao.id_funcao}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-blue-700">
                        {funcao.funcao}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Setor: {funcao.setor}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 mt-2 md:mt-0">
                      Total: {funcao.funcionarios.length} funcionário(s)
                    </span>
                  </div>

                  {funcao.funcionarios.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      Nenhum funcionário associado.
                    </p>
                  ) : (
                    <ul className="list-disc pl-6 space-y-1">
                      {funcao.funcionarios.map((f) => (
                        <li key={`${funcao.id_funcao}-${f.nome}`} className="text-sm text-gray-800">
                          {f.nome}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default FuncaoSearchPage
