// src/pages/RegisterPage.tsx
import { useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      await axios.post('/usuarios', { nome, email, senha });
      setSucesso('Usuário criado com sucesso!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error: any) {
      setErro(error.response?.data?.error || 'Erro ao criar conta');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Criar Conta
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            {sucesso && <p className="text-green-600 text-sm">{sucesso}</p>}
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Já possui uma conta?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Entrar
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
