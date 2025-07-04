import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import HomePage from '@/pages/HomePage';
import FuncionarioListPage from '@/pages/FuncionarioListPage';
import FuncionarioCreatePage from '@/pages/FuncionarioCreatePage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/funcionarios" element={<FuncionarioListPage />} />
        <Route path="/funcionarios/criar" element={<FuncionarioCreatePage />} /> {/* 🚨 Nova rota */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
