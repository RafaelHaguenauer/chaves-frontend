import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import FuncionarioListPage from '@/pages/FuncionarioListPage'
import FuncionarioCreatePage from '@/pages/FuncionarioCreatePage'
import FuncionarioUpdatePage from '@/pages/FuncionarioUpdatePage'
import FuncaoListPage from '@/pages/FuncaoListPage'
import FuncaoCreatePage from '@/pages/FuncaoCreatePage'
import FuncaoUpdatePage from '@/pages/FuncaoUpdatePage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/funcionarios" element={<FuncionarioListPage />} />
        <Route path="/funcionarios/criar" element={<FuncionarioCreatePage />} />
        <Route path="/funcionarios/alterar" element={<FuncionarioUpdatePage />} />
        <Route path="/funcoes" element={<FuncaoListPage />} />
        <Route path="/funcoes/criar" element={<FuncaoCreatePage />} />
        <Route path="/funcoes/alterar" element={<FuncaoUpdatePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
