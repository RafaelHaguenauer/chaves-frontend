import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  is_active: boolean;
}

interface AuthContextType {
  token: string | null;
  user: Usuario | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Usuario | null>(null);

  // ✅ Carregar token e user do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post('/auth/login', { email, senha });
      const { token, usuario } = response.data;

      setToken(token);
      setUser(usuario);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));
    } catch (error: any) {
      console.error('Erro no login:', error.response?.data || error.message);
      throw new Error('Erro ao fazer login');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
