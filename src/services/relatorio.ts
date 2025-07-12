import api from "./axiosConfig";

export const getRelatorios = async () => {
  const response = await api.get("/relatorio");
  return response.data;
};

export const getRelatorioById = async (id: number) => {
  const response = await api.get(`/relatorio/${id}`);
  return response.data;
};

export const createRelatorio = async (data: any) => {
  const response = await api.post("/relatorio", data);
  return response.data;
};

export const updateRelatorio = async (id: number, data: any) => {
  const response = await api.patch(`/relatorio/${id}`, data);
  return response.data;
};

export const deleteRelatorio = async (id: number) => {
  const response = await api.delete(`/relatorio/${id}`);
  return response.data;
};
