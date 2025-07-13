import React from 'react'

export type Column<T> = { // modificação João para exportar o tipo Column
  label: string
  accessor: keyof T
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  currentPage: number
  rowsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps<T>) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage)

  return (
    <div className="overflow-x-auto space-y-4">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor as string}
                className="px-4 py-3 text-left text-sm font-semibold border-b border-blue-200"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition-colors border-b border-gray-100"
            >
              {columns.map((col) => (
                <td key={col.accessor as string} className="px-4 py-2 text-sm">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>

        <div className="text-sm text-gray-700">
          Página <span className="font-semibold">{currentPage}</span> de{' '}
          <span className="font-semibold">{totalPages}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Mostrar:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size} por página
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default DataTable
