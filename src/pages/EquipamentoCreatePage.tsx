import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEquipamento } from "../services/equipamento";
import Button from "../components/Button";

const EquipamentoCreatePage = () => {
  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [idLocal, setIdLocal] = useState("1");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nome,
      modelo,
      numeroSerie,
      ativo: true,
      falha: false,
      id_local: Number(idLocal),
    };

    await createEquipamento(data);
    navigate("/equipamentos");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Equipamento</h1>
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
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="1">Sala Técnica</option>
            <option value="2">Painel Principal</option>
          </select>
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default EquipamentoCreatePage;
