import api from "./axiosConfig";

export const getServicos = async () => {
  const response = await api.get("/servico");
  return response.data;
};

export const getServicoById = async (id: number) => {
  const response = await api.get(`/servico/${id}`);
  return response.data;
};

export const createServico = async (data: any) => {
  const response = await api.post("/servico", data);
  return response.data;
};

export const updateServico = async (id: number, data: any) => {
  const response = await api.patch(`/servico/${id}`, data);
  return response.data;
};

export const deleteServico = async (id: number) => {
  const response = await api.delete(`/servico/${id}`);
  return response.data;
};

