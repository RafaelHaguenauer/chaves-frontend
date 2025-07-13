import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEquipamentoById,
  updateEquipamento,
} from "../services/equipamento";
import Button from "../components/Button";

const EquipamentoUpdatePage = () => {
  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [idLocal, setIdLocal] = useState("1");
  const [falha, setFalha] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEquipamento = async () => {
      if (!id) return;
      try {
        const data = await getEquipamentoById(Number(id));
        setNome(data.nome || "");
        setModelo(data.modelo || "");
        setNumeroSerie(data.numeroSerie || "");
        setIdLocal(data.id_local?.toString() || "1");
        setFalha(data.falha ?? false);
      } catch (error) {
        console.error("Erro ao carregar equipamento:", error);
      }
    };

    fetchEquipamento();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nome,
      modelo,
      numeroSerie,
      ativo: true,
      falha,
      id_local: Number(idLocal),
    };

    try {
      await updateEquipamento(Number(id), data);
      navigate("/equipamentos");
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
    }
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

        <div>
          <label className="block font-medium">Local</label>
          <select
            value={idLocal}
            onChange={(e) => setIdLocal(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded text-gray-900"
            required
          >
            <option value="" disabled hidden>
              Selecione o local (ex: 1 = Sala Técnica)
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>


        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={falha}
            onChange={(e) => setFalha(e.target.checked)}
            id="falha"
          />
          <label htmlFor="falha" className="font-medium">
            Está em falha?
          </label>
        </div>

        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
};

export default EquipamentoUpdatePage;
