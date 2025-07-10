import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'

interface Funcao {
  id_funcao: number
  funcao: string
}

interface Props {
  value: number | ''
  onChange: (id: number) => void
}

const SelectFuncao = ({ value, onChange }: Props) => {
  const [funcoes, setFuncoes] = useState<Funcao[]>([])

  const buscarFuncoes = async () => {
    try {
      const response = await api.get('/funcoes', {
        params: { limit: 1000, offset: 0 },
      })

      if (response.data && Array.isArray(response.data.rows)) {
        setFuncoes(response.data.rows)
      }
    } catch (error) {
      console.error('Erro ao carregar funções:', error)
    }
  }

  useEffect(() => {
    buscarFuncoes()
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border rounded"
    >
      <option value="">Selecione uma função</option>
      {funcoes.map((f) => (
        <option key={f.id_funcao} value={f.id_funcao}>
          {f.funcao}
        </option>
      ))}
    </select>
  )
}

export default SelectFuncao
