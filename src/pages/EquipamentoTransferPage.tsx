
import { useState } from 'react'
import Button from '@/components/Button'
import DownloadButton from '@/components/DownloadButton'

const equipamentos = [
  { id: 1, nome: 'Notebook A' },
  { id: 2, nome: 'Projetor B' },
]
const locais = [
  { id: 1, nome: 'Almoxarifado' },
  { id: 2, nome: 'Sala 101' },
]

const EquipamentoTransferPage = () => {
  const [equipamentoId, setEquipamentoId] = useState('')
  const [origemId, setOrigemId] = useState('')
  const [destinoId, setDestinoId] = useState('')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [mensagem, setMensagem] = useState('')

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem('')
    setPdfUrl('/exemplo-nota.pdf')
    setMensagem('Transferência realizada com sucesso!')
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Transferência de Equipamento</h1>
      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label>Equipamento:</label>
          <select value={equipamentoId} onChange={e => setEquipamentoId(e.target.value)} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            {equipamentos.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Origem:</label>
          <select value={origemId} onChange={e => setOrigemId(e.target.value)} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            {locais.map(l => (
              <option key={l.id} value={l.id}>{l.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Destino:</label>
          <select value={destinoId} onChange={e => setDestinoId(e.target.value)} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            {locais.map(l => (
              <option key={l.id} value={l.id}>{l.nome}</option>
            ))}
          </select>
        </div>
        <Button type="submit">Transferir e Emitir Nota</Button>
      </form>
      {mensagem && <p className="mt-4 text-green-600">{mensagem}</p>}
      {pdfUrl && (
        <div className="mt-4">
          <DownloadButton url={pdfUrl} filename="nota-transferencia.pdf" />
        </div>
      )}
    </div>
  )
}

export default EquipamentoTransferPage
