import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRelatorio } from "../services/relatorio";
import Button from "../components/Button";

const RelatorioCreatePage = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      titulo,
      descricao,
      tipo: "Operacional", //tipei como exemplo
      conteudo: "",
      ativo: true,
      dataCriacao: new Date().toISOString(),
    };

    try {
      await createRelatorio(data);
      navigate("/relatorios");
    } catch (error) {
      console.error("Erro ao criar relatório:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Relatório</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows={4}
          />
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default RelatorioCreatePage;
