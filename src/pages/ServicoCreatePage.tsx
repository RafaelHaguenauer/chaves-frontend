import { useNavigate } from "react-router-dom";
import ServicoForm from "../components/ServicoForm";
import { createServico } from "../services/servicos";

const ServicoCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      await createServico(formData);
      alert("Serviço criado com sucesso!");
      navigate("/servicos");
    } catch (error) {
      alert("Erro ao criar serviço.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Serviço</h1>
      <ServicoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ServicoCreatePage;
