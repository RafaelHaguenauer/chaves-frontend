// src/components/Sidebar.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="w-64 bg-white border-r p-4 shadow-md h-full">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Menu</h2>

      {/* Seção Função */}
      <div>
        <button
          className="w-full text-left font-semibold text-blue-600 hover:underline"
          onClick={() => toggleSection('funcao')}
        >
          Função
        </button>
        {openSection === 'funcao' && (
          <div className="ml-4 mt-2 flex flex-col gap-1 text-sm text-gray-700">
            <button className="text-left hover:underline">Criar</button>
            <button className="text-left hover:underline">Alterar</button>
            <button className="text-left hover:underline">Listar</button>
          </div>
        )}
      </div>

      {/* Seção Funcionário */}
      <div className="mt-4">
        <button
          className="w-full text-left font-semibold text-blue-600 hover:underline"
          onClick={() => toggleSection('funcionario')}
        >
          Funcionário
        </button>
        {openSection === 'funcionario' && (
          <div className="ml-4 mt-2 flex flex-col gap-1 text-sm text-gray-700">
            <button className="text-left hover:underline">Criar</button>
            <button className="text-left hover:underline">Alterar</button>
            <button
              className="text-left hover:underline"
              onClick={() => navigate('/funcionarios')}
            >
              Listar
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
