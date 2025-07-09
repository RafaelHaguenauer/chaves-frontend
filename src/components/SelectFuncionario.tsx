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

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/funcionarios')
        if (Array.isArray(response.data)) {
          setFuncionarios(response.data)
        } else {
          setFuncionarios([])
        }
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
      }
    }

    fetchFuncionarios()
  }, [])

  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border p-2 rounded"
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
