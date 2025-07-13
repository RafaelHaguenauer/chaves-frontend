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
import FuncaoSearchPage from '@/pages/FuncaoSearchPage'

import EquipamentoListPage from "../pages/EquipamentoListPage";
import EquipamentoCreatePage from "../pages/EquipamentoCreatePage";
import EquipamentoUpdatePage from "../pages/EquipamentoUpdatePage";

import RelatorioListPage from "../pages/RelatorioListPage";
import RelatorioCreatePage from "../pages/RelatorioCreatePage";
import RelatorioUpdatePage from "../pages/RelatorioUpdatePage";

//modificação do JP para importar as páginas de Equipamento e Relatório

import ManutencaoListPage from '@/pages/ManutencaoListPage'
import ManutencaoCreatePage from '@/pages/ManutencaoCreatePage'
import ManutencaoUpdatePage from '@/pages/ManutencaoUpdatePage'


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
        <Route path="/funcoes/buscar-funcionarios" element={<FuncaoSearchPage />} />
        <Route path="/equipamentos" element={<EquipamentoListPage />} />
        <Route path="/equipamentos/novo" element={<EquipamentoCreatePage />} />
        <Route path="/equipamentos/:id/editar" element={<EquipamentoUpdatePage />} />
        <Route path="/relatorios" element={<RelatorioListPage />} />
        <Route path="/relatorios/novo" element={<RelatorioCreatePage />} />
        <Route path="/relatorios/:id/editar" element={<RelatorioUpdatePage />} />
        <Route path="/manutencoes" element={<ManutencaoListPage />} />
        <Route path="/manutencoes/criar" element={<ManutencaoCreatePage />} />
        <Route path="/manutencoes/:id/atualizar" element={<ManutencaoUpdatePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
