
import { useEffect, useState } from 'react'
import api from '@/services/api'
import LoadingScreen from '@/components/LoadingScreen'
type History = { date: string; action: string }
type Props = { userId: number; onClose: () => void }
const UserHistoryModal = ({ userId, onClose }: Props) => {
  const [history, setHistory] = useState<History[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/usuarios/${userId}/historico`)
        setHistory(response.data)
      } catch (e) {
        setHistory([])
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [userId])
  if (loading) return <LoadingScreen />
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="font-bold mb-2">Histórico do Usuário</h2>
        <ul>
          {history.map((h, i) => (
            <li key={i}>{h.date} - {h.action}</li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4">Fechar</button>
      </div>
    </div>
  )
}
export default UserHistoryModal
