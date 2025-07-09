import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SelectFuncao from '@/components/SelectFuncao'

const FuncaoUpdatePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [funcao, setFuncao] = useState('')
  const [setor, setSetor] = useState('')
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const carregarFuncao = async () => {
      if (!selectedId) return
      try {
        setCarregando(true)
        const response = await api.get(`/funcoes/${selectedId}`)
        console.log('Dados da função:', response.data)

        const f = response.data
        if (f && f.funcao && f.setor) {
          setFuncao(f.funcao)
          setSetor(f.setor)
          setMensagemErro('')
        } else {
          throw new Error('Dados incompletos da função.')
        }
      } catch (error) {
        console.error('Erro ao carregar função:', error)
        setMensagemErro('Erro ao carregar função.')
      } finally {
        setCarregando(false)
      }
    }

    carregarFuncao()
  }, [selectedId])

  const salvar = async () => {
    try {
      await api.put(`/funcoes/${selectedId}`, {
        funcao,
        setor,
      })
      setMensagemSucesso('Função atualizada com sucesso!')
      setMensagemErro('')
    } catch (error) {
      console.error('Erro ao atualizar:', error)
      setMensagemErro('Erro ao atualizar função.')
      setMensagemSucesso('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6 bg-blue-100">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">Alterar Função</h1>

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

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <SelectFuncao value={selectedId ?? ''} onChange={setSelectedId} />

            {selectedId && !carregando && (
              <>
                <input
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                  placeholder="Função"
                  className="w-full border p-2 rounded"
                />
                <input
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  placeholder="Setor"
                  className="w-full border p-2 rounded"
                />

                <button
                  onClick={salvar}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Salvar Alterações
                </button>

                {mensagemSucesso && (
                  <p className="text-green-600 text-sm">{mensagemSucesso}</p>
                )}
                {mensagemErro && (
                  <p className="text-red-500 text-sm">{mensagemErro}</p>
                )}
              </>
            )}
            {carregando && (
              <p className="text-gray-500">Carregando dados da função...</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default FuncaoUpdatePage
