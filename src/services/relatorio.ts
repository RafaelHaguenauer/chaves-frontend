import { Relatorio } from "../types/Relatorio";
import api from "./axiosConfig";

export const getRelatorios = async (): Promise<Relatorio[]> => {
  const res = await api.get("/relatorios");
  return res.data;
};

export const getRelatorioById = async (id: number): Promise<Relatorio> => {
  const res = await api.get(`/relatorios/${id}`);
  return res.data;
};

export const createRelatorio = async (
  data: Omit<Relatorio, "id" | "createdAt" | "updatedAt">
): Promise<Relatorio> => {
  const res = await api.post("/relatorios", data);
  return res.data;
};

export const updateRelatorio = async (
  id: number,
  data: Omit<Relatorio, "id" | "createdAt" | "updatedAt">
): Promise<Relatorio> => {
  const res = await api.put(`/relatorios/${id}`, data);
  return res.data;
};

export const deleteRelatorio = async (id: number): Promise<void> => {
  await api.delete(`/relatorios/${id}`);
};
