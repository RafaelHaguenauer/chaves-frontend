import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '@/components/DataTable';
import FilterField from '@/components/FilterField';
import MainLayout from '@/components/layout/MainLayout';

interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  is_active: boolean;
}

const FuncionarioListPage = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [filtroNome, setFiltroNome] = useState('');

  const buscarFuncionarios = async () => {
    try {
      const response = await axios.get('/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const funcionariosFiltrados = funcionarios.filter(f =>
    f.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Lista de Funcionários
      </h1>

      <FilterField
        label="Filtrar por nome"
        value={filtroNome}
        onChange={(e) => setFiltroNome(e.target.value)}
      />

      <DataTable
        data={funcionariosFiltrados}
        columns={[
          { label: 'Nome', accessor: 'nome' },
          { label: 'Email', accessor: 'email' },
          { label: 'Cargo', accessor: 'cargo' },
          {
            label: 'Ativo',
            accessor: 'is_active',
            render: (value: boolean) => (value ? 'Sim' : 'Não'),
          },
        ]}
      />
    </MainLayout>
  );
};

export default FuncionarioListPage;
