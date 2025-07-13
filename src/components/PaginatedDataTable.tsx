import { useState } from 'react'

type Row = Record<string, any>
type Props = {
  data: Row[]
  columns: { key: string; label: string }[]
}

const PaginatedDataTable = ({ data, columns }: Props) => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const totalPages = Math.ceil(data.length / perPage)
  const paginatedData = data.slice((page - 1) * perPage, page * perPage)

  const handlePrev = () => setPage(p => Math.max(1, p - 1))
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1))
  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value))
    setPage(1)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <span>Página {page} de {totalPages}</span>
        <button onClick={handlePrev} disabled={page === 1} className="px-2 py-1 bg-gray-200 rounded">Anterior</button>
        <button onClick={handleNext} disabled={page === totalPages} className="px-2 py-1 bg-gray-200 rounded">Próxima</button>
        <select value={perPage} onChange={handlePerPage} className="border rounded p-1">
          {[5, 10, 20, 50].map(n => (
            <option key={n} value={n}>{n} por página</option>
          ))}
        </select>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-2 py-1 border-b">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col.key} className="px-2 py-1 border-b">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PaginatedDataTable