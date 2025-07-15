import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SelectFuncao from '@/components/SelectFuncao'
import LoadingScreen from '@/components/LoadingScreen'

const FuncaoUpdatePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)
  const [selectedId, setSelectedId] = useState<number | ''>('')

  const [funcao, setFuncao] = useState('')
  const [setor, setSetor] = useState('')
  const [ativo, setAtivo] = useState(true)

  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')
  const [loading, setLoading] = useState(false) // estado de loading

  useEffect(() => {
    const carregarFuncao = async () => {
      if (!selectedId) return
      setLoading(true) // inicia loading
      try {
        const response = await api.get(`/funcoes/${selectedId}`)
        const f = response.data
        setFuncao(f.funcao)
        setSetor(f.setor)
        setAtivo(f.ativo === 1)
        setMensagemErro('')
        setMensagemSucesso('')
      } catch (error) {
        console.error('Erro ao carregar função:', error)
        setMensagemErro('Erro ao carregar função.')
      } finally {
        setLoading(false) // termina loading
      }
    }

    carregarFuncao()
  }, [selectedId])

  // Mostra a tela de loading enquanto carrega
  if (loading) return <LoadingScreen />

  const salvar = async () => {
    try {
      await api.put(`/funcoes/${selectedId}`, { funcao, setor })
      setMensagemSucesso('Função atualizada com sucesso!')
      setMensagemErro('')
    } catch (error) {
      setMensagemErro('Erro ao atualizar função.')
      setMensagemSucesso('')
    }
  }

  const ativar = async () => {
    try {
      await api.get(`/funcoes/${selectedId}/ativar`)
      setAtivo(true)
      setMensagemSucesso('Função ativada com sucesso!')
      setMensagemErro('')
    } catch (error) {
      setMensagemErro('Erro ao ativar função.')
      setMensagemSucesso('')
    }
  }

  const desativar = async () => {
    try {
      await api.get(`/funcoes/${selectedId}/desativar`)
      setAtivo(false)
      setMensagemSucesso('Função desativada com sucesso!')
      setMensagemErro('')
    } catch (error) {
      setMensagemErro('Erro ao desativar função.')
      setMensagemSucesso('')
    }
  }

  const deletar = async () => {
    try {
      await api.delete(`/funcoes/${selectedId}`)
      setMensagemSucesso('Função deletada com sucesso!')
      setMensagemErro('')
      setTimeout(() => navigate('/funcoes'), 1500)
    } catch (error) {
      setMensagemErro('Erro ao deletar função.')
      setMensagemSucesso('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
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

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl mx-auto">
            <SelectFuncao value={selectedId} onChange={setSelectedId} />

            {selectedId && (
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

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={salvar}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Salvar Alterações
                  </button>

                  <button
                    onClick={desativar}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Desativar
                  </button>

                  <button
                    onClick={ativar}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Ativar
                  </button>

                  <button
                    onClick={deletar}
                    className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
                  >
                    Deletar
                  </button>
                </div>

                {mensagemSucesso && (
                  <p className="text-green-600 text-sm">{mensagemSucesso}</p>
                )}
                {mensagemErro && (
                  <p className="text-red-500 text-sm">{mensagemErro}</p>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default FuncaoUpdatePage
