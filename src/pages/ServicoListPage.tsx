import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ServicoTable from "../components/ServicoTable";
import { getServicos, deleteServico } from "../services/servicos";

const ServicoListPage = () => {
  const [servicos, setServicos] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const data = await getServicos();
        setServicos(data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      }
    };
    fetchServicos();
  }, []);

  const handleCreate = () => {
    navigate("/servicos/novo");
  };

  const handleEdit = (id: number) => {
    navigate(`/servicos/${id}/editar`);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este serviço?"
    );
    if (!confirm) return;

    try {
      await deleteServico(id);
      alert("Serviço excluído com sucesso!");
      setServicos((prev) => prev.filter((s) => s.id_servico !== id));
    } catch (error) {
      alert("Erro ao excluir serviço.");
      console.error(error);
    }
  };

  const columns = [
    { label: "ID", accessor: "id_servico" },
    { label: "Usuário", accessor: "usuario" },
    { label: "Endereço", accessor: "endereco" },
    { label: "CEP", accessor: "cep" },
    { label: "Email", accessor: "email" },
    { label: "Serviço", accessor: "servico" },
    { label: "Funcionário", accessor: "funcionario.nome" },
    { label: "Função", accessor: "funcao.titulo" },
    { label: "Manutenção", accessor: "manutencao.descricao" },
    {
      label: "Ações",
      accessor: "acoes",
      render: (item: any) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(item.id_servico)}>Editar</Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(item.id_servico)}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <Button onClick={handleCreate}>Novo Serviço</Button>
      </div>
      <ServicoTable data={servicos} columns={columns} />
    </div>
  );
};

export default ServicoListPage;
