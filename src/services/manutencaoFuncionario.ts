import api from "./axiosConfig";

export const getAllManutencaoFuncionario = async () => {
  const response = await api.get("/manutencao-funcionario");
  return response.data;
};

export const createManutencaoFuncionario = async (data: any) => {
  const response = await api.post("/manutencao-funcionario", data);
  return response.data;
};

export const deleteManutencaoFuncionario = async (manutencaoId: number, funcionarioId: number) => {
  const response = await api.delete(`/manutencao-funcionario/${manutencaoId}/${funcionarioId}`);
  return response.data;
};
