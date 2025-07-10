import React from 'react';

type Column<T> = {
  label: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
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
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <div className="overflow-x-auto space-y-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor as string} className="px-4 py-2 border-b font-semibold text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.accessor as string} className="px-4 py-2 border-b">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginação */}
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>

        <div className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Mostrar:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="border px-2 py-1 rounded"
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
  );
};

export default DataTable;
