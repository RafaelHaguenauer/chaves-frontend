import api from "./axiosConfig";

export const getFuncionarios = async () => {
  const response = await api.get("/funcionarios");
  return response.data;
};

export const getFuncionarioById = async (id: number) => {
  const response = await api.get(`/funcionarios/${id}`);
  return response.data;
};

export const createFuncionario = async (data: any) => {
  const response = await api.post("/funcionarios", data);
  return response.data;
};

export const updateFuncionario = async (id: number, data: any) => {
  const response = await api.patch(`/funcionarios/${id}`, data);
  return response.data;
};

export const deleteFuncionario = async (id: number) => {
  const response = await api.delete(`/funcionarios/${id}`);
  return response.data;
};
