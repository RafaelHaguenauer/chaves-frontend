import { useState } from 'react'

type Row = Record<string, any>

type Props = {
  data: Row[]
  columns: { key: string; label: string }[]
}

const SortableDataTable = ({ data, columns }: Props) => {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key || '')
  const [sortAsc, setSortAsc] = useState(true)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1
    return 0
  })

  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              className="cursor-pointer select-none px-2 py-1 border-b"
            >
              {col.label}
              {sortKey === col.key && (sortAsc ? ' ▲' : ' ▼')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td key={col.key} className="px-2 py-1 border-b">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SortableDataTable