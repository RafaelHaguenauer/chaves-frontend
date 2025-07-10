import { useEffect, useState } from 'react'
import api from '@/services/axiosConfig'

interface Funcionario {
  id_funcionario: number
  nome: string
}

interface Props {
  value: number | ''
  onChange: (id: number) => void
}

const SelectFuncionario = ({ value, onChange }: Props) => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])

  const buscarFuncionarios = async () => {
    try {
      const response = await api.get('/funcionarios', {
        params: { limit: 1000, offset: 0 },
      })
      if (response.data && Array.isArray(response.data.rows)) {
        setFuncionarios(response.data.rows)
      }
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error)
    }
  }

  useEffect(() => {
    buscarFuncionarios()
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border rounded"
    >
      <option value="">Selecione um funcionário</option>
      {funcionarios.map((f) => (
        <option key={f.id_funcionario} value={f.id_funcionario}>
          {f.nome}
        </option>
      ))}
    </select>
  )
}

export default SelectFuncionario
