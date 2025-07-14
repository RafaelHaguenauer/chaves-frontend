import React, { useEffect, useState } from "react";
import Button from "./Button";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

const ServicoForm: React.FC<Props> = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    usuario: "",
    endereco: "",
    cep: "",
    email: "",
    servico: "",
    id_funcionario: "",
    id_funcao: "",
    manutencaoId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Usuário" className="input" />
      <input name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Endereço" className="input" />
      <input name="cep" value={formData.cep} onChange={handleChange} placeholder="CEP" className="input" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" />
      <input name="servico" value={formData.servico} onChange={handleChange} placeholder="Serviço" className="input" />
      <input name="id_funcionario" value={formData.id_funcionario} onChange={handleChange} placeholder="ID Funcionário" className="input" />
      <input name="id_funcao" value={formData.id_funcao} onChange={handleChange} placeholder="ID Função" className="input" />
      <input name="manutencaoId" value={formData.manutencaoId} onChange={handleChange} placeholder="ID Manutenção" className="input" />

      <Button type="submit">{isEditing ? "Atualizar" : "Criar"} Serviço</Button>
    </form>
  );
};

export default ServicoForm;
