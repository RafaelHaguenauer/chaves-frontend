import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import HeaderLogin from '@/components/HeaderLogin'
import InputField from '@/components/InputField'
import Button from '@/components/Button'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    try {
      await login(email, senha)
      navigate('/home')
    } catch {
      setErro('E-mail ou senha inválidos')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <HeaderLogin />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Acessar sistema
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-700">
            Não possui uma conta?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
