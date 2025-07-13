import api from "./axiosConfig";
import { Equipamento } from "../types/Equipamento";

export const getEquipamentos = async (): Promise<Equipamento[]> => {
  const response = await api.get("/equipamentos");
  return response.data;
};

export const getEquipamentoById = async (id: number): Promise<Equipamento> => {
  const response = await api.get(`/equipamentos/${id}`);
  return response.data;
};

export const createEquipamento = async (
  data: Omit<Equipamento, "id" | "createdAt" | "updatedAt">
): Promise<Equipamento> => {
  const response = await api.post("/equipamentos", data);
  return response.data;
};

export const updateEquipamento = async (
  id: number,
  data: Omit<Equipamento, "id" | "createdAt" | "updatedAt">
): Promise<Equipamento> => {
  const response = await api.put(`/equipamentos/${id}`, data);
  return response.data;
};

export const patchEquipamento = async (
  id: number,
  data: Partial<Omit<Equipamento, "id" | "createdAt" | "updatedAt">>
): Promise<Equipamento> => {
  const response = await api.patch(`/equipamentos/${id}`, data);
  return response.data;
};

export const deleteEquipamento = async (id: number): Promise<void> => {
  await api.delete(`/equipamentos/${id}`);
};
