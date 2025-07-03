import axios from 'axios'

const authApi = axios.create({
  baseURL: 'http://localhost:3000', // autenticação
})

export async function login(email: string, senha: string) {
  try {
    const response = await authApi.post('/auth/login', { email, senha })

    const { token, usuario } = response.data

    // infos do usuário localmente
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))

    return { success: true, usuario }
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.error ||
        'Erro ao fazer login. Tente novamente.',
    }
  }
}
