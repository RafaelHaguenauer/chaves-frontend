import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRelatorioById,
  updateRelatorio,
} from "../services/relatorio";
import Button from "../components/Button";

const RelatorioUpdatePage = () => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [dataCriacao, setDataCriacao] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRelatorio = async () => {
      if (!id) return;
      try {
        const data = await getRelatorioById(Number(id));
        setTitulo(data.titulo || "");
        setTipo(data.tipo || "");
        setDescricao(data.descricao || "");
        setConteudo(data.conteudo || "");
        setAtivo(data.ativo ?? true);
        setDataCriacao(data.dataCriacao || "");
      } catch (error) {
        console.error("Erro ao carregar relatório:", error);
      }
    };
    fetchRelatorio();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      titulo,
      tipo,
      descricao,
      conteudo,
      ativo,
      dataCriacao,
    };

    try {
      await updateRelatorio(Number(id), data);
      navigate("/relatorios");
    } catch (error) {
      console.error("Erro ao atualizar relatório:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Relatório</h1>
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
          <label className="block font-medium">Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block font-medium">Conteúdo</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows={5}
          />
        </div>

        <div>
          <label className="block font-medium">Data de Criação</label>
          <input
            type="text"
            value={dataCriacao}
            disabled
            className="w-full bg-gray-100 border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
            id="ativo"
          />
          <label htmlFor="ativo" className="font-medium">
            Relatório Ativo
          </label>
        </div>

        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
};

export default RelatorioUpdatePage;
