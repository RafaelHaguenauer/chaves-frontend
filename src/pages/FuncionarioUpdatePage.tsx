import { useState, useEffect } from 'react'
import api from '@/services/axiosConfig'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SelectFuncionario from '@/components/SelectFuncionario'
import SelectFuncao from '@/components/SelectFuncao'

const FuncionarioUpdatePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)
  const [selectedId, setSelectedId] = useState<number | ''>('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [idFuncao, setIdFuncao] = useState<number>(0)
  const [ativo, setAtivo] = useState(true)
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  useEffect(() => {
    const carregarFuncionario = async () => {
      if (!selectedId) return
      try {
        const response = await api.get(`/funcionarios/${selectedId}`)
        const f = response.data
        setNome(f.nome)
        setEmail(f.email)
        setIdFuncao(f.id_funcao)
        setAtivo(f.ativo === 1)
        setMensagemErro('')
        setMensagemSucesso('')
      } catch (error) {
        console.error('Erro ao carregar funcionário:', error)
        setMensagemErro('Erro ao carregar funcionário.')
      }
    }

    carregarFuncionario()
  }, [selectedId])

  const salvar = async () => {
    try {
      await api.put(`/funcionarios/${selectedId}`, {
        nome,
        email,
        id_funcao: idFuncao,
      })
      setMensagemSucesso('Funcionário atualizado com sucesso!')
      setMensagemErro('')
    } catch (error) {
      setMensagemErro('Erro ao atualizar funcionário.')
      setMensagemSucesso('')
    }
  }

  const ativar = async () => {
    try {
      await api.get(`/funcionarios/${selectedId}/ativar`)
      setAtivo(true)
      setMensagemSucesso('Funcionário ativado com sucesso!')
      setMensagemErro('')
    } catch (error) {
      setMensagemErro('Erro ao ativar funcionário.')
      setMensagemSucesso('')
    }
  }

  const desativar = async () => {
    try {
      await api.get(`/funcionarios/${selectedId}/desativar`)
      setAtivo(false)
      setMensagemSucesso('Funcionário desativado com sucesso!')
      setMensagemErro('')
    } catch (error) {
      setMensagemErro('Erro ao desativar funcionário.')
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
            <h1 className="text-2xl font-bold text-blue-700">Alterar Funcionário</h1>

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
            <SelectFuncionario value={selectedId} onChange={setSelectedId} />

            {selectedId && (
              <>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  className="w-full border p-2 rounded"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                />

                <SelectFuncao value={idFuncao} onChange={setIdFuncao} />

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

export default FuncionarioUpdatePage
