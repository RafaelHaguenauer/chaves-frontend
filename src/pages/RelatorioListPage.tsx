import { useEffect, useState } from "react";
import { getRelatorios, deleteRelatorio } from "../services/relatorio";
import { Relatorio } from "../types/Relatorio";
import DataTable, { Column } from "../components/DataTable";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


const RelatorioListPage = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRelatorios();
      setRelatorios(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (!confirm) return;

    await deleteRelatorio(id);
    setRelatorios((prev) => prev.filter((r) => r.id !== id));
  };

  const columns: Column<Relatorio>[] = [
    { label: "ID", accessor: "id" },
    { label: "Título", accessor: "titulo" },
    { label: "Criado em", accessor: "createdAt" },
    {
      label: "Ações",
      render: (item: Relatorio) => (
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/relatorios/edit/${item.id}`)}>
            Editar
          </Button>
          <Button onClick={() => handleDelete(item.id)}>Excluir</Button>
        </div>
      ),
      accessor: "id"
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
      <Button onClick={() => navigate("/relatorios/new")}>Novo Relatório</Button>
      <div className="mt-4">
        <DataTable
          data={relatorios}
          columns={columns}
          currentPage={1}
          rowsPerPage={10}
          totalItems={relatorios.length}
          onPageChange={(page) => console.log("Página:", page)}
          onRowsPerPageChange={(rows) => console.log("Linhas por página:", rows)}
        />
      </div>
    </div>
  );
};

export default RelatorioListPage;
