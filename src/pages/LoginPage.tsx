import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      await login(email, senha);
      navigate('/home');
    } catch (error) {
      setErro('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-100">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Login
          </h1>
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
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-4 text-sm text-center">
            Não possui uma conta?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
