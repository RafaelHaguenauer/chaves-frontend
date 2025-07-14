import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManutencaoFuncionarioForm from "../components/ManutencaoFuncionarioForm";
import { createManutencaoFuncionario } from "../services/manutencaoFuncionario";
import { getFuncionarios } from "../services/funcionarios";
import { getManutencao } from "../services/manutencao";

const ManutencaoFuncionarioCreatePage = () => {
  const navigate = useNavigate();
  const [manutencoes, setManutencoes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const m = await getManutencao();
      const f = await getFuncionarios();
      setManutencoes(m);
      setFuncionarios(f);
    };
    fetchData();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      await createManutencaoFuncionario(data);
      alert("Funcionário vinculado com sucesso!");
      navigate("/manutencao-funcionario");
    } catch (err) {
      console.error(err);
      alert("Erro ao vincular funcionário.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Vincular Funcionário a Manutenção</h1>
      <ManutencaoFuncionarioForm
        manutencoes={manutencoes}
        funcionarios={funcionarios}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManutencaoFuncionarioCreatePage;
