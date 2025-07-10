import api from "./axiosConfig";

export const getEquipamentos = async () => {
  const response = await api.get("/equipamento");
  return response.data;
};

export const getEquipamentoById = async (id: number) => {
  const response = await api.get(`/equipamento/${id}`);
  return response.data;
};

export const createEquipamento = async (data: any) => {
  const response = await api.post("/equipamento", data);
  return response.data;
};

export const updateEquipamento = async (id: number, data: any) => {
  const response = await api.patch(`/equipamento/${id}`, data);
  return response.data;
};

export const deleteEquipamento = async (id: number) => {
  const response = await api.delete(`/equipamento/${id}`);
  return response.data;
};

