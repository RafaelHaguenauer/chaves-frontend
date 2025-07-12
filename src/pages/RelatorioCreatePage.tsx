import { useState } from "react";
import { createRelatorio } from "../services/relatorio";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const RelatorioCreatePage = () => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conteudo, setConteudo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const relatorioData = {
      titulo,
      tipo,
      descricao,
      conteudo: conteudo ? JSON.parse(conteudo) : undefined,
    };

    try {
      await createRelatorio(relatorioData);
      navigate("/relatorios");
    } catch (error) {
      console.error("Erro ao criar relatório:", error);
      alert("Erro ao salvar relatório.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Relatório</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Conteúdo (JSON opcional)</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="border p-2 w-full font-mono"
            rows={4}
          />
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default RelatorioCreatePage;
