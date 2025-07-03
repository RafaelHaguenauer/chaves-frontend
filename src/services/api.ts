// src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001', // manutenção
})

// Interceptor para incluir o token no header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
