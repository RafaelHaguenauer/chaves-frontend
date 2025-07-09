import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'

interface Funcao {
  id_funcao: number
  nome?: string
  descricao?: string
}

interface Props {
  value: number | ''
  onChange: (id: number) => void
}

const SelectFuncao = ({ value, onChange }: Props) => {
  const [funcoes, setFuncoes] = useState<Funcao[]>([])

  useEffect(() => {
    const fetchFuncoes = async () => {
      try {
        const response = await api.get('/funcoes')
        console.log('🔍 Dados recebidos das funções:', response.data)
        if (Array.isArray(response.data)) {
          setFuncoes(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar funções:', error)
      }
    }

    fetchFuncoes()
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border p-2 rounded"
    >
      <option value="">Selecione uma função</option>
      {funcoes.map((f) => (
        <option key={f.id_funcao} value={f.id_funcao}>
          {f.nome || f.descricao || `Função ${f.id_funcao}`}
        </option>
      ))}
    </select>
  )
}

export default SelectFuncao
