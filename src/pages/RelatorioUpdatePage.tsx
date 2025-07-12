import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRelatorioById, updateRelatorio } from "../services/relatorio";
import { Button } from "../components/Button";

const RelatorioUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const data = await getRelatorioById(Number(id));
        setTitulo(data.titulo);
        setTipo(data.tipo);
        setDescricao(data.descricao || "");
        setConteudo(data.conteudo ? JSON.stringify(data.conteudo, null, 2) : "");
      } catch (error) {
        console.error("Erro ao carregar relatório:", error);
        alert("Erro ao carregar relatório.");
      }
    };

    fetchRelatorio();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const relatorioData = {
      titulo,
      tipo,
      descricao,
      conteudo: conteudo ? JSON.parse(conteudo) : undefined,
    };

    try {
      await updateRelatorio(Number(id), relatorioData);
      navigate("/relatorios");
    } catch (error) {
      console.error("Erro ao atualizar relatório:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Relatório</h1>
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
          <label className="block font-medium">Conteúdo (JSON)</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="border p-2 w-full font-mono"
            rows={4}
          />
        </div>
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
};

export default RelatorioUpdatePage;
