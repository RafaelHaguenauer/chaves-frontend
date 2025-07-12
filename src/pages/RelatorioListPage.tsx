import { useEffect, useState } from "react";
import { getRelatorios } from "../services/relatorio";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const RelatorioListPage = () => {
  const [relatorios, setRelatorios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatorios = async () => {
      const data = await getRelatorios();
      setRelatorios(data);
    };
    fetchRelatorios();
  }, []);

  const handleCreate = () => {
    navigate("/relatorios/novo");
  };

  const handleEdit = (id: number) => {
    navigate(`/relatorios/${id}/editar`);
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Título", accessor: "titulo" },
    { label: "Tipo", accessor: "tipo" },
    { label: "Descrição", accessor: "descricao" },
    { label: "Criado em", accessor: "dataCriacao" },
    {
      label: "Ações",
      render: (item: any) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(item.id)}>Editar</Button>
          <Button variant="danger">Excluir</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <Button onClick={handleCreate}>Novo Relatório</Button>
      </div>
      <DataTable data={relatorios} columns={columns} />
    </div>
  );
};

export default RelatorioListPage;
