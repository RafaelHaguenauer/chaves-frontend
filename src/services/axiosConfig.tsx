import axios from 'axios'

const api = axios.create({
  baseURL: '/',
})

// DEBUG VISUAL
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log('[DEBUG] Enviando requisição para:', config.url)
    console.log('[DEBUG] Token:', token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('[DEBUG] Erro no interceptor:', error)
    return Promise.reject(error)
  }
)

export default api
