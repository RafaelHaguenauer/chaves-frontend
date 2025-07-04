import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import InputField from '@/components/InputField'
import Button from '@/components/Button'

const FuncionarioCreatePage = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [idFuncao, setIdFuncao] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const navigate = useNavigate()
  const { user, logout, token } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!nome || !email || !senha || !idFuncao) {
      setErro('Todos os campos são obrigatórios')
      return
    }

    try {
      await axios.post(
        '/funcionarios',
        {
          nome,
          email,
          senha,
          id_funcao: Number(idFuncao),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setSucesso('Funcionário criado com sucesso!')
      setTimeout(() => navigate('/funcionarios'), 1500)
    } catch (error: any) {
      console.error('Erro ao criar funcionário:', error)
      setErro(error.response?.data?.message || 'Erro ao criar funcionário')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-blue-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-700">
              Cadastrar Funcionário
            </h1>

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

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <InputField
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <InputField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <InputField
              label="ID da Função"
              type="number"
              value={idFuncao}
              onChange={(e) => setIdFuncao(e.target.value)}
            />

            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            {sucesso && <p className="text-green-600 text-sm">{sucesso}</p>}

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default FuncionarioCreatePage
