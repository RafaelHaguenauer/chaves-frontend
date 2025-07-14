import React, { useState, useEffect } from "react";
import Button from "./Button";

interface Props {
  onSubmit: (data: any) => void;
  manutencoes: any[];
  funcionarios: any[];
}

const ManutencaoFuncionarioForm: React.FC<Props> = ({ onSubmit, manutencoes, funcionarios }) => {
  const [formData, setFormData] = useState({
    manutencaoId: "",
    funcionarioId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select name="manutencaoId" value={formData.manutencaoId} onChange={handleChange} className="input">
        <option value="">Selecione a manutenção</option>
        {manutencoes.map((m: any) => (
          <option key={m.manutencaoId} value={m.manutencaoId}>
            {m.descricao || `Manutenção ${m.manutencaoId}`}
          </option>
        ))}
      </select>

      <select name="funcionarioId" value={formData.funcionarioId} onChange={handleChange} className="input">
        <option value="">Selecione o funcionário</option>
        {funcionarios.map((f: any) => (
          <option key={f.id} value={f.id}>
            {f.nome}
          </option>
        ))}
      </select>

      <Button type="submit">Vincular Funcionário</Button>
    </form>
  );
};

export default ManutencaoFuncionarioForm;
