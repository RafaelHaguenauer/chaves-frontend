import React, { useState, useMemo } from "react";

interface Column {
  label: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface Props {
  data: any[];
  columns: Column[];
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const normalize = (value: any) =>
  typeof value === "string"
    ? value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";

const ServicoTable: React.FC<Props> = ({ data, columns }) => {
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(() => {
    if (!filterText.trim()) return data;

    const lower = normalize(filterText);

    return data.filter((row) =>
      columns.some((col) => {
        const val = getNestedValue(row, col.accessor);
        return normalize(val).includes(lower);
      })
    );
  }, [filterText, data, columns]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar..."
        className="p-2 border border-gray-300 rounded w-full"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className="p-3 font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.accessor} className="p-3">
                      {col.render ? col.render(row) : String(getNestedValue(row, col.accessor) ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicoTable;
