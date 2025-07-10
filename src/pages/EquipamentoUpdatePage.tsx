import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEquipamentoById,
  updateEquipamento,
} from "../services/equipamento";
import Button from "../components/Button";// uso do export default está dando erro no uso das { }, por isso removi as chaves

const EquipamentoUpdatePage = () => {
  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEquipamento = async () => {
      if (!id) return;
      const data = await getEquipamentoById(Number(id));
      setNome(data.nome || "");
      setModelo(data.modelo || "");
      setNumeroSerie(data.numeroSerie || "");
    };
    fetchEquipamento();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      nome,
      modelo,
      numeroSerie,
      ativo: 1, // valor fixo por enquanto
    };
    await updateEquipamento(Number(id), data);
    navigate("/equipamentos");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Equipamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Modelo</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Número de Série</label>
          <input
            type="text"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
};

export default EquipamentoUpdatePage;
