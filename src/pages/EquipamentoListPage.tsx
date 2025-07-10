import { useEffect, useState } from "react";
import { getEquipamentos } from "../services/equipamento";
import Button from "../components/Button";// uso do export default está dando erro no uso das { }, por isso removi as chaves
import DataTable from "../components/DataTable";// uso do export default está dando erro no uso das { }, por isso removi as chaves
import { useNavigate } from "react-router-dom";

const EquipamentoListPage = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipamentos = async () => {
      const data = await getEquipamentos();
      setEquipamentos(data);
    };
    fetchEquipamentos();
  }, []);

  const handleCreate = () => {
    navigate("/equipamentos/novo");
  };

  const handleEdit = (id: number) => {
    navigate(`/equipamentos/${id}/editar`);
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Nome", accessor: "nome" },
    { label: "Status", accessor: "status" },
    {
      label: "Ações",
      accessor: "acoes", // precisei adicionar um acessor temporário para as ações
      render: (item: any) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(item.id)}>Editar</Button>
          {/*<Button variant="danger">Excluir</Button> */}
          <Button>Excluir</Button> {/*precisei mudar temporariamente para testar CRUD básico*/}
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
      <DataTable data={equipamentos} columns={columns} />
    </div>
  );
};

export default EquipamentoListPage;
