import React from 'react';

type Column<T> = {
  label: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
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
    </div>
  );
};

export default DataTable;
