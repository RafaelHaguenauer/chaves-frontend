import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getAllManutencaoFuncionario, deleteManutencaoFuncionario } from "../services/manutencaoFuncionario";

const ManutencaoFuncionarioListPage = () => {
  const [relacoes, setRelacoes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllManutencaoFuncionario();
      setRelacoes(data);
    };
    fetch();
  }, []);

  const handleDelete = async (manutencaoId: number, funcionarioId: number) => {
    const confirm = window.confirm("Deseja desvincular?");
    if (!confirm) return;

    try {
      await deleteManutencaoFuncionario(manutencaoId, funcionarioId);
      setRelacoes((prev) =>
        prev.filter((r) => r.manutencaoId !== manutencaoId || r.funcionarioId !== funcionarioId)
      );
    } catch (err) {
      alert("Erro ao remover.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Relações Manutenção x Funcionário</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Manutenção ID</th>
            <th className="p-2 border">Funcionário ID</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {relacoes.map((r, i) => (
            <tr key={i}>
              <td className="p-2 border">{r.manutencaoId}</td>
              <td className="p-2 border">{r.funcionarioId}</td>
              <td className="p-2 border">
                <Button variant="danger" onClick={() => handleDelete(r.manutencaoId, r.funcionarioId)}>
                  Desvincular
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManutencaoFuncionarioListPage;
