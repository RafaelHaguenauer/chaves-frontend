import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServicoForm from "../components/ServicoForm";
import { getServicoById, updateServico } from "../services/servicos";

const ServicoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const loadServico = async () => {
      const data = await getServicoById(Number(id));
      setInitialData(data);
    };
    loadServico();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    try {
      await updateServico(Number(id), formData);
      alert("Serviço atualizado com sucesso!");
      navigate("/servicos");
    } catch (error) {
      alert("Erro ao atualizar serviço.");
      console.error(error);
    }
  };

  if (!initialData) return <p>Carregando...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Serviço</h1>
      <ServicoForm initialData={initialData} onSubmit={handleSubmit} isEditing />
    </div>
  );
};

export default ServicoEditPage;
