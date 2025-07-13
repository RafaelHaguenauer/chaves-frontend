import { useEffect, useState } from "react";
import { deleteEquipamento, getEquipamentos } from "../services/equipamento";
import Button from "../components/Button";// uso do export default está dando erro no uso das { }, por isso removi as chaves
// já vi que foi a forma de exportar
import DataTable from "../components/DataTable";// uso do export default está dando erro no uso das { }, por isso removi as chaves
import { useNavigate } from "react-router-dom";
import { Equipamento } from "../types/Equipamento";
import { Column } from "../components/DataTable";
import LoadingProgressBar from "../components/LoadingProgressBar";


const EquipamentoListPage = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getEquipamentos();
      setEquipamentos(data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    } finally {
      setLoading(false); 
    }
  };
  fetchData();
}, []);

  if (loading) {
    return <LoadingProgressBar />;
  }
  
  const handleCreate = () => {
    navigate("/equipamentos/novo");
  };

  const handleEdit = (id: number) => {
    navigate(`/equipamentos/${id}/editar`);
  };

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este equipamento?");
    if (!confirmar) return;

    try {
      await deleteEquipamento(id);
      setEquipamentos((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Erro ao excluir equipamento", err);
    }
  };

  const columns: Column<Equipamento>[] = [
    {
      label: "ID",
      accessor: "id",
    },
    {
      label: "Nome",
      accessor: "nome",
    },
    {
      label: "Modelo",
      accessor: "modelo",
    },
    {
      label: "Ativo",
      accessor: "ativo",
      render: (value: any) => (
        <span className={value ? "text-green-600" : "text-red-600"}>
          {value ? "Sim" : "Não"}
        </span>
      ),
    },
    {
      label: "Falha",
      accessor: "falha",
      render: (value: any) => (
        <span className={value ? "text-red-600 font-bold" : "text-green-600"}>
          {value ? "⚠️ Falha" : "✅ OK"}
        </span>
      ),
    },
    {
      label: "Ações",
      accessor: "id",
      render: (_: unknown, row: Equipamento) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="text-blue-500 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equipamentos</h1>
        <Button onClick={handleCreate}>Novo Equipamento</Button>
      </div>
      <DataTable
        data={equipamentos}
        columns={columns}
        currentPage={1}
        rowsPerPage={10}
        totalItems={equipamentos.length}
        onPageChange={(page) => console.log("Página:", page)}
        onRowsPerPageChange={(rows) => console.log("Linhas por página:", rows)}
      />
    </div>
    
  );
};

export default EquipamentoListPage;
