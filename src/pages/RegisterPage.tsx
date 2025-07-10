import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeaderLogin from '@/components/HeaderLogin'
import axios from 'axios'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    try {
      await axios.post('/usuarios', { nome, email, senha })
      setSucesso('Conta criada com sucesso!')
      setTimeout(() => navigate('/login'), 1500)
    } catch (error: any) {
      setErro(error.response?.data?.message || 'Erro ao criar conta.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Criar nova conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
            {sucesso && <p className="text-green-600 text-sm text-center">{sucesso}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Cadastrar
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-700">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
